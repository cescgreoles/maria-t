"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ProjectPage({
  params,
}: {
  params: Promise<{ year: string; projectId: string }>;
}) {
  const [resolvedParams, setResolvedParams] = useState<{
    year: string;
    projectId: string;
  } | null>(null);

  const [images, setImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const checkImageExists = async (imagePath: string) => {
    try {
      const response = await fetch(imagePath, { method: "HEAD" });
      return response.ok;
    } catch (error) {
      console.error(`Error al comprobar imagen ${imagePath}:`, error);
      return false;
    }
  };

  useEffect(() => {
    const fetchParams = async () => {
      const unwrappedParams = await params;
      setResolvedParams(unwrappedParams);

      const { year, projectId } = unwrappedParams;
      const loadedImages: string[] = [];

      let i = 1;
      while (true) {
        const imagePath = `/image/${year}/${projectId}/${i}.webp`;
        const imageExists = await checkImageExists(imagePath);

        if (!imageExists) {
          break;
        }
        loadedImages.push(imagePath);
        i++;
      }

      setImages(loadedImages);
    };

    fetchParams();
  }, [params]);

  if (!resolvedParams) {
    return <div>Loading...</div>;
  }

  const { projectId, year } = resolvedParams;

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

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
          <h2 className="text-2xl sm:text-3xl font-semibold">{year}</h2>
        </div>
        <Link
          href={`/${year}`}
          className="text-white uppercase text-lg hover:underline mt-4 sm:mt-0"
        >
          VOLVER
        </Link>
      </div>

      <div className="relative max-w-5xl mx-auto mb-10">
        <div className="flex justify-center items-center">
          {images.length === 0 ? (
            <p className="text-center">
              No hay imágenes disponibles para este proyecto.
            </p>
          ) : (
            <Image
              src={images[currentImageIndex]}
              alt={`Imagen ${currentImageIndex + 1} del Proyecto ${projectId}`}
              width={700} // Fixed width
              height={400} // Fixed height
              className="rounded-lg shadow-lg w-full sm:w-4/5 lg:w-3/4 h-auto mx-auto object-cover" // Ensure image fills container properly
            />
          )}
        </div>

        {/* Botones de navegación del carrusel */}
        <div className="absolute top-1/2 left-0 right-0 flex justify-between px-4 sm:px-8">
          <button
            onClick={prevImage}
            className="text-white text-2xl bg-black bg-opacity-50 p-3 rounded-full hover:bg-opacity-75 transition"
          >
            &#60;
          </button>
          <button
            onClick={nextImage}
            className="text-white text-2xl bg-black bg-opacity-50 p-3 rounded-full hover:bg-opacity-75 transition"
          >
            &#62;
          </button>
        </div>

        {/* Indicador de posición del carrusel */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center text-sm sm:text-lg text-white">
          {currentImageIndex + 1} / {images.length}
        </div>

        {/* Información de Año, Proyecto y Diapositiva en la esquina inferior derecha */}
        <div className="absolute bottom-3 right-4 text-white text-right fle flex-col items-center justify-center">
          <p className="text-lg sm:text-xl font-semibold">{year}</p>
          <p className="text-xs sm:text-sm opacity-80">
            P{projectId} - {currentImageIndex + 1}
          </p>
        </div>
      </div>
    </main>
  );
}
