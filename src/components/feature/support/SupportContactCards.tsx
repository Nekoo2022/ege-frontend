"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/common/Card";
import { MailIcon, PhoneIcon } from "lucide-react";

export default function SupportContactCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: 0.1 }}>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <MailIcon className="size-6 text-[#5e52cb]" />
              <CardTitle>Электронная почта</CardTitle>
            </div>
            <CardDescription>Напишите нам на почту, и мы ответим в течение 24 часов</CardDescription>
          </CardHeader>
          <CardContent>
            <a href="mailto:support@ege-cursor.com" className="text-[#5e52cb] hover:underline font-medium">
              support@ege-cursor.com
            </a>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: 0.2 }}>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <PhoneIcon className="size-6 text-[#5e52cb]" />
              <CardTitle>Часы работы</CardTitle>
            </div>
            <CardDescription>Мы работаем с понедельника по пятницу</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Пн-Пт: 9:00 - 18:00 МСК</p>
            <p className="text-muted-foreground text-sm mt-2">Сб-Вс: выходной</p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
