import { useState } from "react";
import api from '../../api/axios'
import { useNavigate } from "react-router-dom";

const CreateGig = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.post("/gigs", { title, description, budget });
      navigate("/my-gigs");
    } catch (err) {
      alert("Failed to create gig");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-6 rounded shadow w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Post a New Gig</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full border p-2 rounded"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            className="w-full border p-2 rounded"
            placeholder="Description"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <input
            type="number"
            className="w-full border p-2 rounded"
            placeholder="Budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            required
          />

          <button
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded"
          >
            {loading ? "Posting..." : "Post Gig"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateGig;
