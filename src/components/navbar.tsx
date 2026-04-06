import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingCart, User } from 'lucide-react';
import { useCart } from '../Context/Contextcard';

const navigation = [
  { label: 'Accueil', path: '#home' },
  { label: 'Boutique', path: '#product' },
  { label: 'À Propos', path: '#about' },
  { label: 'Contact', path: '#contact' },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  const { totalItems } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  // 🔐 Vérifie si connecté
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLogged(!!token);
  }, [location]);

  // 🎯 effet scroll navbar
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 📱 fermer menu mobile
  useEffect(() => setIsOpen(false), [location]);

  // 🔓 logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLogged(false);
    navigate("/login");
  };

  // 🔥 SCROLL INTELLIGENT (clé du problème)
  const handleScrollTo = (id: string) => {
    if (location.pathname !== "/") {
      navigate("/");

      setTimeout(() => {
        const element = document.querySelector(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const element = document.querySelector(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full z-[100] transition-all duration-300 ${
        scrolled
          ? 'bg-black/95 backdrop-blur-md border-b border-red-600/20 py-3'
          : 'bg-black border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-white font-black text-2xl italic tracking-tighter">
            NEXUS<span className="text-red-600"> GAMING 2.0</span>
          </span>
        </Link>

        {/* NAVIGATION DESKTOP */}
        <div className="hidden md:flex items-center space-x-8">
          {navigation.map((item) => (
            <button
              key={item.path}
              onClick={() => handleScrollTo(item.path)}
              className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-all"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-6">

          {/* 🔐 LOGIN / LOGOUT */}
          {isLogged ? (
            <button
              onClick={handleLogout}
              className="hidden sm:flex items-center gap-2 text-green-500 font-black text-[10px] uppercase tracking-widest hover:text-red-600 transition-colors"
            >
              <User size={18} />
              <span>Logout</span>
            </button>
          ) : (
            <Link
              to="/login"
              className="hidden sm:flex items-center gap-2 text-white font-black text-[10px] uppercase tracking-widest hover:text-red-600 transition-colors"
            >
              <User size={18} />
              <span>Login</span>
            </Link>
          )}

          {/* 🛒 PANIER */}
          <Link
            to="/cart"
            className="relative p-2 bg-white/5 rounded-full border border-white/10 hover:border-red-600 transition-all group"
          >
            <ShoppingCart
              size={20}
              className="text-white group-hover:text-red-600 transition-colors"
            />

            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-black h-4 w-4 flex items-center justify-center rounded-full animate-pulse">
                {totalItems}
              </span>
            )}
          </Link>

          {/* 📱 MENU MOBILE */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* 📱 MENU MOBILE */}
      <div
        className={`absolute top-full left-0 w-full bg-black border-b border-red-600/20 transition-all duration-300 ease-in-out overflow-hidden md:hidden ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col p-8 space-y-6">
          {navigation.map((item) => (
            <button
              key={item.path}
              onClick={() => handleScrollTo(item.path)}
              className="text-xl font-black uppercase italic tracking-tighter text-white"
            >
              {item.label}
            </button>
          ))}

          {/* LOGIN MOBILE */}
          {isLogged ? (
            <button
              onClick={handleLogout}
              className="text-green-500 font-black uppercase"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="text-white font-black uppercase"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;