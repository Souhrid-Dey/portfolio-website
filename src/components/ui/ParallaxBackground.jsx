'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from '../../styles/parallax.module.css';

export default function ParallaxBackground() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef(null);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollY } = useScroll();

  // As we scroll down (0 to 2000), elements in the fixed container should move UP (negative).
  // Background moves up slowest, foreground moves up fastest.
  const yBack = useTransform(scrollY, [0, 2000], [0, -150]);
  const yMid = useTransform(scrollY, [0, 2000], [0, -350]);
  const yFront = useTransform(scrollY, [0, 2000], [0, -600]);
  
  if (!mounted) return null;

  return (
    <div className={styles.parallaxContainer} ref={containerRef}>
      {/* Background Deep Space Gradient */}
      <div className={styles.deepSpace} />

      {/* Layer 1: Stars / Nebulas */}
      <motion.div className={styles.layerStars} style={{ y: yBack }}>
        <div className={styles.stars} />
      </motion.div>

      {/* Layer 2: Distant Cyber Mountains */}
      <motion.div className={styles.layerBack} style={{ y: yBack }}>
        <svg preserveAspectRatio="none" viewBox="0 0 1440 320" className={styles.mountainSvg}>
          <path
            fill="#1e1b4b" // Deep purple/indigo
            fillOpacity="0.8"
            d="M0,256L48,229.3C96,203,192,149,288,154.7C384,160,480,224,576,218.7C672,213,768,139,864,128C960,117,1056,171,1152,197.3C1248,224,1344,224,1392,224L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
          <path
            fill="none"
            stroke="#8b5cf6" // Violet glow
            strokeWidth="2"
            d="M0,256L48,229.3C96,203,192,149,288,154.7C384,160,480,224,576,218.7C672,213,768,139,864,128C960,117,1056,171,1152,197.3C1248,224,1344,224,1392,224L1440,224"
          ></path>
        </svg>
      </motion.div>

      {/* Layer 3: Middle Cyber Mountains */}
      <motion.div className={styles.layerMid} style={{ y: yMid }}>
        <svg preserveAspectRatio="none" viewBox="0 0 1440 320" className={styles.mountainSvg}>
          <path
            fill="#0f172a" // Slate dark
            fillOpacity="0.9"
            d="M0,192L60,208C120,224,240,256,360,234.7C480,213,600,139,720,138.7C840,139,960,213,1080,229.3C1200,245,1320,203,1380,181.3L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
          <path
            fill="none"
            stroke="#3b82f6" // Blue glow
            strokeWidth="3"
            d="M0,192L60,208C120,224,240,256,360,234.7C480,213,600,139,720,138.7C840,139,960,213,1080,229.3C1200,245,1320,203,1380,181.3L1440,160"
          ></path>
        </svg>
      </motion.div>

      {/* Layer 4: Foreground / Base Grid */}
      <motion.div className={styles.layerFront} style={{ y: yFront }}>
        <div className={styles.cyberGrid} />
      </motion.div>
    </div>
  );
}
