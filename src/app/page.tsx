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

      <div className="flex flex-col justify-center items-center z-10 text-white mt-32 px-6 flex-grow">
        <p className="text-lg sm:text-xl font-light text-center max-w-3xl">
          Este es un espacio donde podrás explorar los proyectos más destacados
          de María Torrecillas. Un lugar para la innovación, creatividad y
          soluciones únicas.
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
          <h1 className="text-xl sm:text-3xl font-extrabold text-white">
            MARIA TORRECILLAS
          </h1>
        </div>

        <Link
          href="/contacto"
          className="text-white uppercase text-lg hover:underline"
        >
          CONTACTO
        </Link>
      </div>

      <div className="flex justify-center px-6 mt-32 pb-10 flex-grow">
        <div className="flex flex-wrap justify-center gap-6 w-full max-w-screen-xl">
          {years.map((year) => (
            <Link key={year} href={`/${year}`}>
              <div className="relative group cursor-pointer rounded-lg overflow-hidden bg-gray-800 shadow-lg transform transition-all hover:scale-105 hover:shadow-xl w-28 sm:w-36 md:w-40">
                <div className="relative w-full h-32 sm:h-36 md:h-40">
                  <Image
                    src={`/image/${year}/1/1.webp`}
                    alt={`Proyectos de ${year}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                    style={{ objectFit: "cover" }}
                    className="transition-opacity group-hover:opacity-90"
                  />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-20 transition-opacity group-hover:bg-opacity-40"></div>
                <div className="absolute bottom-0 left-0 right-0 p-2 text-center">
                  <p className="text-lg font-semibold text-white">{year}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
