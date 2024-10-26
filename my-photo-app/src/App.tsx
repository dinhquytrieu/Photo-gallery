// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PhotoList from "./pages/PhotoList";
import PhotoDetail from "./pages/PhotoDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/photos" element={<PhotoList />} />
        <Route path="/photos/:id" element={<PhotoDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
