import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const years = [2016, 2020, 2021, 2022, 2023, 2024];

  return (
    <main className="min-h-screen bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 flex flex-col items-center py-10">
      <h1 className="text-5xl font-extrabold mb-12 text-white text-shadow-lg">
        Mis Proyectos
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 px-6">
        {years.map((year) => (
          <Link key={year} href={`/${year}`}>
            <div className="relative group cursor-pointer rounded-xl overflow-hidden bg-white shadow-xl transform transition-all hover:scale-105 hover:shadow-2xl hover:rotate-2">
              <Image
                src={`/image/${year}/1/1.webp`}
                alt={`Proyectos de ${year}`}
                width={320}
                height={200}
                className="w-full h-full object-cover rounded-t-xl transition-all group-hover:opacity-80"
              />
              <div className="absolute inset-0 bg-black bg-opacity-25 transition-opacity group-hover:bg-opacity-50"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                <p className="text-2xl font-semibold text-white opacity-0 group-hover:opacity-100 transform transition-all group-hover:translate-y-0 translate-y-4">
                  {year}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
