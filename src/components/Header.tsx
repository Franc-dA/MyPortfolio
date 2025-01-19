import React from 'react';
import { Menu, X, Github, Linkedin} from 'lucide-react';
import { Logo } from './Logo';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Chi Sono', href: '#about' },
    { label: 'Competenze', href: '#skills' },
    { label: 'Progetti', href: '#projects' },
    { label: 'Contatti', href: '#contact' }
  ];

  return (
    <header className="fixed w-full bg-black/95 backdrop-blur-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="text-2xl font-bold text-orange-500">
            <Logo />
          </div>
          
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-gray-300 hover:text-orange-500 relative group transition-colors"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <a href="https://github.com/Franc-dA" className="text-gray-300 hover:text-orange-500 transition-colors">
              <Github size={20} />
            </a>
            <a href="https://www.linkedin.com/in/francesco-d%E2%80%99argenio-a70486267/" className="text-gray-300 hover:text-orange-500 transition-colors">
              <Linkedin size={20} />
            </a>
          </div>

          <button
            className="md:hidden text-gray-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block px-3 py-2 text-gray-300 hover:text-orange-500 relative group transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                  <span className="absolute bottom-0 left-3 w-0 h-0.5 bg-orange-500 group-hover:w-[calc(100%-24px)] transition-all duration-300"></span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}