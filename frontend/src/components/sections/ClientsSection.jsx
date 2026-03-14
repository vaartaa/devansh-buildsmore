import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { prestigiousClients } from "@/data/siteContent";

export default function ClientsSection() {
  return (
    <div className="section-shell">
      <div className="content-container space-y-10">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <p className="section-eyebrow" data-testid="clients-eyebrow">Trusted By</p>
          <h2 className="section-title" data-testid="clients-title">
            Prestigious Clients Across Public & Private Sectors
          </h2>
          <p className="section-description" data-testid="clients-description">
            Building lasting partnerships with government bodies and leading private developers through consistent quality and reliable execution.
          </p>
        </div>

        {/* Government Clients Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <div className="inline-flex items-center gap-3 rounded-lg border border-[#ff6b00]/30 bg-[#ff6b00]/10 px-6 py-3">
            <Award className="h-5 w-5 text-[#ff9c52]" />
            <div className="text-left">
              <p className="text-sm font-semibold text-white">Government Approved</p>
              <p className="text-xs text-[#b8b8b8]">Trusted by GHMC & NBCC</p>
            </div>
          </div>
        </motion.div>

        {/* Client Logos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {prestigiousClients.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group"
            >
              <div className="surface-panel flex flex-col items-center justify-center p-6 h-full transition-all duration-300 hover:border-[#ff6b00]/50">
                <div className="relative w-full aspect-square flex items-center justify-center mb-3">
                  <img
                    src={client.logo}
                    alt={client.fullName || client.name}
                    className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-110"
                    style={{ filter: 'brightness(1.2) contrast(1.1)' }}
                  />
                </div>
                <p className="text-sm font-semibold text-white text-center">{client.name}</p>
                {client.fullName && (
                  <p className="text-xs text-[#b8b8b8] text-center mt-1">{client.fullName}</p>
                )}
                <span className={`mt-2 inline-block text-xs px-2 py-1 rounded ${
                  client.sector === 'Government'
                    ? 'bg-blue-500/20 text-blue-300'
                    : 'bg-purple-500/20 text-purple-300'
                }`}>
                  {client.sector}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="surface-panel max-w-4xl mx-auto text-center p-8"
        >
          <p className="text-lg text-[#b8b8b8] leading-relaxed">
            Our close partnerships with prestigious clients including government bodies like <span className="text-[#ff9c52] font-semibold">GHMC</span> and <span className="text-[#ff9c52] font-semibold">NBCC</span>, along with leading private developers across Noida and Ghaziabad, reflect the trust and technical excellence we bring to every project.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
