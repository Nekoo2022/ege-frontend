import { useState } from "react";
import { VariantItemForm } from "./VariantItemForm";
import { ParseRus8 } from "../task/lib/parse-rus-8";

interface VariantItemProps {
  id: string;
  text: string;
  question: string;
  experience: number;
  correctAnswer: string[];
  task: {
    taskNumber: number;
  };
  explanation?: string | null;
  slug: string;
}

export function VariantItem({ question, id, explanation, task, text, correctAnswer, slug }: VariantItemProps) {
  const [isCorrect, setIsCorrect] = useState<boolean | undefined>();

  if (task.taskNumber === 8 && slug === "russian") {
    return (
      <ParseRus8
        task={{ taskNumber: task.taskNumber, text, correctAnswer, explanation, id, question }}
        taskIndex={task.taskNumber}
        slug={slug}
        isCorrect={isCorrect}
        setIsCorrect={setIsCorrect}
      />
    );
  }

  //   Для остальных заданий
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
      <h3
        className={`text-xl md:text-2xl font-semibold pb-4 ${
          isCorrect === true ? "text-green-600" : isCorrect === false ? "text-red-600" : "text-foreground"
        }`}
      >
        Задание № {task.taskNumber}
      </h3>
      <div className="mb-5 text-foreground md:text-lg leading-relaxed space-y-2">
        {renderLines(text, "mb-2 block")}
      </div>
      <div className="text-base md:text-lg font-semibold bg-muted border border-border rounded-lg p-4">
        {renderLines(question, "mb-2 leading-relaxed")}
      </div>
      <VariantItemForm questionId={id} setIsCorrect={setIsCorrect} isCorrect={isCorrect} slug={slug} />
      {isCorrect !== undefined && (
        <>
          <p className="mt-4">
            Правильный ответ:{" "}
            {correctAnswer.map((answer, idx) => (
              <span key={idx}>
                {answer}
                {correctAnswer.length !== idx + 1 && ", "}
              </span>
            ))}
          </p>
          {explanation?.split("\n").map((part, index) => (
            <p
              key={index}
              className={`text-base md:text-lg leading-relaxed mt-4 p-4 rounded-lg border ${
                isCorrect === true
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
