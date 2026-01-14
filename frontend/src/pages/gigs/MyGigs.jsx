import { useEffect, useState } from "react";
import api from "../../api/axios";
import { Link } from "react-router-dom";

const MyGigs = () => {
  const [gigs, setGigs] = useState([]);

  useEffect(() => {
    api.get("/gigs/my-gigs").then((res) => setGigs(res.data));
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">My Gigs</h2>

      {gigs.length === 0 && (
        <p className="text-gray-500">You haven’t posted any gigs yet.</p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {gigs.map((gig) => (
          <div
            key={gig._id}
            className="border rounded-lg p-4 h-48 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-sm font-semibold line-clamp-2">{gig.title}</h3>
              <p className="text-xs text-gray-600 mt-1 line-clamp-2">{gig.description}</p>
              <p className="mt-1 text-sm font-medium">₹{gig.budget}</p>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-700">
                {gig.bidCount} bids
              </span>
              {gig.bidCount > 0 ? (
                <Link
                  to={`/gigs/${gig._id}/bids`}
                  className="text-xs bg-gray-800 text-white px-3 py-1 rounded"
                >
                  View Bids
                </Link>
              ) : (
                <span className="text-xs text-gray-500">No bids yet</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyGigs;
