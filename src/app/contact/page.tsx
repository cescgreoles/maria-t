"use client";

import { FormEvent, useEffect, useState } from "react";
import emailjs from "emailjs-com";
import Image from "next/image";
import Link from "next/link";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentBackground, setCurrentBackground] = useState(0);

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

  const backgroundImages = ["/image/2016/1/1.webp"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBackground((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  return (
    <main className="container mx-auto py-10 px-4 sm:px-6 lg:px-8 bg-black text-white">
      <div
        className="absolute top-0 left-0 right-0 bottom-0 bg-cover bg-center transition-all duration-1000"
        style={{
          backgroundImage: `url(${backgroundImages[currentBackground]})`,
        }}
      ></div>

      <div className="flex items-center justify-between px-6 absolute top-6 left-0 right-0 z-10 w-full">
        <div className="flex items-center space-x-4">
          <Image
            src="/logo.png"
            alt="Logo de Proyectos"
            width={40}
            height={40}
            className="opacity-90"
          />
          <h1 className="text-xl sm:text-3xl  text-white">CONTACTO</h1>
        </div>

        <Link href="/" className="text-white uppercase text-lg hover:underline">
          VOLVER
        </Link>
      </div>
      <div>
        <div>
          <h2 className="text-3xl sm:text-5xl font-bold text-center mt-20">
            Contáctanos
          </h2>
          <p className="text-center text-xl text-gray-300 mt-4">
            ¿Tienes alguna pregunta o comentario? ¡Escríbenos!
          </p>
        </div>

        <div className="bg-black bg-opacity-70 backdrop-blur-md p-8 rounded-lg shadow-lg max-w-md mx-auto mt-10">
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

              <div className="rounded-md shadow-sm">
                <div className="mb-4">
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
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border  placeholder-gray-300 text-black bg-white focus:outline-none focus:ring-white focus:border-white sm:text-sm"
                    placeholder="Tu nombre"
                  />
                </div>
                <div className="mb-4">
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
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border  placeholder-gray-300 text-black bg-white focus:outline-none focus:ring-white focus:border-white sm:text-sm"
                    placeholder="Tu correo electrónico"
                  />
                </div>
                <div className="mb-4">
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
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border  placeholder-gray-300 text-black bg-white focus:outline-none focus:ring-white focus:border-white sm:text-sm"
                    placeholder="Tu mensaje"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-white hover:bg-gray focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
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
