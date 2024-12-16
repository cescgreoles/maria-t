"use client";

import { FormEvent, useState } from "react";
import emailjs from "emailjs-com";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const serviceId = process.env.NEXT_PUBLIC_SERVICE_ID!;
  const templateId = process.env.NEXT_PUBLIC_TEMPLATE_ID!;
  const userId = process.env.NEXT_PUBLIC_USER_ID!;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const templateParams = { name, email, message };

    try {
      await emailjs.send(serviceId, templateId, templateParams, userId);
      setSubmitted(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error("Error al enviar el correo:", error);
      setError("Hubo un problema al enviar tu mensaje. Intenta de nuevo.");
    }
  };

  return (
    <main
      className="min-h-screen flex flex-col bg-cover bg-center"
      style={{ backgroundImage: `url(/image/2022/1/4.webp)` }}
    >
      <div className="flex items-center justify-between px-6 absolute top-6 left-0 right-0 w-full z-20">
        <div className="flex items-center space-x-4">
          <Image
            src="/logo.png"
            alt="Logo de Proyectos"
            width={40}
            height={40}
            className="opacity-90"
          />
          <h2 className="text-2xl sm:text-3xl text-white">CONTACTO</h2>
        </div>
        <Link href="/" className="text-white text-xl uppercase hover:underline">
          VOLVER
        </Link>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center mt-24 px-6 py-12 md:space-x-12 w-full max-w-7xl mx-auto">
        <div className="text-white md:w-1/2 mb-6 md:mb-0">
          <p className="text-sm md:text-base leading-relaxed">
            Elijo elementos de la naturaleza que por cualquier motivo atraen mi
            interés, escogiendo lo que a menudo nos pasa desapercibido. Para
            sorprender al espectador, hay que transportarlo a un universo
            imaginario, a otro espacio donde redescubra su mirada. Que pueda ver
            de otra manera elementos que siempre han estado allí, que descubra
            la luz y la sombra sobre pequeños detalles que pasan desapercibidos
            y se conviertan en elementos esenciales.
          </p>
        </div>

        <div className="bg-black bg-opacity-80 backdrop-blur-md p-6 rounded-lg shadow-lg w-full max-w-md">
          {submitted ? (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg">
              ¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg">
                  {error}
                </div>
              )}
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="appearance-none rounded-md block w-full px-3 py-2 border placeholder-gray-300 text-black bg-white focus:outline-none focus:ring-white focus:border-white sm:text-sm"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="appearance-none rounded-md block w-full px-3 py-2 border placeholder-gray-300 text-black bg-white focus:outline-none focus:ring-white focus:border-white sm:text-sm"
                    placeholder="Tu correo electrónico"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    required
                    className="appearance-none rounded-md block w-full px-3 py-2 border placeholder-gray-300 text-black bg-white focus:outline-none focus:ring-white focus:border-white sm:text-sm"
                    placeholder="Tu mensaje"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                >
                  Enviar mensaje
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
