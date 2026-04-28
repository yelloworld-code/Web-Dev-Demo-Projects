import { Link } from 'react-router-dom';
import { useState } from "react";
import { campgrounds as seedData } from "../data/seeds";
import type { Campground } from "../data/seeds";

export default function Campgrounds() {
  const [campgrounds, setCampgrounds] = useState<Campground[]>(seedData);

  const addCampground = () => {
    const newCamp: Campground = {
      _id: Date.now().toString(),
      title: "New Camp",
      price: 500,
      location: "India",
    };

    setCampgrounds((prev) => [...prev, newCamp]);
  };

  const deleteCampground = (id: string) => {
    setCampgrounds((prev) => prev.filter((camp) => camp._id !== id));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Campgrounds</h1>

      <button onClick={addCampground} style={{ marginBottom: "16px" }}>
        Add Campground
      </button>

      {campgrounds.map((camp) => (
        <div
          key={camp._id}
          style={{
            border: "1px solid #ccc",
            padding: "12px",
            marginBottom: "10px",
            borderRadius: "8px",
          }}
        >
          <h2>{camp.title}</h2>
          <p>{camp.location}</p>
          <p>₹{camp.price}</p>

          <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
            <Link to={`/campgrounds/${camp._id}`}>
              <button>View Details</button>
            </Link>

            <button onClick={() => deleteCampground(camp._id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
