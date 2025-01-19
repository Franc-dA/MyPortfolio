import React from 'react';
import { AnimatedSection } from './AnimatedSection';

const skills = [
  { category: 'Frontend', items: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'] },
  { category: 'Backend', items: ['PHP', 'Java', 'MySQL'] },
  { category: 'Strumenti', items: ['Git'] },
  { category: 'Soft Skills', items: ['Problem Solving', 'Comunicazione', 'Leadership', 'Agile'] }
];

export function Skills() {
  return (
    <section id="skills">
      <AnimatedSection className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="text-orange-500">Competenze</span> Tecniche
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skillGroup, index) => (
              <div
                key={index}
                className="bg-black p-6 rounded-lg border border-orange-500/20"
              >
                <h3 className="text-xl font-semibold text-orange-500 mb-4">
                  {skillGroup.category}
                </h3>
                <ul className="space-y-2">
                  {skillGroup.items.map((skill, skillIndex) => (
                    <li
                      key={skillIndex}
                      className="text-gray-300 flex items-center"
                    >
                      <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}