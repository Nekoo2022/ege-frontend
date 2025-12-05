"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useFindUserVariantAllQuery, useRemoveUserVariantByIdMutation } from "@/graphql/generated/output";
import { toast } from "sonner";
import { VariantEmpty } from "./VariantContentEmpty";
import { VariantContentLoading } from "./VariantContentLoading";
import { VariantCard } from "./VariantCard";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/common/Card";
import { Button } from "@/components/ui/common/Button";
import { UserPlus, LogIn, ArrowRightIcon } from "lucide-react";

//Компонент где отображаются все варианты
export function VariantContent() {
  const { data, loading, error, refetch } = useFindUserVariantAllQuery();
  const variants = data?.FindUserVariantAll ?? [];

  const [removeVariant] = useRemoveUserVariantByIdMutation({
    async onCompleted() {
      toast.success("Вариант успешно удален");
    },
    onError(error) {
      toast.error("Ошибка при удалении варианта");
      console.log(error);
    },
  });

  function handleRemove(variantId: number) {
    removeVariant({
      variables: { variantId },
      optimisticResponse: { RemoveUserVariantById: true },
      update(cache, { data }) {
        if (!data?.RemoveUserVariantById) return;
        cache.modify({
          fields: {
            FindUserVariantAll(existingRefs = [], { readField }) {
              return existingRefs.filter((ref: any) => readField("id", ref) !== variantId);
            },
          },
        });
      },
    });
  }

  if (loading) return <VariantContentLoading />;
  if (error?.message === "Сессия не найдена") {
    return (
      <div className="min-h-[200px] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-3xl mx-auto"
        >
          <Card className="text-center p-8">
            <CardHeader className="items-center justify-center">
              <UserPlus className="size-16 text-[#7b21e2] mx-auto opacity-90" />
              <CardTitle className="text-2xl font-semibold mt-3">Чтобы просмотреть варианты</CardTitle>
              <CardDescription className="mt-1 text-muted-foreground max-w-xl mx-auto">
                Для доступа к сохраненным вариантам требуется войти в аккаунт или зарегистрироваться. Это позволит
                вам сохранять прогресс и синхронизировать результаты на разных устройствах.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-3 sm:justify-center items-center">
                <Link href="/user/create">
                  <Button
                    className="bg-linear-to-r from-[#7b21e2] to-[#9d8cf4] hover:from-[#6b1bd0] hover:to-[#8d7ce4] text-white shadow-md hover:shadow-lg transition-all px-5 py-3 rounded-md flex items-center gap-2"
                    size="lg"
                  >
                    Зарегистрироваться
                    <ArrowRightIcon className="size-4" />
                  </Button>
                </Link>
                <Link href="/user/login">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-[#7b21e2] text-[#7b21e2] hover:bg-[#7b21e2]/5 font-medium px-5 py-3 rounded-md flex items-center gap-2"
                  >
                    Войти
                    <LogIn className="size-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }
  if (error)
    return (
      <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm">
        Произошла ошибка при загрузке вариантов
      </div>
    );
  if (!variants.length) return <VariantEmpty loading={loading} refetch={refetch} />;

  // Анимация текста
  const textVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.3 },
    }),
  };

  return (
    <div className="space-y-6">
      {/* Заголовок и описание с анимацией */}
      <div className="text-center">
        <motion.h1
          className="text-2xl sm:text-3xl font-semibold"
          custom={0}
          initial="hidden"
          animate="visible"
          variants={textVariants}
        >
          Мои варианты
        </motion.h1>
        <motion.p
          className="text-sm text-muted-foreground mt-1"
          custom={1}
          initial="hidden"
          animate="visible"
          variants={textVariants}
        >
          Список сохраненных вариантов с количеством заданий
        </motion.p>
      </div>

      {/* Сетка вариантов с анимацией */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {variants.map((variant) => (
            <VariantCard key={variant.id} variant={variant} handleRemove={handleRemove} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
