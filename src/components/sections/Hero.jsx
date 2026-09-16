'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, FileText, Mail } from 'lucide-react';
import { LinkedinIcon, GithubIcon, KaggleIcon, LeetcodeIcon, TableauIcon } from '../ui/Icons';
import ResumeModal from '../layout/ResumeModal';
import socialLinks from '../../data/social-links.json';
import siteConfig from '../../data/site-config.json';
import styles from '../../styles/hero.module.css';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import FadeIn from '../ui/FadeIn';
import dynamic from 'next/dynamic';

const Hero3DObject = dynamic(() => import('../ui/Hero3DObject'), { ssr: false });
const ConstellationCanvas = dynamic(() => import('../ui/ConstellationCanvas'), { ssr: false });

const ROLES = [
  'Data Scientist',
  'Machine Learning Engineer',
  'Financial Analytics Specialist',
  'Agentic GenAI Developer'
];

/**
 * Hero Section Component
 * 
 * Serves as the landing view of the portfolio. Features a dynamic typing effect 
 * for the user's role, interactive 3D elements (Constellation background and Brain object),
 * and quick-access social links. Heavy 3D components are dynamically imported to 
 * optimize the First Contentful Paint (FCP).
 * 
 * @returns {JSX.Element} The Hero Section
 */
export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    let typingSpeed = isDeleting ? 45 : 90;

    if (!isDeleting && displayedText === currentRole) {
      // Pause at full word
      const timeout = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(timeout);
    } else if (isDeleting && displayedText === '') {
      // Finished deleting, move to next role
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
      return;
    }

    const timer = setTimeout(() => {
      setDisplayedText((prev) =>
        isDeleting
          ? currentRole.substring(0, prev.length - 1)
          : currentRole.substring(0, prev.length + 1)
      );
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, roleIndex]);

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Linkedin': return <LinkedinIcon size={18} />;
      case 'Github': return <GithubIcon size={18} />;
      case 'Database': return <KaggleIcon size={18} />;
      case 'Code2': return <LeetcodeIcon size={18} />;
      case 'BarChart3': return <TableauIcon size={18} />;
      case 'Mail': return <Mail size={18} />;
      default: return <GithubIcon size={18} />;
    }
  };

  return (
    <section id="hero" className={styles.hero}>
      <ConstellationCanvas />

      <div className={`container ${styles.heroGrid}`}>
        <div className={styles.heroContent}>
          <FadeIn delay={0.1}>
          <div className={styles.availabilityBadge}>
            <div className={styles.pulseGreen} />
            <span className={styles.availabilityText}>{siteConfig.availability}</span>
          </div>

          <p className={styles.titleIntro}>Welcome to the Observatory of</p>
          <h1 className={styles.name}>{siteConfig.name}</h1>

          <div className={styles.roleWrapper}>
            <span className={styles.rolePrefix}>Specializing in</span>
            <span className={styles.roleDynamic}>{displayedText}</span>
          </div>

          <p className={styles.lead}>
            Fusing <span className={styles.leadHighlight}>6+ years of corporate financial analytics & BI</span> (Maersk, Genpact, Eaton) 
            with academic distinction in <span className={styles.leadHighlight}>Data Science & Machine Learning</span> from UT Austin McCombs (4.07/4.33 GPA).
            Uncovering actionable signals in high-dimensional noise.
          </p>

          <div className={styles.ctaGroup}>
            <Link href="#projects" className="btnPrimary">
              <span>Explore Observatory Projects</span>
              <ArrowRight size={18} />
            </Link>

            <button
              onClick={() => setResumeModalOpen(true)}
              className="btnSecondary"
            >
              <FileText size={18} />
              <span>View Resume</span>
            </button>
          </div>


        <div className={styles.socialBar}>
          <span className={styles.socialLabel}>Verified Observatories:</span>
          <div className={styles.socialIconsGroup}>
            {socialLinks.map((item) => (
              <a
                key={item.name}
                href={item.url}
                target={item.url.startsWith('mailto:') ? '_self' : '_blank'}
                rel="noopener noreferrer"
                className={styles.socialIconBtn}
                title={item.name}
                aria-label={item.name}
              >
                {getIcon(item.icon)}
              </a>
            ))}
          </div>
        </div>
        </FadeIn>
        </div>

        <FadeIn delay={0.3} className={styles.heroCanvasContainer}>
          <Canvas camera={{ position: [0, 0, 8], fov: 45 }} style={{ pointerEvents: 'none' }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <Environment preset="city" />
            <Hero3DObject />
          </Canvas>
        </FadeIn>
      </div>

      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />
    </section>
  );
}
