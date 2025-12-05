import { ParseEng38 } from "../lib/eng/parse-eng-38";
import { ParseRus8 } from "../lib/parse-rus-8";
import { ParsePhysic1 } from "../lib/physic/parse-physic-1";
import { SocialStudies21 } from "../lib/social-studies/social-studies-21";
import { SocialStudiesItem } from "../lib/social-studies/SocialStudiesItem";

import type { TextTask } from "../types/task";

interface TextParsersProps {
  task: TextTask;
  isCorrect: "full" | "partial" | "wrong" | "no-correct" | undefined;
  setIsCorrect: (isCorrect: "full" | "partial" | "wrong" | "no-correct") => void;
  slug: string;
  taskIndex: number;
}

// Маппинг специфичных задач по slug и номеру задачи
export const textParsers: Record<string, React.ComponentType<TextParsersProps>> = {
  "russian-8": ParseRus8,
  "english-38": ParseEng38,
  "physics-1": ParsePhysic1,
  "physics-2": ParsePhysic1,
  "social-3": SocialStudiesItem,
  "social-6": SocialStudiesItem,
  "social-13": SocialStudiesItem,
  "social-studies-21": SocialStudies21,
};

// Массив заданий для показа правильного ответа и объяснения
export const showAnswerTasks: Record<string, number[]> = {
  informatics: [5, 6, 8, 12, 14, 15, 16, 17, 20, 21, 23, 24, 25, 26],
};
