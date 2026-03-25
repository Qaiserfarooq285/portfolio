'use client';

import { motion } from 'framer-motion';
import { cvData } from '@/data/cvData';

export default function Experience() {
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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section
      id="experience"
      className="section-dark min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-4xl w-full"
      >
        {/* Section Title */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-white mb-4">Experience</h2>
          <div className="w-16 h-1 bg-white mx-auto"></div>
        </motion.div>

        {/* Timeline */}
        <div className="space-y-8">
          {cvData.experience.map((job, index) => (
            <motion.div
              key={job.id}
              variants={itemVariants}
              className="relative pl-8 border-l-2 border-white/30 hover:border-white transition-colors duration-300"
            >
              {/* Timeline dot */}
              <div className="absolute left-0 top-0 w-4 h-4 bg-white rounded-full transform -translate-x-2.5 -translate-y-1.5"></div>

              {/* Content */}
              <motion.div
                whileHover={{ x: 10 }}
                className="bg-white/5 rounded-lg p-6 border border-white/10 hover:border-white/30 transition-colors duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-white">{job.role}</h3>
                    {job.company && (
                      <p className="text-lg text-gray-400">{job.company}</p>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 md:text-right mt-2 md:mt-0">
                    {job.duration}
                  </p>
                </div>

                <p className="text-gray-300 mb-4 leading-relaxed">
                  {job.description}
                </p>

                {job.highlights && job.highlights.length > 0 && (
                  <ul className="space-y-2">
                    {job.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start text-gray-400 text-sm">
                        <span className="text-white mr-3">•</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
