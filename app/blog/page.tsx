import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { getAllBlogPosts } from '@/lib/data';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { BookOpen, Clock, Calendar, ArrowRight, User } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog Finansowy i Poradniki – KontoRadar',
  description: 'Eksperckie poradniki finansowe o kontach bankowych, promocjach, BLIKu i opłatach. Dowiedz się, jak założyć konto online i oszczędzać na bankowości.',
  alternates: {
    canonical: 'https://kontoradar.pages.dev/blog/',
  },
};

export default function BlogIndexPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Blog i Poradniki' }]} />

        {/* Heading */}
        <div className="my-8 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mb-3">
            <BookOpen className="w-4 h-4 text-blue-600" />
            <span>Baza Wiedzy Finansowej KontoRadar</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Poradniki, edukacja i analizy bankowe
          </h1>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
            Praktyczna wiedza finansowa bez marketingowego żargonu. Sprawdź, jak unikać opłat, jak działają promocje powitalne i jak bezpiecznie bankować przez internet.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-10">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-200 flex flex-col justify-between"
            >
              <div className="p-6 sm:p-7">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                  <span className="font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {post.read_time}
                  </span>
                </div>

                <h2 className="text-xl font-extrabold text-slate-900 tracking-tight leading-snug hover:text-blue-600 transition-colors">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>

                <p className="text-sm text-slate-600 mt-3 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              <div className="px-6 sm:px-7 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">
                  {post.date}
                </span>

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800"
                >
                  <span>Czytaj artykuł</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
