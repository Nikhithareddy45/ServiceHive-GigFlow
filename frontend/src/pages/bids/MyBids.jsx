import { useEffect, useState } from "react";
import api from "../../api/axios";
import { Link } from "react-router-dom";

const MyBids = () => {
  const [bids, setBids] = useState([]);

  useEffect(() => {
    api.get("/bids/my").then(res => setBids(res.data));
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">My Bids</h2>

      {bids.length === 0 && (
        <p className="text-gray-500">You have not placed any bids.</p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {bids.map(bid => {
          const statusClass =
            bid.status === "hired"
              ? "bg-green-100 text-green-700"
              : bid.status === "rejected"
              ? "bg-red-100 text-red-700"
              : "bg-yellow-100 text-yellow-700";

          return (
            <div key={bid._id} className="border p-4 rounded h-48 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-semibold line-clamp-2">{bid.gigId?.title}</h3>
                <p className="text-xs text-gray-600">Gig status: {bid.gigId?.status}</p>
                <p className="mt-1 text-sm font-medium">₹{bid.price}</p>
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-xs px-2 py-1 rounded ${statusClass}`}>
                  {bid.status.toUpperCase()}
                </span>
                <Link to={`/gigs/${bid.gigId?._id}`} className="text-xs text-indigo-600 underline">
                  View Gig
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyBids;
