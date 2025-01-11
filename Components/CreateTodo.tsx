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
  };

  return (
    <div className="flex  space-x-2 mb-4">
      <div className="flex space-x-2">
        <Input
          type="text"
          placeholder="Enter a new todo"
          name="title"
          onChange={(e) =>
            setNewTodo((curr) => ({
              title: e.target.value,
              description: curr.description,
            }))
          }
        />
        <Input
          type="text"
          placeholder="Enter a description"
          name="description"
          onChange={(e) =>
            setNewTodo((curr) => ({
              title: curr.title,
              description: e.target.value,
            }))
          }
        />
      </div>

      <Button
        className="bg-blue-500 px-10 rounded-lg hover:bg-blue-600"
        onClick={postNewTodo}
      >
        Add
      </Button>
    </div>
  );
}
