import React, { useState } from 'react';
import { Mail, Send } from 'lucide-react';
import { DecryptionText, MagneticWrapper, NeuralNode, ScrambleLink } from './NeuralCore';
import emailjs from '@emailjs/browser';

const PUBLIC_KEY = import.meta.env.VITE_EMAIL_PUBLIC_KEY;
const SERVICE_ID = import.meta.env.VITE_EMAIL_SERVICE_ID;
const TEMPLATE_ID_CONTACT = import.meta.env.VITE_EMAIL_TEMPLATE_ID_CONTACT;

export const ContactSection = ({ active }: { active: boolean }) => {
  const [formState, setFormState] = useState('idle'); // idle, sending, sent
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('sending');

    try {
        if (!PUBLIC_KEY || !SERVICE_ID) {
            console.log("DEMO MODE (Missing Keys): Sending to console.");
            console.log("Payload:", formData);
            await new Promise(resolve => setTimeout(resolve, 1500)); 
        } else {
            await emailjs.send(
            SERVICE_ID, 
            TEMPLATE_ID_CONTACT, 
                {
                    to_name: "Vikrant", 
                    name: formData.name,
                    email: formData.email,
                    reply_to: formData.email, // Ensures 'Reply' in Gmail goes to the sender
                    subject: `[PORTFOLIO CONTACT] New Message from ${formData.name}`,
                    message: formData.message,
                }, 
            PUBLIC_KEY
            );
        }
        
        setFormState('sent');
        setFormData({ name: '', email: '', message: '' });
    } catch (error) {
       console.error("EmailJS Error:", error);
       alert("Transmission Error: Unable to establish secure uplink. Check console for details.");
       setFormState('idle');
    }
  };

  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center relative z-10 pb-20">
      <div className="absolute top-0 left-1/2 -translate-x-1/2">
        <NeuralNode active={active} />
      </div>

      <div className="w-full max-w-2xl px-6">
        <div className="relative bg-black rounded-2xl border border-slate-800 p-8 md:p-12 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)]">
          {/* Reactor Core Visual */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />
          
          <div className="text-center mb-10">
            <div className="inline-block p-4 rounded-full bg-cyan-950/30 border border-cyan-500/20 mb-4 animate-pulse">
               <Mail className="text-cyan-400" size={32} />
            </div>
            <h2 className={`text-3xl font-bold text-white mb-2 transition-all duration-700 ${active ? 'drop-shadow-[0_0_15px_rgba(34,211,238,0.6)]' : ''}`}>
              <DecryptionText text="PULSE EMITTER" />
            </h2>
            <div className="flex justify-center gap-4 mt-4">
               <ScrambleLink href="https://github.com/vikrantwiz02" text="GITHUB" className="text-slate-400 hover:text-cyan-400" />
               <ScrambleLink href="https://www.linkedin.com/in/vikrantwiz02" text="LINKEDIN" className="text-slate-400 hover:text-cyan-400" />
            </div>
            <p className="text-slate-500 font-mono text-sm mt-2">vikrantkrd@gmail.com</p>
          </div>

          {formState === 'sent' ? (
            <div className="text-center py-12 animate-fade-in">
              <h3 className="text-2xl text-cyan-400 font-bold mb-2">Transmission Successful</h3>
              <p className="text-slate-400">Your packet has been uploaded to the neural network.</p>
              <button 
                onClick={() => setFormState('idle')}
                className="mt-6 text-sm text-slate-500 hover:text-white underline decoration-slate-700 underline-offset-4 cursor-pointer"
              >
                Send another signal
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-slate-500 ml-1">Identity</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-900/50 border border-slate-800 rounded-lg p-3 text-slate-200 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-700"
                    placeholder="NAME"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-slate-500 ml-1">Frequency</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-900/50 border border-slate-800 rounded-lg p-3 text-slate-200 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-700"
                    placeholder="EMAIL"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-slate-500 ml-1">Data Packet</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full bg-slate-900/50 border border-slate-800 rounded-lg p-3 text-slate-200 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-700 resize-none"
                  placeholder="MESSAGE..."
                />
              </div>

                <MagneticWrapper className="w-full max-w-full">
                <button 
                  type="submit"
                  disabled={formState === 'sending'}
                  className="w-full max-w-full group relative overflow-hidden rounded-lg bg-cyan-900/20 border border-cyan-500/30 py-4 px-2 transition-all hover:bg-cyan-500/10 hover:border-cyan-400 cursor-pointer"
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex items-center gap-2">
                    <Send size={16} className={formState === 'sending' ? 'animate-ping' : ''} />
                    <span className={`font-mono font-bold tracking-widest transition-all ${formState === 'sending' ? 'text-cyan-300' : 'text-cyan-500 group-hover:text-cyan-400'}`}>
                      {formState === 'sending' ? 'UPLOADING...' : 'INITIATE_TRANSMISSION'}
                    </span>
                  </div>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 absolute inset-0 bg-cyan-400/5 transition-opacity" />
                </button>
                </MagneticWrapper>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};