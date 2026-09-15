'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { GithubIcon } from './Icons';
import styles from '../../styles/projects.module.css';

export default function ProjectCard({ project, tier = 1 }) {
  const isHero = tier === 1;

  const getTierClass = (t) => {
    switch (t) {
      case 1: return styles.cardTier1;
      case 2: return styles.cardTier2;
      case 3: return styles.cardTier3;
      default: return '';
    }
  };

  return (
    <article className={`${styles.card} ${isHero ? styles.cardHero : ''} ${getTierClass(tier)}`}>
      {/* Image Header */}
      <div className={styles.cardImageWrapper}>
        <Image 
          src={project.image} 
          alt={project.title} 
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={styles.cardImage} 
        />
        <div className={styles.cardImageOverlay} />
        <span className={styles.categoryTagImg}>{project.category}</span>
      </div>

      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{project.title}</h3>
        {project.subtitle && <div className={styles.cardSubtitle}>{project.subtitle}</div>}

        {/* Minimal Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className={styles.tagCluster}>
            {project.tags.slice(0, 3).map((tag, idx) => (
              <span key={idx} className={styles.tag}>
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className={styles.tag}>+{project.tags.length - 3}</span>
            )}
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className={styles.cardFooter}>
        <Link href={`/project/${project.id}`} className={styles.viewCaseBtn}>
          View Case Study <ArrowRight size={16} />
        </Link>
        <div className={styles.cardLinks}>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.iconLink}
              title="View Source on GitHub"
            >
              <GithubIcon size={18} />
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.iconLink}
              title="View Live Demo"
            >
              <ExternalLink size={18} />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
