import { Routes, Route } from 'react-router-dom';
import ProductPage from './pages/Produit';
import CartPage from './pages/CartePage';
import About from './pages/About';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Register from './pages/Register';
import Layout from "./layouts/Layout";
import Login from "./pages/Login";
import { CartProvider } from './Context/Contextcard';

function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-black font-sans selection:bg-red-600 selection:text-white">
        
        <Routes>
          {/* ✅ TOUT PASSE PAR LE LAYOUT */}
          <Route element={<Layout />}>
          <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>

      </div>
    </CartProvider>
  );
}

export default App;