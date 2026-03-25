'use client';

import { motion } from 'framer-motion';
import { cvData } from '@/data/cvData';

export default function About() {
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
      id="about"
      className="section-light min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8"
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-black mb-4">About Me</h2>
          <div className="w-16 h-1 bg-black mx-auto"></div>
        </motion.div>

        {/* Content */}
        <motion.div variants={itemVariants} className="space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              {cvData.personal.bio}
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4 pt-6">
              <motion.div
                whileHover={{ y: -5 }}
                className="border border-black/20 rounded-lg p-4 text-center hover:border-black/40 transition-colors duration-300"
              >
                <p className="text-3xl font-bold text-black">1+</p>
                <p className="text-sm text-gray-600">Years Experience</p>
              </motion.div>
              <motion.div
                whileHover={{ y: -5 }}
                className="border border-black/20 rounded-lg p-4 text-center hover:border-black/40 transition-colors duration-300"
              >
                <p className="text-3xl font-bold text-black">3+</p>
                <p className="text-sm text-gray-600">AI Projects</p>
              </motion.div>
            </div>

            {/* Contact Links */}
            <div className="pt-4">
              <p className="text-gray-600 mb-4">Get in touch:</p>
              <div className="flex flex-wrap gap-4">
                <motion.a
                  href={`mailto:${cvData.personal.email}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 border border-black/30 text-black rounded text-sm hover:border-black transition-colors duration-300"
                >
                  Email
                </motion.a>
                <motion.a
                  href={`tel:${cvData.personal.phone}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 border border-black/30 text-black rounded text-sm hover:border-black transition-colors duration-300"
                >
                  Call
                </motion.a>
              </div>
            </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
