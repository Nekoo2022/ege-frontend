import { EngAudioTask, TextTask } from "./task";

export interface TasksDataStrategy {
  useTotal: (taskNumber?: number) => { total: number; loading: boolean; error?: unknown };
  useList: (p: { skip: number; take: number; taskNumber?: number }) => {
    taskList: unknown[];
    loading: boolean;
    error?: unknown;
    refetch: (vars?: any) => Promise<any> | any;
  };
  mapToQuestion: (raw: unknown, taskNumber: number) => TextTask | EngAudioTask;
  mapToTaskItem: (raw: unknown) => TextTask | EngAudioTask; // <-- вместо TaskKind
}
