import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "What types of construction projects does Devansh Buildsmore handle?",
    answer: "Devansh Buildsmore specializes in residential construction (multi-storied buildings, villas, builder floors), commercial developments (office complexes, retail spaces, multiplexes), turnkey contracting, and institutional & industrial projects. We have successfully delivered projects worth ₹269+ Crores across NCR including GHMC, NBCC, SARE Homes, and other prestigious clients."
  },
  {
    question: "Is Devansh Buildsmore ISO certified?",
    answer: "Yes, Devansh Buildsmore is ISO 9001:2015 certified, ensuring quality management systems are maintained throughout every construction project. This certification demonstrates our commitment to consistent quality, efficiency, and timely delivery."
  },
  {
    question: "What areas does Devansh Buildsmore serve?",
    answer: "We are based in Ghaziabad and primarily serve the NCR region including Noida, Greater Noida, Delhi NCR, Meerut, and nearby UP regions. Our head office is located at Plot No-6,7 FF-2, Mayakunj Avantika-1, Ghaziabad - 201001."
  },
  {
    question: "How many years of experience does Devansh Buildsmore have?",
    answer: "Devansh Buildsmore was founded in 2013 by Mr. Vivek Sharma and has 13+ years of experience in the construction industry. We have completed projects worth over ₹100 Crores with a portfolio spanning residential, commercial, and institutional sectors."
  },
  {
    question: "What is the typical project timeline for construction?",
    answer: "Project timelines vary based on scope and complexity. We follow an ISO 9001:2015 certified process with four key stages: (1) Site & Requirement Audit, (2) Design & Technical Planning with internationally acclaimed architects, (3) Execution & Quality Management with daily site supervision, and (4) Finishing & Handover. Contact us for a specific timeline estimate for your project."
  },
  {
    question: "Does Devansh Buildsmore work with government clients?",
    answer: "Yes, Devansh Buildsmore has established partnerships with government bodies including GHMC (Greater Hyderabad Municipal Corporation) and NBCC (National Buildings Construction Corporation). We have successfully delivered government projects worth ₹24 Cr and ₹22 Cr respectively."
  },
  {
    question: "What makes Devansh Buildsmore different from other construction companies?",
    answer: "Devansh Buildsmore stands out through: ISO 9001:2015 certification, 13+ years of proven experience, ₹269+ Crores of successfully delivered projects, partnerships with prestigious government and private clients (GHMC, NBCC, SARE Homes), collaboration with internationally acclaimed architects, experienced technical teams, modern engineering techniques, and transparent project management."
  },
  {
    question: "How can I contact Devansh Buildsmore for a project consultation?",
    answer: "You can reach us at: Phone: +91 9540402145, Email: devanshbuildsmore@gmail.com, or visit our head office at Plot No-6,7 FF-2, Mayakunj Avantika-1, Ghaziabad - 201001. We typically respond within one business day for site consultations."
  }
];

export default function FAQSection() {
  return (
    <div className="section-shell">
      <div className="content-container space-y-10">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <p className="section-eyebrow" data-testid="faq-eyebrow">Frequently Asked Questions</p>
          <h2 className="section-title" data-testid="faq-title">
            Everything You Need to Know About Working With Us
          </h2>
          <p className="section-description" data-testid="faq-description">
            Common questions about our construction services, experience, certifications, and project delivery process.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.details
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="surface-panel group"
              data-testid={`faq-item-${index + 1}`}
            >
              <summary className="flex items-start gap-4 cursor-pointer list-none p-6">
                <HelpCircle className="h-5 w-5 text-[#ff9c52] flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white group-open:text-[#ff9c52] transition-colors">
                    {faq.question}
                  </h3>
                </div>
                <svg
                  className="h-5 w-5 text-[#ff9c52] flex-shrink-0 mt-1 transition-transform group-open:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 pb-6 pl-[52px]">
                <p className="text-[#b8b8b8] leading-relaxed">{faq.answer}</p>
              </div>
            </motion.details>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="surface-panel max-w-2xl mx-auto text-center p-8"
        >
          <h3 className="text-xl font-semibold text-white mb-3">Still Have Questions?</h3>
          <p className="text-[#b8b8b8] mb-5">
            Our team is ready to discuss your construction project requirements and provide detailed guidance.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-6 py-3 border border-[#ff6b00] bg-[#ff6b00]/10 text-[#ff9c52] font-medium hover:bg-[#ff6b00]/20 transition-colors"
          >
            Contact Our Team
          </a>
        </motion.div>
      </div>
    </div>
  );
}
