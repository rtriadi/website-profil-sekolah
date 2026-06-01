import { getTourSettings } from "@/lib/content/tour-service";
import { TourViewer } from "@/components/tour-viewer";

export default async function VirtualTourPage() {
  const settings = getTourSettings();

  return (
    <>
      <section className="border-b border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <h1 className="text-center text-3xl font-bold text-white">
            Virtual Tour 360
          </h1>
          <p className="mt-2 text-center text-slate-300">
            Jelajahi lingkungan sekolah secara virtual
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          {settings.imageUrl ? (
            <TourViewer imageUrl={settings.imageUrl} title={settings.title} />
          ) : (
            <div className="rounded-lg border-2 border-dashed border-slate-300 p-16 text-center">
              <p className="text-slate-500">Belum ada gambar panorama 360.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
