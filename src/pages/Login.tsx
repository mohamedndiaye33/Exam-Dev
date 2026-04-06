import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/auth";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    console.log("📤 Envoi des données :", formData);

    try {
      const msg = await loginUser(formData);
      console.log("✅ Réponse backend OK");

      setMessage(msg);

      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch (error: any) {
      console.error("❌ ERREUR LOGIN :", error);
      setMessage(error.message || "Erreur serveur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative z-50 flex items-center justify-center min-h-screen bg-black text-white px-4">
      <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md">

        <h2 className="text-2xl font-black text-center mb-6">
          Connexion
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-3 rounded bg-black border border-white/10 focus:border-red-600 outline-none text-white"
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Mot de passe"
            onChange={handleChange}
            className="w-full p-3 rounded bg-black border border-white/10 focus:border-red-600 outline-none text-white"
            required
          />

          <button
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 transition p-3 rounded font-bold uppercase disabled:opacity-50"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-red-400">
            {message}
          </p>
        )}

        {/* 🔗 REGISTER */}
        <p className="text-center text-sm text-gray-400 mt-4">
          Pas encore de compte ?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-red-500 cursor-pointer hover:underline"
          >
            S'inscrire
          </span>
        </p>

      </div>
    </div>
  );
}