import { Injectable, signal } from '@angular/core';
import {
  AuthChangeEvent,
  AuthSession,
  createClient,
  Session,
  SupabaseClient,
  User,
} from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { filter, from, map } from 'rxjs';
import { Database, TablesInsert, TablesUpdate } from '../types/database.types';
import { TaskId, UserId } from '../types/branded.type';
import { Task } from '../types/task.type';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient<Database>;
  _session: AuthSession | null = null;
  tasksSignal = signal<Task[] | null>(null);

  constructor() {
    this.supabase = createClient(
      environment.supabase.supabaseUrl,
      environment.supabase.supabaseKey,
    );

    this.supabase
      .channel('tasks_edited')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'tasks' },
        async () => {
          const { data } = await this.sessionAsync;
          if (!data.session) {
            return;
          }

          const { data: tasks } = await this.tasks(
            data.session.user.id as UserId,
          );
          this.tasksSignal.set(tasks);
        },
      )
      .subscribe();
  }

  get session() {
    this.supabase.auth.getSession().then(({ data }) => {
      this._session = data.session;
    });
    return this._session;
  }

  get sessionAsync() {
    return this.supabase.auth.getSession();
  }

  get session$() {
    return from(this.supabase.auth.getSession()).pipe(
      filter((x) => !x.error),
      map((x) => x.data.session),
    );
  }

  profile(user: User) {
    return this.supabase
      .from('profiles')
      .select(`username, website, avatar_url`)
      .eq('id', user.id)
      .single();
  }

  tasks(userId: UserId) {
    return this.supabase
      .from('tasks')
      .select(`id, name, date, description`)
      .eq('user_id', userId);
  }

  authChanges(
    callback: (event: AuthChangeEvent, session: Session | null) => void,
  ) {
    return this.supabase.auth.onAuthStateChange(callback);
  }

  signIn(email: string) {
    return this.supabase.auth.signInWithOtp({ email });
  }

  signOut() {
    return this.supabase.auth.signOut();
  }

  getTask(taskId: TaskId) {
    return this.supabase.from('tasks').select().eq('id', taskId).single();
  }

  addTask(task: TablesInsert<'tasks'>) {
    return this.supabase.from('tasks').insert(task);
  }

  updateTask(taskId: TaskId, task: TablesUpdate<'tasks'>) {
    return this.supabase
      .from('tasks')
      .update({
        ...task,
        id: task.id as TaskId,
        updated_at: new Date().toISOString(),
      })
      .eq('id', taskId);
  }

  deleteTask(id: TaskId) {
    return this.supabase.from('tasks').delete().eq('id', id);
  }
}
