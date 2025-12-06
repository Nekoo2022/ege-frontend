import { useState } from "react";
import { VariantItemForm } from "./VariantItemForm";
import { ParseRus8 } from "../task/lib/parse-rus-8";

interface VariantItemProps {
  id: string;
  text?: string | null;
  question?: string | null;
  experience?: number | null;
  correctAnswer?: string[] | null;
  task: {
    taskNumber: number;
  };
  explanation?: string | null;
  slug: string;
}

// Теперь используем совместимый тип с ParseRus8
type IsCorrectType = "full" | "partial" | "wrong" | "no-correct" | undefined;

export function VariantItem({
  question,
  id,
  explanation,
  task,
  text,
  correctAnswer,
  slug,
  experience,
}: VariantItemProps) {
  const [isCorrect, setIsCorrect] = useState<IsCorrectType>(undefined);

  if (task.taskNumber === 8 && slug === "russian") {
    const parseTask = {
      id,
      text: text ?? "",
      question: question ?? "",
      explanation: explanation ?? null,
      taskNumber: task.taskNumber,
      correctAnswer: correctAnswer ?? [],
      type: "text" as const,
      subjectName: "",
      intro: "",
      statements: [],
      subQuestions: [],
      images: [],
      explanationImages: [],
      globalImages: [],
      hasCorrectAnswer: !!(correctAnswer && correctAnswer.length),
      experience: experience ?? 0,
    };

    return (
      <ParseRus8
        task={parseTask}
        taskIndex={task.taskNumber}
        slug={slug}
        isCorrect={isCorrect}
        setIsCorrect={setIsCorrect}
      />
    );
  }

  const renderLines = (text: string = "", className?: string) =>
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
      <h3
        className={`text-xl md:text-2xl font-semibold pb-4 ${
          isCorrect === "full" ? "text-green-600" : isCorrect === "wrong" ? "text-red-600" : "text-foreground"
        }`}
      >
        Задание № {task.taskNumber}
      </h3>
      <div className="mb-5 text-foreground md:text-lg leading-relaxed space-y-2">
        {renderLines(text ?? "", "mb-2 block")}
      </div>
      <div className="text-base md:text-lg font-semibold bg-muted border border-border rounded-lg p-4">
        {renderLines(question ?? "", "mb-2 leading-relaxed")}
      </div>
      <VariantItemForm questionId={id} setIsCorrect={setIsCorrect} isCorrect={isCorrect} slug={slug} />
      {isCorrect !== undefined && (
        <>
          <p className="mt-4">
            Правильный ответ:{" "}
            {(() => {
              const answers = correctAnswer ?? [];
              return answers.map((answer, idx) => (
                <span key={idx}>
                  {answer}
                  {answers.length !== idx + 1 && ", "}
                </span>
              ));
            })()}
          </p>
          {explanation?.split("\n").map((part, index) => (
            <p
              key={index}
              className={`text-base md:text-lg leading-relaxed mt-4 p-4 rounded-lg border ${
                isCorrect === "full"
                  ? "bg-green-500/10 border-green-500/20 text-green-700 dark:text-green-300"
                  : "bg-red-500/10 border-red-500/20 text-red-700 dark:text-red-300"
              }`}
            >
              {part}
            </p>
          ))}
        </>
      )}
    </div>
  );
}
