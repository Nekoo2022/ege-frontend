import z from "zod";

export const changeEmailSchema = z.object({
  email: z.string().min(5, "Email обязателен").pipe(z.email("Некорректный email")),
});

export type TypeChangeEmailSchema = z.infer<typeof changeEmailSchema>;

