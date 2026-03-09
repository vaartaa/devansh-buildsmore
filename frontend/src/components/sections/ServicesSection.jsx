import { motion } from "framer-motion";
import { Building2, Hammer, HardHat, Wrench } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { serviceCards } from "@/data/siteContent";

const serviceIcons = [Building2, HardHat, Hammer, Wrench];

export default function ServicesSection() {
  return (
    <div className="section-shell">
      <div className="content-container space-y-10">
        <div className="max-w-3xl space-y-4">
          <p className="section-eyebrow" data-testid="services-eyebrow">Capabilities</p>
          <h2 className="section-title" data-testid="services-title">Construction Services Across the Full Project Lifecycle</h2>
          <p className="section-description" data-testid="services-description">
            From independent homes to commercial complexes, our teams handle civil execution, structural integrity, and coordinated project delivery.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {serviceCards.map((card, index) => {
            const Icon = serviceIcons[index % serviceIcons.length];
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <Card className="industrial-card" data-testid={`service-card-${index + 1}`}>
                  <CardHeader className="space-y-4">
                    <div className="inline-flex h-12 w-12 items-center justify-center border border-[#ff6b00] bg-[#ff6b00]/15 text-[#ff9c52]" data-testid={`service-card-icon-${index + 1}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-2xl" data-testid={`service-card-title-${index + 1}`}>{card.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-base text-[#b8b8b8]" data-testid={`service-card-description-${index + 1}`}>{card.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}