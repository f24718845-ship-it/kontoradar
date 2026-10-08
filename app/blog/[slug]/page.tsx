import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { getAllBlogPosts, getBlogPostBySlug } from '@/lib/data';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Clock, Calendar, User, ArrowLeft, ArrowRight, Scale, ShieldCheck } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return { title: 'Artykuł nie znaleziony | KontoRadar' };
  }

  return {
    title: `${post.title} | Blog KontoRadar`,
    description: post.excerpt,
    alternates: {
      canonical: `https://kontoradar.pages.dev/blog/${post.slug}/`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      url: `https://kontoradar.pages.dev/blog/${post.slug}/`,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = getAllBlogPosts();
  const relatedPosts = allPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    author: {
      '@type': 'Organization',
      name: post.author,
      url: 'https://kontoradar.pages.dev',
    },
    publisher: {
      '@type': 'Organization',
      name: 'KontoRadar',
      logo: {
        '@type': 'ImageObject',
        url: 'https://kontoradar.pages.dev/logo.svg',
      },
    },
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://kontoradar.pages.dev/blog/${post.slug}/`,
    },
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Blog', href: '/blog' },
            { label: post.title },
          ]}
        />

        {/* Article Container */}
        <article className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-12 shadow-sm my-8">
          {/* Header Metadata */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mb-4">
            <span className="font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">
              {post.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {post.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.read_time}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5" />
              {post.author}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            {post.title}
          </h1>

          <p className="text-lg text-slate-600 font-medium leading-relaxed mt-6 pb-6 border-b border-slate-100">
            {post.excerpt}
          </p>

          {/* Article Body */}
          <div className="mt-8 space-y-6 text-slate-800 leading-relaxed text-base sm:text-lg">
            {post.content.map((block, idx) => {
              if (block.type === 'h2') {
                return (
                  <h2
                    key={idx}
                    className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight pt-6 mt-6 border-t border-slate-100"
                  >
                    {block.text}
                  </h2>
                );
              }
              if (block.type === 'h3') {
                return (
                  <h3 key={idx} className="text-xl font-bold text-slate-900 pt-4">
                    {block.text}
                  </h3>
                );
              }
              return (
                <p key={idx} className="text-slate-700 whitespace-pre-line leading-relaxed">
                  {block.text}
                </p>
              );
            })}
          </div>

          {/* Callout box linking to ranking */}
          <div className="my-10 p-6 sm:p-8 rounded-2xl bg-gradient-to-tr from-blue-50 via-slate-50 to-emerald-50 border border-blue-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">
                Szukasz najlepszego konta?
              </span>
              <h3 className="text-xl font-extrabold text-slate-900 mt-1">
                Sprawdź aktualny Ranking Kont Osobistych
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Porównaj opłaty, darmowe bankomaty i odbierz nawet do 2700 zł premii.
              </p>
            </div>
            <Link
              href="/ranking-kont-bankowych"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md transition-all shrink-0"
            >
              <Scale className="w-4 h-4" />
              <span>Zobacz ranking &rarr;</span>
            </Link>
          </div>
        </article>

        {/* Related Articles */}
        <div className="my-12">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-6">
            Przeczytaj również:
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((rel) => (
              <Link
                key={rel.slug}
                href={`/blog/${rel.slug}`}
                className="bg-white p-5 rounded-2xl border border-slate-200 hover:shadow-md transition-all block group"
              >
                <span className="text-xs font-bold text-blue-600 uppercase">{rel.category}</span>
                <h3 className="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors mt-2">
                  {rel.title}
                </h3>
                <span className="text-xs text-slate-400 mt-3 block">{rel.read_time}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
