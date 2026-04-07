import { Mail, Phone, MapPin, Clock3, MessageSquare } from 'lucide-react'
import { SiInstagram, SiFacebook, SiWhatsapp } from 'react-icons/si'
import { useState } from "react";

const Contact = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const phone = "221774944730";

    const text = `Bonjour, je vous contacte depuis votre site :

Nom: ${formData.name}
Email: ${formData.email}

Message:
${formData.message}`;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;

    window.open(url, "_blank");
  };

  return (
    <section className="min-h-[calc(100vh-5rem)] rounded-[2rem] border border-red-600/30 bg-[#0f0f0f]/95 p-8 shadow-[0_0_80px_rgba(255,0,0,0.18)] backdrop-blur-xl">
      
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr]">

        {/* INFOS */}
        <div className="space-y-6 rounded-[2rem] border border-red-600/20 bg-[#141414]/90 p-8 shadow-[0_0_60px_rgba(255,0,0,0.16)]">

          <div className="space-y-4">
            <span className="text-sm uppercase tracking-[0.35em] text-red-400">Nous contacter</span>
            <h1 className="text-4xl font-black text-white">
              Contactez notre service client
            </h1>
          </div>

          {/* CARTES */}
          <div className="grid gap-4 sm:grid-cols-2">

            <div className="p-4 bg-black rounded">
              <Mail className="text-red-500" />
              <p className="text-white">nexus_gaming2.0@gmail.com</p>
            </div>

            <div className="p-4 bg-black rounded">
              <Phone className="text-red-500" />
              <p className="text-white">77 494 47 30</p>
            </div>

            <div className="p-4 bg-black rounded">
              <MapPin className="text-red-500" />
              <p className="text-white">Dakar, Sénégal</p>
            </div>

            <div className="p-4 bg-black rounded">
              <Clock3 className="text-red-500" />
              <p className="text-white">Lun - Ven : 9h - 19h</p>
            </div>

          </div>

          {/* RÉSEAUX SOCIAUX */}
          <div className="grid gap-3 sm:grid-cols-3 mt-6">

            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 p-3 bg-black rounded text-white hover:border-red-500 border"
            >
              <SiInstagram className="text-pink-400" />
              Instagram
            </a>

            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 p-3 bg-black rounded text-white hover:border-blue-500 border"
            >
              <SiFacebook className="text-blue-400" />
              Facebook
            </a>

            <a
              href="https://wa.me/221774944730"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 p-3 bg-black rounded text-white hover:border-green-500 border"
            >
              <SiWhatsapp className="text-green-400" />
              WhatsApp
            </a>

          </div>
        </div>

        {/* FORMULAIRE */}
        <form onSubmit={handleSubmit} className="bg-[#141414] p-8 rounded">

          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="text-red-500" />
            <p className="text-white font-bold">Envoyer un message</p>
          </div>

          <input
            name="name"
            placeholder="Nom"
            onChange={handleChange}
            className="w-full p-3 mb-3 bg-black text-white"
          />

          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-3 mb-3 bg-black text-white"
          />

          <textarea
            name="message"
            placeholder="Message"
            onChange={handleChange}
            className="w-full p-3 mb-3 bg-black text-white"
          />

          <button className="w-full bg-red-600 p-3 text-white">
            Envoyer sur WhatsApp
          </button>

        </form>

      </div>
    </section>
  )
}

export default Contact;