import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import CurrencySelector from '../components/CurrencySelector';
import { fetchRates, convertPrice, formatPrice } from '../services/currency';
import type { Currency, Rates } from '../services/currency'; // ✅ import type séparé

// ── Imports images ────────────────────────────
import Ps5Standard from '../assets/Ps5Standard.jpg';
import Asus from '../assets/Asus.jpg';
import Edge1 from '../assets/Edge1.jpg';
import ManettePC from '../assets/manettePC.jpg';
import ManettePS4 from '../assets/manetteps4.jpg';
import ManettePS4Pro from '../assets/manetteps4pro.jpg';
import ManetteXbox from '../assets/manettexbox.jpg';
import ManettePS5 from '../assets/menetteps5.jpg';
import RDR2 from '../assets/rdr2.jpg';
import Spider2 from '../assets/Spider2.jpg';
import AC7 from '../assets/AC7.jpg';
import FC26 from '../assets/FC26.jpg';
import K26 from '../assets/2K26.jpg';
import GTA5 from '../GTA5.jpg';                       // ✅ dans src/ pas assets/
import PSN10 from '../assets/10.jpg';
import PSN50 from '../assets/50.jpg';
import PSN100 from '../assets/100.jpg';
import Steam20 from '../assets/steam20.jpg';
import Steam50 from '../assets/Steam50.jpg';
import Xbox10 from '../assets/xboxcard10.jpg';
import Xbox20 from '../assets/xboxcard20.jpg';
import EcranAsus from '../assets/EcranAsus.jpg';
import ChaiseGaming from '../assets/chaisegaming.jpg';
import ClavierMecanique from '../assets/claviermecanique.jpg';
import Souris from '../assets/Souris.jpg';
import Casque from '../assets/casque.jpg';
import Micro from '../assets/micro.jpg';
import BureauGaming from '../assets/bureaugaming.jpg';
import PS5 from '../assets/PS5.jpg';
import PS4PRO from '../assets/PS4PRO.jpg';
import Nintendoswitch from '../assets/Nintendoswitch.jpg';
import SteamDeck from '../assets/Steamdeck.jpg';         // ✅ d minuscule
import XboxSeriesS from '../assets/xboxSerieS.jpg';
import XboxSeriesX from '../assets/xboxserieX.jpg';      // ✅ X minuscule
import tapissouris from '../assets/tapissouris.jpg';

// ── Données produits (prix en FCFA) ───────────
const CATALOG = {
  consoles: [
    { id: 1,  name: 'PS5 Slim Standard',        price: 275000, image: Ps5Standard    },
    { id: 2,  name: 'Xbox Series X',             price: 300000, image: XboxSeriesX    },
    { id: 3,  name: 'Nintendo Switch2 OLED',     price: 245000, image: Nintendoswitch },
    { id: 4,  name: 'PS5 Pro',                   price: 500000, image: PS5            },
    { id: 5,  name: 'Xbox Series S Digital',     price: 215000, image: XboxSeriesS    },
    { id: 6,  name: 'PS4 PRO',                   price: 190000, image: PS4PRO         },
    { id: 7,  name: 'Steam Deck OLED 512GB',     price: 475000, image: SteamDeck      },
    { id: 8,  name: 'ASUS ROG Ally Z1 Extreme',  price: 525000, image: Asus           },
  ],
  manettes: [
    { id: 9,  name: 'Manette Edge Dualsense',    price: 55000,  image: Edge1          },
    { id: 10, name: 'Manette PS4PRO',            price: 15000,  image: ManettePS4Pro  },
    { id: 11, name: 'Manette ordi',              price: 10000,  image: ManettePC      },
    { id: 12, name: 'Manette Xbox Serie X',      price: 30000,  image: ManetteXbox    },
    { id: 13, name: 'Manette PS5 custom',        price: 2500,   image: ManettePS5     },
    { id: 14, name: 'Manette PS4 custom',        price: 15000,  image: ManettePS4     },
  ],
  jeux: [
    { id: 17, name: 'Red Dead Redemption 2 PS5', price: 45000,  image: RDR2           },
    { id: 18, name: 'Spider-Man 2 PS5',          price: 60000,  image: Spider2        },
    { id: 19, name: 'Ace Combat 7',              price: 30000,  image: AC7            },
    { id: 20, name: 'FC 26',                     price: 50000,  image: FC26           },
    { id: 21, name: '2K 26',                     price: 55000,  image: K26            },
    { id: 22, name: 'GTA 5',                     price: 25000,  image: GTA5           },
  ],
  cartes: [
    { id: 25, name: 'Gift Card PSN 10€',         price: 7500,   image: PSN10          },
    { id: 26, name: 'Gift Card PSN 100€',        price: 60000,  image: PSN100         },
    { id: 27, name: 'Gift Card PSN 50€',         price: 40000,  image: PSN50          },
    { id: 28, name: 'Gift Card Steam 20€',       price: 15000,  image: Steam20        },
    { id: 29, name: 'Gift Card Steam 50€',       price: 35000,  image: Steam50        },
    { id: 30, name: 'Gift Card Xbox 10€',        price: 7500,   image: Xbox10         },
    { id: 31, name: 'Gift Card Xbox 20€',        price: 15000,  image: Xbox20         },
  ],
  setup: [
    { id: 33, name: 'Écran Asus courbé',              price: 100000, image: EcranAsus      },
    { id: 34, name: 'Chaise Gaming Secretlab',         price: 30000,  image: ChaiseGaming   },
    { id: 35, name: 'Clavier Mécanique RGB Pro',       price: 35000,  image: ClavierMecanique},
    { id: 36, name: 'Souris Logitech G Pro Wireless',  price: 20000,  image: Souris         },
    { id: 37, name: 'Casque Astro A50 Wireless',       price: 25000,  image: Casque         },
    { id: 38, name: 'Micro Shure SM7B Pro',            price: 20000,  image: Micro          },
    { id: 39, name: 'Tapis XXL Pro',                   price: 7000,   image: tapissouris    },
    { id: 40, name: 'Bureau Gaming Motorisé',          price: 40000,  image: BureauGaming   },
  ],
};

