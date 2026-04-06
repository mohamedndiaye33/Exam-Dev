import HomeBg from '../assets/Play.jpeg';
import ProductPage from './Produit';
import About from './About';
import Contact from './Contact';

export default function Home() {
  return (
    <div>

      {/* 🔥 HERO */}
      <div id="home" className="relative h-screen w-full flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-black">
        
        <div className="absolute inset-0 z-0">
          <img 
            src={HomeBg} 
            alt="Gaming Background" 
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-[#050505]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,black_80%)]"></div>
        </div>

        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-red-600/15 blur-[180px] rounded-full pointer-events-none z-5 animate-pulse"></div>
        
        <div className="relative z-20 space-y-6">
          <span className="text-red-600 font-black text-xs md:text-sm uppercase tracking-[0.5em] animate-bounce drop-shadow-lg">
            Welcome to the elite
          </span>
          
          <h1 className="text-6xl md:text-[10rem] font-[1000] text-white leading-[0.85] uppercase italic tracking-tighter drop-shadow-2xl">
            NEXUS<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-600 to-red-700">
              GAMING 2.0
            </span>
          </h1>

          <p className="text-slate-100 text-sm md:text-xl font-bold uppercase tracking-[0.3em] max-w-3xl mx-auto pt-6 border-t border-red-600/30 mt-10">
            Gaming Equipment Dakar
          </p>

          {/* 🔥 BOUTON SCROLL */}
          <a
            href="#product"
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-sm font-black uppercase italic tracking-widest transition-all hover:scale-105"
          >
            Explorer la boutique
          </a>
        </div>
      </div>

      {/* 🛒 PRODUITS */}
      <section id="product" className="bg-black py-20">
        <ProductPage />
      </section>

      {/* ℹ️ ABOUT */}
      <section id="about" className="bg-black py-20">
        <About />
      </section>

      {/* 📞 CONTACT */}
      <section id="contact" className="bg-black py-20">
        <Contact />
      </section>

    </div>
  );
}