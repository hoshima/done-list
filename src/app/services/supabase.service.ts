import { Injectable, signal } from '@angular/core';
import {
  AuthSession,
  createClient,
  SignInWithPasswordCredentials,
  SupabaseClient,
  User,
} from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { Database, TablesInsert, TablesUpdate } from '../types/database.types';
import { TaskId } from '../types/branded.type';
import { Task } from '../types/task.type';

export type CredentialResponse = {
  credential: string;
  select_by: string;
  state?: string;
};

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  #supabase: SupabaseClient<Database>;

  sessionSignal = signal<AuthSession | null>(null);
  tasksSignal = signal<Task[] | null>(null);

  constructor() {
    this.#supabase = createClient(
      environment.supabase.supabaseUrl,
      environment.supabase.supabaseKey,
    );

    // ログイン情報購読
    this.#supabase.auth.onAuthStateChange((event, session) => {
      this.sessionSignal.set(session);
    });

    // task情報購読
    this.#supabase
      .channel('tasks_edited')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'tasks' },
        async () => {
          const session = this.sessionSignal();
          if (!session) {
            return;
          }

          await this.fetchTasks();
        },
      )
      .subscribe();
  }

  async getSession() {
    const session = await this.#supabase.auth.getSession();

    this.sessionSignal.set(session.data.session);

    return session.data.session;
  }

  profile(user: User) {
    return this.#supabase
      .from('profiles')
      .select(`username, website, avatar_url`)
      .eq('id', user.id)
      .single();
  }

  async fetchTasks(keyword?: string) {
    const session = this.sessionSignal();
    if (!session?.user.id) {
      return;
    }

    const q = this.#supabase
      .from('tasks')
      .select(`id, name, date, description`)
      .eq('user_id', session.user.id)
      .order('date', { ascending: false })
      .order('name', { ascending: true });

    if (keyword) {
      void q.like('name', `%${keyword}%`);
    }

    const { data } = await q;

    this.tasksSignal.set(data);

    return data;
  }

  signUp(credentials: { email: string; password: string }) {
    return this.#supabase.auth.signUp(credentials);
  }

  signIn(credentials: SignInWithPasswordCredentials) {
    return this.#supabase.auth.signInWithPassword(credentials);
  }

  async signInWithGoogle(response: CredentialResponse) {
    return this.#supabase.auth.signInWithIdToken({
      provider: 'google',
      token: response.credential,
    });
  }

  signOut() {
    return this.#supabase.auth.signOut();
  }

  getTask(taskId: TaskId) {
    return this.#supabase.from('tasks').select().eq('id', taskId).single();
  }

  addTask(task: TablesInsert<'tasks'>) {
    return this.#supabase.from('tasks').insert(task);
  }

  updateTask(taskId: TaskId, task: TablesUpdate<'tasks'>) {
    return this.#supabase
      .from('tasks')
      .update({
        ...task,
        id: task.id as TaskId,
        updated_at: new Date().toISOString(),
      })
      .eq('id', taskId);
  }

  deleteTask(id: TaskId) {
    return this.#supabase.from('tasks').delete().eq('id', id);
  }
}
