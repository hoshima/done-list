export type Task = {
  uid: string;
  id: string;
  name: string;
  date: string;
  description: string;
};
export type TaskCreate = Omit<Task, 'id'>;
