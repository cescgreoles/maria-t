"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// Suponiendo que `params` es una promesa
export default function ProjectPage({
  params,
}: {
  params: Promise<{ year: string; projectId: string }>;
}) {
  const [resolvedParams, setResolvedParams] = useState<{
    year: string;
    projectId: string;
  } | null>(null);

  // Lista de imágenes del proyecto
  const [images, setImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Estado para el índice de la imagen actual

  // Función para comprobar si la imagen existe
  const checkImageExists = async (imagePath: string) => {
    try {
      const response = await fetch(imagePath, {
        method: "HEAD", // Solo solicitamos los encabezados para no descargar la imagen completa
      });

      console.log(`Comprobando ${imagePath}:`, response.status);

      return response.ok; // Si la respuesta es 200, la imagen existe
    } catch (error) {
      console.error(`Error al comprobar imagen ${imagePath}:`, error);
      return false; // Si ocurre algún error, asumimos que la imagen no existe
    }
  };

  // Usamos useEffect para "desenvolver" la promesa y guardar los valores
  useEffect(() => {
    const fetchParams = async () => {
      const unwrappedParams = await params; // Desenvolvemos la promesa
      setResolvedParams(unwrappedParams); // Guardamos los valores resueltos

      const { year, projectId } = unwrappedParams;
      const loadedImages: string[] = [];

      let i = 1;
      while (true) {
        const imagePath = `/image/${year}/${projectId}/${i}.webp`;

        // Comprobamos si la imagen existe
        const imageExists = await checkImageExists(imagePath);

        console.log(`Verificando imagen: ${imagePath}, existe: ${imageExists}`);

        if (!imageExists) {
          break; // Si no existe la imagen, salimos del bucle
        }

        loadedImages.push(imagePath);
        i++;
      }

      // Actualizamos el estado con las imágenes cargadas
      setImages(loadedImages);
    };

    fetchParams();
  }, [params]);

  // Mientras `resolvedParams` no tenga valores, mostramos un "loading"
  if (!resolvedParams) {
    return <div>Loading...</div>;
  }

  // Ya podemos acceder a `year` y `projectId` de manera segura
  const { year, projectId } = resolvedParams;

  // Función para navegar entre las imágenes
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length); // Avanzar a la siguiente imagen
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    ); // Volver a la imagen anterior
  };

  return (
    <main className="text-white">
      <h1 className="text-3xl font-bold mb-4">
        Proyecto {projectId} de {year}
      </h1>

      {/* Carousel */}
      <div className="relative">
        <div className="flex justify-center items-center">
          {/* Imagen principal */}
          {images.length === 0 ? (
            <p>No hay imágenes disponibles para este proyecto.</p>
          ) : (
            <Image
              src={images[currentImageIndex]}
              alt={`Imagen ${currentImageIndex + 1} del Proyecto ${projectId}`}
              width={800} // Ajusta el tamaño según lo necesites
              height={500} // Ajusta el tamaño según lo necesites
              className="rounded-lg shadow-lg"
            />
          )}
        </div>

        {/* Controles de navegación */}
        <div className="absolute top-1/2 left-0 right-0 flex justify-between px-4">
          <button
            onClick={prevImage}
            className="text-white text-2xl bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition"
          >
            &#60;
          </button>
          <button
            onClick={nextImage}
            className="text-white text-2xl bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition"
          >
            &#62;
          </button>
        </div>

        {/* Indicador de la imagen */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center text-lg text-white">
          {currentImageIndex + 1} / {images.length}
        </div>
      </div>
    </main>
  );
}
