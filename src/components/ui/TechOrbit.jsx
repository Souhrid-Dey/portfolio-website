'use client';

import { useEffect, useState, useRef } from 'react';
import { Database, Code2, LineChart, Cpu, Cloud, Settings, Layers, BrainCircuit } from 'lucide-react';
import styles from '../../styles/techorbit.module.css';

const TECH_ITEMS = [
  { icon: <Code2 size={30} />, name: "Python", color: "#38bdf8" },
  { icon: <Database size={30} />, name: "SQL", color: "#a855f7" },
  { icon: <LineChart size={30} />, name: "Power BI", color: "#f59e0b" },
  { icon: <Cpu size={30} />, name: "Scikit-Learn", color: "#f472b6" },
  { icon: <Cloud size={30} />, name: "Statistics", color: "#fb923c" },
  { icon: <BrainCircuit size={30} />, name: "Machine Learning", color: "#34d399" },
  { icon: <Layers size={30} />, name: "Tableau", color: "#e879f9" },
  { icon: <Settings size={30} />, name: "ETL", color: "#94a3b8" }
];

export default function TechOrbit() {
  const [rotation, setRotation] = useState(0);
  const containerRef = useRef(null);
  const speedRef = useRef(0.24);
  const targetSpeedRef = useRef(0.24);
  const isDirectlyHoveredRef = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDirectlyHoveredRef.current) {
        targetSpeedRef.current = 0;
        return;
      }
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      
      // Proximity check only when container is within the viewport
      if (rect.bottom < -100 || rect.top > window.innerHeight + 100) return;

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);

      const farDist = 380;   // Outside this distance: full speed (0.24)
      const nearDist = 120;  // Inside this proximity: slows down to 0.03

      if (dist >= farDist) {
        targetSpeedRef.current = 0.24;
      } else if (dist <= nearDist) {
        targetSpeedRef.current = 0.03;
      } else {
        const ratio = (dist - nearDist) / (farDist - nearDist);
        targetSpeedRef.current = 0.03 + ratio * 0.21;
      }
    };

    const handleMouseLeave = () => {
      isDirectlyHoveredRef.current = false;
      targetSpeedRef.current = 0.24;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    let animationFrame;
    const animate = () => {
      // Smooth deceleration / acceleration
      speedRef.current += (targetSpeedRef.current - speedRef.current) * 0.12;
      if (Math.abs(speedRef.current) < 0.001 && targetSpeedRef.current === 0) {
        speedRef.current = 0;
      }

      setRotation(prev => (prev + speedRef.current) % 360);
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div ref={containerRef} className={styles.orbitContainer}>
      <div className={styles.orbitScene}>
        <div 
          className={styles.orbitRing}
          style={{ transform: `rotateY(${rotation}deg)` }}
        >
          {TECH_ITEMS.map((item, index) => {
            const angle = (index / TECH_ITEMS.length) * 360;
            return (
              <div
                key={index}
                className={styles.orbitItem}
                style={{
                  transform: `rotateY(${angle}deg) translateZ(200px) rotateY(${-rotation - angle}deg)`,
                  color: item.color,
                }}
                onMouseEnter={() => {
                  isDirectlyHoveredRef.current = true;
                  targetSpeedRef.current = 0;
                }}
                onMouseLeave={() => {
                  isDirectlyHoveredRef.current = false;
                }}
                title={item.name}
              >
                <div 
                  className={styles.orbitItemInner}
                  style={{
                    borderColor: item.color,
                    boxShadow: `0 0 20px ${item.color}40`
                  }}
                >
                  {item.icon}
                  <span className={styles.itemName}>{item.name}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
