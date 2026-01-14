import React from "react";

export const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-slate-50">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-40 blur-3xl bg-gradient-to-tr from-indigo-200 via-pink-200 to-purple-200" />
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h1 className="text-8xl mt-6 font-extrabold tracking-tight text-gray-900">GigFlow</h1>
          <p className="mt-4 text-lg text-gray-600">
            Post gigs, bid on work, and hire securely with atomic transactions.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <a href="/gigs" className="bg-indigo-600 hover:bg-indigo-700 transition text-white px-6 py-3 rounded">
              Browse Gigs
            </a>
            <a href="/gigs/create" className="bg-gray-900 hover:bg-black transition text-white px-6 py-3 rounded">
              Post a Gig
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
