import Link from 'next/link';
import Footer from '@/components/Footer';

export default function PostDetail({ post, author }) {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 text-slate-800">
      <div className="max-w-3xl mx-auto w-full p-6 md:p-10 flex-1">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 text-sm font-medium mb-6 transition"
        >
          &larr; Kembali ke Katalog
        </Link>

        {/* Kartu Artikel */}
        <article className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100">
          <div className="border-b border-slate-100 pb-5 mb-6">
            <span className="bg-indigo-50 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full border border-indigo-100">
              Artikel #{post.id}
            </span>
            <h1 className="text-2xl md:text-3xl font-bold mt-3 text-slate-900 capitalize leading-snug">
              {post.title}
            </h1>
          </div>

          <p className="text-slate-600 leading-relaxed text-base md:text-lg">
            {post.body}
          </p>

          {/* Bagian Informasi Penulis (Author Info) */}
          {author && (
            <div className="mt-8 pt-6 border-t border-slate-100">
              <h2 className="text-sm font-semibold tracking-wider text-slate-400 uppercase mb-4">
                Informasi Penulis
              </h2>
              <div className="bg-slate-50/80 rounded-xl p-5 border border-slate-200/60 flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{author.name}</h3>
                  <p className="text-sm text-slate-500 mt-0.5 flex items-center gap-1.5">
                    <span>Email:</span>
                    <a href={`mailto:${author.email}`} className="text-indigo-600 hover:underline">
                      {author.email}
                    </a>
                  </p>
                </div>
                <div className="sm:text-right border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-200/60">
                  <span className="text-xs text-slate-400 block">Perusahaan</span>
                  <span className="text-sm font-semibold text-slate-700">
                    {author.company?.name || '-'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </article>
      </div>

      <Footer />
    </div>
  );
}

// 1. Menentukan ID artikel mana saja yang dibuatkan halaman statis saat build
export async function getStaticPaths() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=12');
  const posts = await res.json();

  const paths = posts.map((post) => ({
    params: { id: post.id.toString() },
  }));

  return {
    paths,
    fallback: false, // Jika ID tidak terdaftar, tampilkan 404
  };
}

// 2. Fetch data detail artikel & data penulis berdasarkan userId
export async function getStaticProps({ params }) {
  const postRes = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`);
  const post = await postRes.json();

  // Fetch data author berdasarkan post.userId
  const userRes = await fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`);
  const author = await userRes.json();

  return {
    props: {
      post,
      author,
    },
  };
}
