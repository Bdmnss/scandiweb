import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Overlay from "./Overlay";
import Cart from "./Cart";
import { useCategories } from "../lib/graphql/hooks";

const Header = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("ALL");
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { data } = useCategories();

  useEffect(() => {
    const path = location.pathname.slice(1).toUpperCase();
    setActiveTab(path === "" ? "ALL" : path);
  }, [location]);

  return (
    <header
      className="fixed top-0 z-30 flex w-full items-center justify-between bg-white px-72 pt-8"
      onClick={() => {
        setIsOverlayOpen(false);
      }}
    >
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

        {isCartOpen && <Cart setIsCartOpen={setIsCartOpen} />}
      </div>

      {isOverlayOpen && (
        <Overlay
          setIsOverlayOpen={setIsOverlayOpen}
          setIsCartOpen={setIsCartOpen}
        />
      )}
    </header>
  );
};

export default Header;
