import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Send, CheckCircle2, MessageSquare, Briefcase, Mail, User } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState("3d-modeling");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setLoading(true);
    // Simulate real server side submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      
      // Save to localStorage so submissions are persistent and accessible
      const currentSubmissions = JSON.parse(localStorage.getItem("jack_contact_submissions") || "[]");
      const newSubmission = {
        id: Date.now(),
        name,
        email,
        projectType,
        message,
        date: new Date().toLocaleDateString(),
      };
      localStorage.setItem(
        "jack_contact_submissions",
        JSON.stringify([newSubmission, ...currentSubmissions])
      );
    }, 1200);
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setProjectType("3d-modeling");
    setMessage("");
    setSubmitted(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative bg-[#0C0C0C] border-2 border-[#D7E2EA] p-6 sm:p-8 rounded-[30px] sm:rounded-[40px] max-w-lg w-full shadow-2xl z-10 overflow-hidden select-none text-[#D7E2EA]"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full border border-[#D7E2EA]/20 hover:border-[#D7E2EA]/60 hover:bg-white/5 text-[#D7E2EA] transition-all cursor-pointer"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-4">
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white">
                    Start a project
                  </h3>
                  <p className="text-sm text-[#D7E2EA]/60 font-light">
                    Share your idea and let&apos;s turn it into a spatial reality together.
                  </p>
                </div>

                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#D7E2EA]/50 flex items-center gap-1.5">
                    <User size={12} /> Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full bg-[#141414] border border-[#D7E2EA]/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#D7E2EA] transition-colors placeholder-[#D7E2EA]/30"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#D7E2EA]/50 flex items-center gap-1.5">
                    <Mail size={12} /> Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jack@example.com"
                    className="w-full bg-[#141414] border border-[#D7E2EA]/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#D7E2EA] transition-colors placeholder-[#D7E2EA]/30"
                  />
                </div>

                {/* Project Type */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#D7E2EA]/50 flex items-center gap-1.5">
                    <Briefcase size={12} /> Service Category
                  </label>
                  <select
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    className="w-full bg-[#141414] border border-[#D7E2EA]/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#D7E2EA] transition-colors cursor-pointer text-[#D7E2EA]"
                  >
                    <option value="3d-modeling">01 - 3D Modeling</option>
                    <option value="rendering">02 - Rendering</option>
                    <option value="motion-design">03 - Motion Design</option>
                    <option value="branding">04 - Branding</option>
                    <option value="web-design">05 - Web Design</option>
                  </select>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#D7E2EA]/50 flex items-center gap-1.5">
                    <MessageSquare size={12} /> Tell me about your project
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your design vision, timeline, or scope..."
                    className="w-full bg-[#141414] border border-[#D7E2EA]/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#D7E2EA] transition-colors placeholder-[#D7E2EA]/30 resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 rounded-full uppercase font-medium tracking-widest text-white py-3.5 text-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  style={{
                    background:
                      "linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)",
                    boxShadow: "0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1",
                    outline: "2px solid white",
                    outlineOffset: "-3px",
                  }}
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send size={15} /> Send Proposal
                    </>
                  )}
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center py-10 gap-4"
              >
                <div className="text-[#B600A8] p-4 bg-[#B600A8]/10 rounded-full border border-[#B600A8]/20 mb-2">
                  <CheckCircle2 size={44} className="animate-bounce" />
                </div>
                <h3 className="text-2xl font-bold uppercase tracking-tight text-white">
                  Message Transmitted!
                </h3>
                <p className="text-[#D7E2EA]/70 text-sm font-light max-w-sm">
                  Thanks, <strong className="text-white">{name}</strong>. Jack has received your 
                  proposal for <strong className="text-white uppercase">{(projectType || "").replace("-", " ")}</strong>.
                  We&apos;ll look it over and reply to <strong className="text-white">{email}</strong> within 24 hours.
                </p>
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 rounded-full border border-[#D7E2EA]/40 text-xs font-semibold uppercase tracking-wider hover:bg-white/5 hover:text-white transition-colors cursor-pointer"
                  >
                    Send another
                  </button>
                  <button
                    onClick={onClose}
                    className="px-6 py-2.5 rounded-full bg-[#D7E2EA] text-[#0C0C0C] text-xs font-semibold uppercase tracking-wider hover:bg-white transition-colors cursor-pointer"
                  >
                    Close Window
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
