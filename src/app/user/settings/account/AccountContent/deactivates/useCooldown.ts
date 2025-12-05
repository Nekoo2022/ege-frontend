import { useEffect, useRef, useState } from "react";

export function useCooldown(key: string, duration = 30) {
  const [cooldown, setCooldown] = useState(0);
  const ref = useRef(cooldown);
  ref.current = cooldown;

  useEffect(() => {
    const lastSend = localStorage.getItem(key);
    if (lastSend) {
      const elapsed = Math.floor((Date.now() - parseInt(lastSend, 10)) / 1000);
      if (elapsed < duration) setCooldown(duration - elapsed);
    }

    const interval = setInterval(() => {
      if (ref.current > 0) setCooldown((s) => Math.max(0, s - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [key, duration]);

  const start = () => {
    localStorage.setItem(key, Date.now().toString());
    setCooldown(duration);
  };

  return { cooldown, start };
}
