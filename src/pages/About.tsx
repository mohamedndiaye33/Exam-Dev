import { Link } from 'react-router-dom'
import { ShieldCheck, Gamepad, Rocket, Users } from 'lucide-react'

const About = () => {
  return (
    <section className="min-h-[calc(100vh-5rem)] rounded-4xl border border-red-600/30 bg-[#0f0f0f]/95 p-8 shadow-[0_0_80px_rgba(255,0,0,0.18)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <div className="space-y-4">
          <span className="text-sm uppercase tracking-[0.35em] text-red-400">À propos de nous</span>
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
            Bienvenue chez Nexus Gaming : votre boutique gaming de référence au Sénégal.
          </h1>
          <p className="max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            Depuis 2024, Nexus Gaming révolutionne l'accès aux meilleurs équipements gaming en Afrique de l'Ouest. Basée à Dakar, nous connectons les joueurs sénégalais avec le matériel haut de gamme qu'ils méritent : consoles dernière génération, accessoires professionnels et composants gaming ultra-performants.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <article className="rounded-[1.75rem] border border-red-600/20 bg-[#141414]/90 p-6 shadow-[0_0_40px_rgba(255,0,0,0.16)]">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10 text-red-300">
              <Gamepad className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-semibold text-white">Catalogue premium</h2>
            <p className="mt-3 text-slate-300">
              PS5, Xbox Series X/S, Nintendo Switch, PC gaming et accessoires officiels. Tous les top-sellers et sorties exclusives disponibles avec garantie constructeur.
            </p>
          </article>

          <article className="rounded-[1.75rem] border border-red-600/20 bg-[#141414]/90 p-6 shadow-[0_0_40px_rgba(255,0,0,0.16)]">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10 text-red-300">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-semibold text-white">Sécurité garantie</h2>
            <p className="mt-3 text-slate-300">
              Paiements sécurisés, produits authentiques vérifiés, garanties constructeur honorées, et support client réactif en français et wolof.
            </p>
          </article>

          <article className="rounded-[1.75rem] border border-red-600/20 bg-[#141414]/90 p-6 shadow-[0_0_40px_rgba(255,0,0,0.16)]">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10 text-red-300">
              <Rocket className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-semibold text-white">Livraison rapide</h2>
            <p className="mt-3 text-slate-300">
              Retrait en magasin à Dakar en 24h ou livraison partout au Sénégal. Suivi de commande en temps réel et emballage premium.
            </p>
          </article>


        </div>

        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="rounded-4xl border border-red-600/20 bg-[#111111]/90 p-8 shadow-[0_0_70px_rgba(255,0,0,0.16)]">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-red-500/10 text-red-300">
                <Users className="h-7 w-7" />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-red-300">Notre vision</p>
                <p className="text-2xl font-bold text-white">Démocratiser le gaming</p>
              </div>
            </div>
            <p className="mt-6 text-slate-300">
              Nexus Gaming existe pour une seule raison : faire du gaming accessible et prestigieux au Sénégal. Pas d'intermédiaires, pas de prix gonflés. Juste du matériel authentique au meilleur prix, livré direct chez vous avec le sourire.
            </p>
          </div>

          <aside className="rounded-4xl border border-red-600/20 bg-[#111111]/90 p-8 shadow-[0_0_70px_rgba(255,0,0,0.16)]">
            <span className="text-sm uppercase tracking-[0.3em] text-red-400">Nos chiffres</span>
            <h3 className="mt-4 text-3xl font-black text-white">+2000 clients, 100% satisfaits</h3>
            <p className="mt-4 text-slate-300">
              Depuis notre lancement, nous avons fidélisé une communauté de gamers passionnés. 0 arnaque, 0 contrefaçon. Juste de l'excellence gaming sénégalaise.</p>
            <Link
              to="/contact"
              className="mt-6 inline-flex rounded-full bg-red-600 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-red-500"
            >
              Nous contacter
            </Link>
          </aside>
        </div>
      </div>
    </section>
  )
}

export default About;