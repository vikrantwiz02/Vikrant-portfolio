import React, { useState } from 'react';
import { DecryptionText, HoloCard, NeuralNode } from './NeuralCore';
import { OrderModal } from './OrderModal';
import { SERVICES } from '../constants';
import { Service } from '../types';

export const ServicesSection = ({ active }: { active: boolean }) => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  return (
    <section className="min-h-screen flex flex-col items-center py-24 relative z-10">
      <OrderModal 
        service={selectedService} 
        onClose={() => setSelectedService(null)} 
        key={selectedService?.id || 'modal-reset'} 
      />
      
      <div className="flex items-center gap-4 mb-16">
        <div className="h-[1px] w-12 bg-slate-700"></div>
        <NeuralNode active={active} />
        <h2 className={`text-3xl font-bold text-white transition-all duration-700 ${active ? 'drop-shadow-[0_0_15px_rgba(34,211,238,0.6)]' : 'text-slate-400'}`}>
           <DecryptionText text="GET YOUR SYSTEM BUILT" />
        </h2>
        <div className="h-[1px] w-12 bg-slate-700"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl w-full px-6">
        {SERVICES.map((service, idx) => (
          <div 
            key={service.id}
            className={`transform transition-all duration-700 ease-out ${active ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
            style={{ transitionDelay: `${idx * 150}ms` }}
          >
            <HoloCard className="h-full">
              <div className="p-6 flex flex-col h-full bg-slate-900/10 hover:bg-slate-900/30 transition-colors">
                <div className="flex justify-between items-start mb-4">
                   <div className="p-3 bg-cyan-950/30 rounded border border-cyan-500/20">
                      <service.icon className="text-cyan-400" size={24} />
                   </div>
                   <span className="text-xs font-mono text-slate-500 border border-slate-800 px-2 py-1 rounded">
                      {service.id.toUpperCase()}
                   </span>
                </div>
                
                <h3 className="text-lg font-bold text-white mb-1">{service.title}</h3>
                <div className="text-xs text-cyan-500 font-mono mb-4">{service.subtitle}</div>
                
                <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">
                   {service.description}
                </p>

                <div className="space-y-3 mb-6">
                   {service.features.slice(0, 3).map(feature => (
                       <div key={feature} className="flex items-center gap-2 text-xs text-slate-400">
                          <div className="w-1 h-1 bg-cyan-500 rounded-full" />
                          {feature}
                       </div>
                   ))}
                </div>
                
                <button 
                   onClick={(e) => {
                       e.preventDefault();
                       e.stopPropagation();
                       setSelectedService(service);
                   }}
                   className="w-full py-2 border border-cyan-500/30 bg-cyan-950/20 text-cyan-400 text-xs font-mono hover:bg-cyan-500 hover:text-white transition-all hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] relative z-20 cursor-pointer"
                >
                   INITIALIZE_REQUEST
                </button>
              </div>
            </HoloCard>
          </div>
        ))}
      </div>
    </section>
  );
};