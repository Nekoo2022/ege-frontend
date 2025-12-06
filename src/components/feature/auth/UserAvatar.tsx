"use client";

import { useFindMeQuery } from "@/graphql/generated/output";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { motion } from "framer-motion";

export default function UserAvatar() {
  const { isAuthentificated, isAuthLoading } = useAuth();
  const { data, loading } = useFindMeQuery({
    skip: !isAuthentificated,
    fetchPolicy: "cache-and-network",
    errorPolicy: "all",
  });

  // Если не авторизован или данные загружаются, не показываем аватар
  if (!isAuthentificated || isAuthLoading || loading) {
    return null;
  }

  // Если нет данных пользователя, тоже не показываем
  if (!data?.FindMe?.user?.email) {
    return null;
  }

  const email = data.FindMe.user.email;
  const firstLetter = email.charAt(0).toUpperCase() || "?";

  return (
    <Link href="/user/settings">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center justify-center size-10 rounded-full bg-linear-to-br from-[#7b21e2] to-[#9d8cf4] text-white font-semibold text-lg shadow-md hover:shadow-lg transition-all cursor-pointer border-2 border-white"
      >
        {firstLetter}
      </motion.div>
    </Link>
  );
}
