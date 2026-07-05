import { Navigate } from 'react-router-dom';

// Décode le payload JWT (sans vérification de signature — côté client uniquement)
const getTokenPayload = (): { role?: string } | null => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
};

// Composant de protection : redirige si non connecté ou pas admin
export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const payload = getTokenPayload();

  if (!payload) {
    // Pas connecté → retour au login
    return <Navigate to="/login" replace />;
  }

  if (payload.role !== 'admin') {
    // Connecté mais pas admin → retour à l'accueil
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
