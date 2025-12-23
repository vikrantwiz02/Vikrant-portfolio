import React, { useState } from 'react';
import { X, Zap } from 'lucide-react';
import { Service } from '../types';
import emailjs from '@emailjs/browser';

const PUBLIC_KEY = import.meta.env.VITE_EMAIL_PUBLIC_KEY;
const SERVICE_ID = import.meta.env.VITE_EMAIL_SERVICE_ID;
const TEMPLATE_ID_ORDER = import.meta.env.VITE_EMAIL_TEMPLATE_ID_ORDER;

interface OrderModalProps {
  service: Service | null;
  onClose: () => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({ service, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: '', email: '', budget: '', details: '' });
  const [sending, setSending] = useState(false);

  if (!service) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    const formattedMessage = `
SERVICE REQUEST: ${service.title.toUpperCase()}
============================

CLIENT INFO
Name:   ${formData.name}
Email:  ${formData.email}
Budget: ${formData.budget}

SERVICE DETAILS
Module: ${service.title}
Type:   ${service.subtitle}
Est:    ${service.priceRange}

MESSAGE
${formData.details}

[Sent via Portfolio]
    `;

    try {
        // Validation check
        if (!PUBLIC_KEY || !SERVICE_ID) {
            console.log("DEMO MODE (Missing Keys): Service Order simulated.");
            console.log(formattedMessage);
            await new Promise(resolve => setTimeout(resolve, 1500));
        } else {
             // --- PRODUCTION MODE ---
             await emailjs.send(
                SERVICE_ID, 
                TEMPLATE_ID_ORDER, 
                {
                    to_name: "Vikrant", 
                    name: formData.name,
                    email: formData.email,
                    reply_to: formData.email,
                    subject: `[ORDER] ${service.title} - ${formData.name}`,
                    message: formattedMessage, 
                    budget: formData.budget,
                    service_name: service.title
                }, 
                PUBLIC_KEY
             );
        }

        setSending(false);
        setStep(3); 
    } catch (error) {
        console.error("EmailJS Error:", error);
        alert("Transmission Failed. Please verify neural uplink.");
        setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[12000] overflow-y-auto">
        {/* Container to center modal but allow scrolling if height is too large */}
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity" onClick={onClose} />
            
            {/* Modal Content */}
            <div className="relative transform overflow-hidden rounded-xl bg-charcoal text-left shadow-[0_0_50px_rgba(34,211,238,0.15)] transition-all sm:my-8 w-full max-w-lg border border-cyan-500/30 animate-[subtle-pulse_0.5s_ease-out]">
                <div className="bg-slate-900/50 p-4 border-b border-white/5 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <service.icon size={16} className="text-cyan-400" />
                        <span className="font-mono text-xs text-cyan-300 tracking-widest truncate max-w-[200px]">PROTOCOL: {service.title.toUpperCase()}</span>
                    </div>
                    <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
                        <X size={18} />
                    </button>
                </div>

                <div className="p-6 sm:p-8">
                    {step === 1 && (
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-2xl font-bold text-white">Initialize Order</h3>
                                <p className="text-slate-400 text-sm mt-2">
                                    You are requesting the <span className="text-cyan-400">{service.subtitle}</span> module. 
                                    <br className="hidden sm:block"/> Estimated capacity required: {service.priceRange}.
                                </p>
                            </div>
                            
                            <div className="space-y-2">
                                <div className="text-xs font-mono text-slate-500 uppercase">Included Modules</div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {service.features.map(f => (
                                        <div key={f} className="flex items-center gap-2 text-xs text-slate-300 bg-slate-800/50 p-2 rounded">
                                            <Zap size={10} className="text-cyan-500 shrink-0" /> {f}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button 
                                onClick={() => setStep(2)}
                                className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-sm tracking-wider rounded transition-colors shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                            >
                                PROCEED TO CONFIGURATION
                            </button>
                        </div>
                    )}

                    {step === 2 && (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-mono text-cyan-500">USER_ID (NAME)</label>
                                    <input 
                                        required
                                        className="w-full bg-black/40 border border-slate-700 rounded p-2 text-sm text-white focus:border-cyan-500 outline-none"
                                        value={formData.name}
                                        onChange={e => setFormData({...formData, name: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-mono text-cyan-500">UPLINK (EMAIL)</label>
                                    <input 
                                        required
                                        type="email"
                                        className="w-full bg-black/40 border border-slate-700 rounded p-2 text-sm text-white focus:border-cyan-500 outline-none"
                                        value={formData.email}
                                        onChange={e => setFormData({...formData, email: e.target.value})}
                                    />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-mono text-cyan-500">RESOURCE_ALLOCATION (BUDGET)</label>
                                <select 
                                    className="w-full bg-black/40 border border-slate-700 rounded p-2 text-sm text-white focus:border-cyan-500 outline-none"
                                    value={formData.budget}
                                    onChange={e => setFormData({...formData, budget: e.target.value})}
                                >
                                    <option value="">Select Range...</option>
                                    {service.budgetOptions.map((opt) => (
                                        <option key={opt} value={opt}>{opt}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-mono text-cyan-500">SPECIFICATIONS</label>
                                <textarea 
                                    required
                                    rows={3}
                                    className="w-full bg-black/40 border border-slate-700 rounded p-2 text-sm text-white focus:border-cyan-500 outline-none resize-none"
                                    placeholder="Describe your project requirements..."
                                    value={formData.details}
                                    onChange={e => setFormData({...formData, details: e.target.value})}
                                />
                            </div>

                            {/* Service Notes */}
                            <div className="mt-4 p-3 bg-slate-900/50 border-l-2 border-orange-500/50 rounded text-[10px] text-slate-400 space-y-2">
                                <p>
                                    <span className="text-orange-400 font-bold">NOTE 1:</span> Prices may vary based on complexity. The selected budget is an approximate estimate.
                                </p>
                                <p>
                                    <span className="text-orange-400 font-bold">NOTE 2:</span> External charges (Web Hosting, Database, Domains, APIs, etc.) are borne by the client and are not included in the order cost.
                                </p>
                            </div>
                            
                            <div className="flex gap-3 mt-6">
                                <button 
                                    type="button"
                                    onClick={() => setStep(1)}
                                    className="flex-1 py-2 border border-slate-700 text-slate-400 font-mono text-xs hover:text-white hover:border-slate-500 transition-colors"
                                >
                                    BACK
                                </button>
                                <button 
                                    type="submit"
                                    disabled={sending}
                                    className="flex-[2] py-2 bg-cyan-600/20 border border-cyan-500 text-cyan-400 font-mono text-xs hover:bg-cyan-500 hover:text-white transition-all flex justify-center items-center gap-2"
                                >
                                    {sending ? <span className="animate-pulse">TRANSMITTING...</span> : 'CONFIRM REQUEST'}
                                </button>
                            </div>
                        </form>
                    )}

                    {step === 3 && (
                        <div className="text-center py-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 border border-green-500/50 mb-4 animate-[pulse_2s_ease-in-out_infinite]">
                                <Zap className="text-green-400" size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Protocol Established</h3>
                            <p className="text-slate-400 text-sm mb-6">
                                Your request for <span className="text-cyan-400">{service.subtitle}</span> has been successfully logged in the neural network.
                                <br/><br/>
                                <span className="text-xs text-slate-500">Awaiting acknowledgment signal...</span>
                            </p>
                            <button 
                                onClick={onClose}
                                className="px-6 py-2 border border-slate-700 text-slate-300 font-mono text-xs hover:border-cyan-500 hover:text-cyan-400 transition-colors"
                            >
                                CLOSE TERMINAL
                            </button>
                        </div>
                    )}
                </div>
                
                {/* Decorative Scanline */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />
            </div>
        </div>
    </div>
  );
};