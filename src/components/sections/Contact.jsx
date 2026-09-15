'use client';

import { useState } from 'react';
import { Mail, MapPin, Send, MessageSquare, CheckCircle, AlertCircle, Loader2, Link as LinkIcon, CheckCircle2 } from 'lucide-react';
import { LinkedinIcon } from '../ui/Icons';
import siteConfig from '../../data/site-config.json';
import styles from '../../styles/contact.module.css';
import FadeIn from '../ui/FadeIn';
import DataCore3D from '../ui/DataCore3D';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Data Science / ML Role',
    message: ''
  });

  const [status, setStatus] = useState({ state: 'idle', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({ state: 'error', message: 'Please fill in all required fields.' });
      return;
    }

    setStatus({ state: 'loading', message: 'Transmitting message to the observatory...' });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          request_type: formData.subject,
          message: formData.message,
        }),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        setStatus({
          state: 'success',
          message: 'Thank you! Your message was received. Souhrid will respond promptly.'
        });
        setFormData({
          name: '',
          email: '',
          subject: 'Data Science / ML Role',
          message: ''
        });
      } else {
        throw new Error(result.error || 'Submission failed');
      }
    } catch (err) {
      setStatus({
        state: 'error',
        message: 'Could not submit online. Please email directly at dsouhrid@gmail.com'
      });
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <FadeIn>
          <div className="sectionHeader">
            <div className="sectionBadge">
              <Mail size={14} />
              <span>Initiate Transmission</span>
            </div>
            <h2 className="sectionTitle">Establish Contact</h2>
            <p className="sectionSubtitle">
              Open to strategic data science roles, consulting engagements, or collaborative research.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className={styles.contactGrid}>
            {/* Direct Connect Info */}
            <div className={styles.contactInfo} style={{ position: 'relative' }}>
              <div style={{ marginBottom: '2rem', position: 'relative', zIndex: 10 }}>
                <h3 className={styles.infoTitle}>Let’s Build Something Impactful</h3>
                <p className={styles.infoDesc}>
                  Whether you have an opening for a <strong>Data Scientist</strong> or <strong>ML Engineer</strong>, 
                  want to discuss retention economics, or explore cutting-edge agentic workflows, I’d love to connect.
                </p>
              </div>

              {/* Data Core Canvas - Relative flow to create space between text and links. Transformed up 20% */}
              <div style={{ position: 'relative', width: '100%', height: '320px', zIndex: 1, marginBottom: '2rem', transform: 'translateY(-64px)', pointerEvents: 'none' }}>
                <DataCore3D />
              </div>

              <div className={styles.detailsList}>
                <div className={styles.detailCard}>
                  <div className={styles.detailIcon}>
                    <Mail size={20} />
                  </div>
                  <div>
                    <div className={styles.detailLabel}>Direct Email</div>
                    <a href={`mailto:${siteConfig.email}`} className={styles.detailValue}>
                      {siteConfig.email}
                    </a>
                  </div>
                </div>

                {siteConfig.lab_email && (
                  <div className={styles.detailCard}>
                    <div className={styles.detailIcon}>
                      <Mail size={20} />
                    </div>
                    <div>
                      <div className={styles.detailLabel}>R&D / Collaborations</div>
                      <a href={`mailto:${siteConfig.lab_email}`} className={styles.detailValue}>
                        {siteConfig.lab_email}
                      </a>
                    </div>
                  </div>
                )}

                <div className={styles.detailCard}>
                  <div className={styles.detailIcon}>
                    <MapPin size={20} />
                  </div>
                  <div>
                    <div className={styles.detailLabel}>Current Location</div>
                    <a
                      href="https://www.google.com/maps/place/Pune,+Maharashtra,+India"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.detailValue}
                    >
                      {siteConfig.location}
                    </a>
                  </div>
                </div>

                <div className={styles.detailCard}>
                  <div className={styles.detailIcon}>
                    <LinkedinIcon size={20} />
                  </div>
                  <div>
                    <div className={styles.detailLabel}>Professional Network</div>
                    <a
                      href="https://www.linkedin.com/in/souhrid-dey/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.detailValue}
                    >
                      linkedin.com/in/souhrid-dey
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className={styles.formCard}>
              <h3 className={styles.formTitle}>Send a Direct Transmission</h3>

              <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.label}>Your Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Sarah Jenkins"
                    className={styles.input}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.label}>Your Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. s.jenkins@enterprise.com"
                    className={styles.input}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="subject" className={styles.label}>Topic / Inquiring Role</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={styles.select}
                  >
                    <option value="Data Science / ML Role">Data Science / ML Engineering Role</option>
                    <option value="Senior Financial BI Role">Senior Financial Analytics / BI Role</option>
                    <option value="AI / ML Collaboration">Project Collaboration / Hackathon</option>
                    <option value="General Inquiry">General Inquiries / Professional Greeting</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message" className={styles.label}>Your Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Share details about the role, project, or timeline..."
                    className={styles.textarea}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={status.state === 'loading'}
                  className={`btnPrimary ${styles.submitBtn}`}
                >
                  {status.state === 'loading' ? (
                    <span>Sending Transmission...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send size={18} />
                    </>
                  )}
                </button>

                {status.state === 'success' && (
                  <div className={`${styles.statusMessage} ${styles.statusSuccess}`}>
                    {status.message}
                  </div>
                )}

                {status.state === 'error' && (
                  <div className={`${styles.statusMessage} ${styles.statusError}`}>
                    {status.message}
                  </div>
                )}
              </form>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
