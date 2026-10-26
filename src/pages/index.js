import Link from 'next/link';
import Footer from '@/components/Footer';

export default function Home({ posts }) {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 text-slate-800">
      <div className="max-w-5xl mx-auto w-full p-6 md:p-10 flex-1">
        <header className="mb-8">
          <span className="text-xs font-semibold tracking-wider text-indigo-600 uppercase bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
            Next.js SSG Demo
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold mt-3 text-slate-900 tracking-tight">
            Katalog Artikel (SSG) &bull; Kelompok 3
          </h1>
          <p className="text-slate-600 mt-2 text-base">
            Halaman ini di-generate secara statis saat build menggunakan <code className="bg-slate-200/70 text-slate-800 px-1.5 py-0.5 rounded text-sm font-mono">getStaticProps</code>. Menampilkan {posts.length} artikel.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <div 
              key={post.id} 
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md hover:border-indigo-100 transition duration-200"
            >
              <div>
                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
                  Artikel #{post.id}
                </span>
                <h2 className="text-xl font-bold mt-3 mb-2 capitalize text-slate-900 line-clamp-1">
                  {post.title}
                </h2>
                <p className="text-slate-600 text-sm line-clamp-3 mb-6 leading-relaxed">
                  {post.body}
                </p>
              </div>
              <Link 
                href={`/posts/${post.id}`} 
                className="inline-flex items-center justify-center gap-1.5 bg-indigo-600 text-white text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-indigo-700 active:scale-[0.98] transition"
              >
                Baca Selengkapnya &rarr;
              </Link>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

// FUNGSI KHUSUS SSG: Dijalankan HANYA pada saat 'npm run build'
export async function getStaticProps() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=12');
  const posts = await res.json();

  return {
    props: {
      posts,
    },
  };
}
