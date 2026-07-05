import { Routes, Route } from 'react-router-dom';
import CartPage from './pages/CartePage';
import Home from './pages/Home';
import Register from './pages/Register';
import Layout from './layouts/Layout';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard'; // ✅ Nouveau
import AdminGuard from './components/AdminGuard';     // ✅ Nouveau
import { CartProvider } from './Context/Contextcard';

function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-black font-sans selection:bg-red-600 selection:text-white">

        <Routes>
          {/* ── Pages publiques avec Navbar/Footer ── */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<CartPage />} />
          </Route>

          {/* ✅ Dashboard admin — sans Navbar/Footer, protégé par AdminGuard */}
          <Route
            path="/admin"
            element={
              <AdminGuard>
                <AdminDashboard />
              </AdminGuard>
            }
          />
        </Routes>

      </div>
    </CartProvider>
  );
}

export default App;
