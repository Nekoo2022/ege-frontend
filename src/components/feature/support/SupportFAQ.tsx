"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/common/Card";
import { HelpCircleIcon } from "lucide-react";

export default function SupportFAQ() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.4 }}>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <HelpCircleIcon className="size-6 text-[#5e52cb]" />
            <CardTitle>Часто задаваемые вопросы</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold text-sm mb-1">Как восстановить пароль?</h4>
            <p className="text-sm text-muted-foreground">На странице входа нажмите "Забыли пароль?" и следуйте инструкциям.</p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-1">Где найти статистику?</h4>
            <p className="text-sm text-muted-foreground">
              Перейдите в раздел "Статистика" в боковом меню для просмотра ваших результатов.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-1">Как добавить предмет в избранное?</h4>
            <p className="text-sm text-muted-foreground">
              На странице предмета нажмите на иконку звездочки, чтобы добавить его в избранное.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-1">Есть ли мобильное приложение?</h4>
            <p className="text-sm text-muted-foreground">
              На данный момент доступна только веб-версия. Мобильное приложение в разработке.
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
