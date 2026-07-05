// ─────────────────────────────────────────────
// Service admin — tous les appels nécessitent un token JWT admin
// ─────────────────────────────────────────────

const authHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('token') ?? ''}`,
});

// ── PRODUITS ─────────────────────────────────

export const getProducts = async () => {
  const res = await fetch('/api/products');
  if (!res.ok) throw new Error('Erreur chargement produits');
  return res.json();
};

export const createProduct = async (data: {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
}) => {
  const res = await fetch('/api/products', {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Erreur création produit');
  return json;
};

export const updateProduct = async (
  id: number,
  data: Partial<{ name: string; description: string; price: number; stock: number; category: string; isActive: boolean }>
) => {
  const res = await fetch(`/api/products/${id}`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Erreur modification produit');
  return json;
};

export const deleteProduct = async (id: number) => {
  const res = await fetch(`/api/products/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  if (!res.ok) {
    const json = await res.json();
    throw new Error(json.message || 'Erreur suppression produit');
  }
};

// ── UTILISATEURS ─────────────────────────────

export const getUsers = async () => {
  const res = await fetch('/api/users', { headers: authHeaders() });
  if (!res.ok) throw new Error('Erreur chargement utilisateurs');
  return res.json();
};

export const deleteUser = async (id: number) => {
  const res = await fetch(`/api/users/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  if (!res.ok) {
    const json = await res.json();
    throw new Error(json.message || 'Erreur suppression utilisateur');
  }
};
