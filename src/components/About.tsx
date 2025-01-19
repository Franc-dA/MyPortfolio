import React from 'react';
import { Code, Rocket } from 'lucide-react';
import { AnimatedSection } from './AnimatedSection';

const features = [
  {
    icon: <Code className="w-8 h-8 text-orange-500" />,
    title: 'Codice Pulito',
    description: 'Scrivere codice elegante, manutenibile ed efficiente è la mia passione.'
  },
  {
    icon: <Rocket className="w-8 h-8 text-orange-500" />,
    title: 'Prestazioni',
    description: 'Sviluppo applicazioni veloci e ottimizzate che si adattano alle esigenze.'
  }
];

export function About() {
  return (
    <section id="about">
      <AnimatedSection className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              <span className="text-orange-500">Chi</span> Sono
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
            Ciao! Io sono Francesco, uno sviluppatore full stack con una passione particolare per il backend e una forte inclinazione
             a risolvere problemi complessi. Mi dedico alla creazione di sistemi robusti, scalabili ed efficienti,
             combinando la mia esperienza con una costante ricerca di innovazione. 
             Rimango sempre aggiornato sulle tecnologie più recenti per sviluppare soluzioni che siano innovative e all'avanguardia.
             Qui trovi una panoramica delle mie competenze.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 justify-items-center gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-black p-6 rounded-lg border border-orange-500/20 hover:border-orange-500/40 transition-colors"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        </div>
      </AnimatedSection>
    </section>
  );
}