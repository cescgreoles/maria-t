"use client";

import Image from "next/image";
import Link from "next/link";

export default function YearProjects() {
  const years = [2019, 2020, 2021, 2022, 2023, 2024];

  return (
    <main className="container mx-auto py-10 px-4 sm:px-6 lg:px-8 bg-black text-white">
      <div className="flex justify-between items-center flex-wrap sm:flex-nowrap">
        <div className="flex items-center space-x-4">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Logo de Proyectos"
              width={40}
              height={40}
              className="opacity-90"
            />
          </Link>
          <h2 className="text-2xl sm:text-3xl">PROYECTOS</h2>
        </div>

        <div className="flex items-center">
          <Link
            href="/"
            className="text-white  text-xl uppercase  hover:underline"
          >
            VOLVER
          </Link>
        </div>
      </div>

      <div className="flex flex-col justify-center  ">
        <p className="text-gray-400 pt-4 pb-6 text-lg sm:text-xl">
          Selecciona un año para ver los proyectos realizados
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10">
          {years.map((year) => (
            <Link key={year} href={`/${year}`}>
              <div className="relative group flex flex-row sm:flex-row sm:justify-between gap-3">
                <p className="text-2xl sm:text-3xl sm:mb-0">{year}</p>
                <Image
                  src={`/image/${year}/1/1.webp`}
                  alt={`Proyectos de ${year}`}
                  width={300}
                  height={300}
                  className="transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
                  style={{
                    objectFit: "cover",
                    objectPosition: "center center",
                  }}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
