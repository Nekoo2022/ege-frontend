import { useGetImageUrlQuery } from "@/graphql/generated/output";
import { useMemo } from "react";
import { AnyTask, TextTask } from "../../types/task";
import { showAnswerTasks, textParsers } from "../../utils/TasksParser";
import GenericTableRenderer from "../GenericTableRenderer";
import { TaskItemForm } from "../../TaskItem/TaskItemForm";
import { TaskItemHeader } from "../../utils/TaskItemHeader";
import { TextWithImages } from "../physic/TextWithImage";
import { TaskItemExplanation } from "../../utils/TaskItemExplanation";
import MathContent from "@/utils/math-content";

interface TaskItemProps {
  task: AnyTask;
  isCorrect: "full" | "partial" | "wrong" | "no-correct" | undefined;
  setIsCorrect: (isCorrect: "full" | "partial" | "wrong" | "no-correct") => void;
  slug: string;
  taskIndex: number;
}

export function ParseMath({ task, isCorrect, setIsCorrect, slug, taskIndex }: TaskItemProps) {
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

  const key = `${slug}-${task.taskNumber}`;
  const SpecificParser = textParsers[key];

  if (SpecificParser && task.type === "text") {
    return (
      <SpecificParser
        task={task as TextTask}
        taskIndex={taskIndex}
        slug={slug}
        isCorrect={isCorrect}
        setIsCorrect={setIsCorrect}
      />
    );
  }

  // Для показа правильного ответа
  const showAnswer = showAnswerTasks[slug]?.includes(task.taskNumber);

  console.log(slug === "informatics" && isCorrect !== undefined && showAnswer);

  return (
    <div className="mb-8 rounded-2xl border border-border bg-card shadow-sm p-6 md:p-8">
      <TaskItemHeader isCorrect={isCorrect} taskIndex={taskIndex} taskNumber={task.taskNumber} />

      <div className="text-base md:text-lg font-semibold mb-5">
        <MathContent math={question} />
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

      {data?.GetImageUrl.globalImageUrls[0] ? (
        <img className="mx-auto max-w-120 dark:invert" src={data?.GetImageUrl.globalImageUrls[0]} alt="no-image" />
      ) : null}

      <TaskItemForm task={task} setIsCorrect={setIsCorrect} isCorrect={isCorrect} slug={slug} />

      {showAnswer ? (
        <>
          <p className="mb-2">
            {task.correctAnswer?.length !== 0 && "Правильный ответ: "}
            {task.correctAnswer?.map((value, idx) => (
              <span key={idx}>
                {value}
                {idx < task.correctAnswer.length - 1 ? ", " : ""}
              </span>
            ))}
          </p>
          <pre className="mb-2 block font-mono overflow-auto wrap-break-word whitespace-pre-wrap">
            {task.explanation}
          </pre>
        </>
      ) : (
        <TaskItemExplanation
          task={task}
          isCorrect={isCorrect}
          images={task.explanationImages?.map((key) => urls[key])}
        />
      )}
    </div>
  );
}
