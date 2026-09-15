'use client';

import { useEffect } from 'react';
import { X, FileText, Mail } from 'lucide-react';
import { LinkedinIcon } from '../ui/Icons';
import styles from '../../styles/resumemodal.module.css';

/**
 * DEVELOPER REMINDER:
 * Once the resume PDF is ready:
 * 1. Place the compiled PDF at `public/resume/Souhrid_Dey_Resume.pdf`
 * 2. Update the Navbar download button action to trigger direct download:
 *    href="/resume/Souhrid_Dey_Resume.pdf" download="Souhrid_Dey_Resume.pdf"
 */
export default function ResumeModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        <div className={styles.iconWrapper}>
          <FileText size={28} />
        </div>

        <span className={styles.badge}>Status: In Live Refresh</span>

        <h3 className={styles.title}>Resume Currently Updating</h3>

        <p className={styles.description}>
          Souhrid is currently updating his comprehensive resume with recent achievements from the 
          <strong> UT Austin / Great Lakes PGP in Data Science</strong> (Capstone: 91.48% recall XGBoost churn model) 
          and latest <strong>Agentic GenAI</strong> applications.
        </p>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statVal}>6+ Years</div>
            <div className={styles.statLabel}>Corporate Analytics & FP&A</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statVal}>4.07 / 4.33</div>
            <div className={styles.statLabel}>PGP Data Science GPA</div>
          </div>
        </div>

        <div className={styles.actions}>
          <a
            href="https://www.linkedin.com/in/souhrid-dey/"
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.actionBtn} ${styles.primaryAction}`}
          >
            <LinkedinIcon size={18} />
            <span>View Complete Profile on LinkedIn</span>
          </a>

          <a
            href="mailto:dsouhrid@gmail.com?subject=Portfolio%20Inquiry%20%E2%80%94%20Resume%20Request"
            className={`${styles.actionBtn} ${styles.secondaryAction}`}
          >
            <Mail size={18} />
            <span>Request Direct PDF via Email</span>
          </a>
        </div>

        <p className={styles.footerNote}>
          Tip: All project repositories, notebooks, and code benchmarks are linked below in the project observatory.
        </p>
      </div>
    </div>
  );
}
