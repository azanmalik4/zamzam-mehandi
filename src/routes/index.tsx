import { createFileRoute } from "@tanstack/react-router";
import { SideNav } from "@/components/site/SideNav";
import { Hero } from "@/components/site/Hero";
import { Products } from "@/components/site/Products";
import { About } from "@/components/site/About";
import { WhyUs } from "@/components/site/WhyUs";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { ThemeToggle } from "@/components/site/ThemeToggle";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Zam Zam Mehndi | Premium Henna Cones in Karachi & Pakistan" },
      { name: "description", content: "Zam Zam Mehndi: natural henna cones, bridal mehndi and herbal hair color. Based in Karachi, delivering across Pakistan. Order on WhatsApp." },
      { property: "og:title", content: "Zam Zam Mehndi Premium Henna" },
      { property: "og:description", content: "Premium mehandi products crafted with quality and tradition." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
<main className="relative min-h-screen overflow-x-clip">
      <SideNav />
      <Hero />
      <Products />
      <About />
      <WhyUs />
      <ThemeToggle />
      <Contact />
      <Footer />
    </main>
  );
}
