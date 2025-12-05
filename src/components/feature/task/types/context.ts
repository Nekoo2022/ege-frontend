import { EngAudioTask, TextTask } from "./task";

export type AnswerStatus = "full" | "partial" | "wrong" | "no-correct" | undefined;

export interface TaskContextType {
  skip: number;
  totalTasks: number;
  taskList: (TextTask | EngAudioTask)[];
  answers: Record<string, AnswerStatus>;
  handlePrev: () => void;
  handleNext: () => void;
  slug: string;
  setAnswers: React.Dispatch<React.SetStateAction<Record<string, AnswerStatus>>>;
  taskNumber?: number;
  resetVersion: number;
  resetAnswers: () => void;
  isPracticeMode?: boolean;
}
