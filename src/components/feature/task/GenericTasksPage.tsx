import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useAnswersState } from "./hooks/useAnswersState";
import { useTasksPager } from "./hooks/useTasksPager";
import { Tabs } from "@/components/ui/common/Tabs";
import { TaskContext } from "./context/TaskContext";
import { TaskTabsList } from "./TaskItem/TaskTabs/TaskTabsList";
import { TaskTabsContent } from "./TaskItem/TaskTabs/TaskTabsContent";
import type { TasksDataStrategy } from "./types/strategy";
import { ClearTaskInputs } from "@/utils/localStorageHelpers";
import { TasksSkeleton } from "./TasksSkeleton";
import { TaskContextType } from "./types/context";
import { TasksHeader } from "./TasksHeader";

interface ItemIncorrect {
  text: string;
  explanation?: string | null | undefined;
  id: string;
  correctAnswer: string[];
  question: string;
  task: {
    __typename?: "TaskModel" | undefined;
    taskNumber: number;
  };
}

interface Props {
  slug: string;
  taskNumber?: number;
  take: number;
  strategy: TasksDataStrategy;
  isPracticeMode?: boolean;
}

function TasksPlaceholder({ text }: { text: string }) {
  return <p className="text-center text-muted-foreground">{text}</p>;
}

export function GenericTasksPage({ slug, taskNumber, take, strategy, isPracticeMode }: Props) {
  const { total, loading: totalLoading, error: totalError } = strategy.useTotal(taskNumber);

  const pager = useTasksPager({ total, perPage: take, initialSkip: 0 });

  const {
    taskList,
    loading: listLoading,
    error: listError,
    refetch,
  } = strategy.useList({ skip: pager.skip, take, taskNumber });

  // console.log(taskList);

  const {
    answers,
    setAnswers,
    reset: resetAnswers,
  } = useAnswersState({
    depsKey: `${isPracticeMode ? "practice" : "incorrect"}:${slug}:${taskNumber ?? "all"}:${pager.skip}`,
    persist: Boolean(isPracticeMode),
  });

  const [resetVersion, setResetVersion] = useState(0);

  const tasks =
    isPracticeMode || !taskNumber
      ? useMemo(() => taskList.map(strategy.mapToTaskItem), [taskList, strategy.mapToTaskItem])
      : useMemo(
          () => taskList.map((raw) => strategy.mapToQuestion(raw, taskNumber)),
          [taskList, strategy.mapToQuestion, taskNumber]
        );

  const prevTasksRef = useRef<typeof tasks>([]);
  const [prevTasks, setPrevTasks] = useState<typeof tasks>([]);

  // console.log(taskNumber, "TASK");

  useEffect(() => {
    if (!listLoading && tasks.length > 0) {
      const prevIds = prevTasksRef.current.map((t) => t.id);
      const currentIds = tasks.map((t) => t.id);

      const isDifferent = prevIds.length !== currentIds.length || prevIds.some((id, i) => id !== currentIds[i]);

      if (isDifferent) {
        prevTasksRef.current = tasks;
        setPrevTasks(tasks);
      }
    }
  }, [listLoading, tasks]);
  const displayTasks = listLoading && prevTasks.length > 0 ? prevTasks : tasks;

  const tasksIds = useMemo(() => displayTasks.map((v) => v.id), [displayTasks]);
  const answeredCount = useMemo(() => Object.values(answers).filter((v) => v !== undefined).length, [answers]);

  const handlePrev = async () => {
    await pager.handlePrev();
    await refetch();
  };

  const handleNext = async () => {
    await pager.handleNext();
    await refetch();
  };

  const handleResetAll = useCallback(() => {
    try {
      resetAnswers();
      ClearTaskInputs(slug, tasksIds);
      setResetVersion((value) => value + 1);
    } catch (error) {
      console.warn("Ошибка при сбросе ответов:", error);
    }
  }, [resetAnswers, tasks, slug]);

  const ctxValue = useMemo<TaskContextType>(
    () => ({
      skip: pager.skip,
      totalTasks: total,
      taskList: tasks,
      answers,
      handlePrev,
      handleNext,
      slug,
      setAnswers,
      taskNumber,
      resetVersion,
      resetAnswers,
    }),
    [pager.skip, total, tasks, answers, slug, setAnswers, taskNumber, resetAnswers, resetVersion]
  );

  const loading = totalLoading || listLoading;
  const error = totalError || listError;

  const header = isPracticeMode ? (
    <TasksHeader
      taskNumber={taskNumber!}
      answeredCount={answeredCount}
      handleResetAll={handleResetAll}
      isPracticeMode={isPracticeMode}
    />
  ) : (
    <h1 className="text-center text-3xl font-semibold mb-5">Работа над ошибками</h1>
  );

  // Если total уже известен и равен нулю — сразу показываем пустое состояние,
  // даже если второй запрос ещё в loading.
  if (!totalLoading && total === 0) {
    return <TasksPlaceholder text="Задания не найдены" />;
  }

  // Скелетоны показываем только когда ожидается контент, но он ещё не загрузился
  if (loading && tasks.length === 0 && prevTasks.length === 0 && (totalLoading || total > 0)) {
    return <TasksSkeleton />;
  }

  if (error) return <TasksPlaceholder text="Ошибка загрузки" />;
  if (tasks.length === 0 && prevTasks.length === 0) return <TasksPlaceholder text="Задания не найдены" />;

  return (
    <div className="px-10">
      <div className="relative">
        {/* Тонкая полоса прогресса во время загрузки следующей страницы */}
        {listLoading && (
          <div className="absolute inset-x-0 -top-2 h-0.5 overflow-hidden">
            <div className="h-full w-full bg-[#7b21e2]/30 animate-pulse" />
          </div>
        )}
        {header}
        <Tabs
          key={`${slug}-${taskNumber}-${pager.skip}-${displayTasks.length}`}
          defaultValue="0"
          className="w-full"
        >
          <TaskContext.Provider
            value={{
              ...ctxValue,
              isPracticeMode,
              taskList: displayTasks,
              handlePrev: listLoading ? () => {} : handlePrev,
              handleNext: listLoading ? () => {} : handleNext,
            }}
          >
            <TaskTabsList />
            <TaskTabsContent />
          </TaskContext.Provider>
        </Tabs>
      </div>
    </div>
  );
}
