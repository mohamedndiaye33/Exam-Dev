import { useState, useEffect } from 'react';
import {
  getProducts, createProduct, updateProduct, deleteProduct,
  getUsers, deleteUser,
} from '../services/admin';

// ─── Types ────────────────────────────────────
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  isActive: boolean;
}

interface User {
  id: number;
  name?: string;
  email: string;
  role: string;
}

type Tab = 'products' | 'users';

// ─── Formulaire produit vide ──────────────────
const emptyForm = {
  name: '',
  description: '',
  price: 0,
  stock: 0,
  category: 'Consoles',
};

const CATEGORIES = ['Consoles', 'Manettes', 'Jeux', 'Gift Cards', 'Setup'];

// ─── Composant principal ──────────────────────
export default function AdminDashboard() {
  const [tab, setTab] = useState<Tab>('products');

  // Produits
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState('');
  const [formLoading, setFormLoading] = useState(false);

  // Utilisateurs
  const [users, setUsers] = useState<User[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  // Toast
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  // ── Chargement produits ──
  const loadProducts = async () => {
    setLoadingProducts(true);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch {
      showToast('Impossible de charger les produits', 'error');
    } finally {
      setLoadingProducts(false);
    }
  };

  // ── Chargement utilisateurs ──
  const loadUsers = async () => {
    setLoadingUsers(true);
    try {
      const data = await getUsers();
      setUsers(data);
    } catch {
      showToast('Impossible de charger les utilisateurs', 'error');
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    if (tab === 'users' && users.length === 0) loadUsers();
  }, [tab]);

  // ── Ouvrir formulaire ajout ──
  const openAdd = () => {
    setEditingProduct(null);
    setForm(emptyForm);
    setFormError('');
    setShowForm(true);
  };

  // ── Ouvrir formulaire édition ──
  const openEdit = (p: Product) => {
    setEditingProduct(p);
    setForm({
      name: p.name,
      description: p.description,
      price: p.price,
      stock: p.stock,
      category: p.category,
    });
    setFormError('');
    setShowForm(true);
  };

  // ── Soumettre formulaire ──
  const handleSubmit = async () => {
    if (!form.name || !form.description || !form.category) {
      setFormError('Tous les champs sont obligatoires.');
      return;
    }
    if (form.price <= 0) {
      setFormError('Le prix doit être supérieur à 0.');
      return;
    }
    setFormLoading(true);
    setFormError('');
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, form);
        showToast('Produit modifié ✓');
      } else {
        await createProduct(form);
        showToast('Produit ajouté ✓');
      }
      setShowForm(false);
      loadProducts();
    } catch (e: any) {
      setFormError(e.message);
    } finally {
      setFormLoading(false);
    }
  };

  // ── Supprimer produit ──
  const handleDeleteProduct = async (id: number, name: string) => {
    if (!confirm(`Supprimer "${name}" ?`)) return;
    try {
      await deleteProduct(id);
      showToast('Produit supprimé ✓');
      loadProducts();
    } catch (e: any) {
      showToast(e.message, 'error');
    }
  };

  // ── Supprimer utilisateur ──
  const handleDeleteUser = async (id: number, email: string) => {
    if (!confirm(`Supprimer l'utilisateur "${email}" ?`)) return;
    try {
      await deleteUser(id);
      showToast('Utilisateur supprimé ✓');
      loadUsers();
    } catch (e: any) {
      showToast(e.message, 'error');
    }
  };

  // ── Stats rapides ──
  const totalStock = products.reduce((a, p) => a + p.stock, 0);
  const activeProducts = products.filter((p) => p.isActive).length;

  return (
    <div className="min-h-screen bg-[#050505] text-white">

      {/* ── Toast ── */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-lg text-sm font-bold shadow-2xl transition-all
          ${toast.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
          {toast.msg}
        </div>
      )}

      {/* ── Header ── */}
      <div className="border-b border-white/10 bg-black/60 backdrop-blur px-8 py-5 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black uppercase italic tracking-tight">
            NEXUS <span className="text-red-600">ADMIN</span>
          </h1>
          <p className="text-slate-500 text-xs mt-0.5 uppercase tracking-widest">Dashboard de gestion</p>
        </div>
        <button
          onClick={() => { localStorage.removeItem('token'); window.location.href = '/login'; }}
          className="text-xs text-slate-400 hover:text-red-500 uppercase tracking-widest transition-colors border border-white/10 px-4 py-2 rounded hover:border-red-600"
        >
          Déconnexion
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Produits', value: products.length, accent: false },
            { label: 'Actifs',   value: activeProducts,   accent: true  },
            { label: 'Stock total', value: totalStock,    accent: false },
            { label: 'Utilisateurs', value: users.length, accent: false },
          ].map((s) => (
            <div key={s.label} className="bg-white/5 border border-white/10 rounded-lg p-5">
              <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">{s.label}</p>
              <p className={`text-3xl font-black ${s.accent ? 'text-red-500' : 'text-white'}`}>
                {s.value}
              </p>
            </div>
          ))}
        </div>

        {/* ── Tabs ── */}
        <div className="flex gap-2 mb-8 border-b border-white/10 pb-4">
          {(['products', 'users'] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2 rounded text-xs font-black uppercase tracking-widest transition-all
                ${tab === t
                  ? 'bg-red-600 text-white'
                  : 'text-slate-400 hover:text-white border border-white/10 hover:border-white/30'
                }`}
            >
              {t === 'products' ? '🎮 Produits' : '👥 Utilisateurs'}
            </button>
          ))}
        </div>

        {/* ════════════════════════════════════
            ONGLET PRODUITS
        ════════════════════════════════════ */}
        {tab === 'products' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-black uppercase italic tracking-tight">
                Catalogue produits
              </h2>
              <button
                onClick={openAdd}
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded text-xs font-black uppercase italic tracking-widest transition-all hover:scale-105"
              >
                + Ajouter un produit
              </button>
            </div>

            {loadingProducts ? (
              <div className="flex items-center justify-center py-20">
                <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20 text-slate-500">
                <p className="text-4xl mb-4">📦</p>
                <p className="uppercase tracking-widest text-sm">Aucun produit en base</p>
                <p className="text-xs mt-2">Clique sur "Ajouter un produit" pour commencer</p>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-lg border border-white/10">
                <table className="w-full text-sm">
                  <thead className="bg-white/5 text-slate-400 uppercase text-[11px] tracking-widest">
                    <tr>
                      <th className="text-left px-4 py-3">ID</th>
                      <th className="text-left px-4 py-3">Nom</th>
                      <th className="text-left px-4 py-3">Catégorie</th>
                      <th className="text-right px-4 py-3">Prix (FCFA)</th>
                      <th className="text-right px-4 py-3">Stock</th>
                      <th className="text-center px-4 py-3">Statut</th>
                      <th className="text-center px-4 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {products.map((p) => (
                      <tr key={p.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-4 py-3 text-slate-500">#{p.id}</td>
                        <td className="px-4 py-3 font-medium text-white max-w-[200px] truncate">{p.name}</td>
                        <td className="px-4 py-3">
                          <span className="text-[10px] border border-white/20 text-slate-400 px-2 py-0.5 rounded-full uppercase tracking-widest">
                            {p.category}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right text-red-400 font-bold">
                          {p.price.toLocaleString()}
                        </td>
                        <td className={`px-4 py-3 text-right font-bold ${p.stock < 3 ? 'text-orange-400' : 'text-slate-300'}`}>
                          {p.stock}
                          {p.stock < 3 && <span className="text-orange-400 text-[10px] ml-1">⚠</span>}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-widest
                            ${p.isActive ? 'bg-green-900/40 text-green-400 border border-green-600/30' : 'bg-red-900/40 text-red-400 border border-red-600/30'}`}>
                            {p.isActive ? 'Actif' : 'Masqué'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => openEdit(p)}
                              className="text-[11px] border border-white/20 text-slate-300 hover:text-white hover:border-white/50 px-3 py-1 rounded transition-all"
                            >
                              Éditer
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(p.id, p.name)}
                              className="text-[11px] border border-red-600/30 text-red-400 hover:bg-red-600 hover:text-white px-3 py-1 rounded transition-all"
                            >
                              Sup.
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ════════════════════════════════════
            ONGLET UTILISATEURS
        ════════════════════════════════════ */}
        {tab === 'users' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-black uppercase italic tracking-tight">
                Utilisateurs inscrits
              </h2>
              <button
                onClick={loadUsers}
                className="text-xs border border-white/10 hover:border-white/30 text-slate-400 hover:text-white px-4 py-2 rounded uppercase tracking-widest transition-all"
              >
                ↻ Rafraîchir
              </button>
            </div>

            {loadingUsers ? (
              <div className="flex items-center justify-center py-20">
                <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : users.length === 0 ? (
              <div className="text-center py-20 text-slate-500">
                <p className="text-4xl mb-4">👤</p>
                <p className="uppercase tracking-widest text-sm">Aucun utilisateur en base</p>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-lg border border-white/10">
                <table className="w-full text-sm">
                  <thead className="bg-white/5 text-slate-400 uppercase text-[11px] tracking-widest">
                    <tr>
                      <th className="text-left px-4 py-3">ID</th>
                      <th className="text-left px-4 py-3">Nom</th>
                      <th className="text-left px-4 py-3">Email</th>
                      <th className="text-center px-4 py-3">Rôle</th>
                      <th className="text-center px-4 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {users.map((u) => (
                      <tr key={u.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-4 py-3 text-slate-500">#{u.id}</td>
                        <td className="px-4 py-3 text-white font-medium">{u.name || '—'}</td>
                        <td className="px-4 py-3 text-slate-300">{u.email}</td>
                        <td className="px-4 py-3 text-center">
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-widest
                            ${u.role === 'admin'
                              ? 'bg-red-900/40 text-red-400 border border-red-600/30'
                              : 'bg-white/5 text-slate-400 border border-white/10'
                            }`}>
                            {u.role}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          {u.role !== 'admin' && (
                            <button
                              onClick={() => handleDeleteUser(u.id, u.email)}
                              className="text-[11px] border border-red-600/30 text-red-400 hover:bg-red-600 hover:text-white px-3 py-1 rounded transition-all"
                            >
                              Sup.
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ════════════════════════════════════
          MODAL FORMULAIRE PRODUIT
      ════════════════════════════════════ */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
          <div className="w-full max-w-lg bg-[#111] border border-white/10 rounded-2xl p-8 shadow-2xl">
            <h3 className="text-lg font-black uppercase italic mb-6">
              {editingProduct ? '✏️ Modifier le produit' : '➕ Nouveau produit'}
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-[11px] text-slate-400 uppercase tracking-widest block mb-1">Nom *</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Ex: PS5 Slim Standard"
                  className="w-full bg-black border border-white/10 focus:border-red-600 rounded px-4 py-3 text-white outline-none transition-colors text-sm"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-400 uppercase tracking-widest block mb-1">Description *</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Description courte du produit"
                  rows={3}
                  className="w-full bg-black border border-white/10 focus:border-red-600 rounded px-4 py-3 text-white outline-none transition-colors text-sm resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] text-slate-400 uppercase tracking-widest block mb-1">Prix (FCFA) *</label>
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                    min={1}
                    className="w-full bg-black border border-white/10 focus:border-red-600 rounded px-4 py-3 text-white outline-none transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 uppercase tracking-widest block mb-1">Stock *</label>
                  <input
                    type="number"
                    value={form.stock}
                    onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
                    min={0}
                    className="w-full bg-black border border-white/10 focus:border-red-600 rounded px-4 py-3 text-white outline-none transition-colors text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] text-slate-400 uppercase tracking-widest block mb-1">Catégorie *</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full bg-black border border-white/10 focus:border-red-600 rounded px-4 py-3 text-white outline-none transition-colors text-sm"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {formError && (
                <p className="text-red-400 text-sm bg-red-900/20 border border-red-600/30 rounded px-4 py-2">
                  ⚠ {formError}
                </p>
              )}
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setShowForm(false)}
                className="flex-1 border border-white/10 hover:border-white/30 text-slate-400 hover:text-white py-3 rounded text-xs font-black uppercase tracking-widest transition-all"
              >
                Annuler
              </button>
              <button
                onClick={handleSubmit}
                disabled={formLoading}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded text-xs font-black uppercase tracking-widest transition-all disabled:opacity-50"
              >
                {formLoading ? 'Enregistrement...' : editingProduct ? 'Modifier' : 'Ajouter'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
