interface TaskItemExplanationProps {
  explanation?: string | null;
  isCorrect: "full" | "partial" | "wrong" | "no-correct" | undefined;
  images?: (string | undefined)[];
}

export function TaskItemExplanation({ explanation, isCorrect, images }: TaskItemExplanationProps) {
  if (!explanation || isCorrect === undefined) return null;

  const regex = /\[expimg:[^\]]+\]/g;
  const parts = explanation.split(regex);
  const matches = explanation.match(regex) || [];

  let imgIndex = 0;

  return (
    <>
      {parts.map((part, i) => (
        <div key={i}>
          {part && <p className="mb-3">{part}</p>}
          {matches[i] && images?.[imgIndex] && <img className="my-4 mx-auto" src={images[imgIndex++]} alt="" />}
        </div>
      ))}
    </>
  );
}
