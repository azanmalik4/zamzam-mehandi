import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  QrCode,
  Smartphone,
  Monitor,
  Calendar,
  Search,
  RefreshCw,
  LogOut,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
  head: () => ({
    meta: [{ title: "Admin · Scan Analytics" }],
  }),
});

type Scan = {
  id: string;
  ip: string | null;
  country: string | null;
  city: string | null;
  device: string | null;
  browser: string | null;
  os: string | null;
  screen_width: number | null;
  screen_height: number | null;
  scanned_at: string;
};

const SESSION_KEY = "admin_authed";

function AdminPage() {
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === "true") {
      setAuthed(true);
    }
  }, []);

  if (!authed) return <PasswordGate onSuccess={() => setAuthed(true)} />;

  return (
    <Dashboard
      onLogout={() => {
        sessionStorage.removeItem(SESSION_KEY);
        setAuthed(false);
      }}
    />
  );
}

function PasswordGate({ onSuccess }: { onSuccess: () => void }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const correct = import.meta.env.VITE_ADMIN_PASSWORD as string;
    if (value === correct) {
      sessionStorage.setItem(SESSION_KEY, "true");
      onSuccess();
    } else {
      setError(true);
      setValue("");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-5">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass w-full max-w-sm rounded-3xl p-8 text-center"
      >
        <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/40 ring-glow">
          <Lock className="h-5 w-5 text-[color:var(--glow)]" strokeWidth={1.5} />
        </div>
        <h1 className="text-xl font-semibold tracking-tight">Admin Access</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Enter the password to view scan analytics.
        </p>
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
          <input
            type="password"
            autoFocus
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setError(false);
            }}
            placeholder="Password"
            className={cn(
              "w-full rounded-xl border bg-white/[0.03] px-4 py-2.5 text-sm outline-none transition-colors",
              "placeholder:text-muted-foreground/60",
              error
                ? "border-destructive/60 focus:border-destructive"
                : "border-white/10 focus:border-[color:var(--glow)]/50",
            )}
          />
          {error && (
            <p className="text-left text-xs text-destructive">
              Incorrect password. Try again.
            </p>
          )}
          <button
            type="submit"
            className="mt-1 rounded-full bg-primary py-2.5 text-sm font-medium text-primary-foreground shadow-[0_10px_40px_-10px_var(--primary)] transition-colors hover:bg-primary/90"
          >
            Unlock
          </button>
        </form>
      </motion.div>
    </div>
  );
}

// ── helpers ──────────────────────────────────────────────────────────────────

type TimeFilter = "today" | "week" | "month" | "all";

function getStartDate(filter: TimeFilter): Date | null {
  const now = new Date();
  if (filter === "today") {
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }
  if (filter === "week") {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    d.setDate(d.getDate() - d.getDay());
    return d;
  }
  if (filter === "month") {
    return new Date(now.getFullYear(), now.getMonth(), 1);
  }
  return null; // "all"
}

