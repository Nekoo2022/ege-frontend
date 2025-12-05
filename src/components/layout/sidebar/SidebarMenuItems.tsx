// components/Sidebar/menuItems.ts
import {
  ChartPieIcon,
  Files,
  FolderClosedIcon,
  HouseIcon,
  MessageCircleQuestionIcon,
  MonitorSmartphone,
  Palette,
  Settings,
  Shield,
  User,
} from "lucide-react";

export const mainMenuItems = [
  { href: "/", icon: HouseIcon, label: "Главная", match: (pathname: string) => pathname === "/" },
  { href: "/subject", icon: FolderClosedIcon, label: "Все предметы", match: (pathname: string) => pathname.includes("/subject") },
  { href: "/statistic", icon: ChartPieIcon, label: "Статистика", match: (pathname: string) => pathname.includes("/statistic") },
  { href: "/support", icon: MessageCircleQuestionIcon, label: "Поддержка", match: (pathname: string) => pathname === "/support" },
  { href: "/variant", icon: Files, label: "Варианты", match: (pathname: string) => pathname.includes("/variant") },
  {
    href: "/user/settings",
    icon: Settings,
    label: "Настройки",
    match: (pathname: string) => pathname.includes("/user/settings"),
  },
];

export const accountMenuItems = [
  { icon: User, label: "Профиль и оформление", value: "profile" },
  { icon: Palette, label: "Аккаунт", value: "account" },
  { icon: Shield, label: "Безопасность", value: "security" },
  { icon: MonitorSmartphone, label: "Сессии", value: "sessions" },
];
