'use client';

import { motion } from 'framer-motion';
import { cvData } from '@/data/cvData';

export default function Projects() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section
      id="projects"
      className="section-light min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-5xl w-full"
      >
        {/* Section Title */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-black mb-4">Projects</h2>
          <div className="w-16 h-1 bg-black mx-auto"></div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cvData.projects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group bg-black/[0.03] rounded-lg p-8 border border-black/10 hover:border-black/30 transition-all duration-300 overflow-hidden relative"
            >
              {/* Background glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative z-10">
                {/* Duration badge */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  className="inline-block mb-4"
                >
                  <span className="text-xs text-gray-600 border border-black/20 px-3 py-1 rounded-full">
                    {project.duration}
                  </span>
                </motion.div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-black mb-3 group-hover:text-gray-700 transition-colors duration-300">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-gray-700 mb-4 leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                {/* Highlights */}
                {project.highlights && project.highlights.length > 0 && (
                  <div className="mb-4">
                    <ul className="space-y-1 max-h-24 overflow-hidden">
                      {project.highlights.slice(0, 2).map((highlight, idx) => (
                        <li key={idx} className="flex items-start text-gray-600 text-sm">
                          <span className="text-black mr-2">✓</span>
                          <span className="line-clamp-1">{highlight}</span>
                        </li>
                      ))}
                      {project.highlights.length > 2 && (
                        <li className="text-gray-600 text-sm">
                          +{project.highlights.length - 2} more highlights
                        </li>
                      )}
                    </ul>
                  </div>
                )}

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-3 py-1 rounded-full bg-black/[0.03] text-gray-700 border border-black/20"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="text-xs px-3 py-1 rounded-full bg-black/[0.03] text-gray-700 border border-black/20">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                {/* View Project Link */}
                <motion.a
                  href={project.link}
                  whileHover={{ x: 5 }}
                  className="inline-flex items-center text-black/70 hover:text-black transition-colors duration-300 group/link mt-2"
                >
                  <span className="text-sm font-medium">View Project</span>
                  <svg
                    className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7m0 0l-7 7m7-7H5"
                    />
                  </svg>
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
