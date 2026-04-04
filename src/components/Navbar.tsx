import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

// Liste des liens mise à jour
const navigation = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Product', path: '/product' },
  { label: 'Contact', path: '/contact' },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Style pour les liens (Desktop & Mobile)
  const linkStyle = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-all duration-200 px-4 py-2 rounded-md ${
      isActive 
        ? 'text-white bg-blue-600 shadow-md' 
        : 'text-gray-400 hover:text-white hover:bg-gray-800'
    }`;

  return (
    <nav className="bg-slate-950 border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* LOGO */}
        {/* Dans navbar.tsx */}
       <NavLink to="/" className="text-white font-bold text-xl tracking-tight">
             MY<span className="text-blue-500">PROJECT</span>
       </NavLink>

        {/* NAVIGATION DESKTOP */}
        <div className="hidden md:flex items-center space-x-2">
          {navigation.map((item) => (
            <NavLink key={item.path} to={item.path} className={linkStyle}>
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* BOUTON MENU MOBILE */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-400 hover:text-white p-2 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* MENU MOBILE DÉROULANT */}
      {isOpen && (
        <div className="md:hidden bg-slate-950 border-t border-slate-800 px-6 py-4 space-y-2 animate-in fade-in slide-in-from-top-4">
          {navigation.map((item) => (
            <NavLink 
              key={item.path} 
              to={item.path} 
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `block ${linkStyle({ isActive })}`}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;