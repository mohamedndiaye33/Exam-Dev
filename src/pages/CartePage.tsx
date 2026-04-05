import { useCart } from '../Context/Contextcard';

const CartPage = () => {
  const { cart, totalItems, clearCart } = useCart();
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="max-w-4xl mx-auto p-10 text-white min-h-screen pt-24">
      <h2 className="text-4xl font-black mb-10 border-b-4 border-red-600 pb-4 italic uppercase tracking-tighter">
        Mon Panier <span className="text-red-600">[{totalItems}]</span>
      </h2>

      {cart.length === 0 ? (
        <div className="text-center py-24 bg-[#0f0f0f] rounded-lg border border-white/5">
          <p className="text-slate-500 text-xl font-bold italic uppercase tracking-widest">
            Ton panier est vide... 🎮
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {cart.map(item => (
            <div key={item.id} className="flex justify-between items-center bg-[#0f0f0f] p-4 border border-white/5 rounded-md hover:border-red-600/30 transition-all group">
              <div className="flex items-center gap-6">
                <img
                  src={item.image}
                  className="w-16 h-20 object-cover rounded shadow-lg shadow-black group-hover:scale-105 transition-transform"
                  alt={item.name}
                />
                <div>
                  <p className="font-black uppercase text-sm tracking-tight">{item.name}</p>
                  <p className="text-red-600 font-bold text-xs">
                    {item.price.toLocaleString()} FCFA <span className="text-white/40 italic">x {item.quantity}</span>
                  </p>
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

export default CartPage;
