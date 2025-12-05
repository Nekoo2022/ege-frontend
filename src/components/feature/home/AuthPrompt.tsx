import { motion } from "framer-motion";
import Link from "next/link";

export function AuthPrompt() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
        <h1 className="text-4xl font-bold text-[#5e52cb] mb-4">Добро пожаловать в систему подготовки к ЕГЭ</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Войдите в аккаунт, чтобы начать подготовку к экзаменам
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/user/login">
            <motion.button
              className="px-6 py-3 bg-[#7b21e2] text-white rounded-lg font-semibold hover:bg-[#6b1bd0] transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Войти
            </motion.button>
          </Link>
          <Link href="/user/create">
            <motion.button
              className="px-6 py-3 bg-card text-[#7b21e2] border-2 border-[#7b21e2] rounded-lg font-semibold hover:bg-[#7b21e2]/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Регистрация
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
