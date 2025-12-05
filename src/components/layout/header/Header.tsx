"use client";

import HeaderMenu from "./HeaderMenu";
import Link from "next/link";
import { BookOpenIcon } from "lucide-react";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/ui/theme/ThemeToggle";

export default function Header() {
  return (
    <div className="flex items-center justify-between h-full px-6 max-w-full">
      <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center size-10 rounded-lg bg-linear-to-br from-[#7b21e2] to-[#9d8cf4] text-white shadow-md"
        >
          <BookOpenIcon className="size-5" />
        </motion.div>
        <div className="flex flex-col">
          <h1 className="text-xl font-bold text-[#5e52cb] leading-tight">ЕГЭ Подготовка</h1>
          <p className="text-xs text-muted-foreground leading-tight">Система подготовки к экзаменам</p>
        </div>
      </Link>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <HeaderMenu />
      </div>
    </div>
  );
}
