import { motion } from "framer-motion";
import { projectHighlights } from "@/data/siteContent";

export default function ProjectsSection() {
  return (
    <div className="section-shell">
      <div className="content-container space-y-10">
        <div className="max-w-3xl space-y-4">
          <p className="section-eyebrow" data-testid="projects-eyebrow">Portfolio Focus</p>
          <h2 className="section-title" data-testid="projects-title">Project Categories We Execute Regularly</h2>
          <p className="section-description" data-testid="projects-description">
            We are structured for both small and large project scales, with dedicated supervision and process consistency.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {projectHighlights.map((project, index) => (
            <motion.article
              key={project.name}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="project-card"
              data-testid={`project-card-${index + 1}`}
            >
              <div className="project-image-wrap" data-testid={`project-image-wrap-${index + 1}`}>
                <img
                  src={project.image}
                  alt={project.name}
                  className="project-image"
                  data-testid={`project-image-${index + 1}`}
                />
              </div>
              <div className="space-y-3 p-6">
                <h3 className="text-2xl font-semibold text-white" data-testid={`project-name-${index + 1}`}>{project.name}</h3>
                <p className="text-[#bababa]" data-testid={`project-blurb-${index + 1}`}>{project.blurb}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}