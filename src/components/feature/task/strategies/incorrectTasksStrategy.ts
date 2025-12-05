import {
  QuestionModel,
  useFindIncorrectQuestionsByTaskNumberQuery,
  useFindIncorrectQuestionsQuery,
} from "@/graphql/generated/output";
import type { TasksDataStrategy } from "../types/strategy";
import { EngAudioTask, TextTask } from "../types/task";

export function createIncorrectTasksStrategy(slug: string): TasksDataStrategy {
  return {
    useTotal(taskNumber) {
      if (taskNumber) {
        const { data, loading, error } = useFindIncorrectQuestionsByTaskNumberQuery({
          variables: { data: { slug, taskNumber } },
        });
        const total = data?.FindIncorrectQuestionsByTaskNumber?.length || 0;
        return { total, loading, error };
      }
      const { data, loading, error } = useFindIncorrectQuestionsQuery({ variables: { data: { slug } } });
      const total = data?.FindIncorrectQuestions?.length || 0;
      return { total, loading, error };
    },
    useList({ skip, take, taskNumber }) {
      if (taskNumber) {
        const { data, loading, error, refetch } = useFindIncorrectQuestionsByTaskNumberQuery({
          variables: { data: { slug, taskNumber } },
        });
        const all = data?.FindIncorrectQuestionsByTaskNumber ?? [];
        const sliced = all.slice(skip, skip + take);
        return { taskList: sliced, loading, error, refetch: async () => refetch };
      }
      const { data, loading, error, refetch } = useFindIncorrectQuestionsQuery({
        variables: { data: { slug } },
      });
      const all = data?.FindIncorrectQuestions ?? [];
      const sliced = all.slice(skip, skip + take);
      return { taskList: sliced, loading, error, refetch: async () => refetch };
    },
    mapToQuestion(raw: any, taskNumber): TextTask | EngAudioTask {
      // raw может быть либо самим question либо обёрткой (как у тебя в других стратегиях)
      const src = raw.question ?? raw;
      const type = src.type ?? "text";
      const subjectName = src.subjectName ?? raw.subjectName ?? "";

      if (type === "audio-matching") {
        return {
          id: src.id,
          taskNumber,
          type: "audio-matching",
          subjectName,
          intro: src.intro ?? "",
          text: src.intro ?? "",
          question: src.question ?? "",
          explanation: src.explanation ?? null,
          correctAnswer: src.correctAnswer ?? [],
          audioPath: src.audioPath ?? null,
          speakers: src.speakers ?? [],
          statements: src.statements ?? [],
          tableSpec: src.tableSpec ?? null,
        } as EngAudioTask;
      }

      return {
        id: src.id,
        taskNumber,
        type: "text",
        subjectName,
        text: src.text ?? "",
        question: src.question ?? "",
        explanation: src.explanation ?? null,
        correctAnswer: src.correctAnswer ?? [],
      } as TextTask;
    },
    mapToTaskItem(raw: any): TextTask | EngAudioTask {
      // raw тут, судя по твоему коду, - обёртка с полем question
      const q = raw.question ?? raw;
      const type = q.type ?? "text";
      const subjectName = q.subjectName ?? raw.subjectName ?? "";

      if (type === "audio-matching") {
        return {
          id: q.id,
          taskNumber: Number(q.taskNumber ?? 0),
          type: "audio-matching",
          subjectName,
          intro: q.intro ?? "",
          text: q.intro ?? "",
          question: "",
          explanation: q.explanation ?? null,
          correctAnswer: q.correctAnswer ?? [],
          audioPath: q.audioPath ?? null,
          speakers: q.speakers ?? [],
          statements: q.statements ?? [],
          tableSpec: q.tableSpec ?? null,
        } as EngAudioTask;
      }

      return {
        id: q.id,
        taskNumber: Number(q.taskNumber ?? 0),
        type: "text",
        subjectName,
        text: q.text ?? "",
        question: q.question ?? "",
        explanation: q.explanation ?? null,
        correctAnswer: q.correctAnswer ?? [],
      } as TextTask;
    },
  };
}
