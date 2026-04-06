import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/auth";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const msg = await loginUser(formData);
      setMessage(msg);

      // 🔄 redirection après login
      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch (error: any) {
      setMessage(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white px-4">
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

          <button className="w-full bg-red-600 hover:bg-red-700 transition p-3 rounded font-bold uppercase">
            Se connecter
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