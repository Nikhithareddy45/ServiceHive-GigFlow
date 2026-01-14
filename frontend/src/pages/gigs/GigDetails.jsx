import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/axios";
import BidForm from './../../components/BidForm'

const GigDetails = () => {
  const { id } = useParams();
  const [gig, setGig] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGig = async () => {
      try {
        const res = await api.get(`/gigs/${id}`);
        setGig(res.data);
      } catch (error) {
        console.error("Failed to load gig");
      } finally {
        setLoading(false);
      }
    };

    fetchGig();
  }, [id]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!gig) return <p className="p-6">Gig not found</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold">{gig.title}</h2>
      <p className="mt-2">{gig.description}</p>
      <p className="mt-2 font-medium">Budget: ₹{gig.budget}</p>
      <p className="mt-1 text-sm text-gray-600">Posted by: {gig.ownerName || "Unknown"}</p>
      <p className="mt-1 text-sm">
        Status:
        <span
          className={`ml-2 inline-block px-2 py-1 rounded ${
            gig.status === "assigned"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {gig.status.toUpperCase()}
        </span>
      </p>

      {gig.status === "open" && (
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Submit a Bid</h3>
          <BidForm gigId={gig._id} />
        </div>
      )}
      {gig.isOwner && (
  <Link
    to={`/gigs/${gig._id}/bids`}
    className="mt-4 inline-block bg-gray-800 text-white px-4 py-2 rounded"
  >
    View Bids
  </Link>
)}

    </div>
  );
};

export default GigDetails;
