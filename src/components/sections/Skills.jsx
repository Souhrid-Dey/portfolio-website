'use client';

import { Terminal, Cpu, Database, LineChart, Code, Sparkles, Layers } from 'lucide-react';
import skillsData from '../../data/skills.json';
import styles from '../../styles/skills.module.css';
import FadeIn from '../ui/FadeIn';
import TechOrbit from '../ui/TechOrbit';

export default function Skills() {
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Machine Learning & AI': return <Cpu size={20} color="#c084fc" />;
      case 'Generative AI & LLMs': return <Sparkles size={20} color="#f472b6" />;
      case 'Statistical Modeling & Econometrics': return <LineChart size={20} color="#38bdf8" />;
      case 'Business Intelligence & Data Viz': return <Layers size={20} color="#fbbf24" />;
      case 'SQL & Data Engineering': return <Database size={20} color="#a855f7" />;
      case 'Languages & Modern Tech': return <Code size={20} color="#34d399" />;
      default: return <Terminal size={20} color="#c084fc" />;
    }
  };

  return (
    <section id="skills" className="section">
      <div className="container">
        <FadeIn>
          <div className="sectionHeader">
            <div className="sectionBadge">
              <Terminal size={14} />
              <span>Technical Capabilities</span>
            </div>
            <h2 className="sectionTitle">Skills & Toolchain</h2>
            <p className="sectionSubtitle">
              Core methodologies, programming languages, econometric frameworks, and modern AI toolkits.
            </p>
          </div>

          <div className={styles.skillsGrid}>
            {skillsData.map((cat, idx) => (
              <div key={idx} className={styles.categoryCard}>
                <div className={styles.cardHeader}>
                  <div style={{ marginBottom: '0.6rem' }}>
                    {getCategoryIcon(cat.category)}
                  </div>
                  <h3 className={styles.categoryTitle}>{cat.category}</h3>
                  <p className={styles.categoryDesc}>{cat.description}</p>
                </div>

                <div className={styles.skillList}>
                  {cat.skills.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className={`${styles.skillItem} ${skill.highlight ? styles.skillHighlight : ''}`}
                    >
                      <span className={styles.skillName}>{skill.name}</span>
                      <span className={styles.skillLevel}>{skill.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </FadeIn>
      </div>
    </section>
  );
}
