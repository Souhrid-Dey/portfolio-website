'use client';

import { useEffect, useState } from 'react';
import { Database, Code2, LineChart, Cpu, Cloud, Settings, Layers, BrainCircuit } from 'lucide-react';
import styles from '../../styles/techorbit.module.css';

const TECH_ITEMS = [
  { icon: <Code2 size={32} />, name: "Python", color: "#38bdf8" },
  { icon: <Database size={32} />, name: "SQL", color: "#a855f7" },
  { icon: <LineChart size={32} />, name: "Power BI", color: "#f59e0b" },
  { icon: <Cpu size={32} />, name: "Scikit-Learn", color: "#f472b6" },
  { icon: <Cloud size={32} />, name: "Statistics", color: "#fb923c" },
  { icon: <BrainCircuit size={32} />, name: "Machine Learning", color: "#34d399" },
  { icon: <Layers size={32} />, name: "Tableau", color: "#e879f9" },
  { icon: <Settings size={32} />, name: "ETL", color: "#94a3b8" }
];

export default function TechOrbit() {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    let animationFrame;
    const animate = () => {
      setRotation(prev => (prev + 0.2) % 360);
      animationFrame = requestAnimationFrame(animate);
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div className={styles.orbitContainer}>
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
                  borderColor: item.color,
                  boxShadow: `0 0 20px ${item.color}40`
                }}
              >
                {item.icon}
                <span className={styles.itemName}>{item.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
