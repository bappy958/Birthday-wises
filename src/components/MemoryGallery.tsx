import React from 'react';
import { motion } from 'motion/react';

const MemoryGallery: React.FC = () => {
  const memories = [
    { id: 1, url: 'https://picsum.photos/seed/love1/400/500', caption: 'Our First Date' },
    { id: 2, url: 'https://picsum.photos/seed/love2/400/500', caption: 'Magical Moments' },
    { id: 3, url: 'https://picsum.photos/seed/love3/400/500', caption: 'Sweetest Smile' },
    { id: 4, url: 'https://picsum.photos/seed/love4/400/500', caption: 'Forever Together' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4 py-20">
      {memories.map((memory, index) => (
        <motion.div
          key={memory.id}
          initial={{ opacity: 0, y: 50, rotate: index % 2 === 0 ? -5 : 5 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
          transition={{ duration: 0.8, delay: index * 0.2 }}
          className="relative group"
        >
          <div className="glass p-3 rounded-2xl shadow-2xl transform transition-all duration-300">
            <img
              src={memory.url}
              alt={memory.caption}
              className="w-full h-64 object-cover rounded-xl mb-4"
              referrerPolicy="no-referrer"
            />
            <p className="text-center font-serif italic text-pink-200">{memory.caption}</p>
          </div>
          <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
        </motion.div>
      ))}
    </div>
  );
};

export default MemoryGallery;
