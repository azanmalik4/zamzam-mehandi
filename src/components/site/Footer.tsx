import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative px-5 pb-28 pt-6">
      <div className="mx-auto max-w-6xl">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[color:var(--primary)] to-transparent opacity-60" />
        <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/40 ring-1 ring-white/10">
              <Sparkles className="h-4 w-4 text-[color:var(--glow)]" strokeWidth={1.5} />
            </div>
            <span className="font-display text-sm font-semibold tracking-tight">Zam Zam  Mehandi</span>
          </div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Zam Zam Mehandi. Crafted with tradition.
          </p>
        </div>
      </div>
    </footer>
  );
}