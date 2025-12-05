import Image from "next/image";
import { useGetImageUrlQuery } from "@/graphql/generated/output";
import type { BaseTask, EngAudioTask, TextTask } from "../../types/task";
import { TaskItemForm } from "../../TaskItem/TaskItemForm";
import { TaskItemHeader } from "../../utils/TaskItemHeader";
import { TaskItemExplanation } from "../../utils/TaskItemExplanationPhysic";

type AnyTask = BaseTask | TextTask | EngAudioTask;

interface ParseEng38Props {
  task: AnyTask;
  isCorrect: "full" | "partial" | "wrong" | "no-correct" | undefined;
  setIsCorrect: (isCorrect: "full" | "partial" | "wrong" | "no-correct") => void;
  slug: string;
  taskIndex: number;
}

export function ParseEng38({ task, isCorrect, setIsCorrect, slug, taskIndex }: ParseEng38Props) {
  const subQuestions = task.subQuestions;
  const { data } = useGetImageUrlQuery({
    variables: {
      data: { imagesKeys: task.images, explanationKeys: task.explanationImages, globalImages: task.globalImages },
    },
  });
  console.log(task);

  const imageUrl = data?.GetImageUrl || "";

  console.log(subQuestions);

  return (
    <div className="mb-8 rounded-2xl border border-border bg-card shadow-sm p-6 md:p-8">
      <TaskItemHeader isCorrect={isCorrect} taskIndex={taskIndex} taskNumber={task.taskNumber} />

      <h3 className="mb-3">{task.intro}</h3>

      {subQuestions?.map((subQ, idx) => (
        <div className="mb-20" key={idx}>
          <p>{subQ.questionText}</p>
          <h6 className="text-center font-bold my-2">{subQ.title}</h6>
          <table className="mx-auto">
            <thead>
              <tr>
                {subQ.tableSpec?.columns.map((col, colIdx) => (
                  <th key={colIdx} className="border px-2 py-1">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {subQ.tableSpec?.rows.map((row, rowIdx) => (
                <tr key={rowIdx}>
                  <td className="border px-2 py-1">{row.key}</td>
                  <td className="border px-2 py-1">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {idx === 1 && imageUrl && <img className="mx-auto" src={imageUrl.imageUrls[0]} alt="image" />}
          <p className="text-sm-2">
            Write <b>200–250 words.</b>
          </p>
          <p className="text-sm-2">Use the following plan:</p>
          <ul>
            {subQ.plan.map((planItem, planItemIdx) => {
              return (
                <li key={planItemIdx} className="text-sm-2">
                  - {planItem}
                </li>
              );
            })}
          </ul>
        </div>
      ))}

      <TaskItemForm task={task} setIsCorrect={setIsCorrect} isCorrect={isCorrect} slug={slug} />

      <TaskItemExplanation isCorrect={isCorrect} explanation={task.explanation} />
    </div>
  );
}
