import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Lenis from "lenis";
import { ArrowRight } from "lucide-react";
import { sectionBackgrounds } from "@/data/siteContent";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ClientsSection from "@/components/sections/ClientsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ProcessSection from "@/components/sections/ProcessSection";
import AboutSection from "@/components/sections/AboutSection";
import CoverageSection from "@/components/sections/CoverageSection";
import FAQSection from "@/components/sections/FAQSection";
import ContactSection from "@/components/sections/ContactSection";
import SiteFooter from "@/components/sections/SiteFooter";

const sectionOrder = [
  "hero",
  "services",
  "clients",
  "projects",
  "process",
  "about",
  "coverage",
  "faq",
  "contact",
];

const navItems = [
  { key: "services", label: "Services" },
  { key: "clients", label: "Clients" },
  { key: "projects", label: "Projects" },
  { key: "process", label: "Process" },
  { key: "about", label: "About" },
  { key: "coverage", label: "Coverage" },
  { key: "faq", label: "FAQ" },
  { key: "contact", label: "Contact" },
];

export default function HomePage() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    document.documentElement.classList.add("dark");

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      touchMultiplier: 1,
    });

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    const sections = document.querySelectorAll("[data-scroll-section='true']");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.getAttribute("data-section-key"));
          }
        });
      },
      { threshold: 0.42 },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
      lenis.destroy();
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="app-shell" data-testid="devansh-home-page">
      <div className="bg-stage" aria-hidden="true">
        {sectionOrder.map((sectionKey) => (
          <div
            key={sectionKey}
            className={`bg-image-layer ${activeSection === sectionKey ? "is-active" : ""}`}
            style={{
              backgroundImage: `url(${sectionBackgrounds[sectionKey]})`,
            }}
            data-testid={`bg-layer-${sectionKey}`}
          />
        ))}
        <div className="bg-darken" />
        <div className="noise-layer" />
      </div>

      <div className="content-stage">
        <header className="glass-nav" data-testid="top-navigation">
          <div className="content-container nav-inner">
            <a
              href="#hero"
              className="brand-mark flex items-center gap-3"
              data-testid="nav-brand-link"
            >
              <img
                src="/logo_devansh.png"
                alt="Devansh Buildsmore - ISO 9001:2015 Certified Construction Company in Ghaziabad, NCR"
                className="h-16 w-auto"
                style={{ filter: "brightness(1.1)" }}
              />
              <span>Devansh Buildsmore</span>
            </a>
            <nav className="nav-links" data-testid="nav-links-wrapper">
              {navItems.map((item) => (
                <a
                  href={`#${item.key}`}
                  key={item.key}
                  className="nav-link"
                  data-testid={`nav-link-${item.key}`}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <a
              href="#contact"
              className="nav-cta"
              data-testid="nav-contact-button"
            >
              Start Your Project <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </header>

        <main>
          <section id="hero" data-scroll-section="true" data-section-key="hero">
            <HeroSection />
          </section>
          <section
            id="services"
            data-scroll-section="true"
            data-section-key="services"
          >
            <ServicesSection />
          </section>
          <section
            id="clients"
            data-scroll-section="true"
            data-section-key="clients"
          >
            <ClientsSection />
          </section>
          <section
            id="projects"
            data-scroll-section="true"
            data-section-key="projects"
          >
            <ProjectsSection />
          </section>
          <section
            id="process"
            data-scroll-section="true"
            data-section-key="process"
          >
            <ProcessSection />
          </section>
          <section
            id="about"
            data-scroll-section="true"
            data-section-key="about"
          >
            <AboutSection />
          </section>
          <section
            id="coverage"
            data-scroll-section="true"
            data-section-key="coverage"
          >
            <CoverageSection />
          </section>
          <section
            id="faq"
            data-scroll-section="true"
            data-section-key="faq"
          >
            <FAQSection />
          </section>
          <section
            id="contact"
            data-scroll-section="true"
            data-section-key="contact"
          >
            <ContactSection />
          </section>
        </main>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5 }}
        >
          <SiteFooter />
        </motion.div>
      </div>
    </div>
  );
}
