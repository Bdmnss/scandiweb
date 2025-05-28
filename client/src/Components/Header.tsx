import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Overlay from "./Overlay";
import Cart from "./Cart";
import { useCategories } from "../lib/graphql/hooks";
import { useCartStore } from "../store/cartStore";

const Header = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("ALL");
  const { data } = useCategories();

  const isCartOpen = useCartStore((state) => state.isCartOpen);
  const isOverlayOpen = useCartStore((state) => state.isOverlayOpen);
  const setIsCartOpen = useCartStore((state) => state.setIsCartOpen);
  const setIsOverlayOpen = useCartStore((state) => state.setIsOverlayOpen);

  useEffect(() => {
    const path = location.pathname.slice(1).toUpperCase();
    setActiveTab(path === "" ? "ALL" : path);
  }, [location]);

  return (
    <header className="fixed top-0 z-30 flex w-full items-center justify-between bg-white px-72 pt-8">
      <div className="flex gap-6">
        {data &&
          data.categories &&
          data.categories.map((category: { name: string }) => {
            const tab = category.name.toUpperCase();
            return (
              <Link
                key={tab}
                to={tab === "ALL" ? "/" : `/${category.name.toLowerCase()}`}
                className={`relative cursor-pointer border-b-2 px-4 pb-6 transition-all duration-200 ${
                  activeTab === tab
                    ? "border-primary text-primary"
                    : "border-transparent"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </Link>
            );
          })}
      </div>

      <img
        src="/brandIcon.svg"
        alt="Brand Icon"
        className="absolute left-1/2 pb-6"
      />

      <div className="relative">
        <img
          src="/cartIcon.svg"
          alt="Cart Icon"
          className="cursor-pointer pb-6"
          onClick={(e) => {
            e.stopPropagation();
            setIsCartOpen(!isCartOpen);
            setIsOverlayOpen(!isOverlayOpen);
          }}
        />

        {isCartOpen && <Cart />}
      </div>

      {isOverlayOpen && <Overlay />}
    </header>
  );
};

export default Header;
