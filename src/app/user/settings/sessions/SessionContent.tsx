import { FindSessionsByUserQuery, useFindCurrentSessionQuery, useFindSessionsByUserQuery } from "@/graphql/generated/output";
import { SessionItem } from "./SessionItem";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/common/Card";
import { Button } from "@/components/ui/common/Button";
import { MonitorSmartphone, Loader2, LogOut } from "lucide-react";
import { TabsContent } from "@/components/ui/common/Tabs";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/ui/animations/FadeIn";

export function SessionContent() {
  const { data: currentSessionData, loading: currentLoading } = useFindCurrentSessionQuery();
  const current = currentSessionData?.FindCurrentSession;

  const { data: sessionsData, loading: sessionsLoading, refetch } = useFindSessionsByUserQuery();
  const sessions = sessionsData?.FindSessionsByUser ?? [];

  // console.log(sessions.length);

  // попытка исключить текущую из списка других
  const otherSessions = current
    ? sessions.filter(
        (s) =>
          !(
            s.metadata.ip === current.metadata.ip &&
            s.metadata.device.browser === current.metadata.device.browser &&
            s.metadata.device.os === current.metadata.device.os &&
            s.createdAt === current.createdAt
          )
      )
    : sessions;

  return (
    <TabsContent className="space-y-10" value="session">
      <FadeIn>
        <Card className="mt-5">
          <CardHeader className="flex items-center justify-between">
            <div>
              <CardTitle>Сессии</CardTitle>
              <CardDescription>Ваши активные входы на разных устройствах. Закрывайте подозрительные сеансы.</CardDescription>
            </div>
            <MonitorSmartphone className="size-5 text-muted-foreground" />
          </CardHeader>
        </Card>
      </FadeIn>

      <motion.div
        className="space-y-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.05 }}
      >
        <h3 className="text-2xl font-semibold">Текущая сессия</h3>
        {currentLoading ? (
          <Card>
            <CardHeader className="flex items-center gap-3">
              <Loader2 className="size-4 animate-spin text-muted-foreground" />
              <CardTitle>Загрузка...</CardTitle>
            </CardHeader>
          </Card>
        ) : current ? (
          <FadeIn>
            <SessionItem session={current} isCurrent />
          </FadeIn>
        ) : (
          <Card>
            <CardContent>
              <div className="text-sm text-muted-foreground">Текущая сессия не найдена</div>
            </CardContent>
          </Card>
        )}
      </motion.div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-semibold">Другие активные сессии</h3>
          <Button className="bg-destructive text-destructive-foreground" disabled>
            <LogOut className="mr-2 size-4" /> Выйти из всех
          </Button>
        </div>

        {sessionsLoading ? (
          <div className="grid gap-4 md:grid-cols-2">
            {[...Array(2)].map((_, i) => (
              <Card key={i}>
                <CardHeader className="flex items-center gap-3">
                  <div className="size-12 rounded-full bg-muted animate-pulse" />
                  <div className="space-y-2 w-full">
                    <div className="h-4 w-40 bg-muted rounded animate-pulse" />
                    <div className="h-3 w-56 bg-muted rounded animate-pulse" />
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : otherSessions.length === 0 ? (
          <Card>
            <CardContent>
              <div className="text-sm text-muted-foreground">Других активных сессий не найдено</div>
            </CardContent>
          </Card>
        ) : (
          <motion.div
            className="grid gap-4 md:grid-cols-2"
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          >
            {otherSessions.map((otherSession, idx) => (
              <motion.div
                key={idx}
                variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.25 }}
              >
                {/* тип FindSessionsByUser и FindCurrentSession достаточно совместимы по используемым полям */}
                <SessionItem session={otherSession} refetch={refetch} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </TabsContent>
  );
}
