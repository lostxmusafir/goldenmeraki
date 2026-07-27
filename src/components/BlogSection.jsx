import React, { useState } from 'react';
import { BookOpen, ArrowRight, X, Clock, User } from 'lucide-react';
import { BLOG_POSTS } from '../data/products';

export const BlogSection = () => {
  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <section className="py-16 bg-violet-50/50 border-b border-violet-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-violet-200 text-violet-900 text-xs font-extrabold uppercase tracking-wider mb-2">
              <BookOpen className="w-3.5 h-3.5 text-violet-700" />
              <span>Crystal Science & Vedic Wisdom</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-indigo-950 font-heading">
              Holistic Healing Guides & Journal
            </h2>
          </div>

          <span className="text-xs text-slate-500 font-medium">
            Written by certified gemologists & astro-vastu experts
          </span>
        </div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="group cursor-pointer bg-white rounded-3xl overflow-hidden border border-violet-100 shadow-sm hover:shadow-xl hover:border-violet-300 transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-video overflow-hidden bg-violet-100">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-violet-800 text-[10px] font-extrabold">
                  {post.category}
                </span>
              </div>

              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-3 text-[10px] text-slate-400 mb-2">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-violet-500" />
                      <span>{post.readTime}</span>
                    </span>
                    <span>•</span>
                    <span>{post.date}</span>
                  </div>

                  <h3 className="font-bold text-sm text-indigo-950 group-hover:text-violet-700 transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-500 mt-2 line-clamp-2">
                    {post.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-violet-100 flex items-center justify-between text-xs font-bold text-violet-700 group-hover:text-violet-900">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Blog Article Reader Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-indigo-950/40 backdrop-blur-md animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-violet-100 flex flex-col max-h-[85vh]">
            
            <div className="p-4 bg-violet-50 border-b border-violet-100 flex items-center justify-between">
              <span className="text-xs font-bold text-violet-700 uppercase tracking-wider">
                {selectedPost.category}
              </span>
              <button
                onClick={() => setSelectedPost(null)}
                className="p-1 rounded-full hover:bg-violet-100 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              <img
                src={selectedPost.image}
                alt={selectedPost.title}
                className="w-full h-48 object-cover rounded-2xl border border-violet-100"
              />
              <h3 className="text-xl font-extrabold text-indigo-950">
                {selectedPost.title}
              </h3>

              <div className="flex items-center space-x-2 text-xs text-slate-500 border-y border-violet-100 py-2">
                <User className="w-4 h-4 text-violet-600" />
                <span>{selectedPost.author}</span>
                <span>•</span>
                <span>{selectedPost.date}</span>
              </div>

              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3">
                <p>{selectedPost.summary}</p>
                <p>
                  Natural crystals function as vibrational amplifiers. When exposed to lunar radiation during full moon nights, the electromagnetic matrix inside quartz and silicate structures resets to zero-point frequency.
                </p>
                <p>
                  Place your natural Pyrite, Amethyst, and 7 Chakra bracelets on a clean selenite plate or raw wood surface outdoors from sunset to sunrise to restore maximum energetic potency.
                </p>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
