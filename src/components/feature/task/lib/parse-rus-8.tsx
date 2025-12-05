import { TaskItemForm } from "../TaskItem/TaskItemForm";
import { TaskItemExplanation } from "../utils/TaskItemExplanationPhysic";
import { TaskItemHeader } from "../utils/TaskItemHeader";

interface ParseRus8Interface {
  task: {
    text: string;
    taskNumber: number;
    question?: string;
    explanation?: string | null;
    id: string;
    correctAnswer: string[];
  };
  taskIndex: number;
  slug: string;
  isCorrect: "full" | "partial" | "wrong" | "no-correct" | undefined;
  setIsCorrect: (isCorrect: "full" | "partial" | "wrong" | "no-correct") => void;
}

export function ParseRus8({ task, taskIndex, isCorrect, slug, setIsCorrect }: ParseRus8Interface) {
  const { text, question, id, explanation } = task;
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  const idxErrorsHeader = lines.findIndex((l) => /^ГРАММАТИЧЕСКИЕ ОШИБКИ/i.test(l));
  const idxProposalsHeader = lines.findIndex((l) => /^ПРЕДЛОЖЕНИЯ/i.test(l));

  let errors: string[] = [];
  let sentences: string[] = [];

  const errorLineRe = /^\s*[-–•]?\s*([A-Za-zА-Яа-яЁё])\s*\)\s*\.?\s*/;
  const numberLineRe = /^\s*\d+\)\s*/;

  if (idxErrorsHeader !== -1 && idxProposalsHeader !== -1 && idxProposalsHeader > idxErrorsHeader) {
    const errorLines = lines.slice(idxErrorsHeader + 1, idxProposalsHeader);
    errors = errorLines.filter((l) => errorLineRe.test(l));

    const proposalLines = lines.slice(idxProposalsHeader + 1);
    sentences = proposalLines.filter((l) => numberLineRe.test(l)).map((l) => l.replace(numberLineRe, ""));
  } else {
    // Fallback: если заголовки не найдены, пытаемся выделить по шаблонам
    const allQ = (question || text)
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
    errors = allQ.filter((line) => errorLineRe.test(line));
    sentences = text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => numberLineRe.test(line))
      .map((line) => line.replace(numberLineRe, ""));
  }

  // Инструкции (строки до списка ошибок) — выводим над таблицей
  const linesBeforeErrors = idxErrorsHeader > 0 ? lines.slice(0, idxErrorsHeader) : [];

  return (
    <div className="mb-8 rounded-2xl border border-border bg-card shadow-sm p-6 md:p-8">
      <TaskItemHeader isCorrect={isCorrect} taskIndex={taskIndex} taskNumber={task.taskNumber} />

      {/* Инструкция */}
      {linesBeforeErrors.map((line, idx) => (
        <p key={idx} className="mb-4 text-foreground md:text-lg">
          {line}
        </p>
      ))}

      {/* Таблица */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-border rounded-lg">
          <thead>
            <tr className="bg-muted">
              <th scope="col" className="border px-4 py-3 text-left text-sm font-semibold text-foreground w-5/12">
                Грамматические ошибки
              </th>
              <th scope="col" className="border px-4 py-3 text-left text-sm font-semibold text-foreground w-7/12">
                Предложения
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-5 py-3 align-top">
                <div className="space-y-3">
                  {errors.map((err, i) => (
                    <div key={i} className="leading-relaxed">
                      {(() => {
                        const m = err.match(/^\s*[-–•]?\s*([A-Za-zА-Яа-яЁё])\s*\)\s*\.?\s*(.*)$/);
                        const label = m ? m[1] : "";
                        const rest = m ? m[2] : err;
                        return (
                          <>
                            <span className="font-bold mr-2">{label})</span>
                            <span className="text-foreground">{rest}</span>
                          </>
                        );
                      })()}
                    </div>
                  ))}
                </div>
              </td>
              <td className="border px-5 py-3 align-top">
                <div className="space-y-3">
                  {sentences.map((s, i) => (
                    <div key={i} className="leading-relaxed">
                      <span className="font-semibold mr-2">{i + 1})</span>
                      <span className="text-foreground">{s}</span>
                    </div>
                  ))}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <TaskItemForm questionId={id} setIsCorrect={setIsCorrect} isCorrect={isCorrect} slug={slug} />

      <TaskItemExplanation isCorrect={isCorrect} explanation={explanation} />
    </div>
  );
}
