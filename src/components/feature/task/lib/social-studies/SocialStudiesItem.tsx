import type { BaseTask, TextTask, EngAudioTask } from "../../types/task";
import GenericTableRenderer from "../GenericTableRenderer";
import { useGetImageUrlQuery } from "@/graphql/generated/output";
import { TaskItemHeader } from "../../utils/TaskItemHeader";
import { TaskItemExplanation } from "../../utils/TaskItemExplanation";
import { useMemo } from "react";
import { TaskItemForm } from "../../TaskItem/TaskItemForm";

type AnyTask = BaseTask | TextTask | EngAudioTask;

interface SocialStudiesItemProps {
  task: AnyTask;
  isCorrect: "full" | "partial" | "wrong" | "no-correct" | undefined;
  setIsCorrect: (isCorrect: "full" | "partial" | "wrong" | "no-correct") => void;
  slug: string;
  taskIndex: number;
  taskNumber?: number;
}

export function SocialStudiesItem({
  task,
  isCorrect,
  setIsCorrect,
  slug,
  taskIndex,
  taskNumber,
}: SocialStudiesItemProps) {
  const { data } = useGetImageUrlQuery({
    variables: {
      data: {
        imagesKeys: task.images!,
        explanationKeys: task.explanationImages!,
        globalImages: task.globalImages,
      },
    },
  });

  const urls = useMemo(() => {
    const map: Record<string, string> = {};

    data?.GetImageUrl?.imageUrls.forEach((url, i) => {
      map[task.images![i]] = url;
    });

    data?.GetImageUrl?.explanationImageUrls.forEach((url, i) => {
      map[task.explanationImages![i]] = url;
    });

    return map;
  }, [data, task.images, task.explanationImages]);

  console.log("task type", task.type);
  console.log(task);

  const text = task.text ?? "";
  const question = task.question ?? "";

  const renderLines = (text: string, className: string) =>
    text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .map((line, idx) => (
        <p key={idx} className={className}>
          {line}
        </p>
      ));

  return (
    <div className="mb-8 rounded-2xl border border-border bg-card shadow-sm p-6 md:p-8">
      <TaskItemHeader isCorrect={isCorrect} taskIndex={taskIndex} taskNumber={task.taskNumber} />

      <div className="text-base md:text-lg font-semibold mb-5">
        {renderLines(question, "mb-2 leading-relaxed")}
      </div>

      {task.statements && (
        <div className="space-y-4">
          <ul className="pl-5 space-y-2 mb-5">
            {task.statements.map((s, i) => (
              <li key={i} className="mb-1">
                {s}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mb-5 text-foreground md:text-lg leading-relaxed space-y-2">
        {renderLines(text, "mb-2 block")}
      </div>

      {task.tableSpec && <GenericTableRenderer spec={task.tableSpec} />}

      <p className="mb-5">Запишите в ответ цифры, расположив их в порядке, соответствующем буквам:</p>

      <table className="mx-auto">
        <thead>
          <tr>
            <th className="border border-accent-foreground px-5 py-3">А</th>
            <th className="border border-accent-foreground px-5 py-3">Б</th>
            <th className="border border-accent-foreground px-5 py-3">В</th>
            <th className="border border-accent-foreground px-5 py-3">Г</th>
            <th className="border border-accent-foreground px-5 py-3">Д</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th className="border border-accent-foreground px-5 py-5"></th>
            <th className="border border-accent-foreground px-5 py-5"></th>
            <th className="border border-accent-foreground px-5 py-5"></th>
            <th className="border border-accent-foreground px-5 py-5"></th>
            <th className="border border-accent-foreground px-5 py-5"></th>
          </tr>
        </tbody>
      </table>

      {data?.GetImageUrl.globalImageUrls[0] ? (
        <img className="mx-auto" src={data?.GetImageUrl.globalImageUrls[0]} alt="no-image" />
      ) : null}

      <TaskItemForm questionId={task.id} setIsCorrect={setIsCorrect} isCorrect={isCorrect} slug={slug} />

      <TaskItemExplanation
        correctAnswer={task.correctAnswer}
        isCorrect={isCorrect}
        explanation={task.explanation}
        images={task.explanationImages?.map((key) => urls[key])}
      />
    </div>
  );
}
