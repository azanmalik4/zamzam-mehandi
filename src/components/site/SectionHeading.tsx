import { motion } from "framer-motion";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="mx-auto mb-12 max-w-xl text-center"
    >
      <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.35em] text-[color:var(--lavender)]">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-semibold sm:text-4xl">{title}</h2>
      {subtitle && (
        <p className="mt-3 text-sm text-muted-foreground sm:text-base">{subtitle}</p>
      )}
    </motion.div>
  );
}