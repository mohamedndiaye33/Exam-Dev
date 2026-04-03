import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

// Structure d'un produit dans le panier
interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: any) => void;
  clearCart: () => void;
  totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: any) => {
    setCart((prevCart) => {
      // On cherche si le produit est déjà là
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        // Si oui, on augmente juste la quantité
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      // Si non, on l'ajoute avec quantité = 1
      return [...prevCart, { ...product, quantity: 1 }];
    });
    console.log("🛒 Produit envoyé au panier :", product.name);
  };

  const clearCart = () => {
    setCart([]);
    console.log("🗑️ Panier vidé");
  };

  // Calcul du nombre total d'articles (pour la Navbar)
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart, totalItems }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart doit être utilisé dans un CartProvider");
  return context;
};