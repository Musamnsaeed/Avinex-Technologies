import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { COMPANY } from '../data/siteData';
import { supabase } from '../lib/supabase';
import { useSEO } from '../utils/useSEO';

export default function ContactUs() {
  useSEO({
    title: 'Contact Us & Procurement Requests',
    description: 'Get in touch with AVINEX Technologies for RFQ tender requests, equipment procurement, maintenance agreements, or technical support in Pakistan.',
    canonical: '/contact-us',
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    website: '', // Hidden honeypot field
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({
    type: null, // 'success' | 'error' | null
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validatePhone = (phone) => {
    if (!phone || !phone.trim()) return true; // Phone is optional
    const trimmed = phone.trim();
    // Allow digits, spaces, hyphens, plus sign, parentheses
    if (!/^[\d\s\-+()]+$/.test(trimmed)) return false;
    const digits = trimmed.replace(/\D/g, '');
    return digits.length >= 7 && digits.length <= 15;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: null, message: '' });

    // Check hidden honeypot field for spam bots (check both state and raw DOM element)
    const honeypotVal = e.target?.elements?.website?.value || formData.website || '';
    if (honeypotVal && honeypotVal.trim() !== '') {
      // Spam bot detected: simulate instant success without recording into DB
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setStatus({
          type: 'success',
          message: 'Thank you for reaching out! Our team will review your inquiry and get back to you within 24 hours.',
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          subject: '',
          message: '',
          website: '',
        });
      }, 300);
      return;
    }

    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedPhone = formData.phone.trim();
    const trimmedCompany = formData.company.trim();
    const selectedSubject = formData.subject.trim();
    const trimmedMessage = formData.message.trim();

    // 1. Validate required fields
    if (!trimmedName) {
      setStatus({ type: 'error', message: 'Full Name is required.' });
      return;
    }

    // 2. Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      setStatus({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }

    // 3. Validate phone (+92 allowed)
    if (trimmedPhone && !validatePhone(trimmedPhone)) {
      setStatus({
        type: 'error',
        message: 'Please enter a valid phone number (e.g. +92-XXX-XXXXXXX or 03XX-XXXXXXX).',
      });
      return;
    }

    // 4. Validate subject
    if (!selectedSubject) {
      setStatus({ type: 'error', message: 'Please select a subject.' });
      return;
    }

    // 5. Validate message min 10 chars
    if (!trimmedMessage) {
      setStatus({ type: 'error', message: 'Message is required.' });
      return;
    }
    if (trimmedMessage.length < 10) {
      setStatus({
        type: 'error',
        message: 'Message must be at least 10 characters long.',
      });
      return;
    }

    // 6. Insert into Supabase table: contact_submissions
    setIsSubmitting(true);
    try {
      const payload = {
        full_name: trimmedName,
        email: trimmedEmail.toLowerCase(),
        phone: trimmedPhone || null,
        company: trimmedCompany || null,
        subject: selectedSubject,
        message: trimmedMessage,
        status: 'new',
      };

      const { error } = await supabase
        .from('contact_submissions')
        .insert([payload]);

      if (error) {
        throw new Error(error.message || 'Failed to submit form to Supabase.');
      }

      // Success: display green success message and reset form
      setStatus({
        type: 'success',
        message: 'Thank you for reaching out! Our team will review your inquiry and get back to you within 24 hours.',
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: '',
        website: '',
      });
    } catch (err) {
      console.error('Contact submission error:', err);
      setStatus({
        type: 'error',
        message: err.message || 'Failed to send your message. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const els = document.querySelectorAll('.fade-up');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ─── Page Banner ─── */}
      <div className="page-banner" id="contact-banner">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Contact Us</span>
          </div>
          <h1>Contact Us</h1>
          <p>
            Reach out to discuss your project requirements, request a
            quotation, or schedule a consultation with our team.
          </p>
        </div>
      </div>

      {/* ─── Contact Form & Info ─── */}
      <section className="section" id="contact-form-section">
        <div className="container">
          <div className="contact-grid fade-up">
            {/* Form Column */}
            <div>
              <h2
                className="section-title"
                style={{ fontSize: '1.5rem', marginBottom: '24px' }}
              >
                Send Us a Message
              </h2>

              {/* Green Success Message Alert */}
              {status.type === 'success' && (
                <div
                  id="form-success-alert"
                  role="status"
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    padding: '16px 20px',
                    marginBottom: '24px',
                    backgroundColor: '#ecfdf5',
                    border: '1px solid #10b981',
                    borderRadius: '8px',
                    color: '#065f46',
                    fontSize: '0.9375rem',
                    lineHeight: '1.5',
                  }}
                >
                  <CheckCircle2 size={20} color="#059669" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ display: 'block', fontWeight: 600, marginBottom: '2px', color: '#047857' }}>
                      Message Sent Successfully
                    </strong>
                    <span>{status.message}</span>
                  </div>
                </div>
              )}

              {/* Red Error Message Alert */}
              {status.type === 'error' && (
                <div
                  id="form-error-alert"
                  role="alert"
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    padding: '16px 20px',
                    marginBottom: '24px',
                    backgroundColor: '#fef2f2',
                    border: '1px solid #ef4444',
                    borderRadius: '8px',
                    color: '#991b1b',
                    fontSize: '0.9375rem',
                    lineHeight: '1.5',
                  }}
                >
                  <AlertCircle size={20} color="#dc2626" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ display: 'block', fontWeight: 600, marginBottom: '2px', color: '#b91c1c' }}>
                      Submission Failed
                    </strong>
                    <span>{status.message}</span>
                  </div>
                </div>
              )}

              <form className="contact-form" onSubmit={handleSubmit} id="contact-form" noValidate>
                {/* Honeypot Spam Prevention Field (hidden from genuine users) */}
                <div
                  style={{
                    position: 'absolute',
                    opacity: 0,
                    top: 0,
                    left: '-9999px',
                    height: 0,
                    width: 0,
                    zIndex: -1,
                    overflow: 'hidden',
                  }}
                  aria-hidden="true"
                >
                  <label htmlFor="form-website">Website (Leave blank)</label>
                  <input
                    type="text"
                    id="form-website"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.website}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="form-name">Full Name *</label>
                    <input
                      type="text"
                      id="form-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="form-email">Email Address *</label>
                    <input
                      type="email"
                      id="form-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="you@company.com"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="form-phone">Phone Number</label>
                    <input
                      type="tel"
                      id="form-phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+92-XXX-XXXXXXX"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="form-company">Company / Organization</label>
                    <input
                      type="text"
                      id="form-company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your company name"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="form-subject">Subject *</label>
                  <select
                    id="form-subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="product-inquiry">Product Inquiry</option>
                    <option value="quotation-request">Quotation Request</option>
                    <option value="tender-support">Tender Support</option>
                    <option value="it-support">IT Support</option>
                    <option value="partnership">Partnership Inquiry</option>
                    <option value="general">General Inquiry</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="form-message">Message *</label>
                  <textarea
                    id="form-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Describe your requirements, quantity, or project scope..."
                    rows={5}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-red"
                  id="form-submit-btn"
                  disabled={isSubmitting}
                  style={isSubmitting ? { opacity: 0.75, cursor: 'not-allowed' } : {}}
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      Send Message <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Info Column */}
            <div>
              <h2
                className="section-title"
                style={{ fontSize: '1.5rem', marginBottom: '24px' }}
              >
                Get In Touch
              </h2>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '24px',
                }}
              >
                {[
                  {
                    icon: MapPin,
                    title: 'Our Office',
                    lines: [
                      COMPANY.legalName,
                      `${COMPANY.address.line1}, ${COMPANY.address.line2}`,
                      `${COMPANY.address.city}, ${COMPANY.address.country}`,
                    ],
                  },
                  {
                    icon: Phone,
                    title: 'Phone & Fax',
                    lines: [
                      `Phone: ${COMPANY.phone}`,
                      `Fax: ${COMPANY.fax}`,
                    ],
                  },
                  {
                    icon: Mail,
                    title: 'Email',
                    lines: [COMPANY.email],
                  },
                  {
                    icon: Clock,
                    title: 'Business Hours',
                    lines: [
                      'Monday – Friday: 9:00 AM – 6:00 PM',
                      'Saturday: 10:00 AM – 2:00 PM',
                      'Sunday: Closed',
                    ],
                  },
                ].map((block) => (
                  <div
                    key={block.title}
                    style={{
                      display: 'flex',
                      gap: '16px',
                      padding: '24px',
                      background: 'var(--gray-50)',
                      borderRadius: '12px',
                      border: '1px solid var(--gray-200)',
                    }}
                  >
                    <div
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '10px',
                        background: 'var(--navy)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        flexShrink: 0,
                      }}
                    >
                      <block.icon size={20} />
                    </div>
                    <div>
                      <h4
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '0.9375rem',
                          fontWeight: 700,
                          color: 'var(--navy)',
                          marginBottom: '6px',
                        }}
                      >
                        {block.title}
                      </h4>
                      {block.lines.map((line, idx) => (
                        <div
                          key={idx}
                          style={{
                            fontSize: '0.875rem',
                            color: 'var(--gray-500)',
                            lineHeight: 1.6,
                          }}
                        >
                          {line}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Map Placeholder ─── */}
      <div
        id="contact-map"
        style={{
          width: '100%',
          height: '300px',
          background:
            'linear-gradient(135deg, var(--gray-200) 0%, var(--gray-300) 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--gray-400)',
          fontSize: '1rem',
          fontFamily: 'var(--font-heading)',
          fontWeight: 600,
        }}
      >
        <MapPin size={24} style={{ marginRight: '8px' }} />
        Map Embed — Replace with Google Maps iframe
      </div>
    </>
  );
}
