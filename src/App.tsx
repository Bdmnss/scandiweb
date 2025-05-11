import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import Clothes from "./Pages/Clothes";
import Tech from "./Pages/Tech";
import Product from "./Pages/Product";

function App() {
  return (
    <Router>
      <Header />
      <main className="px-72 py-40">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clothes" element={<Clothes />} />
          <Route path="/tech" element={<Tech />} />
          <Route path="/product/:id" element={<Product />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
