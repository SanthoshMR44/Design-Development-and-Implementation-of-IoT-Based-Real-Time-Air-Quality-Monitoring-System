import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Mail, MapPin, Users } from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import { submitDemoRequest } from '../services/api';

const DEPLOYMENT_TYPES = [
  'Industry', 'Hospital', 'Smart City', 'Campus', 'Commercial', 'Indoor', 'Outdoor', 'Research', 'Other'
];

const EMPTY_FORM = {
  name: '', organization: '', email: '', phone: '', location: '', deploymentType: '', message: ''
};

export default function ContactSection() {
  const [form,      setForm]      = useState(EMPTY_FORM);
  const [loading,   setLoading]   = useState(false);
  const [success,   setSuccess]   = useState(null);
  const [error,     setError]     = useState(null);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setSuccess(null);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      setError('Name and email are required.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await submitDemoRequest(form);
      setSuccess(res.message);
      setForm(EMPTY_FORM);
    } catch (e) {
      setError(e.message || 'Failed to submit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#020818]">
      <div className="section-wrapper">
        <SectionHeader
          eyebrow="Contact / Request Demo"
          title={<>Get in Touch with <span className="gradient-text">AQMS</span></>}
          subtitle="Interested in deploying, collaborating, researching, or demonstrating AQMS? Reach out to the team."
          centered
        />

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Info cards */}
          <div className="flex flex-col gap-5">
            <div className="glass-card p-5 border border-cyan-500/20">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20
                              flex items-center justify-center mb-3">
                <Users size={18} className="text-cyan-400" />
              </div>
              <h4 className="text-white font-semibold text-sm mb-2">Interested in AQMS?</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                We welcome inquiries from industries, hospitals, smart-city organizations, educational
                institutions, environmental agencies, and research collaborators.
              </p>
            </div>

            <div className="glass-card p-5 border border-teal-500/20">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20
                              flex items-center justify-center mb-3">
                <MapPin size={18} className="text-teal-400" />
              </div>
              <h4 className="text-white font-semibold text-sm mb-2">JIT Davangere</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Jain Institute of Technology, Davangere, Karnataka, India.
                Department of Computer Science & Engineering — AIML specialization.
              </p>
            </div>

            <div className="glass-card p-5 border border-emerald-500/20">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20
                              flex items-center justify-center mb-3">
                <Mail size={18} className="text-emerald-400" />
              </div>
              <h4 className="text-white font-semibold text-sm mb-2">Suitable For</h4>
              <div className="flex flex-wrap gap-1.5">
                {['Pilot Deployment', 'Research Collaboration', 'Product Demo', 'Investment Discussion', 'Academic Partnership'].map(t => (
                  <span key={t} className="text-[10px] px-2 py-0.5 rounded-full
                                           bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="glass-card border border-cyan-500/20 p-6">
              <h3 className="text-white font-bold text-lg mb-6">
                Request an AQMS Demonstration
              </h3>

              {success ? (
                <div className="flex flex-col items-center gap-4 py-10 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20
                                  flex items-center justify-center">
                    <CheckCircle size={28} className="text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg mb-2">Request Submitted!</p>
                    <p className="text-slate-400 text-sm">{success}</p>
                  </div>
                  <button onClick={() => setSuccess(null)}
                          className="px-4 py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30
                                     text-cyan-400 text-sm hover:bg-cyan-500/20 transition-colors">
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-400 text-xs mb-1.5">Full Name *</label>
                      <input name="name" value={form.name} onChange={handleChange}
                             placeholder="Your name"
                             className="input-field" required />
                    </div>
                    <div>
                      <label className="block text-slate-400 text-xs mb-1.5">Organization</label>
                      <input name="organization" value={form.organization} onChange={handleChange}
                             placeholder="Company / Institution"
                             className="input-field" />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-400 text-xs mb-1.5">Email Address *</label>
                      <input name="email" value={form.email} onChange={handleChange}
                             type="email" placeholder="you@example.com"
                             className="input-field" required />
                    </div>
                    <div>
                      <label className="block text-slate-400 text-xs mb-1.5">Phone Number</label>
                      <input name="phone" value={form.phone} onChange={handleChange}
                             type="tel" placeholder="+91 98765 43210"
                             className="input-field" />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-400 text-xs mb-1.5">Location / City</label>
                      <input name="location" value={form.location} onChange={handleChange}
                             placeholder="Davangere, Karnataka…"
                             className="input-field" />
                    </div>
                    <div>
                      <label className="block text-slate-400 text-xs mb-1.5">Deployment Type</label>
                      <select name="deploymentType" value={form.deploymentType} onChange={handleChange}
                              className="input-field">
                        <option value="">Select type…</option>
                        {DEPLOYMENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 text-xs mb-1.5">Message</label>
                    <textarea name="message" value={form.message} onChange={handleChange}
                              rows={4} placeholder="Tell us about your monitoring needs, deployment location, and how AQMS can help…"
                              className="input-field resize-none" />
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                      <AlertCircle size={14} className="text-red-400 shrink-0" />
                      <p className="text-red-400 text-xs">{error}</p>
                    </div>
                  )}

                  <button type="submit" disabled={loading}
                          className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-teal-600
                                     hover:from-cyan-500 hover:to-teal-500 text-white font-bold text-sm
                                     transition-all duration-200 btn-glow flex items-center justify-center gap-2
                                     disabled:opacity-60 disabled:cursor-not-allowed">
                    {loading
                      ? <><div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />Submitting…</>
                      : <><Send size={15} />Request AQMS Demonstration</>
                    }
                  </button>

                  <p className="text-slate-600 text-xs text-center">
                    In demo mode, requests are stored locally. Email delivery requires SMTP configuration.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
