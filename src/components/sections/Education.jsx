'use client';

import { GraduationCap, Award } from 'lucide-react';
import educationData from '../../data/education.json';
import styles from '../../styles/education.module.css';
import FadeIn from '../ui/FadeIn';

export default function Education() {
  return (
    <section id="education" className="section">
      <div className="container">
        <FadeIn>
          <div className="sectionHeader">
            <div className="sectionBadge">
              <GraduationCap size={14} />
              <span>Academic Credentials</span>
            </div>
            <h2 className="sectionTitle">Education & Specialization</h2>
            <p className="sectionSubtitle">
              Rigorous statistical and quantitative foundations backed by high-distinction post-graduate studies.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className={styles.educationGrid}>
            {educationData.map((item, idx) => {
              const isFeatured = idx === 0;

              return (
                <div
                  key={idx}
                  className={`${styles.educationCard} ${isFeatured ? styles.featuredCard : ''}`}
                >
                  <div>
                    <div className={styles.badgeGroup}>
                      <span className={styles.gradeBadge}>{item.grade}</span>
                      <span className={styles.periodBadge}>{item.period}</span>
                    </div>

                    <h3 className={styles.degreeTitle}>{item.degree}</h3>
                    <div className={styles.institution}>{item.institution}</div>
                  </div>

                  <ul className={styles.highlightsList}>
                    {item.highlights.map((highlight, hIdx) => (
                      <li key={hIdx} className={styles.highlightItem}>
                        {highlight}
                      </li>
                    ))}
                  </ul>

                  <div className={styles.skillsGroup}>
                    {item.skills.map((skill, sIdx) => (
                      <span key={sIdx} className={styles.skillPill}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
