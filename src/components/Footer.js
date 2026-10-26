export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 bg-white/80 backdrop-blur py-6 mt-12 text-center text-sm text-slate-500">
      <div className="max-w-4xl mx-auto px-4 space-y-1">
        <p className="font-semibold text-slate-700">
          Katalog Artikel SSG &bull; Kelompok 3
        </p>
        <p className="text-xs text-slate-400">
          &copy; {new Date().getFullYear()} Kelompok 3. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
