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
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Logo de Proyectos"
              width={40}
              height={40}
              className="opacity-90"
            />
          </Link>
          <h2 className="text-2xl sm:text-3xl ">{year}</h2>
        </div>
        <Link
          href={`/${year}`}
          className="text-white uppercase text-xl hover:underline "
        >
          VOLVER
        </Link>
      </div>

      <div className="relative max-w-5xl mx-auto">
        {images.length === 0 ? (
          <p className="text-center">
            No hay imágenes disponibles para este proyecto.
          </p>
        ) : (
          <div className="flex flex-col items-center">
            <div className="w-full flex justify-center items-center overflow-hidden">
              <img
                src={images[currentImageIndex]}
                alt={`Imagen ${
                  currentImageIndex + 1
                } del Proyecto ${projectId}`}
                className="max-w-full max-h-[80vh] object-scale-down"
                onClick={toggleModal}
              />
            </div>

            <div className="mt-4 text-gray-400 text-center">
              <p className="text-sm sm:text-base">{`P${projectId} - F${
                currentImageIndex + 1
              }`}</p>
            </div>

            <div className="absolute top-1/2 left-0 right-0 flex justify-between items-center px-4 sm:px-8 -translate-y-1/2">
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
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
          <img
            src={images[currentImageIndex]}
            alt={`Imagen ampliada ${currentImageIndex + 1}`}
            className="max-w-full max-h-screen object-contain"
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
