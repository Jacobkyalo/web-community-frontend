import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import AllPeople from "./pages/AllPeople";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Images from "./pages/Images";

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all" element={<AllPeople />} />
        <Route path="/images" element={<Images />} />
      </Routes>
    </Router>
  );
}

export default App;
