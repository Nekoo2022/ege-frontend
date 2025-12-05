import React, { useState } from "react";

import type { EngAudioTask } from "../../types/task";
import { useGetAudioUrlQuery } from "@/graphql/generated/output";
import GenericTableRenderer from "../GenericTableRenderer";
import { TaskItemForm } from "../../TaskItem/TaskItemForm";
import { TaskItemHeader } from "../../utils/TaskItemHeader";
import { TaskItemExplanation } from "../../utils/TaskItemExplanationPhysic";

interface Props {
  task: EngAudioTask;
  taskIndex: number;
  setIsCorrect: (value: "full" | "partial" | "wrong" | "no-correct") => void;
  isCorrect: "full" | "partial" | "wrong" | "no-correct" | undefined;
  slug: string;
}

const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="mb-8 rounded-2xl border border-border bg-card shadow-sm p-6 md:p-8">{children}</div>
);

export default function ParseEngAudio({ task, taskIndex, isCorrect, setIsCorrect, slug }: Props) {
  const { id, intro, statements, tableSpec, taskNumber, explanation, question, text } = task;

  const { data } = useGetAudioUrlQuery({
    variables: { data: { taskIndex, taskNumber, slug } },
  });

  console.log("tutut");

  const audioUrl = data?.GetAudioUrl;

  console.log(audioUrl);

  return (
    <Card>
      <TaskItemHeader isCorrect={isCorrect} taskIndex={taskIndex} taskNumber={task.taskNumber} />
      {audioUrl && (
        <div className="mb-6">
          <audio controls className="w-full">
            <source src={audioUrl} />
            Ваш браузер не поддерживает audio.
          </audio>

          <p className="text-sm text-muted-foreground mt-2 text-center">
            Нажмите кнопку воспроизведения, чтобы прослушать запись
          </p>
        </div>
      )}
      <div className="mb-4 text-foreground md:text-lg space-y-2">
        <p>{intro}</p>
      </div>
      {question && <p className="mb-5">{question}</p>}
      <div className="space-y-4">
        <ul className="pl-5 space-y-2 mb-5">
          {statements.map((s, i) => (
            <li key={i} className="mb-1">
              {s}
            </li>
          ))}
        </ul>
      </div>
      {text &&
        text.split("\n").map((part, idx) => (
          <p key={idx} className="mb-4">
            {part}
          </p>
        ))}
      {tableSpec && <GenericTableRenderer spec={tableSpec} />}
      <div className="mt-4">
        <TaskItemForm task={task} isCorrect={isCorrect} setIsCorrect={setIsCorrect} slug={slug} />
      </div>
      <TaskItemExplanation isCorrect={isCorrect} explanation={explanation} />
    </Card>
  );
}
