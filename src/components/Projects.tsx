import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { AnimatedSection } from './AnimatedSection';

const projects = [
  {
    title: 'Il mio portfolio',
    description: 'Un\'applicazione web moderna costruita con React e TypeScript',
    image: 'src/assets/image-Portfolio.png',
    tags: ['React', 'TypeScript', 'Tailwind', 'PHP'],
    github: 'https://github.com',
    demo: 'https://example.com'
  }
];

export function Projects() {
  return (
    <section id="projects">
      <AnimatedSection className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="text-orange-500">Progetti</span> in Evidenza
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-gray-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform duration-300 border border-orange-500/20"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 bg-orange-500/10 text-orange-500 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-4">
                    <a
                      href={project.github}
                      className="flex items-center text-gray-400 hover:text-orange-500 transition-colors"
                    >
                      <Github size={20} className="mr-2" />
                      Codice
                    </a>
                    <a
                      href={project.demo}
                      className="flex items-center text-gray-400 hover:text-orange-500 transition-colors"
                    >
                      <ExternalLink size={20} className="mr-2" />
                      Demo
                    </a>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}