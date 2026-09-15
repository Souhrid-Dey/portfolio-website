'use client';

import { useState } from 'react';
import { Sparkles, Layers, BookOpen, Star, Compass } from 'lucide-react';
import ProjectCard from '../ui/ProjectCard';
import projectsData from '../../data/projects.json';
import styles from '../../styles/projects.module.css';
import FadeIn from '../ui/FadeIn';

const CATEGORIES = [
  'All',
  'Machine Learning',
  'Statistical Modeling',
  'BI & Tableau',
  'SQL & Analytics'
];

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter out Tier 4 (Tier 4 has its own dedicated Vibe-Coded Lab section)
  const nonTier4Projects = projectsData.filter((p) => p.tier !== 4);

  const filteredProjects = selectedCategory === 'All'
    ? nonTier4Projects
    : nonTier4Projects.filter((p) => p.category === selectedCategory);

  const tier1Projects = filteredProjects.filter((p) => p.tier === 1);
  const tier2Projects = filteredProjects.filter((p) => p.tier === 2);
  const tier3Projects = filteredProjects.filter((p) => p.tier === 3);

  return (
    <section id="projects" className="section">
      <div className="container">
        <FadeIn>
          <div className="sectionHeader">
            <div className="sectionBadge">
              <Compass size={14} />
              <span>Curated Portfolio Catalog</span>
            </div>
            <h2 className="sectionTitle">The Project Observatory</h2>
            <p className="sectionSubtitle">
              10 rigorous data science, machine learning, econometric, and business analytics case studies.
            </p>
          </div>
        </FadeIn>

        {/* Filter Bar */}
        <div className={styles.filterBar}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`${styles.filterBtn} ${selectedCategory === cat ? styles.filterActive : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div key={selectedCategory}>
          {/* Tier 1: ⭐ Flagship Hero Models */}
          {tier1Projects.length > 0 && (
            <FadeIn delay={0.1}>
              <div className={styles.tierHeader}>
                <div className={styles.tierBadge}>
                  <Star size={15} color="#eab308" fill="#eab308" />
                  <span>Tier 1: ⭐ Flagship Deployments & Case Studies</span>
                </div>
                <div className={styles.tierDivider} />
              </div>

              <div className={styles.heroGrid}>
                {tier1Projects.map((project) => (
                  <ProjectCard key={project.id} project={project} tier={1} />
                ))}
              </div>
            </FadeIn>
          )}

          {/* Tier 2: Supporting Analytical Pillars */}
          {tier2Projects.length > 0 && (
            <FadeIn delay={0.2}>
              <div className={styles.tierHeader}>
                <div className={styles.tierBadge}>
                  <Layers size={15} />
                  <span>Tier 2: Core Machine Learning & SQL Pillars</span>
                </div>
                <div className={styles.tierDivider} />
              </div>

              <div className={styles.supportingGrid}>
                {tier2Projects.map((project) => (
                  <ProjectCard key={project.id} project={project} tier={2} />
                ))}
              </div>
            </FadeIn>
          )}

          {/* Tier 3: Compact Foundational Analytics */}
          {tier3Projects.length > 0 && (
            <FadeIn delay={0.3}>
              <div className={styles.tierHeader}>
                <div className={styles.tierBadge}>
                  <BookOpen size={15} />
                  <span>Tier 3: Statistical Foundations & Market EDA</span>
                </div>
                <div className={styles.tierDivider} />
              </div>

              <div className={styles.compactGrid}>
                {tier3Projects.map((project) => (
                  <ProjectCard key={project.id} project={project} tier={3} />
                ))}
              </div>
            </FadeIn>
          )}
        </div>
      </div>
    </section>
  );
}
