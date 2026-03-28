import { Routes, Route } from 'react-router-dom'; // On n'importe PLUS Router ici
import Navbar from './components/navbar';

// Tes composants de pages
const Home = () => <div className="p-20 text-white text-center text-2xl">🏠 Home</div>;
const About = () => <div className="p-20 text-white text-center text-2xl">📖 About</div>;
const Product = () => <div className="p-20 text-white text-center text-2xl">📦 Product</div>;
const Contact = () => <div className="p-20 text-white text-center text-2xl">📧 Contact</div>;

function App() {
  return (
    <div className="min-h-screen bg-slate-900">
      {/* On affiche la Navbar directement */}
      <Navbar />

      {/* On définit les routes directement */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/product" element={<Product />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;