import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/auth';

type Role = 'client' | 'admin';

type FormData = {
  name: string;
  email: string;
  password: string;
  role: Role;
};

export default function Register() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    role: 'client',
  });

  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setIsSuccess(false);

    if (formData.password.length < 6) {
      setMessage('Mot de passe trop court (min 6 caractères)');
      setLoading(false);
      return;
    }

    try {
      const msg = await registerUser(formData);
      setMessage(msg);
      setIsSuccess(true);
      setTimeout(() => navigate('/login'), 1500);
    } catch (error: any) {
      setMessage(error.message);
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white px-4">
      <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md">

        {/* Titre */}
        <h2 className="text-2xl font-black text-center uppercase italic mb-1">
          Créer un <span className="text-red-600">compte</span>
        </h2>
        <p className="text-slate-500 text-xs text-center uppercase tracking-widest mb-8">
          Nexus Gaming
        </p>

        <div className="space-y-4">

          {/* Nom */}
          <div>
            <label className="text-[11px] text-slate-400 uppercase tracking-widest block mb-1">Nom</label>
            <input
              type="text"
              name="name"
              placeholder="Ton nom"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 rounded bg-black border border-white/10 focus:border-red-600 outline-none text-white text-sm transition-colors"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-[11px] text-slate-400 uppercase tracking-widest block mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="ton@email.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded bg-black border border-white/10 focus:border-red-600 outline-none text-white text-sm transition-colors"
              required
            />
          </div>

          {/* Mot de passe */}
          <div>
            <label className="text-[11px] text-slate-400 uppercase tracking-widest block mb-1">Mot de passe</label>
            <input
              type="password"
              name="password"
              placeholder="Min. 6 caractères"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 rounded bg-black border border-white/10 focus:border-red-600 outline-none text-white text-sm transition-colors"
              required
            />
          </div>

          {/* ✅ Sélection du rôle */}
          <div>
            <label className="text-[11px] text-slate-400 uppercase tracking-widest block mb-2">
              Type de compte
            </label>
            <div className="grid grid-cols-2 gap-3">
              {/* Client */}
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: 'client' })}
                className={`flex flex-col items-center gap-1 p-4 rounded-lg border transition-all text-sm font-bold
                  ${formData.role === 'client'
                    ? 'border-red-600 bg-red-600/10 text-white'
                    : 'border-white/10 text-slate-400 hover:border-white/30 hover:text-white'
                  }`}
              >
                <span className="text-2xl">🛒</span>
                <span className="uppercase text-[11px] tracking-widest">Client</span>
                <span className="text-[10px] text-slate-500 font-normal text-center">
                  Acheter des produits
                </span>
              </button>

              {/* Admin */}
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: 'admin' })}
                className={`flex flex-col items-center gap-1 p-4 rounded-lg border transition-all text-sm font-bold
                  ${formData.role === 'admin'
                    ? 'border-red-600 bg-red-600/10 text-white'
                    : 'border-white/10 text-slate-400 hover:border-white/30 hover:text-white'
                  }`}
              >
                <span className="text-2xl">⚙️</span>
                <span className="uppercase text-[11px] tracking-widest">Admin</span>
                <span className="text-[10px] text-slate-500 font-normal text-center">
                  Gérer la boutique
                </span>
              </button>
            </div>
          </div>

          {/* Bouton submit */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 transition p-3 rounded font-black uppercase italic tracking-widest disabled:opacity-50 mt-2"
          >
            {loading ? 'Création...' : "S'inscrire"}
          </button>
        </div>

        {/* Message retour */}
        {message && (
          <p className={`mt-4 text-center text-sm ${isSuccess ? 'text-green-400' : 'text-red-400'}`}>
            {isSuccess ? '✓ ' : '⚠ '}{message}
          </p>
        )}

        {/* Lien login */}
        <p className="text-center text-sm text-gray-400 mt-5">
          Déjà un compte ?{' '}
          <span
            onClick={() => navigate('/login')}
            className="text-red-500 cursor-pointer hover:underline font-bold"
          >
            Se connecter
          </span>
        </p>

      </div>
    </div>
  );
}
