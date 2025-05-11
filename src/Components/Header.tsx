import { useState } from "react";

const Header = () => {
  const [activeTab, setActiveTab] = useState("ALL");
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const tabs = ["ALL", "CLOTHES", "TECH"];

  return (
    <header
      className="fixed top-0 z-30 flex w-full items-center justify-between bg-white px-72 pt-8"
      onClick={() => {
        setIsOverlayOpen(false);
      }}
    >
      <div className="flex gap-6">
        {tabs.map((tab) => {
          return (
            <div
              key={tab}
              className={`relative cursor-pointer px-4 transition-colors duration-200 ${activeTab === tab && "text-primary border-primary border-b-2 pb-6"}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </div>
          );
        })}
      </div>

      <img src="/brandIcon.svg" alt="Brand Icon" />

      <img
        src="/cartIcon.svg"
        alt="Cart Icon"
        className="cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          setIsOverlayOpen(!isOverlayOpen);
        }}
      />

      {isOverlayOpen && (
        <div
          className="bg-overlay absolute left-0 top-20 z-20 flex h-screen w-full items-center justify-center"
          onClick={() => {
            setIsOverlayOpen(false);
          }}
        ></div>
      )}
    </header>
  );
};

export default Header;
