import { FindRandomQuestionsQuery } from "@/graphql/generated/output";
import { ApolloQueryResult } from "@apollo/client";
import { useCallback, useMemo, useState } from "react";

interface UseTasksPagerOptions {
  total: number;
  perPage?: number;
  initialSkip?: number;
  onPageChange?: (skip: number) => Promise<ApolloQueryResult<FindRandomQuestionsQuery>>;
}

export function useTasksPager({ total, perPage = 20, initialSkip = 0, onPageChange }: UseTasksPagerOptions) {
  const [skip, setSkip] = useState(initialSkip);

  const canPrev = skip > 0;
  const canNext = skip + perPage < Math.max(0, total);

  const handlePrev = useCallback(async () => {
    if (!canPrev) return;
    const newSkip = Math.max(0, skip - perPage);
    setSkip(newSkip);
    await onPageChange?.(newSkip);
  }, [skip, canPrev, perPage, total, onPageChange]);

  const handleNext = useCallback(async () => {
    if (!canNext) return;
    const newSkip = Math.min(skip + perPage, Math.max(0, total - perPage));
    setSkip(newSkip);
    await onPageChange?.(newSkip);
  }, [skip, canNext, perPage, total, onPageChange]);

  return useMemo(
    () => ({ skip, setSkip, canPrev, canNext, total, perPage, handlePrev, handleNext }),
    [skip, canPrev, canNext, total, perPage, handleNext, handlePrev]
  );
}
