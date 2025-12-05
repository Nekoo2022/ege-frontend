import { AnyTask } from "../types/task";

interface TaskItemExplanationProps {
  isCorrect: "full" | "partial" | "wrong" | "no-correct" | undefined;
  images?: (string | undefined)[];
  task: AnyTask;
}

export function TaskItemExplanation({ isCorrect, images, task }: TaskItemExplanationProps) {
  console.log(task.explanation, isCorrect);
  if (!task.explanation || isCorrect === undefined) return null;

  const regex = /\[expimg:[^\]]+\]/g;
  const parts = task.explanation.split(regex);
  const matches = task.explanation.match(regex) || [];

  let imgIndex = 0;

  // console.log(parts, "parts");
  // console.log(correctAnswer);

  console.log(parts);
  console.log("sec");

  return (
    <>
      <p>
        {task.correctAnswer?.length !== 0 && "Правильный ответ: "}
        {task.correctAnswer?.map((value, idx) => (
          <span key={idx}>
            {value}
            {idx < task.correctAnswer.length - 1 ? ", " : ""}
          </span>
        ))}
      </p>
      {parts.map((part, i) => (
        <div key={i} className="mb-3">
          {part &&
            part.split("\n").map((line, idx) => (
              <span key={idx}>
                {line}
                <br />
              </span>
            ))}
          {matches[i] && images?.[imgIndex] && (
            <img className="my-4 mx-auto max-w-120 dark:invert" src={images[imgIndex++]} alt="" />
          )}
        </div>
      ))}
    </>
  );
}
