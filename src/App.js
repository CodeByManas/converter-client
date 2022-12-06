import "./App.css";
import { ImagePdf } from "../src/components/image-pdf/image-pdf";
import { Dashboard } from "../src/components/dashboard/dashboard";
import { CSV } from "../src/components/csv/csv";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../src/components/home/home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Dashboard></Dashboard>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/csv" element={<CSV />}></Route>
          <Route path="/img-pdf" element={<ImagePdf />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
