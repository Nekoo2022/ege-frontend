"use client";

import { TASKS_PER_PAGE } from "./constants/constants";
import { GenericTasksPage } from "./GenericTasksPage";
import { createIncorrectTasksStrategy } from "./strategies/incorrectTasksStrategy";

export default function IncorrectTaskContent({ slug, taskNumber }: { slug: string; taskNumber?: number }) {
  const strategy = createIncorrectTasksStrategy(slug);
  return (
    <GenericTasksPage
      slug={slug}
      taskNumber={taskNumber}
      take={TASKS_PER_PAGE}
      strategy={strategy}
      isPracticeMode={false}
    />
  );
}
