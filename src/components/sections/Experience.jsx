'use client';

import { Briefcase } from 'lucide-react';
import experienceData from '../../data/experience.json';
import styles from '../../styles/experience.module.css';
import FadeIn from '../ui/FadeIn';

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <FadeIn>
          <div className="sectionHeader">
            <div className="sectionBadge">
              <Briefcase size={14} />
              <span>Career History</span>
            </div>
            <h2 className="sectionTitle">Enterprise Experience</h2>
            <p className="sectionSubtitle">
              6+ years of financial business intelligence, variance analysis, and reporting automation.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className={styles.timeline}>
            {experienceData.map((exp, idx) => (
              <div key={idx} className={styles.timelineItem}>
                <div className={styles.timelineDot} />

                <div className={styles.experienceCard}>
                  <div className={styles.cardHeader}>
                    <div>
                      <h3 className={styles.roleTitle}>{exp.role}</h3>
                      <div className={styles.companyName}>{exp.company}</div>
                    </div>

                    <div className={styles.metaInfo}>
                      <div className={styles.period}>{exp.period}</div>
                      <div className={styles.location}>{exp.location}</div>
                    </div>
                  </div>

                  <p className={styles.summary}>{exp.summary}</p>

                  <ul className={styles.highlightsList}>
                    {exp.highlights.map((item, hIdx) => (
                      <li key={hIdx} className={styles.highlightItem}>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className={styles.skillsCluster}>
                    {exp.skills.map((skill, sIdx) => (
                      <span key={sIdx} className={styles.skillPill}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
