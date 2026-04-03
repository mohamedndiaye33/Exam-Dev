import type { Product } from '../types';

export const products: Product[] = [
  {
    id: 1,
    name: "PC Master Race - Neon Edition",
    price: 2499,
    category: "PC Gamer",
    description: "Processeur i9, RTX 5090, 64GB RAM.",
    image: "PC"
  },
  {
    id: 2,
    name: "Clavier Cyber-Mechanical",
    price: 189,
    category: "Accessoires",
    description: "Switchs optiques, Full RGB.",
    image: "Clavier"
  },
  {
    id: 3,
    name: "Souris Reflex Pro 8K",
    price: 79,
    category: "Accessoires",
    description: "Capteur 30 000 DPI.",
    image: "Souris"
  }
];
