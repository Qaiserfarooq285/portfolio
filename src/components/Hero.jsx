'use client';

import { motion } from 'framer-motion';
import Typewriter from './Typewriter';

export default function Hero() {
  const nameTypewriterText = ['Qaiser Farooq'];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
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
      id="home"
      className="section-dark min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
      >
        {/* Left Side - Text */}
        <motion.div variants={itemVariants} className="space-y-8">
          <div>
            <motion.h1 variants={itemVariants} className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight break-words">
              <Typewriter texts={nameTypewriterText} speed={120} delayBetween={1600} className="text-3xl sm:text-5xl md:text-6xl font-bold text-white break-words" />
            </motion.h1>
            <motion.p variants={itemVariants} className="text-xl sm:text-2xl md:text-3xl font-light text-gray-400 mb-6">
              AI Engineer
            </motion.p>
          </div>

          <motion.p variants={itemVariants} className="text-lg text-gray-300 max-w-xl leading-relaxed">
            I build intelligent systems with machine learning, NLP, and deep learning.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05, borderColor: '#fff' }}
              whileTap={{ scale: 0.95 }}
              className="px-6 sm:px-8 py-3 border border-white text-white font-medium transition-colors duration-300 hover:bg-white hover:text-black text-center"
            >
              View Work
            </motion.a>
            <motion.a
              href="#chatbot"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 sm:px-8 py-3 bg-white text-black font-medium transition-colors duration-300 hover:bg-gray-200 text-center"
            >
              Chat With Me
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Right Side - Image Placeholder */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center items-center"
        >
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 flex items-center justify-center">
            <img
              src="/IMG_9642-2.png"
              alt="Profile"
              className="w-full h-full object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextElementSibling.style.display = 'flex';
              }}
            />
            <div
              className="hidden w-full h-full flex-col items-center justify-center bg-gray-900 text-gray-400 gap-4"
              id="placeholder"
            >
              <div className="text-center">
                <svg
                  className="w-16 h-16 mx-auto mb-2 text-gray-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" />
                </svg>
                <p className="text-sm">Add your profile image</p>
                <p className="text-xs text-gray-500 mt-2">Place IMG_9642-2.png in public folder</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <svg
          className="w-6 h-6 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  );
}
