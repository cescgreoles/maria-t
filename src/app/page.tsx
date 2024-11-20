"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const years = [2016, 2020, 2021, 2022, 2023, 2024];
  const backgroundImages = [
    "/image/2022/1/4.webp",
    "/image/2022/3/3.webp",
    "/image/2023/1/4.webp",
    "/image/2024/1/2.webp",
  ];

  const [currentBackground, setCurrentBackground] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentBackground((prev) => (prev + 1) % backgroundImages.length);
        setIsTransitioning(false);
      }, 1000);
    }, 5000);

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  return (
    <main className="min-h-screen flex flex-col relative">
      <div
        className={`absolute top-0 left-0 right-0 bottom-0 bg-cover bg-center transition-opacity duration-1000 ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
        style={{
          backgroundImage: `url(${backgroundImages[currentBackground]})`,
        }}
      ></div>

      <div className="flex items-center justify-between px-6 absolute top-6 left-0 right-0 w-full z-20">
        <div className="flex items-center space-x-4">
          <div className="flex flex-col">
            <h1 className="text-xl sm:text-3xl text-white">
              MARIA TORRECILLAS
            </h1>
            <p className="text-white">FOTOGRAFÍA</p>
          </div>
        </div>

        <Link
          href={"/contact"}
          className="text-white uppercase text-lg border border-white py-1 px-2 transition duration-300 ease-in-out hover:bg-white hover:bg-opacity-20 hover:text-gray-100"
        >
          Contacto
        </Link>
      </div>

      <div className="flex flex-1 justify-center items-center relative z-10">
        <div className="text-white text-4xl sm:text-6xl md:text-7xl lg:text-8xl">
          <Image
            src="/logo.png"
            alt="Logo de Proyectos"
            width={50}
            height={50}
          />
        </div>
      </div>

      <div className="flex justify-center p-4">
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
