import { Todo } from "@/app/types";
import { TodoItem } from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
  deleteTodoAction: (id: string) => void;
  updateTodoAction: (
    id: string,
    title: string,
    description: string,
    now: string,
  ) => void;
  updateCompletedAction: (id: string, checked: boolean) => void;
}

export function TodoList({
  todos,
  deleteTodoAction,
  updateTodoAction,
  updateCompletedAction,
}: TodoListProps) {
  return (
    <ol className="w-full ">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          deleteTodoAction={deleteTodoAction}
          updateTodoAction={updateTodoAction}
          updateCompletedAction={updateCompletedAction}
          todo={todo}
        />
      ))}
    </ol>
  );
}
