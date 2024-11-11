import Image from "next/image";
import Link from "next/link";

type ProjectPageProps = {
  params: {
    year: string;
    projectId: string;
  };
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  // Esperar a que los parámetros estén disponibles
  const { year, projectId } = params;

  // Definir el número de imágenes por proyecto
  const projectImages: Record<string, Record<string, number>> = {
    "2016": {
      "1": 5, // Proyecto 1 del año 2016 tiene 5 imágenes
      "2": 3, // Proyecto 2 del año 2016 tiene 3 imágenes
      "3": 4, // Proyecto 3 del año 2016 tiene 4 imágenes
    },
    "2020": {
      "1": 4, // Proyecto 1 del año 2020 tiene 2 imágenes
      "2": 6, // Proyecto 2 del año 2020 tiene 3 imágenes
      "3": 3, // Proyecto 3 del año 2020 tiene 4 imágenes
    },
    "2021": {
      "1": 4, // Proyecto 1 del año 2021 tiene 4 imágenes
      "2": 4, // Proyecto 2 del año 2021 tiene 2 imágenes
      "3": 5, // Proyecto 3 del año 2021 tiene 5 imágenes
      "4": 8, // Proyecto 4 del año 2021 tiene 3 imágenes
      "5": 6, // Proyecto 5 del año 2021 tiene 4 imágenes
      "6": 6, // Proyecto 6 del año 2021 tiene 5 imágenes
      "7": 5, // Proyecto 7 del año 2021 tiene 4 imágenes
      "8": 3, // Proyecto 8 del año 2021 tiene 3 imágenes
      "9": 5, // Proyecto 9 del año 2021 tiene 2 imágenes
    },
    "2022": {
      "1": 4, // Proyecto 1 del año 2022 tiene 3 imágenes
      "2": 4, // Proyecto 2 del año 2022 tiene 4 imágenes
      "3": 3, // Proyecto 3 del año 2022 tiene 5 imágenes
      "4": 3, // Proyecto 4 del año 2022 tiene 4 imágenes
      "5": 4, // Proyecto 5 del año 2022 tiene 3 imágenes
    },
    "2023": {
      "1": 5, // Proyecto 1 del año 2023 tiene 2 imágenes
      "2": 4, // Proyecto 2 del año 2023 tiene 3 imágenes
    },
    "2024": {
      "1": 5, // Proyecto 1 del año 2024 tiene 5 imágenes
      "2": 2, // Proyecto 2 del año 2024 tiene 4 imágenes
      "3": 3, // Proyecto 3 del año 2024 tiene 3 imágenes
      "4": 6, // Proyecto 4 del año 2024 tiene 2 imágenes
      "5": 3, // Proyecto 5 del año 2024 tiene 3 imágenes
      "6": 4, // Proyecto 6 del año 2024 tiene 4 imágenes
      "7": 3, // Proyecto 7 del año 2024 tiene 5 imágenes
      "8": 3, // Proyecto 8 del año 2024 tiene 4 imágenes
    },
  };

  // Obtener el número de imágenes del proyecto actual
  const projectImageCount = projectImages[year]?.[projectId] || 0;

  // Si no hay imágenes disponibles para este proyecto, mostrar un mensaje de error
  if (projectImageCount === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-3xl font-semibold">No hay imágenes disponibles</h2>
        <Link href={`/${year}`} className="text-blue-500 hover:underline">
          Regresar a los proyectos del año {year}
        </Link>
      </div>
    );
  }

  // Crear las rutas de las imágenes dinámicamente
  const images = Array.from(
    { length: projectImageCount },
    (_, index) => `${index + 1}.webp`
  );

  return (
    <main className="container mx-auto py-10">
      <h2 className="text-3xl font-semibold text-center mb-10">
        Proyecto {projectId} del Año {year}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {images.map((image, index) => (
          <div key={index} className="flex justify-center">
            <Image
              src={`/image/${year}/${projectId}/${index + 1}.webp`} // Ruta dinámica de las imágenes
              alt={`Imagen ${index + 1} del proyecto ${projectId}`}
              width={300}
              height={200}
              className="rounded-lg"
            />
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link href={`/${year}`} className="text-blue-500 hover:underline">
          Regresar a los proyectos del año {year}
        </Link>
      </div>
    </main>
  );
}
