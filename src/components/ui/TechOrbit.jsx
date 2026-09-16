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
  const isManuallyResumedRef = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      
      // Proximity check only when container is within the viewport
      if (rect.bottom < -100 || rect.top > window.innerHeight + 100) return;

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // The revolving icons span horizontally ~220px from center and vertically ~50px from center
      const boxLeft = centerX - 220;
      const boxRight = centerX + 220;
      const boxTop = centerY - 50;
      const boxBottom = centerY + 50;

      const closestX = Math.max(boxLeft, Math.min(e.clientX, boxRight));
      const closestY = Math.max(boxTop, Math.min(e.clientY, boxBottom));
      const dist = Math.hypot(e.clientX - closestX, e.clientY - closestY);

      const triggerDistance = 100; // Trigger proximity phenomenon only within 100px of the object

      if (dist >= triggerDistance) {
        // Re-arm phenomenon once cursor moves 100px away from the object
        isManuallyResumedRef.current = false;
        targetSpeedRef.current = 0.24;
      } else {
        // Within 100px of the object:
        if (isManuallyResumedRef.current) {
          // User clicked to resume; motion stays active until moving >100px away
          targetSpeedRef.current = 0.24;
        } else if (isDirectlyHoveredRef.current) {
          targetSpeedRef.current = 0;
        } else {
          // Smooth deceleration as cursor approaches the object from 100px down to 0px
          const ratio = dist / triggerDistance;
          targetSpeedRef.current = 0.04 + ratio * 0.20;
        }
      }
    };

    const handleMouseLeave = () => {
      isDirectlyHoveredRef.current = false;
      isManuallyResumedRef.current = false;
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

  const handleItemClick = (e) => {
    e.stopPropagation();
    // Reclicking on the core ecosystem icon resumes motion
    if (isDirectlyHoveredRef.current || targetSpeedRef.current === 0) {
      isDirectlyHoveredRef.current = false;
      isManuallyResumedRef.current = true;
      targetSpeedRef.current = 0.24;
    } else {
      // Toggle pause if clicked while already spinning
      isDirectlyHoveredRef.current = true;
      isManuallyResumedRef.current = false;
      targetSpeedRef.current = 0;
    }
  };

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
                  if (!isManuallyResumedRef.current) {
                    isDirectlyHoveredRef.current = true;
                    targetSpeedRef.current = 0;
                  }
                }}
                onMouseLeave={() => {
                  isDirectlyHoveredRef.current = false;
                }}
                onClick={handleItemClick}
                title={`${item.name} — Click to resume / pause motion`}
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
