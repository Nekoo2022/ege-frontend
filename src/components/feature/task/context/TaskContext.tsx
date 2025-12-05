import { createContext, useContext } from "react";
import { TaskContextType } from "../types/context";

export const TaskContext = createContext<TaskContextType | null>(null);

export function useTaskContext() {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTaskContext must be used inside <TaskProvider>");
  return context;
}
