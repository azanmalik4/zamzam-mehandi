import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import p1 from "@/assets/product-1.jpg";
import p2 from "@/assets/product-2.jpg";
import p3 from "@/assets/product-3.jpg";
import p4 from "@/assets/product-4.jpg";
import p5 from "@/assets/product-5.jpg";
import p6 from "@/assets/product-6.jpg";

const products = [
  { img: p1, name: "Signature Henna Cone", desc: "Hand-rolled cone with rich, lasting stain.", size: "25 g · Single Cone" },
  { img: p2, name: "Bridal Heritage Cone", desc: "Our deepest, slowest-developing bridal formula.", size: "30 g · Bridal Box" },
  { img: p3, name: "Organic Henna Powder", desc: "Triple-sifted Rajasthani leaves, lab tested.", size: "100 g · Glass Jar" },
  { img: p4, name: "Instant Black Mehandi", desc: "Bold black finish in under 15 minutes.", size: "30 ml · Tube" },
  { img: p5, name: "Herbal Hair Color", desc: "Ammonia-free copper-mahogany hair tint.", size: "150 g · Box" },
  { img: p6, name: "Luxury Gift Set", desc: "A curated collection in our signature box.", size: "4-piece · Gift Box" },
];

export function Products() {
  return (
    <section id="products" className="relative px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="The Collection"
          title="Crafted in small batches"
          subtitle="Six essentials, each made with the same uncompromising standard."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
            <motion.article
              key={p.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group glass relative overflow-hidden rounded-3xl p-3 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_80px_-20px_var(--primary)]"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-black/40">
                <img
                  src={p.img}
                  alt={p.name}
                  loading="lazy"
                  width={800}
                  height={1000}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 ring-glow" />
              </div>
              <div className="p-4 pb-3">
                <h3 className="text-lg font-semibold tracking-tight">{p.name}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                <p className="mt-4 text-[11px] uppercase tracking-[0.25em] text-[color:var(--lavender)]">
                  {p.size}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}