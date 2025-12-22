"use client";

import { useState, FormEvent } from "react";
import { Download, Mail, Copy, Check, Loader2, AlertCircle, CheckCircle } from "lucide-react";

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

type SubmitStatus = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formData, setFormData] = useState<FormState>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (field: keyof FormState) => {
    setTouched({ ...touched, [field]: true });
    // Validate single field on blur
    const newErrors = { ...errors };
    if (field === "name") {
      if (!formData.name.trim()) newErrors.name = "Name is required";
      else if (formData.name.trim().length < 2) newErrors.name = "Name must be at least 2 characters";
      else delete newErrors.name;
    }
    if (field === "email") {
      if (!formData.email.trim()) newErrors.email = "Email is required";
      else if (!validateEmail(formData.email)) newErrors.email = "Please enter a valid email";
      else delete newErrors.email;
    }
    if (field === "message") {
      if (!formData.message.trim()) newErrors.message = "Message is required";
      else if (formData.message.trim().length < 10) newErrors.message = "Message must be at least 10 characters";
      else delete newErrors.message;
    }
    setErrors(newErrors);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setSubmitStatus("loading");
    
    try {
      // Using Formspree - replace YOUR_FORM_ID with your actual Formspree form ID
      const response = await fetch("https://formspree.io/f/xrbqkrbk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTouched({});
        setTimeout(() => setSubmitStatus("idle"), 5000);
      } else {
        throw new Error("Failed to submit");
      }
    } catch {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }
  };

  const copyToClipboard = (text: string, type: "email" | "phone") => {
    navigator.clipboard.writeText(text);
    if (type === "email") {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handleEmailClick = () => {
    // Try mailto first, fallback to copy
    window.location.href = "mailto:oninpoh@gmail.com";
  };

  return (
    <section id="contact" className="py-24 px-6 border-t border-[#111111]/10 dark:border-white/10 bg-[#F3F3F3] dark:bg-[#0A0A0A] transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Content Grid - Form on right aligned with header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left side - Header and Contact info */}
          <div>
            {/* Section Header */}
            <div className="mb-12">
              <p className="text-xs font-mono text-[#666666] dark:text-[#999999] tracking-widest mb-4">(04) — CONTACT</p>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-[#111111] dark:text-[#F3F3F3]">
                LET'S<br />CONNECT
              </h2>
            </div>
            <p className="text-lg text-[#666666] dark:text-[#999999] leading-relaxed mb-8">
              Feel free to reach out for collaborations or just a friendly chat. I am
              always open to discussing new projects, creative ideas, or
              opportunities to be part of your vision.
            </p>
            
            <div className="space-y-4 mb-8">
              <button
                onClick={() => copyToClipboard("oninpoh@gmail.com", "email")}
                className="flex items-center gap-4 group cursor-pointer hover:opacity-70 transition-opacity"
              >
                <span className="text-xs font-mono text-[#666666] dark:text-[#999999]">[EMAIL]</span>
                <span className="text-sm font-medium flex items-center gap-2 text-[#111111] dark:text-[#F3F3F3]">
                  {copiedEmail ? (
                    <>
                      <Check size={14} className="text-green-500" />
                      COPIED!
                    </>
                  ) : (
                    <>
                      oninpoh@gmail.com
                      <Copy size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </>
                  )}
                </span>
              </button>
              <button
                onClick={() => copyToClipboard("+63 905 8840 820", "phone")}
                className="flex items-center gap-4 group cursor-pointer hover:opacity-70 transition-opacity"
              >
                <span className="text-xs font-mono text-[#666666] dark:text-[#999999]">[PHONE]</span>
                <span className="text-sm font-medium flex items-center gap-2 text-[#111111] dark:text-[#F3F3F3]">
                  {copiedPhone ? (
                    <>
                      <Check size={14} className="text-green-500" />
                      COPIED!
                    </>
                  ) : (
                    <>
                      +63 905 8840 820
                      <Copy size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </>
                  )}
                </span>
              </button>
            </div>

            {/* Dual Action Buttons */}
            <div className="flex flex-wrap gap-4 mb-8">
              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-2 px-6 py-3 border border-[#111111] dark:border-white text-[#111111] dark:text-white font-bold text-sm tracking-wide hover:bg-[#111111]/5 dark:hover:bg-white/10 transition-all"
              >
                <Download size={18} />
                Download Resume
              </a>
              <button
                onClick={handleEmailClick}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#111111] dark:bg-white text-white dark:text-[#111111] font-bold text-sm tracking-wide hover:opacity-90 transition-all"
              >
                <Mail size={18} />
                Send an Email
              </button>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-mono text-[#666666] dark:text-[#999999] mr-2">SOCIALS:</span>
              <a href="https://www.linkedin.com/in/niño-filipen-duque-187421206" target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-[#666666] dark:text-[#999999] border border-[#111111]/20 dark:border-white/20 px-4 py-2 hover:bg-[#111111] dark:hover:bg-white hover:text-white dark:hover:text-[#111111] transition-all">LINKEDIN</a>
              <a href="https://github.com/Nenjii" target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-[#666666] dark:text-[#999999] border border-[#111111]/20 dark:border-white/20 px-4 py-2 hover:bg-[#111111] dark:hover:bg-white hover:text-white dark:hover:text-[#111111] transition-all">GITHUB</a>
              <a href="https://www.facebook.com/mynenjiii" target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-[#666666] dark:text-[#999999] border border-[#111111]/20 dark:border-white/20 px-4 py-2 hover:bg-[#111111] dark:hover:bg-white hover:text-white dark:hover:text-[#111111] transition-all">FACEBOOK</a>
            </div>
          </div>

          {/* Right side - Contact form (aligned with header) */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-5 bg-white dark:bg-[#111111] p-6 border border-[#111111]/10 dark:border-white/10">
              {/* Success Message */}
              {submitStatus === "success" && (
                <div className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/30 text-green-600 dark:text-green-400">
                  <CheckCircle size={18} />
                  <span className="text-sm font-mono">Message sent successfully!</span>
                </div>
              )}
              
              {/* Error Message */}
              {submitStatus === "error" && (
                <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400">
                  <AlertCircle size={18} />
                  <span className="text-sm font-mono">Failed to send. Please try again.</span>
                </div>
              )}

              <div>
                <label htmlFor="name" className="block text-xs font-mono text-[#666666] dark:text-[#999999] mb-2 tracking-widest">
                  NAME
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  onBlur={() => handleBlur("name")}
                  placeholder="John Doe"
                  aria-invalid={touched.name && !!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className={`w-full p-4 bg-[#F3F3F3] dark:bg-[#0A0A0A] border focus:outline-none transition-colors font-mono text-[#111111] dark:text-[#F3F3F3] placeholder:text-[#111111]/30 dark:placeholder:text-white/30 ${
                    touched.name && errors.name 
                      ? "border-red-500 focus:border-red-500" 
                      : "border-[#111111]/10 dark:border-white/10 focus:border-[#111111] dark:focus:border-white"
                  }`}
                />
                {touched.name && errors.name && (
                  <p id="name-error" className="mt-1 text-xs text-red-500 font-mono">{errors.name}</p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="block text-xs font-mono text-[#666666] dark:text-[#999999] mb-2 tracking-widest">
                  EMAIL
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  onBlur={() => handleBlur("email")}
                  placeholder="john@example.com"
                  aria-invalid={touched.email && !!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={`w-full p-4 bg-[#F3F3F3] dark:bg-[#0A0A0A] border focus:outline-none transition-colors font-mono text-[#111111] dark:text-[#F3F3F3] placeholder:text-[#111111]/30 dark:placeholder:text-white/30 ${
                    touched.email && errors.email 
                      ? "border-red-500 focus:border-red-500" 
                      : "border-[#111111]/10 dark:border-white/10 focus:border-[#111111] dark:focus:border-white"
                  }`}
                />
                {touched.email && errors.email && (
                  <p id="email-error" className="mt-1 text-xs text-red-500 font-mono">{errors.email}</p>
                )}
              </div>
              <div>
                <label htmlFor="message" className="block text-xs font-mono text-[#666666] dark:text-[#999999] mb-2 tracking-widest">
                  MESSAGE
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  onBlur={() => handleBlur("message")}
                  placeholder="Tell me about your project..."
                  aria-invalid={touched.message && !!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  className={`w-full p-4 bg-[#F3F3F3] dark:bg-[#0A0A0A] border focus:outline-none transition-colors font-mono resize-none text-[#111111] dark:text-[#F3F3F3] placeholder:text-[#111111]/30 dark:placeholder:text-white/30 ${
                    touched.message && errors.message 
                      ? "border-red-500 focus:border-red-500" 
                      : "border-[#111111]/10 dark:border-white/10 focus:border-[#111111] dark:focus:border-white"
                  }`}
                ></textarea>
                {touched.message && errors.message && (
                  <p id="message-error" className="mt-1 text-xs text-red-500 font-mono">{errors.message}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={submitStatus === "loading"}
                className="w-full py-4 bg-[#111111] dark:bg-white text-white dark:text-[#111111] font-black text-sm tracking-widest hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {submitStatus === "loading" ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    SENDING...
                  </>
                ) : (
                  "SEND MESSAGE →"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}