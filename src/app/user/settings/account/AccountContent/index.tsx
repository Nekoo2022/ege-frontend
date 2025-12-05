import { TabsContent } from "@/components/ui/common/Tabs";
import { motion } from "framer-motion";
import { AccountInfoCard } from "./AccountInfoCard";
import { AccountChangeInfo } from "./AccountChangeInfo";
import { AccountTotp } from "./AccountTotp";
import { QueryResult } from "@apollo/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/common/Card";
import { Button } from "@/components/ui/common/Button";
import { MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { AccountDeactivate } from "./deactivates";
import { useGenerateTelegramConnectionTokenMutation } from "@/graphql/generated/output";

interface AccountContentProps {
  initial: string;
  email: string;
  isTwoFactor: boolean;
  isDeactivated: boolean;
  refetch: QueryResult["refetch"];
  telegramId: string | null;
}

//главный компонент AccountContent (входная точка)
export function AccountContent({
  initial,
  email,
  isTwoFactor,
  isDeactivated,
  refetch,
  telegramId,
}: AccountContentProps) {
  const [generateTelegramConnectionToken] = useGenerateTelegramConnectionTokenMutation({
    onCompleted: (data) => {
      toast.success("Токен успешно создан");
      window.open(`https://t.me/ege_helper2025_bot?start=${data?.GenerateTelegramConnectionToken}`, "_blank");
    },
    onError: async (error) => {
      if (error.message.includes("Вы уже подключены к Telegram")) {
        toast.warning("Вы уже подключены к Telegram");
        await refetch();
      } else {
        toast.error("Ошибка при создании токена");
      }
    },
  });

  const handleGenerateTelegramToken = () => {
    generateTelegramConnectionToken();
  };

  return (
    <TabsContent value="account">
      <motion.div
        className="mt-4 space-y-4"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Компонент с информацией об пользователе */}
        <AccountInfoCard initial={initial} email={email} />

        {/* Красивый блок перехода к подключению Telegram с заметной анимацией */}
        <motion.div
          layout
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 340, damping: 26, mass: 0.8 }}
        >
          <motion.div transition={{ type: "spring", stiffness: 300, damping: 20 }} className="group">
            <Card className="overflow-hidden border-border/60 transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <motion.span
                    layout
                    initial={{ y: 0, rotate: 0 }}
                    animate={{ y: [0, -2, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="inline-flex"
                  >
                    <MessageCircle className="size-5 text-primary" />
                  </motion.span>
                  Telegram-уведомления
                </CardTitle>
                <CardDescription>
                  Подключите Telegram, чтобы получать уведомления. Нажмите кнопку ниже, чтобы перейти на страницу с
                  ссылкой на бота.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <motion.div>
                  <Button
                    className="bg-linear-to-r from-[#7b21e2] to-[#9d8cf4]"
                    onClick={handleGenerateTelegramToken}
                    disabled={telegramId ? true : false}
                  >
                    Перейти к подключению Telegram
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Компонент для изменения email и пароля пользователя */}
        <AccountChangeInfo />

        {/* Компонент для включения двухвакторной аутентификации */}
        <AccountTotp isTwoFactor={isTwoFactor} refetch={refetch} />

        {/* Компонент для деактивации аккаунта */}
        <AccountDeactivate
          isDeactivated={isDeactivated}
          isTwoFactor={isTwoFactor}
          refetch={refetch}
          telegramId={telegramId}
        />
      </motion.div>
    </TabsContent>
  );
}
