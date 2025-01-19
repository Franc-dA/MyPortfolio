import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';

function App() {
  return (
    <div className="bg-black text-white">
      <Header />
      <main>
        <section id="home">
          <Hero />
        </section>
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <footer className="bg-black py-8 text-center text-gray-400">
        <p>© {new Date().getFullYear()} Francesco d'Argenio. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;