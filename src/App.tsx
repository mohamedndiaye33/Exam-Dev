import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import ProductCard from './components/ProductCard'; 
import { CartProvider, useCart } from './Context/Contextcard';
import Nintendoswitch from './assets/image projet reac/Nintendoswitch.jpg';
import PS5 from './assets/image projet reac/PS5.jpg';
import PS4PRO from './assets/image projet reac/PS4PRO.jpg';
import SteamDeck from './assets/image projet reac/Steamdeck.jpg';
import XboxSeriesS from './assets/image projet reac/xboxSerieS.jpg';
import XboxSeriesX from './assets/xboxserieX.jpg';
import Ps5Standard from './assets/Ps5Standard.jpg';
import Asus from './assets/Asus.jpg';
import Edge1 from './assets/Edge1.jpg';
import ManettePC from './assets/manettePC.jpg';
import ManettePS4 from './assets/manetteps4.jpg';
import ManettePS4Pro from './assets/manetteps4pro.jpg';
import ManetteXbox from './assets/manettexbox.jpg';
import ManettePS5 from './assets/image projet reac/menetteps5.jpg';
import RDR2 from './assets/rdr2.jpg';
import Spider2 from './assets/Spider2.jpg';
import AC7 from './assets/AC7.jpg';
import FC26 from './assets/FC26.jpg';
import K26 from './assets/2K26.jpg';
import GTA5 from './GTA5.jpg';
import PSN10 from './assets/10.jpg';
import PSN50 from './assets/50.jpg';
import PSN100 from './assets/100.jpg';
import Steam20 from './assets/steam20.jpg';
import Steam50 from './assets/Steam50.jpg';
import Xbox10 from './assets/xboxcard10.jpg';
import Xbox20 from './assets/xboxcard20.jpg';
import EcranAsus from './assets/EcranAsus.jpg';
import ChaiseGaming from './assets/chaisegaming.jpg';
import ClavierMecanique from './assets/claviermecanique.jpg';
import Souris from './assets/Souris.jpg';
import Casque from './assets/casque.jpg';
import Micro from './assets/micro.jpg';
import BureauGaming from './assets/bureaugaming.jpg';

