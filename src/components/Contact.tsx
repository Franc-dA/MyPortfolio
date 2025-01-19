import React from 'react';
import { AnimatedSection } from './AnimatedSection';
import { ContactForm } from './Contact/ContactForm';

export function Contact() {
  return (
    <section id="contact">
      <AnimatedSection className="py-20 bg-black">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="text-orange-500">Contattami</span>
          </h2>
          <ContactForm />
        </div>
      </AnimatedSection>
    </section>
  );
}