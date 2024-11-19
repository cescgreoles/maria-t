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
  const [isLoading, setIsLoading] = useState(true);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      setIsLoading(false);
    };

    fetchParams();
  }, [params]);

  if (!resolvedParams || isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-black text-white">
        <div
          className="spinner-border animate-spin inline-block w-12 h-12 border-4 border-t-4 border-white rounded-full"
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
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

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
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
          <h2 className="text-2xl sm:text-3xl ">{year}</h2>
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
              width={700}
              height={400}
              className="rounded-lg shadow-lg w-full sm:w-4/5 lg:w-3/4 h-auto mx-auto object-cover cursor-pointer"
              onClick={toggleModal}
            />
          )}
        </div>

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

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center text-sm sm:text-lg text-white">
          {currentImageIndex + 1} / {images.length}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
          <Image
            src={images[currentImageIndex]}
            alt={`Imagen ampliada ${currentImageIndex + 1}`}
            width={1920}
            height={1080}
            className="w-full h-full object-contain"
          />
          <button
            onClick={toggleModal}
            className="absolute top-5 right-5 text-white text-4xl bg-black bg-opacity-70 p-3 rounded-full hover:bg-opacity-90 transition"
          >
            &#x2715;
          </button>
        </div>
      )}
    </main>
  );
}
