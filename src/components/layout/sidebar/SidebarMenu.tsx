import { motion } from "framer-motion";
import { SidebarMenuItem } from "./SidebarMenuItem";

interface SidebarMenuProps {
  items: any[];
  isAccountMenu?: boolean;
  activeValue?: string;
  setActiveValue?: (value: string) => void;
  pathname?: string;
}

export function SidebarMenu({ items, isAccountMenu, activeValue, setActiveValue, pathname }: SidebarMenuProps) {
  return (
    <div className="flex flex-col gap-2">
      {items.map((item, index) => {
        const isActive = isAccountMenu ? activeValue === item.value : item.match(pathname);
        return (
          <motion.div
            key={isAccountMenu ? item.value : item.href}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <SidebarMenuItem
              label={item.label}
              Icon={item.icon}
              isActive={isActive}
              onClick={isAccountMenu ? () => setActiveValue?.(item.value) : undefined}
              href={item.href}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
