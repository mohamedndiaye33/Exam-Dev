import { Mail, Phone, MapPin, Clock3, MessageSquare } from 'lucide-react'
import { SiInstagram, SiFacebook, SiWhatsapp } from 'react-icons/si'

const Contact = () => {
  return (
    <section className="min-h-[calc(100vh-5rem)] rounded-[2rem] border border-red-600/30 bg-[#0f0f0f]/95 p-8 shadow-[0_0_80px_rgba(255,0,0,0.18)] backdrop-blur-xl">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6 rounded-[2rem] border border-red-600/20 bg-[#141414]/90 p-8 shadow-[0_0_60px_rgba(255,0,0,0.16)]">
          <div className="space-y-4">
            <span className="text-sm uppercase tracking-[0.35em] text-red-400">Nous contacter</span>
            <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
              Contactez notre service client.
            </h1>
            <p className="max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
              Pour toute question, commande ou support, utilisez l’un de nos canaux officiels. Nous répondons rapidement aux demandes e-commerce.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <article className="rounded-[1.75rem] border border-red-600/20 bg-[#0f0f0f] p-6">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10 text-red-300">
                <Mail className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-semibold text-white">Email support</h2>
              <p className="mt-3 text-slate-300">cheikhouseck734@gmail.com</p>
            </article>
            <article className="rounded-[1.75rem] border border-red-600/20 bg-[#0f0f0f] p-6">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10 text-red-300">
                <Phone className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-semibold text-white">Téléphone</h2>
              <p className="mt-3 text-slate-300">70 806 24 64</p>
            </article>
            <article className="rounded-[1.75rem] border border-red-600/20 bg-[#0f0f0f] p-6">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10 text-red-300">
                <MapPin className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-semibold text-white">Adresse</h2>
              <p className="mt-3 text-slate-300">Dakar, Senegal</p>
            </article>
            <article className="rounded-[1.75rem] border border-red-600/20 bg-[#0f0f0f] p-6">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10 text-red-300">
                <Clock3 className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-semibold text-white">Horaires</h2>
              <p className="mt-3 text-slate-300">Lun - Ven : 9h00 - 19h00</p>
            </article>
          </div>

          <div className="rounded-[1.75rem] border border-red-600/20 bg-[#0f0f0f] p-6">
            <div className="flex items-center gap-3">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10 text-red-300">
                <SiInstagram className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-red-300">Réseaux sociaux</p>
                <p className="text-lg font-semibold text-white">Suivez-nous pour les offres, nouveautés et promos.</p>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <a
                href="https://www.instagram.com/noirverse_shop"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-3xl border border-red-600/20 bg-[#0f0f0f] px-4 py-4 text-slate-200 transition hover:border-red-400/60 hover:bg-[#171717]"
              >
                <SiInstagram className="h-5 w-5 text-pink-400" />
                Instagram
              </a>
              <a
                href="https://www.facebook.com/noirverse-shop"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-3xl border border-red-600/20 bg-[#0f0f0f] px-4 py-4 text-slate-200 transition hover:border-blue-400/60 hover:bg-[#171717]"
              >
                <SiFacebook className="h-5 w-5 text-blue-400" />
                Facebook
              </a>
              <a
                href="https://wa.me/216708062464"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-3xl border border-red-600/20 bg-[#0f0f0f] px-4 py-4 text-slate-200 transition hover:border-green-400/60 hover:bg-[#171717]"
              >
                <SiWhatsapp className="h-5 w-5 text-green-400" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        <form className="rounded-[2rem] border border-red-600/20 bg-[#141414]/90 p-8 shadow-[0_0_60px_rgba(255,0,0,0.16)]">
          <div className="mb-8 flex items-center gap-4">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-red-500/10 text-red-300">
              <MessageSquare className="h-7 w-7" />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-red-300">Envoyez un message</p>
              <p className="text-2xl font-bold text-white">Prêt à discuter ?</p>
            </div>
          </div>

          <div className="space-y-6">
            <label className="block">
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Nom</span>
              <input
                type="text"
                placeholder="Votre nom"
                className="mt-3 w-full rounded-3xl border border-red-600/20 bg-[#0a0a0a] px-4 py-4 text-white outline-none transition focus:border-red-500/80"
              />
            </label>
            <label className="block">
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Email</span>
              <input
                type="email"
                placeholder="contact@exemple.com"
                className="mt-3 w-full rounded-3xl border border-red-600/20 bg-[#0a0a0a] px-4 py-4 text-white outline-none transition focus:border-red-500/80"
              />
            </label>
            <label className="block">
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Message</span>
              <textarea
                rows={6}
                placeholder="Décrivez votre besoin..."
                className="mt-3 w-full rounded-3xl border border-red-600/20 bg-[#0a0a0a] px-4 py-4 text-white outline-none transition focus:border-red-500/80"
              />
            </label>
            <button
              type="submit"
              className="w-full rounded-full bg-red-600 px-6 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-red-500"
            >
              Envoyer le message
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Contact;