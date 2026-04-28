import { useState } from "react";
import { campgrounds as seedData } from "../data/seeds";
import type { Campground } from "../data/seeds";

export default function Campgrounds() {
  const [campgrounds, setCampgrounds] = useState<Campground[]>(seedData);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Campgrounds</h1>

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
        </div>
      ))}
    </div>
  );
}
