// REGISTER — POST /api/users/register → proxy → localhost:5000/users/register
export const registerUser = async (formData: {
  name: string;
  email: string;
  password: string;
  role: 'client' | 'admin'; // ✅ Envoi du rôle choisi
}) => {
  const response = await fetch('/api/users/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Erreur lors de l'inscription");
  }

  return data.message;
};

// LOGIN — POST /api/auth/login → proxy → localhost:5000/auth/login
export const loginUser = async (formData: {
  email: string;
  password: string;
}) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Erreur lors de la connexion');
  }

  // ✅ Stocke le token JWT (contient le rôle dans son payload)
  localStorage.setItem('token', data.token);

  return data.message;
};

// LOGOUT
export const logoutUser = () => {
  localStorage.removeItem('token');
};

// Vérifie si l'utilisateur est connecté
export const isLoggedIn = (): boolean => {
  return !!localStorage.getItem('token');
};

// Récupère le rôle depuis le token JWT (sans appel réseau)
export const getUserRole = (): string | null => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  try {
    const payload = token.split('.')[1];
    const decoded = JSON.parse(atob(payload));
    return decoded.role ?? null;
  } catch {
    return null;
  }
};
