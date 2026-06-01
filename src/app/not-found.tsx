import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-8">
        <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
          <span className="text-5xl font-bold text-blue-600 dark:text-blue-400">
            404
          </span>
        </div>
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Halaman Tidak Ditemukan
        </h1>
        <p className="mx-auto max-w-md text-gray-600 dark:text-gray-400">
          Halaman yang Anda cari mungkin telah dipindahkan, dihapus, atau tidak
          tersedia. Silakan periksa kembali URL atau kembali ke beranda.
        </p>
      </div>
      <div className="flex gap-4">
        <Link
          href="/"
          className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
