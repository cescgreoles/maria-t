"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const years = [2016, 2020, 2021, 2022, 2023, 2024];
  const backgroundImages = ["/image/2016/1/1.webp", "/image/2016/1/2.webp"];

  const [currentBackground, setCurrentBackground] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBackground((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  return (
    <main className="min-h-screen flex flex-col relative">
      <div
        className="absolute top-0 left-0 right-0 bottom-0 bg-cover bg-center transition-all"
        style={{
          backgroundImage: `url(${backgroundImages[currentBackground]})`,
        }}
      ></div>

      <div className="flex flex-col z-10 text-white mt-32 px-6 flex-grow">
        <p className="text-lg sm:text-xl font-light  max-w-3xl text-justify italic">
          &quot;Elijo elementos de la naturaleza que por cualquier motivo atraen
          mi interés, escogiendo lo que a menudo nos pasa desapercibido. Para
          sorprender al espectador, hay que transportarlo a un universo
          imaginario, a otro espacio donde redescubra su mirada. Que pueda ver
          de otra manera elementos que siempre han estado allí, que descubra la
          luz y la sombra sobre pequeños detalles que pasan desapercibidos y se
          conviertan en elementos esenciales&quot;
        </p>
      </div>

      <div className="flex items-center justify-between px-6 absolute top-6 left-0 right-0 z-10 w-full">
        <div className="flex items-center space-x-4">
          <Image
            src="/logo.png"
            alt="Logo de María Torrecillas"
            width={40}
            height={40}
            style={{ width: "auto", height: "auto" }}
          />
          <div className="flex flex-col">
            <h1 className="text-xl sm:text-3xl font-extrabold text-white">
              MARIA TORRECILLAS
            </h1>
            <p className="text-white">FOTOGRAFÍA</p>
          </div>
        </div>

        <Link
          href="/contacto"
          className="text-white uppercase text-lg border border-white py-1 px-2 transition duration-300 ease-in-out hover:bg-white hover:bg-opacity-20 hover:text-gray-100"
        >
          Contacto
        </Link>
      </div>

      <div className="flex justify-center mt-32 p-4">
        <div className="flex flex-wrap justify-center gap-3 w-full max-w-screen-xl">
          {years.map((year) => (
            <Link key={year} href={`/${year}`}>
              <div className="relative group cursor-pointer overflow-hidden bg-gray-800 shadow-lg transform transition-all hover:scale-105 hover:shadow-xl w-24 sm:w-28 md:w-32 lg:w-36">
                <div className="relative w-full h-24 sm:h-28 md:h-32 lg:h-36">
                  <Image
                    src={`/image/${year}/1/1.webp`}
                    alt={`Proyectos de ${year}`}
                    fill
                    sizes="(max-width: 150px) 60vw, (max-width: 150px) 30vw, 33vw"
                    style={{ objectFit: "cover" }}
                    className="transition-opacity group-hover:opacity-90"
                  />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-20 transition-opacity group-hover:bg-opacity-40"></div>

                <div className="absolute bottom-0 left-0 right-0 p-2 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-lg text-white">{year}</p>
                </div>

                <div
                  className={`absolute inset-0 border-2 border-transparent group-hover:border-white transition-all duration-300`}
                ></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
