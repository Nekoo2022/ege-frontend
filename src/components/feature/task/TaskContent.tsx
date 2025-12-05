"use client";

import { TASKS_PER_PAGE } from "./constants/constants";
import { GenericTasksPage } from "./GenericTasksPage";
import { createRandomTasksStrategy } from "./strategies/randomTasksStrategy";

export function TaskContent({ tasks }: { tasks: { slug: string; taskNumber: string } }) {
  const strategy = createRandomTasksStrategy(tasks.slug, +tasks.taskNumber);
  return (
    <GenericTasksPage
      slug={tasks.slug}
      taskNumber={+tasks.taskNumber}
      take={TASKS_PER_PAGE}
      strategy={strategy}
      isPracticeMode={true}
    />
  );
}
