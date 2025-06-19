import "./App.css";
import { Route, Routes } from "react-router";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<LandingPage />} />
      </Routes>
    </>
  );
}

export default App;
