import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Home, Sparkles, Building2, Star, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { id: "home", label: "Home", Icon: Home },
  { id: "products", label: "Products", Icon: Sparkles },
  { id: "about", label: "About", Icon: Building2 },
  { id: "why", label: "Why Us", Icon: Star },
  { id: "contact", label: "Contact", Icon: Phone },
];

export function SideNav() {
  const [active, setActive] = useState<string>("home");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) obs.observe(el);
    });

    return () => obs.disconnect();
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2"
      aria-label="Section navigation"
    >
      <ul className="glass flex flex-row items-center gap-1 rounded-full px-3 py-2">
        {items.map(({ id, label, Icon }) => {
          const isActive = active === id;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                className={cn(
                  "flex flex-col items-center justify-center gap-0.5 rounded-full px-3 py-2 transition-all",
                  isActive
                    ? "bg-primary text-primary-foreground ring-glow"
                    : "text-muted-foreground hover:text-foreground",
                )}
                aria-label={label}
              >
                <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                <span className="text-[9px] font-medium leading-none">{label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </motion.nav>
  );
}