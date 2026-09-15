'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const SceneTransition3D = dynamic(() => import('../components/ui/SceneTransition3D'), { ssr: false });

export default function Template({ children }) {
  return (
    <>
      <SceneTransition3D />
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </>
  );
}
