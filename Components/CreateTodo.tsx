"use client";

import { useState } from "react";
import { Input } from "./Shadcn/Input";
import { Button } from "./Shadcn/Button";
import { Todo } from "@/app/types";

type CreateTodoProps = {
  handleNewTodoAction: (input: Todo) => void;
};

export function CreateTodo({ handleNewTodoAction }: CreateTodoProps) {
  const [newTodo, setNewTodo] = useState<{
    title: string;
    description: string;
  }>({
    title: "",
    description: "",
  });

  const postNewTodo = async () => {
    const response = await fetch("/api/verify-todo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTodo),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: Todo = await response.json();
    handleNewTodoAction(data);
    setNewTodo({ title: "", description: "" }); // Reset form after submission
  };

  return (
    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full max-w-[350px] sm:max-w-none mx-auto">
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 flex-grow">
        <Input
          type="text"
          placeholder="Enter a new todo"
          name="title"
          value={newTodo.title}
          onChange={(e) =>
            setNewTodo((curr) => ({
              ...curr,
              title: e.target.value,
            }))
          }
          className="w-full"
        />
        <Input
          type="text"
          placeholder="Enter a description"
          name="description"
          value={newTodo.description}
          onChange={(e) =>
            setNewTodo((curr) => ({
              ...curr,
              description: e.target.value,
            }))
          }
          className="w-full"
        />
      </div>
      <Button
        className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        onClick={postNewTodo}
      >
        Add Todo
      </Button>
    </div>
  );
}
