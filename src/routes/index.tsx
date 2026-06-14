import { createFileRoute } from "@tanstack/react-router";
import { SideNav } from "@/components/site/SideNav";
import { Hero } from "@/components/site/Hero";
import { Products } from "@/components/site/Products";
import { About } from "@/components/site/About";
import { WhyUs } from "@/components/site/WhyUs";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Noor Mehandi — Premium Henna, Crafted with Tradition" },
      { name: "description", content: "Premium mehandi products crafted with quality and tradition. Discover our luxury henna collection." },
      { property: "og:title", content: "Noor Mehandi — Premium Henna" },
      { property: "og:description", content: "Premium mehandi products crafted with quality and tradition." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative min-h-screen overflow-x-clip pr-16 sm:pr-20">
      <SideNav />
      <Hero />
      <Products />
      <About />
      <WhyUs />
      <Contact />
      <Footer />
    </main>
  );
}
