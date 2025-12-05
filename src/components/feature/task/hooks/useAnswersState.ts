import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnswerStatus } from "../types/context";

type AnswersMap = Record<string, AnswerStatus | undefined>;

interface UseAnswersStateOptions {
  depsKey?: string;
  persist?: boolean;
}

export function useAnswersState({ depsKey, persist = false }: UseAnswersStateOptions = {}) {
  const storageKey = depsKey ? `answers:${depsKey}` : undefined;

  const [answers, setAnswers] = useState<AnswersMap>(() => {
    if (persist && storageKey) {
      try {
        const raw = localStorage.getItem(storageKey);
        if (raw) return JSON.parse(raw) as AnswersMap;
      } catch {}
    }
    return {};
  });

  useEffect(() => {
    if (persist && storageKey) {
      try {
        const raw = localStorage.setItem(storageKey, JSON.stringify(answers));
      } catch {}
    }
  }, [answers, storageKey, persist]);

  const prevDepsKeyRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (!depsKey) return;
    const prev = prevDepsKeyRef.current;
    // Если ключ не менялся — ничего не делаем
    if (prev === depsKey) return;

    if (persist && storageKey) {
      // При смене depsKey пробуем восстановить сохранённое состояние
      try {
        const raw = localStorage.getItem(storageKey);
        setAnswers(raw ? (JSON.parse(raw) as AnswersMap) : {});
      } catch {
        setAnswers({});
      }
    } else {
      // Если персиста нет — сбрасываем
      setAnswers({});
    }

    prevDepsKeyRef.current = depsKey;
  }, [depsKey, persist, storageKey]);

  const setAnswer = useCallback((taskId: string, value: AnswerStatus) => {
    setAnswers((prev) => ({ ...prev, [taskId]: value }));
  }, []);

  const api = useMemo(
    () => ({ answers, setAnswer, setAnswers, reset: () => setAnswers({}) }),
    [answers, setAnswer]
  );

  return api;
}
