interface TextWithImagesProps {
  text: string;
  images?: (string | undefined)[];
  markerType?: "img" | "expimg";
}

export function TextWithImages({ text, images, markerType = "img" }: TextWithImagesProps) {
  if (!text) return null;

  let imgIndex = 0;
  const regex = new RegExp(`\\[${markerType}:[^\\]]+\\]`, "g");

  // Разбиваем текст на строки по \n, чтобы сохранять переносы
  const lines = text.split("\n");

  return (
    <div className="text-foreground leading-relaxed">
      {lines.map((line, lineIdx) => {
        const parts = line.split(regex);
        const matches = line.match(regex) || [];

        return (
          <p key={lineIdx} className="mb-0">
            {parts.map((part, i) => (
              <span key={i}>
                {part}
                {matches[i] && images?.[imgIndex] && (
                  <img
                    src={images[imgIndex++]}
                    alt=""
                    className="inline-block align-middle mx-auto my-5 dark:invert"
                  />
                )}
              </span>
            ))}
          </p>
        );
      })}
    </div>
  );
}
