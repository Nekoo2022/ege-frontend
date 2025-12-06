"use client";

import { Button } from "@/components/ui/common/Button";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/common/Form";
import { Input } from "@/components/ui/common/Input";
import { FindMeDocument, useCreateAnswerMutation } from "@/graphql/generated/output";
import { createAnswerSchema, TypeCreateAnswerSchema } from "@/schemas/answer/create-answer.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useApolloClient } from "@apollo/client";
import { mapCorrectType } from "@/hooks/mapCorrectType";

interface VariantItemFormProps {
  questionId: string;
  isCorrect: "full" | "partial" | "wrong" | "no-correct" | undefined;
  setIsCorrect: (isCorrect: "full" | "partial" | "wrong" | "no-correct") => void;
  slug: string;
}

export function VariantItemForm({ questionId, setIsCorrect, isCorrect, slug }: VariantItemFormProps) {
  const form = useForm<TypeCreateAnswerSchema>({
    resolver: zodResolver(createAnswerSchema),
    defaultValues: {
      answer: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const { handleSubmit } = form;
  const apolloClient = useApolloClient();

  const [create, { loading: isLoadingCreate }] = useCreateAnswerMutation({
    async onCompleted(data) {
      const status = mapCorrectType(data.CreateAnswer.isCorrect);
      console.log(status);
      setIsCorrect(status);

      if (status === "full") toast.success("Верно! Опыт начислен");
      else if (status === "partial") toast("Частично верно", { icon: "⚠️" });
      else if (status === "wrong") toast.error("Неверно");
    },
    onError(error) {
      toast.error(error.message || "Ошибка");
    },
  });

  function onSubmit(data: TypeCreateAnswerSchema) {
    create({
      variables: { data: { userAnswer: data.answer, questionId } },
    });
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
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
                    className={`h-11 md:h-12 text-base transition-all duration-300 placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-violet-200 focus-visible:border-violet-600
${isCorrect === "full" ? "border-green-500 bg-green-500/10 text-green-700 dark:text-green-300" : ""}
${isCorrect === "wrong" ? "border-red-500 bg-red-500/10 text-red-700 dark:text-red-300" : ""}`}
                    {...field}
                    disabled={isCorrect !== undefined || isLoadingCreate}
                  />
                </FormControl>
                <Button
                  type="submit"
                  className="self-end whitespace-nowrap bg-violet-600 hover:bg-violet-700 disabled:opacity-60 text-accent"
                  disabled={isCorrect !== undefined || !form.formState.isValid || isLoadingCreate}
                >
                  {isLoadingCreate ? "Отправка..." : "Ответить"}
                </Button>
              </div>
            </FormItem>
          )}
        />
      </form>
    </FormProvider>
  );
}
