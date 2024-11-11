import Image from "next/image";
import Link from "next/link";

type YearProjectsProps = {
  params: {
    year: string;
  };
};

export default async function YearProjects({ params }: YearProjectsProps) {
  // Esperar a que los parámetros estén disponibles
  const { year } = await params;

  // Mapeo del número de proyectos por cada año actualizado
  const yearProjects: Record<string, number> = {
    "2016": 3, // Año 2016 tiene 3 proyectos
    "2020": 2, // Año 2020 tiene 2 proyectos
    "2021": 9, // Año 2021 tiene 9 proyectos
    "2022": 5, // Año 2022 tiene 5 proyectos
    "2023": 2, // Año 2023 tiene 2 proyectos
    "2024": 8, // Año 2024 tiene 8 proyectos
  };

  // Obtener el número de proyectos para el año actual
  const projectCount = yearProjects[year] || 0;

  return (
    <main className="container mx-auto py-10">
      <h2 className="text-3xl font-semibold text-center mb-10">
        Proyectos del Año {year}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {[...Array(projectCount)].map((_, index) => (
          <div key={index + 1} className="space-y-4">
            <h3 className="text-xl font-medium">Proyecto {index + 1}</h3>
            <div className="flex justify-center">
              {/* Cambiar la ruta de los enlaces aquí para que no incluya '/proyecto/' */}
              <Link href={`/${year}/${index + 1}`}>
                <Image
                  src={`/image/${year}/${index + 1}/1.webp`} // Ruta de la primera imagen de cada proyecto
                  alt={`Imagen principal del proyecto ${index + 1}`}
                  width={300}
                  height={200}
                  className="rounded-lg"
                />
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link href="/" className="text-blue-500 hover:underline">
          Regresar a la página principal
        </Link>
      </div>
    </main>
  );
}
