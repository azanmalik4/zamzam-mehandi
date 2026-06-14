import { motion } from "framer-motion";
import { Gem, Clock, Leaf, Package, ShieldCheck } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const features = [
  { Icon: Gem, title: "Premium Quality", desc: "Sourced from the finest Rajasthani henna leaves." },
  { Icon: Clock, title: "Long-Lasting Color", desc: "Deep stains that mature beautifully for 10+ days." },
  { Icon: Leaf, title: "Safe Ingredients", desc: "Free from PPD, chemicals and harsh additives." },
  { Icon: Package, title: "Beautiful Packaging", desc: "Designed to be gifted, made to be cherished." },
  { Icon: ShieldCheck, title: "A Trusted Brand", desc: "15 years, three generations, one standard." },
];

export function WhyUs() {
  return (
    <section id="why" className="relative px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="An obsession with the details"
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="glass group rounded-3xl p-6 transition-all hover:-translate-y-1"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/30 ring-1 ring-white/10 transition-all group-hover:bg-primary/50">
                <f.Icon className="h-5 w-5 text-[color:var(--glow)]" strokeWidth={1.5} />
              </div>
              <h3 className="mt-5 text-lg font-semibold tracking-tight">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}