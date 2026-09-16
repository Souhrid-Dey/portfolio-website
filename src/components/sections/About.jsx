'use client';

import Image from 'next/image';
import { UserCheck, Award, Briefcase, GraduationCap } from 'lucide-react';
import siteConfig from '../../data/site-config.json';
import styles from '../../styles/about.module.css';
import FadeIn from '../ui/FadeIn';

export default function About() {
  return (
    <section id="about" className={`section ${styles.aboutSection}`}>
      <div className="container">
        <FadeIn>
          <div className="sectionHeader">
            <div className="sectionBadge">
              <UserCheck size={14} />
              <span>Profile & Trajectory</span>
            </div>
            <h2 className="sectionTitle">Behind the Observatory</h2>
            <p className="sectionSubtitle">
              A strategic fusion of enterprise business acumen and advanced mathematical machine learning.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className={styles.aboutGrid}>
            {/* Avatar Column */}
            <div className={styles.avatarColumn}>
              <div className={styles.avatarCard}>
                <Image
                  src="/images/avatar.jpg"
                  alt="Souhrid Dey — Data Scientist & Machine Learning Engineer"
                  className={styles.avatarImg}
                  fill
                  sizes="(max-width: 992px) 100vw, 50vw"
                />
                <div className={styles.avatarOverlay}>
                  <span className={styles.avatarName}>Souhrid Dey</span>
                  <span className={styles.avatarRole}>Data Scientist & Analytics Specialist</span>
                </div>
              </div>
            </div>

          {/* Narrative Column */}
          <div className={styles.contentColumn}>
            <div className={styles.narrative}>
              <p>
                I view data through a dual lens: the <strong>mathematical rigor of machine learning</strong> and 
                the <strong>commercial pragmatism of enterprise finance</strong>. Over the past 6+ years across 
                global corporations like <strong>A.P. Moller - Maersk</strong>, <strong>Genpact</strong>, and <strong>Eaton</strong>, 
                I have built executive Power BI architectures, investigated multi-million-dollar operational variances, 
                and engineered financial reconciliation engines.
              </p>

              <p>
                To push the boundaries of data beyond backward-looking reporting into predictive foresight, I completed the 
                prestigious <strong>Post Graduate Program in Data Science & Business Analytics</strong> from 
                <strong> The University of Texas at Austin (McCombs School of Business)</strong> & Great Lakes Executive Learning. 
                Graduating in the <strong>top decile with a 4.07 / 4.33 GPA</strong>, I mastered end-to-end predictive modeling, 
                achieving a <strong>flawless perfect score</strong> in Econometric Regression and Inferential Statistics, 
                and winning <strong>Rank 2</strong> in the Shinkansen Passenger Satisfaction Hackathon.
              </p>

              <p>
                Whether fine-tuning XGBoost recall thresholds to protect telecom recurring revenue, uncovering $11.3M in car insurance risk drivers via Tableau Public, 
                or architecting streaming agentic GenAI assistants powered by Google Gemini 2.0 Flash and Claude 3.5 Sonnet, 
                my mission is identical: <em>transform raw statistical noise into clear, measurable business value.</em>
              </p>
            </div>

            <div className={styles.statsGrid}>
              {siteConfig.stats.map((stat, idx) => (
                <div key={idx} className={styles.statItem}>
                  <div className={styles.statValue}>{stat.value}</div>
                  <div className={styles.statLabel}>{stat.label}</div>
                  <div className={styles.statSub}>{stat.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        </FadeIn>
      </div>
    </section>
  );
}