// --- MES DONNÉES (Prix réels en FCFA) ---
const CATEGORIES = {
  consoles: [
    { id: 1, name: 'PS5 Slim Standard', price: 275000, image: Ps5Standard },
    { id: 2, name: 'Xbox Series X', price: 300000, image: XboxSeriesX },
    { id: 3, name: 'Nintendo Switch2 OLED', price: 245000, image: Nintendoswitch }, 
    { id: 4, name: 'PS5 Pro', price: 500000, image: PS5 },
    { id: 5, name: 'Xbox Series S Digital', price: 215000, image: XboxSeriesS },
    { id: 6, name: 'PS4 PRO', price: 190000, image: PS4PRO },
    { id: 7, name: 'Steam Deck OLED 512GB', price: 475000, image: SteamDeck },
    { id: 8, name: 'ASUS ROG Ally Z1 Extreme', price: 525000, image: Asus }
  ],
  setup: [
    { id: 33, name: 'Écran Asus courber', price: 100000, image: EcranAsus },
    { id: 34, name: 'Chaise Gaming Secretlab', price: 30000, image: ChaiseGaming },
    { id: 35, name: 'Clavier Mécanique RGB Pro', price: 35000, image: ClavierMecanique },
    { id: 36, name: 'Souris Logitech G Pro Wireless', price: 20000, image: Souris },
    { id: 37, name: 'Casque Astro A50 Wireless', price: 25000, image: Casque },
    { id: 38, name: 'Microphone Shure SM7B Pro', price: 20000, image: Micro },
    { id: 39, name: 'Tapis de souris XXL Pro', price: 7000, image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&q=80' },
    { id: 40, name: 'Bureau Gaming Motorisé', price: 40000, image: BureauGaming },
  ],
  manettes: [
    { id: 9, name: 'Manette Edge Dualsense', price: 55000, image: Edge1 },
    { id: 10, name: 'Manette PS4PRO', price: 15000, image: ManettePS4Pro },
    { id: 11, name: 'Manette ordi', price: 10000, image: ManettePC },
    { id: 12, name: 'Manette Xbox Serie X', price: 30000, image: ManetteXbox },
    { id: 13, name: 'Manette PS5 custom', price: 2500, image: ManettePS5 },
    { id: 14, name: 'Manette PS4 custom', price: 15000, image: ManettePS4 },
  ],
  jeux: [
    { id: 17, name: 'Red Dead Redemption 2 PS5', price: 45000, image: RDR2 },
    { id: 18, name: 'Spider-Man 2 PS5', price: 60000, image: Spider2 },
    { id: 19, name: 'Ace Combat 7', price: 30000, image: AC7 },
    { id: 20, name: 'FC 26', price: 50000, image: FC26 },
    { id: 21, name: '2K 26', price: 55000, image: K26 },
    { id: 22, name: 'GTA 5', price: 25000, image: GTA5 },
  ],
  cartes: [
    { id: 25, name: 'Gift Card PSNFRANCE 10€', price: 7500, image: PSN10 },
    { id: 26, name: 'Gift Card PSNFRANCE 100€', price: 60000, image: PSN100 },
    { id: 27, name: 'Gift Card PSNFRANCE 50€', price: 40000, image: PSN50 },
    { id: 28, name: 'Gift Card steam 20€', price: 15000, image: Steam20 },
    { id: 29, name: 'Gift Card steam 50€', price: 35000, image: Steam50 },
    { id: 30, name: 'Gift Card xbox 10€', price: 7500, image: Xbox10 },
    { id: 31, name: 'Gift Card xbox 20€', price: 15000, image: Xbox20 },
  ],
};

// --- COMPOSANT DE SECTION (Avec ID pour le Smooth Scroll) ---
const ProductSection = ({ title, items, id }: { title: string, items: any[], id: string }) => (
  <section id={id} className="mb-24 max-w-[1300px] mx-auto px-4 scroll-mt-32">
    <div className="flex items-center justify-center gap-4 mb-10">
      <div className="h-[2px] w-12 bg-red-600"></div>
      <h3 className="text-white font-black text-xl uppercase tracking-[0.2em] italic">{title}</h3>
      <div className="h-[2px] w-12 bg-red-600"></div>
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {items.map((item) => (
        <ProductCard key={item.id} {...item} />
      ))}
    </div>
  </section>
);

// --- BARRE DE NAVIGATION DES CATÉGORIES (Sticky) ---
const CategoryNav = () => {
  const categories = [
    { name: 'Consoles', target: 'consoles' },
    { name: 'Manettes', target: 'manettes' },
    { name: 'Jeux Vidéo', target: 'jeux' },
    { name: 'Gift Cards', target: 'cartes' },
    { name: 'Setup', target: 'setup' },
  ];

  return (
    <div className="sticky top-16 z-40 bg-black/80 backdrop-blur-xl border-b border-white/5 py-4 overflow-x-auto no-scrollbar">
      <div className="flex justify-center gap-4 md:gap-8 px-6 min-w-max mx-auto">
        {categories.map((cat) => (
          <a 
            key={cat.target}
            href={`#${cat.target}`}
            className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-red-600 transition-colors border border-white/10 px-4 py-2 rounded-full hover:border-red-600 italic"
          >
            {cat.name}
          </a>
        ))}
      </div>
    </div>
  );
};

// --- PAGE BOUTIQUE ---
const ProductPage = () => (
  <div className="bg-[#050505] min-h-screen">
    <header className="text-center pt-16 pb-10 italic">
      <p className="text-red-600 font-bold tracking-[0.4em] uppercase text-[10px] mb-2 underline decoration-red-600 underline-offset-8">Collection 2026</p>
      <h2 className="text-white text-5xl md:text-7xl font-black uppercase italic">Gaming <span className="text-red-600">Store</span></h2>
    </header>
    <CategoryNav />
    <div className="pt-10">
      <ProductSection id="consoles" title="Nos Consoles" items={CATEGORIES.consoles} />
      <ProductSection id="manettes" title="Nos Manettes" items={CATEGORIES.manettes} />
      <ProductSection id="jeux" title="Nos Jeux Vidéo" items={CATEGORIES.jeux} />
      <ProductSection id="cartes" title="Gift Cards" items={CATEGORIES.cartes} />
      <ProductSection id="setup" title="Setup & Confort" items={CATEGORIES.setup} />
    </div>
  </div>
);

// --- PAGE PANIER (CartPage) ---
const CartPage = () => {
  const { cart, totalItems, clearCart } = useCart();
  const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  
  return (
    <div className="max-w-4xl mx-auto p-10 text-white min-h-screen pt-24">
      <h2 className="text-4xl font-black mb-10 border-b-4 border-red-600 pb-4 italic uppercase tracking-tighter">
        Mon Panier <span className="text-red-600">[{totalItems}]</span>
      </h2>
      
      {cart.length === 0 ? (
        <div className="text-center py-24 bg-[#0f0f0f] rounded-lg border border-white/5">
          <p className="text-slate-500 text-xl font-bold italic uppercase tracking-widest">Ton panier est vide... 🎮</p>
        </div>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center bg-[#0f0f0f] p-4 border border-white/5 rounded-md hover:border-red-600/30 transition-all group">
              <div className="flex items-center gap-6">
                <img src={item.image} className="w-16 h-20 object-cover rounded shadow-lg shadow-black group-hover:scale-105 transition-transform" alt={item.name} />
                <div>
                  <p className="font-black uppercase text-sm tracking-tight">{item.name}</p>
                  <p className="text-red-600 font-bold text-xs">{item.price.toLocaleString()} FCFA <span className="text-white/40 italic">x {item.quantity}</span></p>
                </div>
              </div>
              <p className="font-black text-lg italic">{(item.price * item.quantity).toLocaleString()} FCFA</p>
            </div>
          ))}
          
          <div className="mt-12 bg-red-600 p-8 rounded-md flex flex-col sm:flex-row justify-between items-center shadow-xl shadow-red-900/30">
            <div className="mb-4 sm:mb-0">
              <p className="text-[10px] font-black uppercase text-white/80 tracking-widest">Montant Total</p>
              <p className="text-4xl font-black italic">{totalPrice.toLocaleString()} FCFA</p>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={clearCart}
                className="bg-gray-700 text-white px-6 py-4 font-black uppercase italic text-sm hover:bg-red-700 transition-all shadow-lg active:scale-95"
              >
                Vider le panier
              </button>
              <button className="bg-white text-black px-10 py-4 font-black uppercase italic text-sm hover:bg-black hover:text-white transition-all shadow-lg active:scale-95">
                Commander maintenant
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- COMPOSANT PRINCIPAL ---
function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-black font-sans selection:bg-red-600 selection:text-white">
        <Navbar />
        <div className="pt-16">
          <Routes>
            <Route path="/" element={
              <div className="h-[80vh] flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
                {/* Petit effet de lueur rouge en arrière-plan */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/10 blur-[120px] rounded-full pointer-events-none"></div>
                
                <h1 className="text-8xl md:text-[10rem] font-black text-white leading-none uppercase italic tracking-tighter relative z-10">
                  Gaming<br/><span className="text-red-600">Nation</span>
                </h1>
                <p className="text-slate-400 text-xl font-bold uppercase tracking-[0.4em] mt-6 relative z-10">Premium Equipment Dakar</p>
              </div>
            } />
            <Route path="/product" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/about" element={<div className="p-20 text-white text-center text-4xl font-black italic uppercase">À Propos</div>} />
            <Route path="/contact" element={<div className="p-20 text-white text-center text-4xl font-black italic uppercase">Contact</div>} />
          </Routes>
        </div>
      </div>
    </CartProvider>
  );
}

export default App;