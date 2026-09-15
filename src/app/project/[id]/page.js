import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import InfographicBackground from '@/components/ui/InfographicBackground';
import styles from './page.module.css';

// Read JSON synchronously for static generation
function getProjects() {
  const filePath = path.join(process.cwd(), 'src', 'data', 'projects.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}

// Next.js standard method for generating static paths in App Router
export function generateStaticParams() {
  const projects = getProjects();
  return projects.map((project) => ({
    id: project.id,
  }));
}

export default async function ProjectPage({ params }) {
  const resolvedParams = await params;
  const projects = getProjects();
  const project = projects.find((p) => p.id === resolvedParams.id);

  if (!project) {
    notFound();
  }

  const themeColors = {
    'telecom-churn': 'radial-gradient(circle at top right, rgba(225, 29, 72, 0.15), transparent 70%)',
    'easyvisa-approval': 'radial-gradient(circle at top right, rgba(56, 189, 248, 0.15), transparent 70%)',
    'shinkansen-satisfaction': 'radial-gradient(circle at top right, rgba(168, 85, 247, 0.15), transparent 70%)',
    'car-insurance-tableau': 'radial-gradient(circle at top right, rgba(245, 158, 11, 0.15), transparent 70%)',
    'toodles-ai': 'radial-gradient(circle at top right, rgba(16, 185, 129, 0.15), transparent 70%)',
    'us-voter-education': 'radial-gradient(circle at top right, rgba(59, 130, 246, 0.15), transparent 70%)',
    'monsoon-ai': 'radial-gradient(circle at top right, rgba(14, 165, 233, 0.15), transparent 70%)',
    'alllife-segmentation': 'radial-gradient(circle at top right, rgba(236, 72, 153, 0.15), transparent 70%)',
    'showtime-ott': 'radial-gradient(circle at top right, rgba(139, 92, 246, 0.15), transparent 70%)',
    'new-wheels-sql': 'radial-gradient(circle at top right, rgba(234, 179, 8, 0.15), transparent 70%)',
    'inn-hotels-cancellation': 'radial-gradient(circle at top right, rgba(244, 63, 94, 0.15), transparent 70%)',
    'austo-automobiles-eda': 'radial-gradient(circle at top right, rgba(34, 197, 94, 0.15), transparent 70%)',
  };

  const bgStyle = themeColors[project.id] || 'radial-gradient(circle at top right, rgba(255, 255, 255, 0.05), transparent 70%)';

  return (
    <main className={styles.container} style={{ backgroundImage: bgStyle, minHeight: '100vh' }}>
      <InfographicBackground />
      <Link href="/#projects" className={styles.backLink}>
        ← Back to Observatory
      </Link>

      <article className={styles.article}>
        <div className={styles.hero}>
          <div className={styles.header}>
            <h1 className={styles.title}>{project.title}</h1>
            <p className={styles.subtitle}>{project.subtitle}</p>
            <div className={styles.tags}>
              {project.tags.map(tag => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>
          </div>
          
          <div className={styles.imageWrapper}>
            <Image 
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 1200px) 100vw, 1200px"
              className={styles.coverImage}
              priority
            />
          </div>
        </div>

        <div className={styles.contentGrid}>
          <div className={styles.mainContent}>
            {project.extensive_data ? (
              <div className={styles.markdownContent}>
                {project.extensive_data.executive_summary && (
                  <section className={styles.section}>
                    <h2>Executive Summary</h2>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{project.extensive_data.executive_summary}</ReactMarkdown>
                  </section>
                )}
                
                {project.extensive_data.architecture && (
                  <section className={styles.section}>
                    <h2>Dataset & Feature Architecture</h2>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{project.extensive_data.architecture}</ReactMarkdown>
                  </section>
                )}

                {project.extensive_data.insights && (
                  <section className={styles.section}>
                    <h2>Strategic Insights & EDA</h2>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{project.extensive_data.insights}</ReactMarkdown>
                  </section>
                )}

                {project.extensive_data.pipeline && (
                  <section className={styles.section}>
                    <h2>Analytical Pipeline</h2>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{project.extensive_data.pipeline}</ReactMarkdown>
                  </section>
                )}

                {project.extensive_data.results && (
                  <section className={styles.section}>
                    <h2>Model Performance & Results</h2>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{project.extensive_data.results}</ReactMarkdown>
                  </section>
                )}

                {project.extensive_data.playbook && (
                  <section className={styles.section}>
                    <h2>Actionable Business Recommendations</h2>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{project.extensive_data.playbook}</ReactMarkdown>
                  </section>
                )}
              </div>
            ) : (
              // Fallback for missing extensive data
              <>
                <section className={styles.section}>
                  <h2>The Problem</h2>
                  <p>{project.problem}</p>
                </section>
                
                <section className={styles.section}>
                  <h2>The Solution & Methodology</h2>
                  <p>{project.solution}</p>
                </section>
                
                {project.summary && (
                  <section className={styles.section}>
                    <h2>Executive Summary</h2>
                    <p>{project.summary}</p>
                  </section>
                )}
              </>
            )}
          </div>

          <aside className={styles.sidebar}>
            <div className={styles.metricsCard}>
              <h3>Key Metrics & KPIs</h3>
              <div className={styles.metricList}>
                {project.metrics.map((metric, i) => (
                  <div key={i} className={styles.metricItem}>
                    <span className={styles.metricValue}>{metric.value}</span>
                    <span className={styles.metricLabel}>{metric.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.links}>
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noopener noreferrer" className={`${styles.btn} ${styles.btnPrimary}`}>
                  View Live Demo / Viz
                </a>
              )}
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className={`${styles.btn} ${styles.btnSecondary}`}>
                  View Source on GitHub
                </a>
              )}
            </div>
          </aside>
        </div>
      </article>
    </main>
  );
}
