import { useParams } from "react-router-dom";
import { campgrounds } from "../data/seeds";

export default function CampgroundDetail() {
  const { id } = useParams();

  const campground = campgrounds.find((c) => c._id === id);

  if (!campground) {
    return <h1>Campground not found</h1>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>{campground.title}</h1>
      <p>{campground.location}</p>
      <p>₹{campground.price}</p>
    </div>
  );
}