import { useEffect, useState } from "react";
import api from "../../api/axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const GigList = () => {
  const [gigs, setGigs] = useState([]);
  const [search, setSearch] = useState("");
  const user = useSelector((state) => state.auth.user);

  const fetchGigs = async () => {
    const res = await api.get(`/gigs?search=${search}`);
    setGigs(res.data);
  };

  useEffect(() => {
    fetchGigs();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Available Gigs</h1>
        <Link
          to="/gigs/create"
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Post a Gig
        </Link>
      </div>

      <input
        className="w-full border p-2 mb-6 rounded"
        placeholder="Search gigs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyUp={fetchGigs}
      />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {gigs.map((gig) => {
          const isOwner = String(gig.ownerId) === String(user?.id);

          return (
            <div
              key={gig._id}
              className="border rounded-lg p-4 h-48 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-sm font-semibold line-clamp-2">{gig.title}</h3>
                <p className="text-xs text-gray-600 mt-1 line-clamp-2">{gig.description}</p>
                <p className="mt-1 text-sm font-medium">₹{gig.budget}</p>
                <p className="text-xs text-gray-600">
                  Posted by: {gig.ownerName || gig.ownerId?.name || "Unknown"}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-700">
                  {gig.bidCount} bids
                </span>
                {isOwner ? (
                  gig.bidCount > 0 ? (
                    <Link
                      to={`/gigs/${gig._id}/bids`}
                      className="text-xs bg-gray-800 text-white px-3 py-1 rounded"
                    >
                      View Bids
                    </Link>
                  ) : (
                    <span className="text-xs text-gray-500">No bids yet</span>
                  )
                ) : (
                  <Link
                    to={`/gigs/${gig._id}`}
                    className="text-xs bg-indigo-600 text-white px-3 py-1 rounded"
                  >
                    Bid Now
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GigList;
