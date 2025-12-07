import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { AnswerStatus } from "../types/context";

type AnswersMap = Record<string, AnswerStatus | undefined>;

interface UseAnswersStateOptions {
  depsKey?: string;
  persist?: boolean;
}

export function useAnswersState({ depsKey, persist = false }: UseAnswersStateOptions = {}) {
  const storageKey = depsKey ? `answers:${depsKey}` : undefined;
  const { isAuthentificated } = useAuth();

  const [answers, setAnswers] = useState<AnswersMap>(() => {
    // Initial state is empty; we will hydrate from localStorage once auth is established
    return {};
  });

  useEffect(() => {
    if (persist && storageKey && isAuthentificated) {
      try {
        localStorage.setItem(storageKey, JSON.stringify(answers));
      } catch {}
    }
  }, [answers, storageKey, persist, isAuthentificated]);

  const prevDepsKeyRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (!depsKey) return;
    const prev = prevDepsKeyRef.current;
    // Если ключ не менялся — ничего не делаем
    if (prev === depsKey) return;

    if (persist && storageKey && isAuthentificated) {
      // При смене depsKey пробуем восстановить сохранённое состояние
      try {
        const raw = localStorage.getItem(storageKey);
        setAnswers(raw ? (JSON.parse(raw) as AnswersMap) : {});
      } catch {
        setAnswers({});
      }
    } else {
      // Если персиста нет или пользователь не авторизован — сбрасываем и не читаем
      setAnswers({});
    }

    prevDepsKeyRef.current = depsKey;
  }, [depsKey, persist, storageKey, isAuthentificated]);

  // Когда пользователь авторизуется/деавторизуется, подтягиваем/очищаем локальные сохранения
  useEffect(() => {
    if (!storageKey) return;
    if (isAuthentificated && persist && storageKey) {
      try {
        const raw = localStorage.getItem(storageKey);
        setAnswers(raw ? (JSON.parse(raw) as AnswersMap) : {});
      } catch {
        setAnswers({});
      }
    } else if (!isAuthentificated && storageKey) {
      // Не сохраняем локально, и очистим состояние
      try {
        localStorage.removeItem(storageKey);
      } catch {}
      setAnswers({});
    }
  }, [isAuthentificated, persist, storageKey]);

  const setAnswer = useCallback((taskId: string, value: AnswerStatus) => {
    setAnswers((prev) => ({ ...prev, [taskId]: value }));
  }, []);

  const api = useMemo(
    () => ({ answers, setAnswer, setAnswers, reset: () => setAnswers({}) }),
    [answers, setAnswer]
  );

  return api;
}
