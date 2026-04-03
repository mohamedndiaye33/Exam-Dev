import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import { Menu, X, ShoppingCart, User } from 'lucide-react';
import { useCart } from '../Context/Contextcard'; // J'importe mon context pour le vrai total

const navigation = [
  { label: 'Accueil', path: '/' },
  { label: 'Boutique', path: '/product' },
  { label: 'À Propos', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Je récupère le vrai nombre d'articles de mon panier !
  const { totalItems } = useCart(); 

  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setIsOpen(false), [location]);

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-300 ${
      scrolled 
        ? 'bg-black/95 backdrop-blur-md border-b border-red-600/20 py-3' 
        : 'bg-black border-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* MON LOGO GAMING */}
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-white font-black text-2xl italic tracking-tighter">
            NEXUS<span className="text-red-600"> GAMING 2.0</span>
          </span>
        </Link>

        {/* NAVIGATION DESKTOP (Style épuré) */}
        <div className="hidden md:flex items-center space-x-8">
          {navigation.map((item) => (
            <NavLink 
              key={item.path} 
              to={item.path} 
              className={({ isActive }) => `
                text-[11px] font-black uppercase tracking-[0.2em] transition-all
                ${isActive ? 'text-red-600 border-b-2 border-red-600 pb-1' : 'text-slate-400 hover:text-white'}
              `}
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* ACTIONS : LOGIN + PANIER */}
        <div className="flex items-center gap-6">
          
          {/* LOGIN (Optionnel pour le style) */}
          <button className="hidden sm:flex items-center gap-2 text-white font-black text-[10px] uppercase tracking-widest hover:text-red-600 transition-colors">
            <User size={18} />
            <span>Login</span>
          </button>
          
          {/* MON PANIER AVEC LE BADGE ROUGE DYNAMIQUE */}
          <Link 
            to="/cart" 
            className="relative p-2 bg-white/5 rounded-full border border-white/10 hover:border-red-600 transition-all group"
          >
            <ShoppingCart size={20} className="text-white group-hover:text-red-600 transition-colors" />
            
            {/* Le badge ne s'affiche que si j'ai ajouté des trucs */}
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-black h-4 w-4 flex items-center justify-center rounded-full animate-pulse">
                {totalItems}
              </span>
            )}
          </Link>

          {/* MENU MOBILE TOGGLE */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MENU MOBILE DÉROULANT */}
      <div className={`
        absolute top-full left-0 w-full bg-black border-b border-red-600/20 transition-all duration-300 ease-in-out overflow-hidden md:hidden
        ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}
      `}>
        <div className="flex flex-col p-8 space-y-6">
          {navigation.map((item) => (
            <NavLink 
              key={item.path} 
              to={item.path}
              className={({ isActive }) => `
                text-xl font-black uppercase italic tracking-tighter transition-colors
                ${isActive ? 'text-red-600' : 'text-white'}
              `}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;