import z from "zod";

export const createAnswerSchema = z.object({
  answer: z.string().min(1, "Ответ обязателен"),
});

export type TypeCreateAnswerSchema = z.infer<typeof createAnswerSchema>;
