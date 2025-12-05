"use client";

import { Button } from "@/components/ui/common/Button";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/common/Form";
import { Input } from "@/components/ui/common/Input";
import { FindMeDocument, IsCorrectType, useCreateAnswerMutation } from "@/graphql/generated/output";
import { createAnswerSchema, TypeCreateAnswerSchema } from "@/schemas/answer/create-answer.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { useApolloClient } from "@apollo/client";
import { useEffect, useMemo } from "react";
import { useTaskContext } from "../context/TaskContext";
import { mapCorrectType } from "@/hooks/mapCorrectType";
import { BaseTask, EngAudioTask, TextTask } from "../types/task";

type AnyTask = BaseTask | TextTask | EngAudioTask;

interface TaskItemFormProps {
  task: AnyTask;
  setIsCorrect: (value: "full" | "partial" | "wrong" | "no-correct") => void;
  isCorrect: "full" | "partial" | "wrong" | "no-correct" | undefined;
  slug: string;
}

export function TaskItemForm({ task, setIsCorrect, isCorrect, slug }: TaskItemFormProps) {
  const form = useForm<TypeCreateAnswerSchema>({
    resolver: zodResolver(createAnswerSchema),
    defaultValues: { answer: "" },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const {
    handleSubmit,
    formState: { isValid },
  } = form;

  const { resetVersion, isPracticeMode } = useTaskContext();

  useEffect(() => {
    form.reset({ answer: "" });
  }, [resetVersion]);

  const apolloClient = useApolloClient();
  const { isAuthentificated } = useAuth();

  const [create, { loading: isLoadingCreate }] = useCreateAnswerMutation({
    async onCompleted(data) {
      const status = mapCorrectType(data.CreateAnswer.isCorrect);
      console.log(status);
      setIsCorrect(status);

      if (status === "full") toast.success("Верно! Опыт начислен");
      else if (status === "partial") toast("Частично верно", { icon: "⚠️" });
      else if (status === "wrong") toast.error("Неверно");

      if (!isPracticeMode) {
        try {
          const prefix = `answers:practice:${slug}:`;
          for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (!key || !key.startsWith(prefix)) continue;

            const raw = localStorage.getItem(key);
            if (!raw) continue;

            const obj = JSON.parse(raw);
            if (obj[task.id] !== true) {
              obj[task.id] = status === "full"; // только полный ответ сохраняем как true
              localStorage.setItem(key, JSON.stringify(obj));
            }
          }

          const finalAnswer = form.getValues("answer") ?? "";
          localStorage.setItem(storageKey, finalAnswer);
        } catch {}
      }

      try {
        await apolloClient.refetchQueries({ include: [FindMeDocument] });
      } catch {}
    },

    onError(error) {
      toast.error(error.message || "Ошибка");
    },
  });

  const onSubmit = (data: TypeCreateAnswerSchema) => {
    create({
      variables: { data: { userAnswer: data.answer, questionId: task.id } },
    });
  };

  const storageKey = useMemo(
    () => `input:${isPracticeMode ? "practice" : "incorrect"}:${slug}:${task.id}`,
    [isPracticeMode, slug, task.id]
  );

  useEffect(() => {
    if (isPracticeMode) {
      try {
        const saved = localStorage.getItem(storageKey);
        if (saved) form.reset({ answer: saved });
      } catch {}
    } else {
      form.reset({ answer: "" });
    }
  }, [storageKey, isPracticeMode]);

  useEffect(() => {
    const sub = form.watch((value, { name }) => {
      if (name !== "answer") return;

      try {
        if (isPracticeMode) {
          localStorage.setItem(storageKey, value.answer ?? "");
        } else if (isCorrect === "full") {
          localStorage.setItem(storageKey, value.answer ?? "");
        }
      } catch {}
    });

    return () => sub.unsubscribe();
  }, [form, storageKey, isPracticeMode, isCorrect]);

  return (
    <>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 mb-6">
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-base md:text-lg text-foreground">Ваш ответ</FormLabel>

                <div className="flex flex-col gap-3">
                  <FormControl>
                    <Input
                      placeholder="ответ"
                      className={`h-11 md:h-12 text-base transition-all
    ${isCorrect === "full" ? "border-green-500 bg-green-500/10" : ""}
    ${isCorrect === "partial" ? "border-yellow-500 bg-yellow-500/10" : ""}
    ${isCorrect === "wrong" ? "border-red-500 bg-red-500/10" : ""}
  `}
                      {...field}
                      disabled={isCorrect !== undefined || isLoadingCreate}
                    />
                  </FormControl>

                  <div className="flex items-center gap-3">
                    <Button
                      type="submit"
                      className="self-end bg-violet-600 hover:bg-violet-700 disabled:opacity-60 text-accent"
                      disabled={isCorrect !== undefined || !isValid || isLoadingCreate}
                    >
                      {isLoadingCreate ? "Отправка..." : "Ответить"}
                    </Button>
                    {!isAuthentificated && (
                      <div className="text-sm text-muted-foreground ml-2">
                        Ответ не будет сохранён:{" "}
                        <span className="font-semibold">войдите или зарегистрируйтесь</span>
                      </div>
                    )}
                  </div>
                </div>
              </FormItem>
            )}
          />
        </form>
      </FormProvider>
    </>
  );
}
