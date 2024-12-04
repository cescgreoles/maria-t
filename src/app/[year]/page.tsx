"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function YearProjects() {
  const { year } = useParams() as { year: string };

  const yearProjects: Record<string, number> = {
    "2016": 3,
    "2020": 2,
    "2021": 9,
    "2022": 5,
    "2023": 2,
    "2024": 8,
  };

  const projectCount = year && yearProjects[year] ? yearProjects[year] : 0;

  useEffect(() => {
    const preloadImages = (urls: string[]) => {
      urls.forEach((url) => {
        const img = new window.Image();
        img.src = url;
      });
    };

    const allImageUrls = Array.from(
      { length: projectCount },
      (_, index) => `/image/${year}/${index + 1}/1.webp`
    );
    preloadImages(allImageUrls);
  }, [year, projectCount]);

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

          <h2 className="text-2xl sm:text-3xl">{year}</h2>
        </div>

        <div className="">
          <Link
            href="/projects"
            className="text-white uppercase text-xl hover:underline"
          >
            VOLVER
          </Link>
        </div>
      </div>

      <div className="flex flex-col justify-center ">
        <p className="text-gray-400 pt-4 pb-6 text-lg sm:text-xl">
          Selecciona un proyecto para ver más
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10">
          {[...Array(projectCount)].map((_, index) => (
            <Link key={index + 1} href={`/${year}/${index + 1}`}>
              <div className="relative group flex flex-row sm:flex-row sm:justify-between gap-3">
                <p className="text-2xl sm:text-3xl mb-4 sm:mb-0">
                  P{String(index + 1).padStart(2, "0")}
                </p>

                <Image
                  src={`/image/${year}/${index + 1}/1.webp`}
                  alt={`Proyecto ${index + 1} de ${year}`}
                  width={300}
                  height={300}
                  className="rounded-lg transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
