'use client';

import { motion } from 'framer-motion';
import { cvData } from '@/data/cvData';

export default function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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

  const skillCategories = [
    {
      title: 'Languages',
      skills: cvData.skills.languages,
    },
    {
      title: 'Frameworks',
      skills: cvData.skills.frameworks,
    },
    {
      title: 'Tools',
      skills: cvData.skills.tools,
    },
    {
      title: 'Soft Skills',
      skills: cvData.skills.soft,
    },
  ];

  return (
    <section
      id="skills"
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-black mb-4">Skills</h2>
          <div className="w-16 h-1 bg-black mx-auto"></div>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, idx) => (
            <motion.div key={idx} variants={itemVariants} className="space-y-4">
              {/* Category Title */}
              <h3 className="text-xl font-semibold text-black mb-4">
                {category.title}
              </h3>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, skillIdx) => (
                  <motion.div
                    key={skillIdx}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-black/5 border border-black/30 rounded-lg text-sm text-black hover:bg-black/10 hover:border-black/50 transition-all duration-300 cursor-pointer group"
                  >
                    <span className="flex items-center gap-2">
                      <span>{skill}</span>
                      <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        ✓
                      </span>
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Proficiency Summary */}
        <motion.div
          variants={itemVariants}
          className="mt-16 pt-12 border-t border-black/10"
        >
          <h3 className="text-xl font-semibold text-black mb-6">
            Technical Proficiency
          </h3>

          <div className="space-y-6">
            {[
              { name: 'Machine Learning & AI', level: 90 },
              { name: 'Python Development', level: 85 },
              { name: 'Web Development', level: 75 },
              { name: 'Data Analysis', level: 85 },
            ].map((skill, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">{skill.name}</span>
                  <span className="text-sm text-gray-600">{skill.level}%</span>
                </div>
                <div className="w-full h-2 bg-black/10 rounded-full overflow-hidden border border-black/20">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, ease: 'easeOut', delay: idx * 0.1 }}
                    className="h-full bg-black rounded-full"
                  ></motion.div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
