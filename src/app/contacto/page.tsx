"use client";

import { FormEvent, useState } from "react";
import emailjs from "emailjs-com";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const serviceId = "service_ph7vo6i";
  const templateId = "template_konc18x";
  const userId = "02v5LAiTAqxhZvTpB";

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
    <div
      className="min-h-screen relative flex items-center justify-center bg-black"
      style={{
        backgroundImage: "url('/image/2016/1/1.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <header className="absolute top-1 left-1 p-4">
        <Link
          href="/"
          className="text-white text-2xl uppercase flex items-center space-x-2"
        >
          <FaArrowLeft className="text-xl" />
          <span className="hidden lg:block text-white text-xl uppercase border-b-2 border-white pb-1">
            Volver
          </span>
        </Link>
      </header>

      <div className="bg-black bg-opacity-70 backdrop-blur-md p-8 rounded-lg shadow-lg max-w-md w-full mx-4 z-10">
        <div className="flex justify-center items-center mb-6">
          <Image
            src="/logo.png"
            alt="Logo"
            className="h-12 w-12 mr-4"
            width={48}
            height={48}
          />
          <h1 className="text-4xl text-white">CONTACTO</h1>
        </div>

        <p className="text-center text-gray-200 mb-6">
          ¿Tienes algún proyecto de fotografía en mente o una consulta? ¡No
          dudes en escribirme!
        </p>
        <p className="text-center text-gray-300 mb-6">
          Agradecería que me escribieras el número del proyecto al cual te
          refieres.
        </p>

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
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-gray-100 bg-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-gray-100 bg-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-gray-100 bg-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Tu mensaje"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Enviar mensaje
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
