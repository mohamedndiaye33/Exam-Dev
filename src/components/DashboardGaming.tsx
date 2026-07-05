import  { useEffect, useState } from 'react';
import { getProducts, getConvertedPrice, type Product } from '../services/api';

export default function DashboardGaming() {
  // On indique à TypeScript que 'products' est un tableau de l'interface Product
  const [products, setProducts] = useState<Product[]>([]);
  const [currency, setCurrency] = useState<string>('EUR');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getProducts()
      .then((data: Product[]) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur de chargement des produits", err);
        setLoading(false);
      });
  }, []);

  // Gestion dynamique de la conversion avec typage
  const handleCurrencyChange = async (targetDevise: string): Promise<void> => {
    setCurrency(targetDevise);
    
    const updatedProducts = await Promise.all(
      products.map(async (product: Product) => {
        if (targetDevise === 'EUR') {
          return { ...product, displayPrice: product.price };
        }
        
        try {
          const res = await getConvertedPrice(product.price, targetDevise);
          return { ...product, displayPrice: res.convertedAmount };
        } catch (error) {
          console.error("Échec de la conversion", error);
          return product;
        }
      })
    );
    setProducts(updatedProducts);
  };

  if (loading) return <div style={{ color: '#fff' }}>Chargement du catalogue de la boutique...</div>;

  return (
    <div style={{ padding: '20px', backgroundColor: '#121214', color: '#fff', minHeight: '100vh' }}>
      <h2>🎮 Catalogue & Dashboard Gaming (TSX)</h2>
      
      {/* Sélecteur de devises */}
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => handleCurrencyChange('EUR')}>Afficher en EUR (€)</button>
        <button onClick={() => handleCurrencyChange('USD')} style={{ marginLeft: '10px' }}>Afficher en USD ($)</button>
        <button onClick={() => handleCurrencyChange('XOF')} style={{ marginLeft: '10px' }}>Afficher en XOF (CFA)</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
        {products.map((product: Product) => (
          <div key={product.id} style={{ border: '1px solid #7c3aed', padding: '15px', borderRadius: '8px', background: '#1a1a24' }}>
            <h4>{product.name}</h4>
            <p style={{ fontSize: '14px', color: '#abafb8' }}>{product.description}</p>
            <p style={{ fontWeight: 'bold', color: '#10b981', fontSize: '18px' }}>
              Prix : {product.displayPrice ?? product.price} {currency}
            </p>
            <p style={{ fontSize: '12px' }}>Stock : {product.stock} unités dispo</p>
          </div>
        ))}
      </div>
    </div>
  );
}