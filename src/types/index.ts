// Ce fichier définit la structure d'un produit
export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string; 
}

// Un article dans le panier est un produit + une quantité
export interface CartItem extends Product {
  quantity: number;
}
