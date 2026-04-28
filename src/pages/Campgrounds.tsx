import { Link } from 'react-router-dom';
import { useState } from "react";
import { campgrounds as seedData } from "../data/seeds";
import type { Campground } from "../data/seeds";
import "./Camgrounds.css";

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
    <div className="container">
      <h1 className="title">Campgrounds</h1>

      <button onClick={addCampground} className="add-btn">
        Add Campground
      </button>

      {campgrounds.map((camp) => (
        <div key={camp._id} className="card">
          <h2 className="card-title">{camp.title}</h2>
          <p className="card-location">{camp.location}</p>
          <p className="card-price">₹{camp.price}</p>

          <div className="actions">
            <Link to={`/campgrounds/${camp._id}`}>
              <button className="btn btn-primary">View Details</button>
            </Link>

            <button onClick={() => deleteCampground(camp._id)} className="btn btn-danger">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
