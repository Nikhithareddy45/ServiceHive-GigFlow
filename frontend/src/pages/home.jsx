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

      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 border rounded hover:shadow-sm transition">
            <div className="text-3xl">🔐</div>
            <h3 className="text-xl font-semibold mt-2">Secure Auth</h3>
            <p className="mt-2 text-gray-600">JWT with HttpOnly cookies keeps sessions protected.</p>
          </div>
          <div className="p-6 border rounded hover:shadow-sm transition">
            <div className="text-3xl">⚙️</div>
            <h3 className="text-xl font-semibold mt-2">Atomic Hiring</h3>
            <p className="mt-2 text-gray-600">MongoDB transactions ensure only one freelancer is hired.</p>
          </div>
          <div className="p-6 border rounded hover:shadow-sm transition">
            <div className="text-3xl">⚡</div>
            <h3 className="text-xl font-semibold mt-2">Real-time Ready</h3>
            <p className="mt-2 text-gray-600">Socket.io can notify hires instantly on dashboards.</p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12 text-center">
        <p className="text-gray-500">
          Built with React + Vite, Tailwind CSS, Express.js, and MongoDB.
        </p>
      </section>
    </div>
  );
}
