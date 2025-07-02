import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Vets from "./components/Vets/Vets";
import Pets from "./components/Pets/Pets";
import Owners from "./components/Owners/Owners";
import Appointments from "./components/Appointments/Appointments";

function App() {
  return (
    <>
      <Router>
        <h1>Vite + React</h1>
        <Routes>
          <Route path="/pets" element={<Pets />} />
          <Route path="/vets" element={<Vets />} />
          <Route path="/owners" element={<Owners />} />
          <Route path="/appointments" element={<Appointments />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
