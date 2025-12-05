import { motion } from "framer-motion";
import { Button } from "@/components/ui/common/Button";
import { cn } from "@/utils/utils";
import Link from "next/link";

interface SidebarMenuItemProps {
  label: string;
  Icon: React.FC<any>;
  isActive: boolean;
  onClick?: () => void;
  href?: string;
}

export function SidebarMenuItem({ label, Icon, isActive, onClick, href }: SidebarMenuItemProps) {
  const content = (
    <Button
      variant="ghost"
      className={cn(
        "group relative flex items-center gap-x-3 justify-start w-full h-12 px-4 rounded-xl transition-all duration-200",
        isActive
          ? "bg-linear-to-r from-primary/10 to-primary/10 text-primary shadow-sm"
          : "text-muted-foreground hover:text-primary hover:bg-primary/5"
      )}
      onClick={onClick}
    >
      {isActive && (
        <motion.div
          layoutId="activeIndicator"
          className="absolute left-0 top-0 bottom-0 w-1 bg-linear-to-b from-primary to-primary/80 rounded-r-full"
          initial={false}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
      <div
        className={cn(
          "flex items-center justify-center size-8 rounded-lg transition-all duration-200",
          isActive
            ? "bg-linear-to-br from-primary to-primary/80 text-primary-foreground shadow-md"
            : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
        )}
      >
        <Icon className="size-4" />
      </div>
      <span className={cn("text-sm font-medium transition-colors", isActive ? "text-primary" : "group-hover:text-primary")}>
        {label}
      </span>
    </Button>
  );

  return href ? <Link href={href}>{content}</Link> : content;
}
