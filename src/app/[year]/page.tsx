"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

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

  return (
    <main className="container mx-auto py-10 px-4 sm:px-6 lg:px-8 bg-black text-white">
      <div className="flex justify-between items-center mb-10 flex-wrap">
        <div className="flex items-center space-x-4">
          <Image
            src="/logo.png"
            alt="Logo de Proyectos"
            width={40}
            height={40}
            className="opacity-90"
          />
          <h2 className="text-3xl font-semibold">{year}</h2>
        </div>

        <div>
          <Link
            href="/"
            className="text-white uppercase text-lg hover:underline"
          >
            VOLVER
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {[...Array(projectCount)].map((_, index) => (
          <div key={index + 1} className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex justify-center">
                <Link href={`/${year}/${index + 1}`}>
                  <div className="relative w-[300px] h-[200px] overflow-hidden">
                    <Image
                      src={`/image/${year}/${index + 1}/1.webp`}
                      alt={`Imagen principal del proyecto ${index + 1}`}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
                    />
                  </div>
                </Link>
              </div>

              <div className="text-right">
                <p className="text-lg">P{String(index + 1).padStart(2, "0")}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
