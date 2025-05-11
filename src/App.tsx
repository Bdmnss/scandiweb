import Header from "./Components/Header";
import ProductsGrid from "./Components/ProductsGrid";

function App() {
  return (
    <>
      <Header />
      <main className="px-72 py-40">
        <ProductsGrid />
      </main>
    </>
  );
}

export default App;
