"use client";

import { useState } from "react";
import { type Todo } from "@/app/types";
import { format } from "date-fns";

import { Pencil, Trash2, Save, X } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./Shadcn/Card";
import { Input } from "./Shadcn/Input";
import { Checkbox } from "./Shadcn/Checkbox";
import { Button } from "./Shadcn/Button";
import { Textarea } from "./Shadcn/Textarea";
import { Badge } from "./Shadcn/Badge";

type TodoItemProps = {
  todo: Todo;
  deleteTodoAction: (id: string) => void;
  updateTodoAction: (
    id: string,
    title: string,
    description: string,
    now: string,
  ) => void;
  updateCompletedAction: (id: string, completed: boolean) => void;
};

export function TodoItem({
  todo,
  deleteTodoAction,
  updateTodoAction,
  updateCompletedAction,
}: TodoItemProps) {
  const { id, title, description, created_at, updated_at, completed } = todo;
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);
  const [showCompletedSave, setShowCompletedSave] = useState(false);

  const handleGoBack = () => {
    setEditedTitle(title);
    setEditedDescription(description);
    setIsEditing(false);
  };

  const handleCompletedChange = (checked: boolean) => {
    updateCompletedAction(id, checked);
    setShowCompletedSave(true);
  };
  const handleSave = () => {
    const now = new Date().toISOString();
    updateTodoAction(id, editedTitle, editedDescription, now);
    setIsEditing(false);
  };

  return (
    <li className="mb-4 fade-in" id={id}>
      <Card
        className={`overflow-hidden transition-all duration-300 ${completed ? "bg-gray-800" : "bg-black"}`}
      >
        <CardHeader className="p-4">
          <div className="flex items-center justify-between">
            {isEditing ? (
              <Input
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className={`text-xl font-bold ${completed ? "text-gray-400" : "text-white"} bg-gray-700 w-[300px]`}
              />
            ) : (
              <CardTitle
                className={`text-xl font-bold ${completed ? "text-gray-400" : "text-white"} truncate`}
              >
                {title}
              </CardTitle>
            )}
            <div className="flex items-center space-x-1">
              <Checkbox
                checked={completed}
                onCheckedChange={handleCompletedChange}
                className="h-6 w-6 border-2 border-white rounded-md text-white"
              />
              {showCompletedSave && (
                <Button
                  size="icon"
                  onClick={() => setShowCompletedSave(false)}
                  className="text-white"
                >
                  <Save className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          {isEditing ? (
            <Textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className={`text-sm ${completed ? "text-gray-400" : "text-white"} bg-gray-700`}
              rows={3}
            />
          ) : (
            <CardDescription
              className={`text-sm ${completed ? "text-gray-500" : "text-gray-300 dark:text-gray-400"}`}
            >
              {description}
            </CardDescription>
          )}
        </CardContent>
        <CardFooter className="p-4 flex justify-between items-center">
          <div className="flex space-x-2">
            <Badge
              variant="secondary"
              className={`text-xs ${completed ? "text-gray-400" : "text-white"}`}
            >
              Created: {format(new Date(created_at), "MMM d, yyyy")}
            </Badge>
            {updated_at && (
              <Badge
                variant="outline"
                className={`text-xs ${completed ? "text-gray-400" : "text-white"}`}
              >
                Updated: {format(new Date(updated_at), "MMM d, yyyy")}
              </Badge>
            )}
          </div>
          <div className="flex space-x-1 text-white">
            {isEditing ? (
              <>
                <Button size="icon" onClick={handleSave}>
                  <Save className="h-4 w-4" />
                </Button>
                <Button size="icon" onClick={handleGoBack}>
                  <X className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <Button size="icon" onClick={() => setIsEditing(true)}>
                <Pencil className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="destructive"
              size="icon"
              onClick={() => deleteTodoAction(id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </li>
  );
}
