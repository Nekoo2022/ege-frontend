import type { BaseTask, TextTask, EngAudioTask } from "../../types/task";
import GenericTableRenderer from "../GenericTableRenderer";
import { useGetImageUrlQuery } from "@/graphql/generated/output";
import { TaskItemForm } from "../../TaskItem/TaskItemForm";
import { TaskItemHeader } from "../../utils/TaskItemHeader";
import { TaskItemExplanation } from "../../utils/TaskItemExplanationPhysic";
import { useMemo } from "react";
import { TextWithImages } from "./TextWithImage";
import { TaskItem } from "../../TaskItem/TaskItem";

type AnyTask = BaseTask | TextTask | EngAudioTask;

interface ParsePhysic1Props {
  task: AnyTask;
  isCorrect: "full" | "partial" | "wrong" | "no-correct" | undefined;
  setIsCorrect: (isCorrect: "full" | "partial" | "wrong" | "no-correct") => void;
  slug: string;
  taskIndex: number;
}

export function ParsePhysic1({ task, isCorrect, setIsCorrect, slug, taskIndex }: ParsePhysic1Props) {
  console.log(task.images);
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

  console.log(urls);
  console.log(task.globalImages, "globalImages");

  return (
    <div className="mb-8 p-6 md:p-8">
      <TaskItemHeader isCorrect={isCorrect} taskIndex={taskIndex} taskNumber={task.taskNumber} />

      <div className="flex">
        <div className="">
          {/* Вопрос с картинками */}
          <TextWithImages text={task.question!} images={task.images?.map((key) => urls[key])} markerType="img" />

          <div className="mb-5 text-foreground md:text-sm-2 leading-relaxed space-y-2">{task.text}</div>

          {task.tableSpec && <GenericTableRenderer spec={task.tableSpec} />}
        </div>
        <img src={data?.GetImageUrl.globalImageUrls[0]} alt="no-image" />
      </div>

      <TaskItemForm task={task} setIsCorrect={setIsCorrect} isCorrect={isCorrect} slug={slug} />

      <TaskItemExplanation
        isCorrect={isCorrect}
        explanation={task.explanation}
        images={task.explanationImages?.map((key) => urls[key])}
      />
    </div>
  );
}
