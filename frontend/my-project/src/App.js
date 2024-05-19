import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Section from "./components/Section";
import Home from "./components/Home";
import Article from "./components/Article";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/quanly" element={<Section />} />
        <Route path="/" element={<Home />} />
        <Route path="/article/:id" element={<Article />} />
      </Routes>
    </>
  );
}

export default App;
