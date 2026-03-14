import { motion } from "framer-motion";
import { Award, Target, Eye, Building } from "lucide-react";
import { vision, mission, companyInfo } from "@/data/siteContent";

export default function AboutSection() {
  return (
    <div className="section-shell">
      <div className="content-container space-y-12">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <p className="section-eyebrow" data-testid="about-eyebrow">About Us</p>
          <h2 className="section-title" data-testid="about-title">
            Engineering Excellence Since 2013
          </h2>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Left Column - Company Story */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-white">Our Story</h3>
              <p className="text-[#b8b8b8] leading-relaxed">
                Devansh Buildsmore is an ISO 9001:2015 certified construction company established in 2013
                as a sole proprietorship, headed by <span className="text-[#ff9c52] font-semibold">Mr. Vivek Sharma</span>.
                With his immense experience in the construction industry and practical expertise spanning over a decade,
                he has built a company capable of delivering excellence in every project.
              </p>
              <p className="text-[#b8b8b8] leading-relaxed">
                We are a group of enterprising experts united to deliver finished projects with unmatched excellence.
                Our practical experience extends across various fields of construction, specializing in multi-storied
                residential and commercial buildings.
              </p>
              <p className="text-[#b8b8b8] leading-relaxed">
                We achieve our targets through an efficient and modern system of construction management and execution,
                incorporating highly qualified and experienced technical and non-technical personnel with substantial
                hands-on expertise. Our reputation is built on providing comprehensive services from concept to execution,
                combining diligent professionalism with competitive pricing and timely delivery.
              </p>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="border-l-2 border-[#ff6b00] pl-4">
                <p className="text-3xl font-bold text-white">{companyInfo.experience}</p>
                <p className="text-sm text-[#b8b8b8]">Industry Experience</p>
              </div>
              <div className="border-l-2 border-[#ff6b00] pl-4">
                <p className="text-3xl font-bold text-white">{companyInfo.projectsWorth}</p>
                <p className="text-sm text-[#b8b8b8]">Projects Completed</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Vision & Mission */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-5"
          >
            {/* Vision Card */}
            <div className="surface-panel space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center border border-[#ff6b00] bg-[#ff6b00]/15 text-[#ff9c52]">
                  <Eye className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold text-white">Our Vision</h3>
              </div>
              <p className="text-[#b8b8b8] leading-relaxed">
                {vision}
              </p>
            </div>

            {/* Mission Card */}
            <div className="surface-panel space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center border border-[#ff6b00] bg-[#ff6b00]/15 text-[#ff9c52]">
                  <Target className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold text-white">Our Mission</h3>
              </div>
              <p className="text-[#b8b8b8] leading-relaxed">
                {mission}
              </p>
            </div>

            {/* Certification Badge */}
            <div className="surface-panel">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center border border-[#ff6b00] bg-[#ff6b00]/15 text-[#ff9c52]">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-[#b8b8b8]">Quality Certified</p>
                  <p className="text-lg font-semibold text-white">{companyInfo.certification}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section - Our Approach */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="surface-panel"
        >
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center border border-[#ff6b00] bg-[#ff6b00]/15 text-[#ff9c52] flex-shrink-0">
              <Building className="h-6 w-6" />
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-white">Our Approach</h3>
              <p className="text-[#b8b8b8] leading-relaxed">
                As engineers, contractors, and interior specialists, we have earned a reputation for excellence by
                offering a complete package of services. Our dynamic engineering team and project management expertise,
                combined with competitive margins and high productivity, enable us to deliver superior quality construction
                as per specifications, on time, and at very competitive rates.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
