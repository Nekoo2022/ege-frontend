import { useFindRandomQuestionsQuery, useFindTaskCountQuery } from "@/graphql/generated/output";
import type { EngAudioTask, TaskTypeString, TextTask } from "../types/task";
import type { TasksDataStrategy } from "../types/strategy";

export function createRandomTasksStrategy(slug: string, taskNumber: number): TasksDataStrategy {
  return {
    useTotal() {
      const { data, loading, error } = useFindTaskCountQuery({ variables: { data: { slug, taskNumber } } });
      return { total: data?.FindTaskCount || 0, loading, error };
    },
    useList({ skip, take }) {
      const { data, loading, error, refetch } = useFindRandomQuestionsQuery({
        variables: { data: { taskNumber, slug, take, skip } },
      });
      console.log(data?.FindRandomQuestions.length);
      return { taskList: data?.FindRandomQuestions || [], loading, error, refetch };
    },
    mapToQuestion(raw: any, taskNum: number): TextTask | EngAudioTask {
      const t = raw;
      const subjectName = t.subjectName ?? "";
      console.log(t);

      if (t.type === "audio-matching") {
        return {
          id: t.id,
          taskNumber: taskNum,
          type: "audio-matching",
          subjectName, // ✅ обязательно
          intro: t.intro ?? "",
          text: t.intro ?? "",
          question: t.question || "",
          explanation: t.explanation ?? "",
          correctAnswer: t.correctAnswer ?? [],
          audioPath: t.audioPath ?? null,
          speakers: t.speakers ?? [],
          statements: t.statements ?? [],
          tableSpec: t.tableSpec ?? null,
          subQuestions: t.subQuestions ?? [],
          images: t.images ?? [],
          explanationImages: t.explanationImages ?? [],
          globalImages: t.globalImages ?? [],
          hasCorrectAnswer: t.hasCorrectAnswer ?? true,
        };
      }

      return {
        id: t.id,
        taskNumber: taskNum,
        type: "text",
        subjectName, // ✅ обязательно
        text: t.text ?? "",
        question: t.question ?? "",
        explanation: t.explanation ?? "",
        correctAnswer: t.correctAnswer ?? [],
        statements: t.statements ?? [],
        tableSpec: t.tableSpec ?? null,
        intro: t.intro ?? "",
        subQuestions: t.subQuestions ?? [],
        images: t.images ?? [],
        explanationImages: t.explanationImages ?? [],
        globalImages: t.globalImages ?? [],
        hasCorrectAnswer: t.hasCorrectAnswer ?? true,
      };
    },
    mapToTaskItem(raw: any): TextTask | EngAudioTask {
      const t = raw;
      const taskNumber = t.task?.taskNumber ?? 0;
      const subjectName = t.subjectName ?? "";

      if (t.type === "audio-matching") {
        return {
          id: t.id,
          taskNumber,
          type: "audio-matching",
          subjectName, // ✅ добавляем обязательное поле
          intro: t.intro ?? "",
          text: t.text ?? "",
          question: t.question || "",
          explanation: t.explanation ?? null,
          correctAnswer: t.correctAnswer ?? [],
          audioPath: t.audioPath ?? null,
          speakers: t.speakers ?? [],
          statements: t.statements ?? [],
          tableSpec: t.tableSpec ?? null,
          subQuestions: t.subQuestions ?? [],
          images: t.images ?? [],
          explanationImages: t.explanationImages ?? [],
          globalImages: t.globalImages ?? [],
          hasCorrectAnswer: t.hasCorrectAnswer ?? true,
        };
      }

      return {
        id: t.id,
        taskNumber,
        type: "text",
        subjectName, // ✅ добавляем обязательное поле
        text: t.text ?? "",
        question: t.question ?? "",
        explanation: t.explanation ?? null,
        correctAnswer: t.correctAnswer ?? [],
        statements: t.statements ?? [],
        tableSpec: t.tableSpec ?? null,
        intro: t.intro ?? "",
        subQuestions: t.subQuestions ?? [],
        images: t.images ?? [],
        explanationImages: t.explanationImages ?? [],
        globalImages: t.globalImages ?? [],
        hasCorrectAnswer: t.hasCorrectAnswer ?? true,
      };
    },
  };
}
