import { useState } from "react";

const Header = () => {
  const [activeTab, setActiveTab] = useState("ALL");
  const tabs = ["ALL", "CLOTHES", "TECH"];

  return (
    <header className="fixed top-0 z-30 flex w-full items-center justify-between bg-white px-72 pt-8">
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

      <img src="/cartIcon.svg" alt="Cart Icon" />
    </header>
  );
};

export default Header;
