"use client";
import { TASKS_PER_PAGE } from "./task/constants/constants";
import { GenericTasksPage } from "./task/GenericTasksPage";
import { createIncorrectTasksStrategy } from "./task/strategies/incorrectTasksStrategy";

export function FindIncorrectQuestionsByTaskNumberClient({
  slug,
  taskNumber,
}: {
  slug: string;
  taskNumber: number;
}) {
  const strategy = createIncorrectTasksStrategy(slug);
  return (
    <GenericTasksPage
      slug={slug}
      taskNumber={+taskNumber}
      take={TASKS_PER_PAGE}
      strategy={strategy}
      isPracticeMode={false}
    />
  );
}
