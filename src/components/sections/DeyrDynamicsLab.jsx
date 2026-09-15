'use client';

import { Cpu } from 'lucide-react';
import ProjectCard from '../ui/ProjectCard';
import projectsData from '../../data/projects.json';
import styles from '../../styles/deyrdynamics.module.css';
import FadeIn from '../ui/FadeIn';

export default function DeyrDynamicsLab() {
  const labProjects = projectsData.filter((p) => p.tier === 4);

  return (
    <section id="ai-lab" className={`section ${styles.labSection}`}>
      <div className="container">
        <FadeIn>
          <div className="sectionHeader">
            <div className="sectionBadge">
              <Cpu size={14} />
              <span>Tier 4 R&D</span>
            </div>
            <h2 className="sectionTitle">
              <span className={styles.brandGlow}>Dey'r Dynamics Lab</span>
            </h2>
            <p className="sectionSubtitle">
              My personal sandbox and R&D lab where I build open-source AI applications, autonomous LLM tool-calling experiments, and live civic resilience platforms using Google Gemini 2.0 Flash, Claude 3.5 Sonnet, FastAPI, and Next.js.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className={styles.labGrid}>
          {labProjects.map((project) => (
            <ProjectCard key={project.id} project={project} tier={1} />
          ))}
        </div>
        </FadeIn>
      </div>
    </section>
  );
}
