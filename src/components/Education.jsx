'use client';

import { motion } from 'framer-motion';
import { cvData } from '@/data/cvData';

export default function Education() {
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
      id="education"
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-white mb-4">Education</h2>
          <div className="w-16 h-1 bg-white mx-auto"></div>
        </motion.div>

        {/* Timeline */}
        <div className="space-y-8">
          {cvData.education.map((edu, index) => (
            <motion.div
              key={edu.id}
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
                    <h3 className="text-xl font-bold text-white">{edu.degree}</h3>
                    <p className="text-lg text-gray-400">{edu.field}</p>
                    <p className="text-sm text-gray-500">{edu.institution}</p>
                  </div>
                  <div className="text-sm text-gray-500 md:text-right mt-2 md:mt-0">
                    <p>{edu.duration}</p>
                    <p className="text-xs text-gray-600 mt-1">
                      {edu.status === 'Continuing' ? (
                        <span className="text-white/70">Continuing</span>
                      ) : (
                        <span>{edu.status}</span>
                      )}
                    </p>
                  </div>
                </div>

                {/* Grades */}
                <div className="flex gap-6 text-sm">
                  {edu.cgpa && (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">CGPA:</span>
                      <span className="text-white font-semibold">{edu.cgpa}</span>
                    </div>
                  )}
                  {edu.percentage && (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">Score:</span>
                      <span className="text-white font-semibold">{edu.percentage}</span>
                    </div>
                  )}
                </div>

                {/* Location */}
                <p className="text-gray-600 text-sm mt-4">{edu.location}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
