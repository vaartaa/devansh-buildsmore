import { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { label: "Years of Experience", value: "13+" },
  { label: "Projects Worth", value: "₹100+ Cr" },
  { label: "Quality Certified", value: "ISO 9001:2015" },
];

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), springConfig);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

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
            ISO 9001:2015 certified construction company delivering residential, commercial, and institutional projects across NCR with modern engineering techniques, experienced technical teams, and partnership with internationally acclaimed architects.
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
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
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