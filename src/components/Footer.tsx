// src/components/Footer.tsx
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 text-white py-12">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo + Description */}
        <div className="space-y-4">
          <h2 className="text-2xl font-black italic text-red-600 tracking-widest">GamingNation</h2>
          <p className="text-sm text-white/70">
            Votre boutique gaming premium à Dakar. Consoles, jeux, accessoires et setup complet pour gamers exigeants.
          </p>
          <div className="flex gap-4 mt-2">
            <a href="#" className="hover:text-red-600 transition-colors"><FaFacebookF /></a>
            <a href="#" className="hover:text-red-600 transition-colors"><FaTwitter /></a>
            <a href="#" className="hover:text-red-600 transition-colors"><FaInstagram /></a>
            <a href="#" className="hover:text-red-600 transition-colors"><FaYoutube /></a>
          </div>
        </div>

        {/* Liens Boutique */}
        <div>
          <h3 className="text-lg font-bold mb-4">Boutique</h3>
          <ul className="space-y-2 text-white/70">
            <li><a href="#consoles" className="hover:text-red-600 transition-colors">Consoles</a></li>
            <li><a href="#manettes" className="hover:text-red-600 transition-colors">Manettes</a></li>
            <li><a href="#jeux" className="hover:text-red-600 transition-colors">Jeux Vidéo</a></li>
            <li><a href="#cartes" className="hover:text-red-600 transition-colors">Gift Cards</a></li>
            <li><a href="#setup" className="hover:text-red-600 transition-colors">Setup</a></li>
          </ul>
        </div>

        {/* Liens Utiles */}
        <div>
          <h3 className="text-lg font-bold mb-4">Liens utiles</h3>
          <ul className="space-y-2 text-white/70">
            <li><a href="#about" className="hover:text-red-600 transition-colors">À propos</a></li>
            <li><a href="#contact" className="hover:text-red-600 transition-colors">Contact</a></li>
            <li><a href="/cart" className="hover:text-red-600 transition-colors">Mon Panier</a></li>
            <li><a href="/product" className="hover:text-red-600 transition-colors">Boutique</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-bold mb-4">Contact</h3>
          <ul className="space-y-2 text-white/70 text-sm">
            <li>Email: <a href="mailto:contact@gamingnation.com" className="hover:text-red-600 transition-colors">contact@gamingnation.com</a></li>
            <li>Téléphone: <a href="tel:+221770000000" className="hover:text-red-600 transition-colors">+221 77 000 00 00</a></li>
            <li>Adresse: Sénégal</li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-12 text-center text-white/50 text-xs italic">
        &copy; {new Date().getFullYear()} GamingNation. Tous droits réservés.
      </div>
    </footer>
  );
}