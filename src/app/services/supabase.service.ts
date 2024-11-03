import { Injectable } from '@angular/core';
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
import { ListItem, ListItemCreate } from '../types/list-item.type';
import { TaskId, UserId } from '../types/branded.type';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;
  _session: AuthSession | null = null;

  constructor() {
    this.supabase = createClient(
      environment.supabase.supabaseUrl,
      environment.supabase.supabaseKey,
    );
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

  addTask(userId: UserId, task: ListItemCreate) {
    return this.supabase.from('tasks').insert(task);
  }

  updateTask(taskId: TaskId, task: ListItem) {
    return this.supabase
      .from('tasks')
      .update({ ...task, updated_at: new Date() })
      .eq('id', taskId);
  }

  deleteTask(id: TaskId) {
    return this.supabase.from('tasks').delete().eq('id', id);
  }
}
