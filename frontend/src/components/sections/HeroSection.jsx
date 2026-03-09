import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { label: "Projects Delivered", value: "180+" },
  { label: "Cities & Regions", value: "NCR + Meerut" },
  { label: "Execution Focus", value: "Quality + Timeline" },
];

export default function HeroSection() {
  return (
    <div className="section-shell">
      <div className="content-container grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="space-y-7"
        >
          <p className="section-eyebrow" data-testid="hero-eyebrow">
            Devansh Buildsmore · Ghaziabad, Uttar Pradesh
          </p>
          <h1 className="hero-title" data-testid="hero-title">
            Built for Scale.
            <br />
            Engineered for Trust.
          </h1>
          <p className="hero-description" data-testid="hero-description">
            We deliver modern residential and commercial construction across NCR and nearby regions, blending structural discipline, transparent execution, and premium finishing standards.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button
              asChild
              className="primary-cta"
              data-testid="hero-request-visit-button"
            >
              <a href="#contact">
                Request a Site Visit <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="secondary-cta"
              data-testid="hero-view-services-button"
            >
              <a href="#services">Explore Capabilities</a>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="surface-panel"
          data-testid="hero-stats-panel"
        >
          <p className="mb-6 text-sm uppercase tracking-[0.35em] text-[#ff9c52]">Performance Snapshot</p>
          <div className="space-y-6">
            {stats.map((stat) => (
              <div key={stat.label} className="border-b border-[#333333] pb-5 last:border-none last:pb-0">
                <p className="text-[2rem] font-bold tracking-tight text-white" data-testid={`hero-stat-value-${stat.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>
                  {stat.value}
                </p>
                <p className="text-sm text-[#b8b8b8]" data-testid={`hero-stat-label-${stat.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}