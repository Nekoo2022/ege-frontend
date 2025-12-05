interface TaskItemExplanationProps {
  explanation?: string | null;
  isCorrect: "full" | "partial" | "wrong" | "no-correct" | undefined;
  images?: (string | undefined)[];
  correctAnswer?: string[] | null;
}

export function TaskItemExplanation({ explanation, isCorrect, images, correctAnswer }: TaskItemExplanationProps) {
  if (!explanation || isCorrect === undefined) return null;

  const regex = /\[expimg:[^\]]+\]/g;
  const parts = explanation.split(regex);
  const matches = explanation.match(regex) || [];

  let imgIndex = 0;

  // console.log(parts, "parts");
  console.log(correctAnswer);

  return (
    <>
      <p>
        {correctAnswer?.length !== 0 && "Правильный ответ: "}
        {correctAnswer?.map((value, idx) => (
          <span key={idx}>
            {value}
            {idx < correctAnswer.length - 1 ? ", " : ""}
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
          {matches[i] && images?.[imgIndex] && <img className="my-4 mx-auto" src={images[imgIndex++]} alt="" />}
        </div>
      ))}
    </>
  );
}
