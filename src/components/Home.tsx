import HomeBg from '../assets/Home.jpeg';

export default function Home() {
  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-black">
      
      {/* 1. IMAGE D'ARRIÈRE-PLAN  */}
      <div className="absolute inset-0 z-0">
        <img 
          src={HomeBg} 
          alt="Gaming Background" 
          className="w-full h-full object-cover opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-[#050505]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,black_80%)]"></div>
      </div>

      {/* 2. EFFET DE LUEUR ROUGE  */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-red-600/15 blur-[180px] rounded-full pointer-events-none z-5 animate-pulse"></div>
      
      {/* 3. CONTENU TEXTUEL */}
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
          Gaming Equipment <span className="text-red-500">Dakar</span>
        </p>

        {/* 4. BOUTONS D'ACTION */}
        <div className="flex flex-col md:flex-row gap-4 justify-center mt-12">
          <a href="/product" className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-sm font-black uppercase italic tracking-widest transition-all hover:scale-105 active:scale-95 shadow-xl shadow-red-950/50 text-center">
            Explorer la boutique
          </a>
        </div>
      </div>

      {/* 5. PETIT INDICATEUR DE SCROLL */}
      <div className="absolute bottom-10 right-10 z-20 flex items-center gap-2 opacity-100">
        <span className="text-sm font-black uppercase tracking-widest text-red-600">Scroll</span>
        <span className="text-red-600 text-lg">↓</span>
      </div>
    </div>
  );
}