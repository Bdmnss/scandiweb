import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Header from "./Components/Header";
import Products from "./Pages/Products";
import Product from "./Pages/Product";
import CustomError from "./Components/CustomError";

function Layout() {
  return (
    <>
      <Header />
      <main className="px-72 py-40">
        <Outlet />
      </main>
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <CustomError message="Something went wrong" />,
    children: [
      {
        index: true,
        element: <Products />,
      },
      {
        path: "/:category",
        element: <Products />,
      },
      {
        path: "products/:id",
        element: <Product />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
