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

  const cartQuantity = useCartStore((state) =>
    state.items.reduce((acc, item) => acc + item.quantity, 0),
  );

  useEffect(() => {
    const path = location.pathname.slice(1).toUpperCase();
    setActiveTab(path === "" ? "ALL" : path);
  }, [location]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setIsCartOpen(false);
    setIsOverlayOpen(false);
  };

  return (
    <header className="fixed top-0 z-30 flex w-full items-center justify-between bg-white px-72 pt-8">
      <div className="flex gap-6">
        {data &&
          data.categories &&
          data.categories.map((category: { name: string }) => {
            const tab = category.name.toUpperCase();
            const isActive = activeTab === tab;
            return (
              <Link
                key={tab}
                to={tab === "ALL" ? "/" : `/${category.name.toLowerCase()}`}
                className={`relative cursor-pointer border-b-2 px-4 pb-6 transition-all duration-200 ${
                  isActive
                    ? "border-primary font-semibold text-primary"
                    : "border-transparent"
                }`}
                onClick={() => handleTabClick(tab)}
                data-testid={
                  isActive ? "active-category-link" : "category-link"
                }
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
        <button
          className="cursor-pointer"
          data-testid="cart-btn"
          onClick={(e) => {
            e.stopPropagation();
            setIsCartOpen(!isCartOpen);
            setIsOverlayOpen(!isOverlayOpen);
          }}
        >
          <img
            src="/cartIcon.svg"
            alt="Cart Icon"
            className="cursor-pointer pb-6"
          />
          {cartQuantity > 0 && (
            <div className="font-roboto absolute -right-3 -top-3 flex size-5 items-center justify-center rounded-full bg-black text-sm font-bold text-white">
              {cartQuantity}
            </div>
          )}
        </button>

        {isCartOpen && <Cart />}
      </div>

      {isOverlayOpen && <Overlay />}
    </header>
  );
};

export default Header;
