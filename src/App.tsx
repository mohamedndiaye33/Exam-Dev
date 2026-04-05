import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductPage from './pages/Produit';
import CartPage from './pages/CartePage';
import About from './pages/About';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Footer from './components/Footer';
import { CartProvider } from './Context/Contextcard';

// --- COMPOSANT PRINCIPAL ---
function App() {
  return (
       <CartProvider>
      <div className="min-h-screen bg-black font-sans selection:bg-red-600 selection:text-white">
        <Navbar />
        <div className="pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;