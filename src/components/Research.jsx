'use client';

import { motion } from 'framer-motion';

export default function Research() {
  const researchItems = [
    {
      id: 1,
      title: 'Sequence Modeling with Mamba',
      description:
        'I am exploring sequence modeling using Mamba (State Space Models) as an efficient alternative to transformer-based architectures. My focus is on capturing long-range dependencies with linear computational complexity, making the models scalable for large sequential data. This approach improves both performance and efficiency compared to traditional attention mechanisms.',
    },
    {
      id: 2,
      title: 'Vision Mamba for Medical Imaging',
      description:
        'I am applying Vision Mamba to medical images, particularly chest X-rays, to enhance semantic feature understanding and report generation. By leveraging patch-based representations and Spatial Mamba, the model effectively captures global context while maintaining computational efficiency, enabling accurate and scalable medical image analysis.',
    },
  ];

  return (
    <section
      id="research"
      className="section-dark min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-5xl w-full"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-white mb-4">Research</h2>
          <div className="w-16 h-1 bg-white mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {researchItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ y: -8 }}
              className="group bg-white/5 rounded-lg p-8 border border-white/10 hover:border-white/30 transition-all duration-300 overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-gray-100 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
