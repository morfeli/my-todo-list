export type Todo = {
  id: string;
  title: string;
  description: string;
  created_at: Date;
  updated_at: Date | null;
  completed: boolean;
};
