"use client";

import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
// removed unused useRouter/useEffect imports
import { useFindMeQuery } from "@/graphql/generated/output";
import { Skeleton } from "@/components/ui/common/Skeleton";
import { Tabs } from "@/components/ui/common/Tabs";
import Header from "@/components/layout/header/Header";
import { SessionContent } from "./sessions/SessionContent";
import { TabsListComponent } from "./TabsListComponent";
import { AccountContent } from "./account/AccountContent";
import { HeaderSkeleton } from "@/components/layout/header/HeaderSkeleton";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/common/Card";
import { Button } from "@/components/ui/common/Button";
import { UserPlus, LogIn, ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import Sidebar from "@/components/layout/sidebar/Sidebar";

export default function SettingsPage() {
  const { isAuthentificated, isAuthLoading } = useAuth();
  const { data, loading: isUserLoading, refetch } = useFindMeQuery({ skip: !isAuthentificated });

  if (!isAuthentificated) {
    return (
      <div>
        <header className="fixed top-0 inset-x-0 z-50 w-full h-20 bg-card border-b border-border shadow-sm">
          <Header />
        </header>

        <div className="bg-background p-6 mt-[70px] min-h-[60vh] flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="max-w-3xl mx-auto w-full"
          >
            <Card className="text-center p-10">
              <CardHeader className="items-center justify-center">
                <UserPlus className="size-20 text-[#7b21e2] mx-auto opacity-90" />
                <CardTitle className="text-3xl font-bold text-foreground mt-4">Добро пожаловать!</CardTitle>
                <CardDescription className="mt-1 text-muted-foreground max-w-xl mx-auto">
                  Чтобы настроить аккаунт, просматривать личную статистику и синхронизировать прогресс, пожалуйста,
                  войдите в аккаунт или зарегистрируйтесь. Мы сохраняем ваши результаты и подберём
                  персонализированные рекомендации.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row gap-4 sm:justify-center items-center">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link href="/user/create">
                      <Button
                        className="bg-linear-to-r from-[#7b21e2] to-[#9d8cf4] hover:from-[#6b1bd0] hover:to-[#8d7ce4] text-white shadow-md hover:shadow-lg transition-all px-6 py-3 rounded-md flex items-center gap-2"
                        size="lg"
                      >
                        Зарегистрироваться
                        <ArrowRightIcon className="size-4" />
                      </Button>
                    </Link>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link href="/user/login">
                      <Button
                        variant="outline"
                        size="lg"
                        className="border-[#7b21e2] text-[#7b21e2] hover:bg-[#7b21e2]/5 font-medium px-6 py-3 rounded-md flex items-center gap-2"
                      >
                        Войти
                        <LogIn className="size-4" />
                      </Button>
                    </Link>
                  </motion.div>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  Или продолжайте смотреть задачи без сохранения прогресса
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  if (isAuthLoading || isUserLoading) {
    return (
      <div>
        <HeaderSkeleton />
        <div className="bg-background p-6 mt-[70px]">
          <Skeleton className="h-8 w-64 mx-auto mb-6 mt-5" />

          <div className="mt-4 w-full overflow-x-auto rounded-md border bg-card/60 backdrop-blur p-2 shadow-sm flex gap-2 h-[50px]">
            <Skeleton className="h-full w-24 rounded-md" />
            <Skeleton className="h-full w-28 rounded-md" />
            <Skeleton className="h-full w-28 rounded-md" />
          </div>

          <div className="mt-4 space-y-4">
            <Skeleton className="h-24 rounded-2xl" />
            <div className="grid gap-4 md:grid-cols-2">
              <Skeleton className="h-56 rounded-2xl" />
              <Skeleton className="h-56 rounded-2xl" />
            </div>
            <Skeleton className="h-48 rounded-2xl" />
            <Skeleton className="h-48 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  // already handled unauthenticated state above

  const email = data?.FindMe?.user?.email ?? "";
  const initial = email.charAt(0).toUpperCase() || "?";

  return (
    <div>
      <header className="fixed top-0 inset-x-0 z-50 w-full h-20 bg-card border-b border-border shadow-sm">
        <Header />
      </header>
      <div className="bg-background p-6 mt-[70px]">
        <motion.h1
          className="text-3xl font-bold text-foreground text-center mb-6 mt-5"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          Настройки аккаунта
        </motion.h1>
        <Tabs defaultValue="account">
          <TabsListComponent />
          <AccountContent
            initial={initial}
            email={email}
            isTwoFactor={data?.FindMe.user?.isTwoFactor!}
            isDeactivated={data?.FindMe.user?.isDeactivated!}
            refetch={refetch}
            telegramId={data?.FindMe.user?.telegramId!}
          />
          <SessionContent />
        </Tabs>
      </div>
    </div>
  );
}