const SECTION_TITLES: Record<string, string> = {
  consoles: 'Nos Consoles',
  manettes: 'Nos Manettes',
  jeux:     'Nos Jeux Vidéo',
  cartes:   'Gift Cards',
  setup:    'Setup & Confort',
};

// ── Nav catégories ────────────────────────────
function CategoryNav() {
  const cats = [
    { label: 'Consoles',   href: '#consoles' },
    { label: 'Manettes',   href: '#manettes' },
    { label: 'Jeux Vidéo', href: '#jeux'     },
    { label: 'Gift Cards', href: '#cartes'   },
    { label: 'Setup',      href: '#setup'    },
  ];
  return (
    <div className="flex justify-center gap-4 md:gap-6 px-4 min-w-max mx-auto">
      {cats.map((c) => (
        <a key={c.href} href={c.href}
          className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-red-600 transition-colors border border-white/10 px-4 py-2 rounded-full hover:border-red-600 italic">
          {c.label}
        </a>
      ))}
    </div>
  );
}

// ── Section produits ──────────────────────────
function ProductSection({
  id, title, items, currency, rates,
}: {
  id: string;
  title: string;
  items: { id: number; name: string; price: number; image: string }[];
  currency: Currency;
  rates: Rates | null;
}) {
  return (
    <section id={id} className="mb-24 max-w-[1300px] mx-auto px-4 scroll-mt-32">
      <div className="flex items-center justify-center gap-4 mb-10">
        <div className="h-[2px] w-12 bg-red-600" />
        <h3 className="text-white font-black text-xl uppercase tracking-[0.2em] italic">{title}</h3>
        <div className="h-[2px] w-12 bg-red-600" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {items.map((item) => {
          const converted = rates ? convertPrice(item.price, currency, rates) : item.price;
          const displayed = rates
            ? formatPrice(converted, currency)
            : `${item.price.toLocaleString('fr-FR')} FCFA`;

          return (
            <ProductCard
              key={item.id}
              id={item.id}
              name={item.name}
              price={item.price}
              image={item.image}
              displayPrice={displayed}
            />
          );
        })}
      </div>
    </section>
  );
}

// ── Page principale ───────────────────────────
export default function Produit() {
  const [currency, setCurrency]       = useState<Currency>('XOF');
  const [rates, setRates]             = useState<Rates | null>(null);
  const [ratesLoading, setRatesLoading] = useState(false);
  const [ratesError, setRatesError]   = useState('');

  useEffect(() => {
    if (currency === 'XOF') { setRates(null); return; }

    setRatesLoading(true);
    setRatesError('');

    fetchRates()
      .then(setRates)
      .catch(() => {
        setRatesError('Taux indisponibles — prix en FCFA');
        setCurrency('XOF');
      })
      .finally(() => setRatesLoading(false));
  }, [currency]);

  return (
    <div className="bg-[#050505] min-h-screen">

      {/* Header */}
      <header className="text-center pt-16 pb-6 italic">
        <p className="text-red-600 font-bold tracking-[0.4em] uppercase text-[10px] mb-2 underline decoration-red-600 underline-offset-8">
          Collection 2026
        </p>
        <h2 className="text-white text-5xl md:text-7xl font-black uppercase italic">
          Gaming <span className="text-red-600">Store</span>
        </h2>
      </header>

      {/* Barre sticky nav + sélecteur devise */}
      <div className="sticky top-16 z-40 bg-black/80 backdrop-blur-xl border-b border-white/5 py-4 overflow-x-auto no-scrollbar">
        <div className="flex items-center justify-between max-w-[1300px] mx-auto px-4 gap-4">
          <CategoryNav />
          <div className="flex-shrink-0 flex items-center gap-3">
            {ratesError && (
              <span className="text-orange-400 text-[10px] hidden md:block">{ratesError}</span>
            )}
            <CurrencySelector
              selected={currency}
              onChange={setCurrency}
              loading={ratesLoading}
            />
          </div>
        </div>
      </div>

      {ratesLoading && (
        <p className="text-center py-3 text-slate-500 text-[11px] uppercase tracking-widest animate-pulse">
          Récupération des taux de change...
        </p>
      )}

      {/* Sections */}
      <div className="pt-10">
        {(Object.entries(CATALOG) as [string, typeof CATALOG.consoles][]).map(([key, items]) => (
          <ProductSection
            key={key}
            id={key}
            title={SECTION_TITLES[key]}
            items={items}
            currency={currency}
            rates={rates}
          />
        ))}
      </div>

    </div>
  );
}
