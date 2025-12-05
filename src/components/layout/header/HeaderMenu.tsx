"use client";

import { Button } from "@/components/ui/common/Button";
import { Skeleton } from "@/components/ui/common/Skeleton";
import { useAuth } from "@/hooks/useAuth";
import LogoutButton from "@/components/feature/auth/forms/LogoutButton";
import UserAvatar from "@/components/feature/auth/UserAvatar";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HeaderMenu() {
  const { isAuthentificated, isAuthLoading } = useAuth();

  if (isAuthLoading) {
    return (
      <div className="flex items-center gap-x-4">
        <Skeleton className="size-10 rounded-full" />
        <Skeleton className="h-9 w-20 rounded-md" />
      </div>
    );
  }

  if (isAuthentificated) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-x-3"
      >
        <UserAvatar />
        <LogoutButton />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center gap-x-3"
    >
      <Link href={"/user/login"}>
        <Button variant="ghost" className="text-[#5e52cb] hover:text-[#7b21e2] hover:bg-[#7b21e2]/10 font-medium">
          Войти
        </Button>
      </Link>
      <Link href={"/user/create"}>
        <Button className="bg-linear-to-r from-[#7b21e2] to-[#9d8cf4] hover:from-[#6b1bd0] hover:to-[#8d7ce4] shadow-md hover:shadow-lg transition-all">
          Регистрация
        </Button>
      </Link>
    </motion.div>
  );
}
