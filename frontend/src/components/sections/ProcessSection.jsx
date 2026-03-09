import { motion } from "framer-motion";
import { processSteps } from "@/data/siteContent";

export default function ProcessSection() {
  return (
    <div className="section-shell">
      <div className="content-container space-y-10">
        <div className="max-w-3xl space-y-4">
          <p className="section-eyebrow" data-testid="process-eyebrow">Execution Model</p>
          <h2 className="section-title" data-testid="process-title">A Practical Four-Stage Delivery System</h2>
          <p className="section-description" data-testid="process-description">
            Our process is intentionally transparent: measurable milestones, structured updates, and accountable engineering decisions.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {processSteps.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
              className="process-item"
              data-testid={`process-step-${item.step}`}
            >
              <p className="text-5xl font-bold text-[#ff7e26]" data-testid={`process-step-number-${item.step}`}>{item.step}</p>
              <div className="space-y-3">
                <h3 className="text-2xl font-semibold text-white" data-testid={`process-step-title-${item.step}`}>{item.title}</h3>
                <p className="text-[#b8b8b8]" data-testid={`process-step-detail-${item.step}`}>{item.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}