"use client";
import { useState, useEffect } from "react";
import { type Todo } from "./types";
import { CreateTodo } from "../../Components/CreateTodo";
import { TodoList } from "../../Components/TodoList";

const LOCAL_STORAGE_KEY = "todos";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const storedTodos = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedTodos) {
      try {
        setTodos(JSON.parse(storedTodos));
      } catch (error) {
        console.error("Error parsing stored todos:", error);
      }
    }
  }, []);

  const updateTodosAndStorage = (newTodos: Todo[]) => {
    setTodos(newTodos);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTodos));
  };

  function handleNewTodo({
    id,
    title,
    description,
    completed,
    created_at,
    updated_at,
  }: Todo) {
    updateTodosAndStorage([
      ...todos,
      {
        id,
        title,
        description,
        created_at,
        updated_at,
        completed,
      },
    ]);
  }

  function deleteTodo(id: string) {
    const newTodos = todos.filter((todo) => todo.id !== id);
    updateTodosAndStorage(newTodos);
  }

  function editTodo(
    id: string,
    title: string,
    description: string,
    now: string,
  ) {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          title,
          description,
          updated_at: new Date(now),
        };
      }
      return todo;
    });
    updateTodosAndStorage(newTodos);
  }

  function editCheckedStatus(id: string, checked: boolean) {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: checked,
        };
      }
      return todo;
    });
    updateTodosAndStorage(newTodos);
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1>Your friendly reminder todo list, get it done, now!</h1>
        <CreateTodo handleNewTodoAction={handleNewTodo} />
        <TodoList
          todos={todos}
          deleteTodoAction={deleteTodo}
          updateTodoAction={editTodo}
          updateCompletedAction={editCheckedStatus}
        />
      </main>
    </div>
  );
}
