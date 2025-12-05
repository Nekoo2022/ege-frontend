export type TableCellSpec =
  | { kind: "label"; text: string }
  | { kind: "option"; text?: string }
  | { kind: "empty" };

export interface TableSpec {
  columns: number;
  headerRows: string[][];
  bodyRows: { cells: TableCellSpec[] }[];
}

export interface RowEng38 {
  key: string;
  value: string;
}

export interface TableSpecEng38 {
  columns: string[];
  rows: RowEng38[];
}

export interface SubQuesionEng38 {
  title: string;
  questionText: string;
  plan: string[];
  tableSpec?: TableSpecEng38;
}

export type TaskTypeString = "text" | "audio-matching" | "table" | "multiple-choice" | "custom";

export interface BaseTask {
  id: string;
  subjectName: string;
  taskNumber: number;
  type: TaskTypeString;
  question?: string;
  explanation?: string | null;
  experience?: number;
  correctAnswer: string[];
  intro: string;
  statements: string[];
  tableSpec?: TableSpec;
  text?: string;
  subQuestions: SubQuesionEng38[];
  images: string[];
  explanationImages: string[];
  globalImages: string[];
  hasCorrectAnswer: boolean;
}

export interface EngAudioTask extends BaseTask {
  audioPath?: string;
  speakers: string[];
  type: "audio-matching";
}

export type AnyTask = BaseTask | TextTask | EngAudioTask;

export interface TextTask extends BaseTask {
  type: "text";
  text: string;
}
