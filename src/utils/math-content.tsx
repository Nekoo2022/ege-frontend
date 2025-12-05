import { useEffect, useRef } from "react";
import "katex/dist/katex.min.css";
import renderMathInElement from "katex/contrib/auto-render";

interface MathContentProps {
  math: string;
}

export default function MathContent({ math }: MathContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      renderMathInElement(containerRef.current, {
        delimiters: [
          { left: "\\(", right: "\\)", display: false },
          { left: "\\[", right: "\\]", display: true },
        ],
      });
    }
  }, [math]);

  return <div ref={containerRef}>{math}</div>;
}
