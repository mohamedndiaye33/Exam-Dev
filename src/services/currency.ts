// ─────────────────────────────────────────────
// Service devise — appelle GET /api/currencies/rates
// ─────────────────────────────────────────────

// ✅ Valeurs runtime exportées comme constante (pas un type pur)
export const CURRENCIES = ['XOF', 'EUR', 'USD'] as const;
export type Currency = typeof CURRENCIES[number]; // 'XOF' | 'EUR' | 'USD'

export interface Rates {
  EUR: number;
  USD: number;
  GBP: number;
}

// Symboles et noms affichés dans le sélecteur
export const CURRENCY_META: Record<Currency, { symbol: string; label: string; flag: string }> = {
  XOF: { symbol: 'FCFA', label: 'Franc CFA', flag: '🇸🇳' },
  EUR: { symbol: '€',    label: 'Euro',       flag: '🇪🇺' },
  USD: { symbol: '$',    label: 'Dollar USD', flag: '🇺🇸' },
};

// Cache en mémoire pour éviter de rappeler l'API à chaque rendu
let cachedRates: Rates | null = null;
let cacheTime = 0;
const CACHE_DURATION_MS = 5 * 60 * 1000; // 5 minutes

// Récupère les taux depuis le backend (avec cache)
export const fetchRates = async (): Promise<Rates> => {
  const now = Date.now();
  if (cachedRates && now - cacheTime < CACHE_DURATION_MS) {
    return cachedRates;
  }

  const res = await fetch('/api/currencies/rates');
  if (!res.ok) throw new Error('Impossible de récupérer les taux de change');

  const data = await res.json();
  cachedRates = data.rates as Rates;
  cacheTime = now;
  return cachedRates;
};

// Convertit un prix FCFA vers la devise cible
export const convertPrice = (amountXOF: number, currency: Currency, rates: Rates): number => {
  if (currency === 'XOF') return amountXOF;
  return amountXOF * rates[currency];
};

// Formate un prix selon la devise
export const formatPrice = (amount: number, currency: Currency): string => {
  const { symbol } = CURRENCY_META[currency];

  if (currency === 'XOF') {
    return `${Math.round(amount).toLocaleString('fr-FR')} ${symbol}`;
  }

  return `${symbol}${amount.toFixed(2)}`;
};
