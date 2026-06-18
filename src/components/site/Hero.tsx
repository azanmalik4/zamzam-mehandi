import { motion } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo-1.png";

const particles = Array.from({ length: 14 }).map((_, i) => ({
  id: i,
  size: 4 + Math.random() * 10,
  left: Math.random() * 100,
  top: Math.random() * 100,
  delay: Math.random() * 6,
  duration: 7 + Math.random() * 6,
}));

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-5 pt-10"
    >
      {/* particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {particles.map((p) => (
          <span
            key={p.id}
            className="particle"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.left}%`,
              top: `${p.top}%`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
      </div>

      {/* glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_var(--glow)_0%,_transparent_60%)] opacity-20 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="glass relative z-10 mx-auto w-full max-w-2xl rounded-3xl px-7 py-10 text-center sm:px-12 sm:py-14"
      >
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl overflow-hidden">
          <img src={logo} alt="Noor Mehandi Logo" className="h-full w-full object-contain" />
        </div>

        <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.35em] text-[color:var(--lavender)]">
          Zam Zam Mehandi · Est. 2008
        </p>

        <h1 className="glow-text text-4xl font-semibold leading-[1.05] sm:text-6xl">
          Premium Mehandi,
          <br />
          crafted with tradition.
        </h1>

        <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
          A heritage henna house blending pure ingredients with timeless artistry — for color that
          lasts and skin that breathes.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="rounded-full bg-primary px-7 text-primary-foreground shadow-[0_10px_40px_-10px_var(--primary)] hover:bg-primary/90"
          >
            <a href="#products">Explore Products</a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-full border-white/15 bg-white/5 px-7 backdrop-blur hover:bg-white/10 hover:text-foreground"
          >
            <a href="#contact">Contact Us</a>
          </Button>
        </div>
      </motion.div>

      <motion.a
        href="#products"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-muted-foreground"
        aria-label="Scroll to products"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex flex-col items-center gap-1"
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <ArrowDown className="h-4 w-4" />
        </motion.div>
      </motion.a>
    </section>
  );
}
