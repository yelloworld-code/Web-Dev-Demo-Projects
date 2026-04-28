import { BrowserRouter, Routes, Route } from "react-router-dom";
import Campgrounds from "./pages/Campgrounds";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/campgrounds" element={<Campgrounds />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
