import React from 'react';

export function Logo() {
  return (
    <img 
      src="src/assets/icon.png"
      alt="Logo"
      className="w-10 h-10 object-cover hover:scale-110 transition-transform duration-300"
    />
  );
}