import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const BidForm = ({ gigId }) => {
  const [message, setMessage] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();

  const submitBid = async () => {
    try {
      await api.post("/bids", {
        gigId,
        message,
        price
      });
      navigate("/my-bids");
    } catch (error) {
      alert(error.response?.data?.message || "Bid failed");
    }
  };

  return (
    <div className="space-y-3">
      <textarea
        className="w-full border p-2 rounded"
        placeholder="Your proposal"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <input
        type="number"
        className="w-full border p-2 rounded"
        placeholder="Your price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <button
        onClick={submitBid}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Submit Bid
      </button>
    </div>
  );
};

export default BidForm;
