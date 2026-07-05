import React from 'react';
import { useCart } from '../Context/Contextcard';

interface ProductProps {
  id: number;
  name: string;
  price: number;          // prix original en FCFA (pour le panier)
  image: string;
  displayPrice: string;   // ✅ prix formaté à afficher (ex: "42.00 €")
}

const ProductCard: React.FC<ProductProps> = ({ id, name, price, image, displayPrice }) => {
  const { addToCart } = useCart();

  return (
    <div className="group bg-[#0f0f0f] border border-white/5 rounded-md p-3 hover:bg-[#151515] transition-all duration-300 hover:border-red-600/30 hover:-translate-y-1 shadow-lg">

      {/* IMAGE */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm mb-3 bg-[#0a0a0a] border border-transparent group-hover:border-red-600/50 transition-all duration-500 flex items-center justify-center">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-red-950/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* BOUTON SLIDE UP */}
        <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart({ id, name, price, image });
            }}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-sm transition-all active:scale-95 shadow-2xl flex items-center justify-center gap-2"
          >
            <span className="text-[10px] font-black uppercase italic tracking-widest">
              Ajouter au panier
            </span>
          </button>
        </div>
      </div>

      {/* INFOS */}
      <div className="space-y-2">
        <h3 className="text-white font-bold text-[13px] uppercase tracking-tight truncate group-hover:text-red-500 transition-colors">
          {name}
        </h3>
        <div className="flex items-center justify-between pt-2 border-t border-white/10">
          {/* ✅ Affiche le prix converti + animé lors du changement de devise */}
          <span className="text-red-600 font-black text-sm tracking-tighter transition-all duration-300">
            {displayPrice}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
