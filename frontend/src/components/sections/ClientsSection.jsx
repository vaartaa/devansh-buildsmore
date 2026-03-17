import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Award, ChevronLeft, ChevronRight } from "lucide-react";
import { prestigiousClients } from "@/data/siteContent";

export default function ClientsSection() {
  const [position, setPosition] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate the clients array for seamless infinite scroll
  const duplicatedClients = [...prestigiousClients, ...prestigiousClients, ...prestigiousClients];

  const cardWidth = 280 + 24; // card width + gap
  const totalWidth = prestigiousClients.length * cardWidth;

  // Auto-scroll effect
  useEffect(() => {
    if (isPaused) return;

    const intervalId = setInterval(() => {
      setPosition((prev) => {
        const newPos = prev - 1;
        // Reset when we've scrolled through one full set
        if (Math.abs(newPos) >= totalWidth) {
          return 0;
        }
        return newPos;
      });
    }, 30); // Adjust speed here (lower = faster)

    return () => clearInterval(intervalId);
  }, [isPaused, totalWidth]);

  const handlePrevious = () => {
    setPosition((prev) => {
      const newPos = prev + cardWidth;
      // Loop back if we've gone too far right
      if (newPos > 0) {
        return -(totalWidth - cardWidth);
      }
      return newPos;
    });
  };

  const handleNext = () => {
    setPosition((prev) => {
      const newPos = prev - cardWidth;
      // Loop back if we've gone too far left
      if (Math.abs(newPos) >= totalWidth) {
        return 0;
      }
      return newPos;
    });
  };

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

        {/* Auto-scrolling Client Logos Carousel */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-6"
            animate={{ x: position }}
            transition={{ type: "tween", duration: 0.5, ease: "linear" }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {duplicatedClients.map((client, index) => (
              <div
                key={`${client.name}-${index}`}
                className="flex-shrink-0 group"
                style={{ width: '280px' }}
              >
                <div className="surface-panel flex flex-col items-center justify-center p-6 h-full transition-all duration-300 hover:border-[#ff6b00]/50">
                  <div className="relative w-full aspect-square flex items-center justify-center mb-3">
                    <img
                      src={client.logo}
                      alt={`${client.fullName || client.name} - ${client.sector} Sector Client of Devansh Buildsmore Construction Company`}
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
              </div>
            ))}
          </motion.div>

          {/* Fade edges for smooth appearance */}
          <div className="absolute top-0 left-0 bottom-0 w-24 bg-gradient-to-r from-[#0a0a0a] to-transparent pointer-events-none z-10" />
          <div className="absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-l from-[#0a0a0a] to-transparent pointer-events-none z-10" />

          {/* Navigation Arrows */}
          <button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-[#ff6b00]/50 bg-[#0a0a0a]/90 backdrop-blur-sm flex items-center justify-center text-[#ff9c52] hover:bg-[#ff6b00]/20 hover:border-[#ff6b00] transition-all duration-300 hover:scale-110"
            aria-label="Previous clients"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-[#ff6b00]/50 bg-[#0a0a0a]/90 backdrop-blur-sm flex items-center justify-center text-[#ff9c52] hover:bg-[#ff6b00]/20 hover:border-[#ff6b00] transition-all duration-300 hover:scale-110"
            aria-label="Next clients"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
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
