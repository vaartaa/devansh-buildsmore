import { motion } from "framer-motion";
import { MapPin, Building2, IndianRupee } from "lucide-react";
import { completedProjects } from "@/data/siteContent";

export default function ProjectsSection() {
  return (
    <div className="section-shell">
      <div className="content-container space-y-10">
        <div className="max-w-3xl space-y-4">
          <p className="section-eyebrow" data-testid="projects-eyebrow">Completed Projects</p>
          <h2 className="section-title" data-testid="projects-title">
            ₹269+ Crores Worth of Successfully Delivered Projects
          </h2>
          <p className="section-description" data-testid="projects-description">
            From government projects to prestigious private developments, our portfolio showcases excellence in execution across residential and commercial sectors in NCR and beyond.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {completedProjects.map((project, index) => (
            <motion.article
              key={project.client}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="project-card group"
              data-testid={`project-card-${index + 1}`}
            >
              <div className="project-image-wrap overflow-hidden" data-testid={`project-image-wrap-${index + 1}`}>
                <img
                  src={project.image}
                  alt={`${project.client} ${project.projectType} Construction Project in ${project.location} - ${project.cost} - Devansh Buildsmore`}
                  className="project-image transition-transform duration-500 group-hover:scale-110"
                  data-testid={`project-image-${index + 1}`}
                />
              </div>
              <div className="space-y-3 p-6">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-xl font-semibold text-white" data-testid={`project-name-${index + 1}`}>
                    {project.client}
                  </h3>
                  <span className="inline-flex items-center gap-1 rounded border border-[#ff6b00]/30 bg-[#ff6b00]/10 px-2 py-1 text-xs font-medium text-[#ff9c52]">
                    {project.projectType}
                  </span>
                </div>

                {project.projectName && (
                  <p className="text-sm text-[#ff9c52]">{project.projectName}</p>
                )}

                <div className="space-y-2 text-sm text-[#bababa]">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[#ff9c52]" />
                    <span>{project.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IndianRupee className="h-4 w-4 text-[#ff9c52]" />
                    <span className="font-semibold text-white">{project.cost}</span>
                    <span className="text-xs">Approx. Project Cost</span>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
