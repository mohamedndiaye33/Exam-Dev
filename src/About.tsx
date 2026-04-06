import { Link } from 'react-router-dom'
import { ShieldCheck, Gamepad, Sparkles, Rocket, Users } from 'lucide-react'

function About() {
  return (
    <section className="min-h-[calc(100vh-5rem)] rounded-[2rem] border border-red-600/30 bg-[#0f0f0f]/95 p-8 shadow-[0_0_80px_rgba(255,0,0,0.18)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <div className="space-y-4">
          <span className="text-sm uppercase tracking-[0.35em] text-red-400">À propos de nous</span>
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
            Notre mission : propulser les gamers vers de nouveaux records.
          </h1>
          <p className="max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            Nous créons une expérience e-commerce Gaming unique, alliant esthétique noire et accents rouges, technologie performante et service client réactif. Tous les produits sont sélectionnés pour les joueurs exigeants qui veulent style et puissance.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <article className="rounded-[1.75rem] border border-red-600/20 bg-[#141414]/90 p-6 shadow-[0_0_40px_rgba(255,0,0,0.16)]">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10 text-red-300">
              <Gamepad className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-semibold text-white">Focus produit</h2>
            <p className="mt-3 text-slate-300">
              Matériel gaming haut de gamme, périphériques stylés et composants fiables pour une boutique qui reflète parfaitement l’ADN des joueurs compétitifs.
            </p>
          </article>

          <article className="rounded-[1.75rem] border border-red-600/20 bg-[#141414]/90 p-6 shadow-[0_0_40px_rgba(255,0,0,0.16)]">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10 text-red-300">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-semibold text-white">Sûreté et confiance</h2>
            <p className="mt-3 text-slate-300">
              Paiement sécurisé, suivi de commande transparent et support disponible pour assurer une expérience fluide du panier à la livraison.
            </p>
          </article>

          <article className="rounded-[1.75rem] border border-red-600/20 bg-[#141414]/90 p-6 shadow-[0_0_40px_rgba(255,0,0,0.16)]">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10 text-red-300">
              <Rocket className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-semibold text-white">Livraison rapide</h2>
            <p className="mt-3 text-slate-300">
              Livraison express et gestion de stocks optimisée pour que les commandes arrives rapidement et que les joueurs restent dans la partie.
            </p>
          </article>

          <article className="rounded-[1.75rem] border border-red-600/20 bg-[#141414]/90 p-6 shadow-[0_0_40px_rgba(255,0,0,0.16)]">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10 text-red-300">
              <Sparkles className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-semibold text-white">Style gaming</h2>
            <p className="mt-3 text-slate-300">
              Une identité visuelle noire et rouge, des visuels immersifs et un design pensé pour attirer les gamers et renforcer l’image premium de votre boutique.
            </p>
          </article>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="rounded-[2rem] border border-red-600/20 bg-[#111111]/90 p-8 shadow-[0_0_70px_rgba(255,0,0,0.16)]">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-red-500/10 text-red-300">
                <Users className="h-7 w-7" />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-red-300">Notre ADN</p>
                <p className="text-2xl font-bold text-white">Communauté</p>
              </div>
            </div>
            <p className="mt-6 text-slate-300">
              Nous construisons un espace où les joueurs peuvent acheter, découvrir et vivre la passion du gaming avec un service premium et une communication claire.
            </p>
          </div>

          <aside className="rounded-[2rem] border border-red-600/20 bg-[#111111]/90 p-8 shadow-[0_0_70px_rgba(255,0,0,0.16)]">
            <span className="text-sm uppercase tracking-[0.3em] text-red-400">Notre promesse</span>
            <h3 className="mt-4 text-3xl font-black text-white">Performance, image, support.</h3>
            <p className="mt-4 text-slate-300">
              Chaque produit est choisi pour son design et sa qualité, avec un service après-vente réactif et une attention aux détails digne d’un site e-commerce gaming.</p>
            <Link
              to="/contact"
              className="mt-6 inline-flex rounded-full bg-red-600 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-red-500"
            >
              Parlez-nous
            </Link>
          </aside>
        </div>
      </div>
    </section>
  )
}

export default About
