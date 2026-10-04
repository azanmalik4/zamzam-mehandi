import { motion } from "framer-motion";
import aboutImg from "@/assets/about.jpg";

export function About() {
  return (
    <section id="about" className="relative px-5 py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="glass relative overflow-hidden rounded-3xl p-2"
        >
          <img
            src={aboutImg}
            alt="Intricate henna pattern on a hand"
            loading="lazy"
            width={900}
            height={1100}
            className="aspect-[4/5] w-full rounded-2xl object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.35em] text-[color:var(--lavender)]">
            Our Story
          </p>
          <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">
            About our company
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
           Since 2001, we have been dedicated to creating mehndi cones with a passion for quality, tradition, and craftsmanship. Every cone we manufacture is the result of careful attention, sincere effort, and years of experience. From thoughtfully developing and refining our formulation to carefully preparing and packaging each cone, we take pride in every detail of the process. For us, mehndi is more than just a product it is a part of celebrations, memories, and moments that deserve to be cherished.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
             From beautiful shaadi celebrations, Eid and festive occasions to family gatherings and special moments, we create our cones to complement every occasion where the elegance of mehndi belongs.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-3">
            {[
              { v: "25+", l: "Years" },
              { v: "100%", l: "Natural" },
              { v: "Pak", l: "Trusted" },
            ].map((s) => (
              <div key={s.l} className="glass rounded-2xl px-3 py-4 text-center">
                <div className="text-xl font-semibold text-[color:var(--glow)]">{s.v}</div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}