import React from 'react';
import { ArrowDown } from 'lucide-react';

export function Hero() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white relative">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black/95 to-orange-950"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <h1 className="text-4xl sm:text-6xl font-bold mb-6">
            <span className="text-orange-500">Francesco</span> d'Argenio
          </h1>
          <p className="text-xl sm:text-2xl text-gray-400 mb-8">
            Trasformo le tue idee in esperienze web.
          </p>
          <a
            href="#projects"
            className="inline-flex items-center px-6 py-3 border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-black transition-colors rounded-full"
          >
            Vedi i Miei Lavori
            <ArrowDown className="ml-2" size={20} />
          </a>
        </div>
      </div>
    </div>
  );
}