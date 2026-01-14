import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";

const ViewBids = () => {
  const { gigId } = useParams();
  const [bids, setBids] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/bids/${gigId}`)
      .then(res => setBids(res.data))
      .catch(() => {
        navigate(`/gigs/${gigId}`); // prevent viewing others' bids
      });
  }, []);

  const hire = async (bidId) => {
    await api.patch(`/bids/${bidId}/hire`);
    const res = await api.get(`/bids/${gigId}`);
    setBids(res.data);
    navigate(`/gigs/${gigId}`);
  };
  const reject = async (bidId) => {
    await api.patch(`/bids/${bidId}/reject`);
    const res = await api.get(`/bids/${gigId}`);
    setBids(res.data);
    navigate(`/gigs/${gigId}/bids`);
  };

  const statusClass = (status) => {
    switch (status) {
      case "hired":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-xl font-bold">Bids</h2>

      {bids.map(bid => (
        <div key={bid._id} className="border p-3 mt-3">
          <p><b>{bid.freelancerId.name}</b></p>
          <p>{bid.message}</p>
          <p>₹{bid.price}</p>
          <p className="text-sm mt-1">
            Status:
            <span className={`ml-2 inline-block px-2 py-1 rounded ${statusClass(bid.status)}`}>
              {bid.status.toUpperCase()}
            </span>
          </p>

          {bid.status === "pending" && (
            <button
              onClick={() => hire(bid._id)}
              className="bg-green-600 text-white px-3 cursor-pointer py-1 mt-2"
            >
              Hire
            </button>
          )}
          {bid.status === "pending" && (
            <button
              onClick={() => reject(bid._id)}
              className="bg-red-600 text-white px-3 py-1 mt-2 ml-2"
            >
              Reject
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ViewBids;
