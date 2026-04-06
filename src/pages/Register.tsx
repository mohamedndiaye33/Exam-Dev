import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/auth";

type FormData = {
  name: string;
  email: string;
  password: string;
};

export default function Register() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // ✅ VALIDATION SIMPLE
    if (formData.password.length < 6) {
      setMessage("Mot de passe trop court (min 6 caractères)");
      setLoading(false);
      return;
    }

    try {
      const data = await registerUser(formData);
      setMessage(data);

      // 🔄 REDIRECTION APRÈS SUCCÈS
      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error: any) {
  console.log(error);
  setMessage(error.message);
}
  };

  return (
    <div className="flex items-center justify-center bg-black text-white px-4">
      <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md">

        <h2 className="text-2xl font-black text-center mb-6">
          Créer un compte
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="name"
            placeholder="Nom"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 rounded bg-black border border-white/10 focus:border-red-600 outline-none"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded bg-black border border-white/10 focus:border-red-600 outline-none"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 rounded bg-black border border-white/10 focus:border-red-600 outline-none"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 transition p-3 rounded font-bold uppercase disabled:opacity-50"
          >
            {loading ? "Chargement..." : "S'inscrire"}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-red-400">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}