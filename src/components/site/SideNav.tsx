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
  const [active, setActive] = useState("home");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );
    items.forEach((i) => {
      const el = document.getElementById(i.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="fixed right-2 top-1/2 z-50 -translate-y-1/2 sm:right-5"
      aria-label="Section navigation"
    >
      <ul className="glass flex flex-col gap-0.5 rounded-full p-1 sm:gap-2 sm:p-2">
        {items.map(({ id, label, Icon }) => {
          const isActive = active === id;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                className={cn(
                  "group relative flex flex-col items-center justify-center rounded-full transition-all",
                  "h-12 w-9 sm:h-14 sm:w-12",
                  isActive
                    ? "bg-primary text-primary-foreground ring-glow"
                    : "text-muted-foreground hover:text-foreground",
                )}
                aria-label={label}
              >
                <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                <span className="text-[8px] font-medium leading-none mt-0.5">{label}</span>
                <span
                  className={cn(
                    "absolute right-full mr-3 hidden whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium",
                    "glass sm:group-hover:block",
                  )}
                >
                  {label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </motion.nav>
  );
}
