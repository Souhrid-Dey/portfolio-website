'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import styles from '../../styles/infographic.module.css';

export default function InfographicBackground() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Define some abstract connecting lines
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i) => {
      const delay = 0.5 + i * 0.2;
      return {
        pathLength: 1,
        opacity: 0.2,
        transition: {
          pathLength: { delay, type: "spring", duration: 2, bounce: 0 },
          opacity: { delay, duration: 0.5 }
        }
      };
    }
  };

  return (
    <div className={styles.container}>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className={styles.svg}>
        <motion.path
          d="M 100,500 C 300,500 400,200 600,200 S 800,800 1000,500"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="2"
          fill="transparent"
          variants={draw}
          custom={0}
          initial="hidden"
          animate="visible"
        />
        <motion.path
          d="M -100,200 C 200,300 400,600 700,600 S 900,100 1200,300"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1"
          fill="transparent"
          variants={draw}
          custom={1}
          initial="hidden"
          animate="visible"
        />
        <motion.path
          d="M 200,800 C 400,800 500,400 800,400 S 1100,700 1400,600"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1.5"
          fill="transparent"
          variants={draw}
          custom={2}
          initial="hidden"
          animate="visible"
        />
        
        {/* Animated Nodes */}
        <motion.circle
          cx="600" cy="200" r="4" fill="#a855f7"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.8 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        />
        <motion.circle
          cx="700" cy="600" r="6" fill="#38bdf8"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.8 }}
          transition={{ delay: 1.8, duration: 0.5 }}
        />
        <motion.circle
          cx="800" cy="400" r="5" fill="#f472b6"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.8 }}
          transition={{ delay: 2.1, duration: 0.5 }}
        />
      </svg>
      
      {/* Floating data particles */}
      <motion.div 
        className={styles.particle}
        initial={{ y: "100vh", x: "10vw", opacity: 0 }}
        animate={{ y: "-10vh", x: "20vw", opacity: [0, 0.5, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
      <motion.div 
        className={styles.particle}
        initial={{ y: "100vh", x: "80vw", opacity: 0 }}
        animate={{ y: "-10vh", x: "70vw", opacity: [0, 0.4, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear", delay: 2 }}
      />
    </div>
  );
}
