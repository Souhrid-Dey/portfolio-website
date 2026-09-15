'use client';

import TechOrbit from '../ui/TechOrbit';
import FadeIn from '../ui/FadeIn';

export default function CoreEcosystem() {
  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="container">
        <FadeIn delay={0.2}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#e2e8f0', marginBottom: '1rem' }}>
              Core Ecosystem
            </h3>
            <p style={{ color: 'var(--text-muted)' }}>
              The foundational technologies powering my analytics and agentic solutions.
            </p>
          </div>
          <TechOrbit />
        </FadeIn>
      </div>
    </section>
  );
}
