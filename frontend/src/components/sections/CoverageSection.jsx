import { MapPin, Mail, Phone } from "lucide-react";
import { serviceAreas } from "@/data/siteContent";

export default function CoverageSection() {
  return (
    <div className="section-shell">
      <div className="content-container grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-5">
          <p className="section-eyebrow" data-testid="coverage-eyebrow">
            Service Region
          </p>
          <h2 className="section-title" data-testid="coverage-title">
            Based in Ghaziabad, Building Across NCR and Nearby Cities
          </h2>
          <p className="section-description" data-testid="coverage-description">
            Devansh Buildsmore operates throughout NCR with flexible deployment
            for surrounding high-growth zones such as Meerut.
          </p>
          <div
            className="flex flex-wrap gap-3"
            data-testid="coverage-areas-grid"
          >
            {serviceAreas.map((area) => (
              <span
                key={area}
                className="area-chip"
                data-testid={`coverage-area-${area.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
              >
                <MapPin className="h-3.5 w-3.5" /> {area}
              </span>
            ))}
          </div>
        </div>

        <div
          className="surface-panel space-y-5"
          data-testid="coverage-contact-panel"
        >
          <p
            className="text-sm uppercase tracking-[0.32em] text-[#ff9c52]"
            data-testid="coverage-panel-heading"
          >
            Reach Our Team
          </p>
          <a
            href="mailto:devanshbuildsmore@gmail.com"
            className="contact-chip"
            data-testid="coverage-email-link"
          >
            <Mail className="h-4 w-4" /> devanshbuildsmore@gmail.com
          </a>
          <a
            href="tel:+919999999999"
            className="contact-chip"
            data-testid="coverage-phone-link"
          >
            <Phone className="h-4 w-4" /> +91 99999 99999 (Update Later)
          </a>
          <p
            className="text-sm text-[#a6a6a6]"
            data-testid="coverage-support-text"
          >
            Typical response window: within one business day for site
            consultations.
          </p>
        </div>
      </div>
    </div>
  );
}
