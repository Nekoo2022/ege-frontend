import z from "zod";

export const passwordRecoverySchema = z.object({
  email: z.string().min(5, "Email обязателен").pipe(z.email("Некорректный email")),
});

export type TypePasswordRecoverySchema = z.infer<typeof passwordRecoverySchema>;
