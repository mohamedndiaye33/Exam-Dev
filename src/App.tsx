import { Routes, Route } from 'react-router-dom';
import CartPage from './pages/CartePage';
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
          <Route element={<Layout />}>

            {/* ✅ PAGE PRINCIPALE */}
            <Route path="/" element={<Home />} />

            {/* ✅ PAGES SÉPARÉES */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<CartPage />} />

          </Route>
        </Routes>

      </div>
    </CartProvider>
  );
}

export default App;