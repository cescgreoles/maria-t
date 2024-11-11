"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

type ProjectPageProps = {
  params: {
    year: string;
    projectId: string;
  };
};

export default function ProjectPage({ params }: ProjectPageProps) {
  const [resolvedParams, setResolvedParams] = useState<{
    year: string;
    projectId: string;
  } | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchParams = async () => {
      const resolved = await params;
      setResolvedParams(resolved);
    };

    fetchParams();
  }, [params]);

  if (!resolvedParams) {
    return <div>Loading...</div>;
  }

  const { year, projectId } = resolvedParams;

  const projectImages: Record<string, Record<string, number>> = {
    "2016": { "1": 5, "2": 3, "3": 4 },
    "2020": { "1": 4, "2": 6, "3": 3 },
    "2021": {
      "1": 4,
      "2": 4,
      "3": 5,
      "4": 8,
      "5": 6,
      "6": 6,
      "7": 5,
      "8": 3,
      "9": 5,
    },
    "2022": { "1": 4, "2": 4, "3": 3, "4": 3, "5": 4 },
    "2023": { "1": 5, "2": 4 },
    "2024": { "1": 5, "2": 2, "3": 3, "4": 6, "5": 3, "6": 4, "7": 3, "8": 3 },
  };

  const projectImageCount = projectImages[year]?.[projectId] || 0;

  if (projectImageCount === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-3xl font-semibold">No hay imágenes disponibles</h2>
        <Link href={`/${year}`} className="text-blue-500 hover:underline">
          Volver a los proyectos del año {year}
        </Link>
      </div>
    );
  }

  const images = Array.from(
    { length: projectImageCount },
    (_, index) => `${index + 1}.webp`
  );

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <main className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-6 flex-wrap">
        <div className="flex items-center space-x-4 mb-4 sm:mb-0">
          <Image
            src="/logo.png"
            alt="Logo de Proyectos"
            width={40}
            height={40}
            className="opacity-90"
          />
          <h2 className="text-3xl font-semibold text-white">
            {year} - P-{projectId}
          </h2>
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

      {/* Imagen actual */}
      <div className="relative mb-10">
        <div className="flex justify-center">
          <Image
            src={`/image/${year}/${projectId}/${images[currentIndex]}`}
            alt={`Imagen ${currentIndex + 1} del proyecto ${projectId}`}
            width={600}
            height={400}
            className="rounded-lg cursor-pointer"
            onClick={openModal} // Activar modal al hacer clic
          />
        </div>

        {/* Botones de navegación */}
        <button
          onClick={goToPrevious}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black text-white p-2 rounded-full md:p-3 md:text-2xl"
        >
          {"<"}
        </button>
        <button
          onClick={goToNext}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black text-white p-2 rounded-full md:p-3 md:text-2xl"
        >
          {">"}
        </button>
      </div>

      {/* Modal para imagen en pantalla completa */}
      {isModalOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center z-50"
          onClick={closeModal} // Cerrar al hacer clic fuera de la imagen
        >
          <Image
            src={`/image/${year}/${projectId}/${images[currentIndex]}`}
            alt={`Imagen ${currentIndex + 1} del proyecto ${projectId}`}
            width={1200}
            height={800}
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
    </main>
  );
}