// ── dashboard ────────────────────────────────────────────────────────────────

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [scans, setScans] = useState<Scan[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deviceFilter, setDeviceFilter] = useState("all");
  const [browserFilter, setBrowserFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("all");

  const fetchScans = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("scans")
      .select("*")
      .order("scanned_at", { ascending: false })
      .limit(1000);
    if (!error && data) setScans(data as Scan[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchScans();
  }, []);

  // Stats always calculated from ALL scans regardless of filters
  const stats = useMemo(() => {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfWeek = new Date(startOfToday);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    return {
      total: scans.length,
      today: scans.filter((s) => new Date(s.scanned_at) >= startOfToday).length,
      week: scans.filter((s) => new Date(s.scanned_at) >= startOfWeek).length,
      month: scans.filter((s) => new Date(s.scanned_at) >= startOfMonth).length,
    };
  }, [scans]);

  const browsers = useMemo(
    () =>
      Array.from(new Set(scans.map((s) => s.browser).filter(Boolean))) as string[],
    [scans],
  );

  const filtered = useMemo(() => {
    const startDate = getStartDate(timeFilter);
    return scans.filter((s) => {
      const matchesTime = !startDate || new Date(s.scanned_at) >= startDate;
      const matchesSearch =
        search.trim() === "" ||
        [s.ip, s.country, s.city]
          .filter(Boolean)
          .some((f) => f!.toLowerCase().includes(search.toLowerCase()));
      const matchesDevice = deviceFilter === "all" || s.device === deviceFilter;
      const matchesBrowser = browserFilter === "all" || s.browser === browserFilter;
      return matchesTime && matchesSearch && matchesDevice && matchesBrowser;
    });
  }, [scans, search, deviceFilter, browserFilter, timeFilter]);

  return (
    <div className="min-h-screen px-5 py-10 sm:px-8 sm:py-14">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/40 ring-glow">
              <QrCode className="h-5 w-5 text-[color:var(--glow)]" strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
                Scan Analytics
              </h1>
              <p className="text-xs text-muted-foreground sm:text-sm">
                Anonymous QR scan activity
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={fetchScans}
              className="flex h-10 items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-4 text-xs font-medium transition-colors hover:bg-white/[0.06]"
            >
              <RefreshCw
                className={cn("h-3.5 w-3.5", loading && "animate-spin")}
                strokeWidth={1.75}
              />
              Refresh
            </button>
            <button
              onClick={onLogout}
              className="flex h-10 items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-4 text-xs font-medium transition-colors hover:bg-white/[0.06]"
            >
              <LogOut className="h-3.5 w-3.5" strokeWidth={1.75} />
              Lock
            </button>
          </div>
        </div>

        {/* Stats cards — always show full totals */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {[
            { label: "Total Scans", value: stats.total },
            { label: "Today", value: stats.today },
            { label: "This Week", value: stats.week },
            { label: "This Month", value: stats.month },
          ].map((s) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="glass rounded-2xl px-4 py-5 text-center sm:px-6 sm:py-6"
            >
              <div className="text-2xl font-semibold text-[color:var(--glow)] sm:text-3xl">
                {s.value}
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.25em] text-muted-foreground sm:text-[11px]">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              strokeWidth={1.75}
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by IP, country, or city..."
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-2.5 pl-10 pr-4 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-[color:var(--glow)]/50"
            />
          </div>

          {/* Time filter — NEW */}
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value as TimeFilter)}
            className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm outline-none transition-colors focus:border-[color:var(--glow)]/50"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>

          {/* Device filter */}
          <select
            value={deviceFilter}
            onChange={(e) => setDeviceFilter(e.target.value)}
            className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm outline-none transition-colors focus:border-[color:var(--glow)]/50"
          >
            <option value="all">All Devices</option>
            <option value="Mobile">Mobile</option>
            <option value="Desktop">Desktop</option>
          </select>

          {/* Browser filter */}
          <select
            value={browserFilter}
            onChange={(e) => setBrowserFilter(e.target.value)}
            className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm outline-none transition-colors focus:border-[color:var(--glow)]/50"
          >
            <option value="all">All Browsers</option>
            {browsers.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        {/* Table */}
        <div className="glass mt-5 overflow-hidden rounded-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  <th className="whitespace-nowrap px-5 py-3.5 font-medium">Date & Time</th>
                  <th className="whitespace-nowrap px-5 py-3.5 font-medium">IP Address</th>
                  <th className="whitespace-nowrap px-5 py-3.5 font-medium">Location</th>
                  <th className="whitespace-nowrap px-5 py-3.5 font-medium">Device</th>
                  <th className="whitespace-nowrap px-5 py-3.5 font-medium">Browser</th>
                  <th className="whitespace-nowrap px-5 py-3.5 font-medium">OS</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filtered.map((s) => (
                    <motion.tr
                      key={s.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="border-b border-white/[0.06] last:border-0 hover:bg-white/[0.02]"
                    >
                      <td className="whitespace-nowrap px-5 py-3 text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 opacity-60" strokeWidth={1.75} />
                          {new Date(s.scanned_at).toLocaleString()}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-5 py-3 font-mono text-xs">
                        {s.ip || "—"}
                      </td>
                      <td className="whitespace-nowrap px-5 py-3">
                        {[s.city, s.country].filter(Boolean).join(", ") || "—"}
                      </td>
                      <td className="whitespace-nowrap px-5 py-3">
                        <span className="inline-flex items-center gap-1.5">
                          {s.device === "Mobile" ? (
                            <Smartphone
                              className="h-3.5 w-3.5 text-[color:var(--lavender)]"
                              strokeWidth={1.75}
                            />
                          ) : (
                            <Monitor
                              className="h-3.5 w-3.5 text-[color:var(--lavender)]"
                              strokeWidth={1.75}
                            />
                          )}
                          {s.device || "—"}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-5 py-3">{s.browser || "—"}</td>
                      <td className="whitespace-nowrap px-5 py-3">{s.os || "—"}</td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {!loading && filtered.length === 0 && (
            <div className="py-16 text-center text-sm text-muted-foreground">
              No scans match your filters.
            </div>
          )}
          {loading && (
            <div className="py-16 text-center text-sm text-muted-foreground">
              Loading scans...
            </div>
          )}
        </div>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          Showing {filtered.length} of {scans.length} scans
        </p>
      </div>
    </div>
  );
}