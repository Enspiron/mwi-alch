"use client";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./page.module.css";
import Client from "./init_client_info.json";
import Calculator from "./Calculator.js";
function MwiIcon({ id }) {
  return (
    <svg className={styles.icon}>
      <use xlinkHref={`/items.svg#${id}`} />
    </svg>
  );
}

export default function Home() {
  const allItems = Object.keys(Client.itemDetailMap).map((key) =>
    key.replace("/items/", "")
  );

  const [selectedItem, setSelectedItem] = useState(null);
  const [itemInfo, setItemInfo] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showTransmutableOnly, setShowTransmutableOnly] = useState(false);
  const [activeTab, setActiveTab] = useState("details");

  const handleClick = (id) => {
    setSelectedItem(id);
    setItemInfo(Client.itemDetailMap[`/items/${id}`]);
  };

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  const toggleShowTransmutable = () => setShowTransmutableOnly((prev) => !prev);

  const filteredItems = allItems.filter((id) => {
    if (!showTransmutableOnly) return true;
    return Client.itemDetailMap[`/items/${id}`]?.alchemyDetail?.transmuteDropTable?.length > 0;
  });

  return (
    <div
      className={`container-fluid p-0 ${isDarkMode ? "bg-dark text-light" : "bg-light text-dark"}`}
      style={{ minHeight: "100vh" }}
    >
      {/* Top Bar */}
      <div
        className={`d-flex justify-content-between align-items-center py-3 px-4 ${
          isDarkMode ? "bg-secondary" : "bg-primary text-white"
        }`}
        style={{ position: "sticky", top: 0, zIndex: 1000 }}
      >
        <h1 className="m-0">Alchemy</h1>
        <div className="d-flex gap-2">
          <button
            className={`btn ${showTransmutableOnly ? "btn-danger text-white" : "btn-outline-secondary"}`}
            onClick={toggleShowTransmutable}
          >
            {showTransmutableOnly ? "Show All" : "Show Transmutable Only"}
          </button>
          <button className={`btn ${isDarkMode ? "btn-light" : "btn-dark"}`} onClick={toggleDarkMode}>
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="row m-0">
        {/* Left Panel: Item Grid */}
        <div className="col-md-6 p-3">
          <div
            className={`border rounded p-3 overflow-auto ${isDarkMode ? "bg-secondary" : "bg-white"}`}
            style={{ height: "75vh" }}
          >
            <div className="d-flex flex-wrap" style={{ gap: "10px" }}>
              {filteredItems.map((id) => (
                <div
                  key={id}
                  onClick={() => handleClick(id)}
                  style={{
                    cursor: "pointer",
                    width: "65px",
                    height: "65px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: id === selectedItem ? "2px solid blue" : "1px solid gray",
                    borderRadius: "5px",
                    backgroundColor: id === selectedItem ? "#f0f8ff" : "inherit",
                  }}
                >
                  <MwiIcon id={id} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel: Item Details */}
        <div className="col-md-6 p-3">
          <div
            className={`border rounded p-4 ${isDarkMode ? "bg-secondary" : "bg-white"}`}
            style={{ height: "75vh", overflowY: "auto" }}
          >
            {itemInfo ? (
              <div>
                {/* Tabs */}
                <ul className="nav nav-tabs mb-3">
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === "details" ? "active" : ""}`}
                      onClick={() => setActiveTab("details")}
                    >
                      Details
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === "calculator" ? "active" : ""}`}
                      onClick={() => setActiveTab("calculator")}
                    >
                      Calculator
                    </button>
                  </li>
                </ul>

                {/* Tab Content */}
                {activeTab === "details" && (
                  <>
                    <h4 className="text-center mb-3">{itemInfo.name}</h4>
                    <div className="text-center mb-4">
                      <MwiIcon id={selectedItem} />
                    </div>
                    <ul className="list-group">
                      <li className={`list-group-item ${isDarkMode ? "bg-dark text-light" : ""}`}>
                        <strong>Item Level:</strong> {itemInfo.itemLevel || "N/A"}
                      </li>
                      <li className={`list-group-item ${isDarkMode ? "bg-dark text-light" : ""}`}>
                        <strong>Sell Price:</strong> {itemInfo.sellPrice || "N/A"}
                      </li>
                      <li className={`list-group-item ${isDarkMode ? "bg-dark text-light" : ""}`}>
                        <strong>Category:</strong>{" "}
                        {itemInfo.categoryHrId?.replace("/item_categories/", "") || "N/A"}
                      </li>
                      <li className={`list-group-item ${isDarkMode ? "bg-dark text-light" : ""}`}>
                        <strong>Decompose Items:</strong>
                        {itemInfo.alchemyDetail?.decomposeItems?.length ? (
                          <ul className="list-group mt-2">
                            {itemInfo.alchemyDetail.decomposeItems.map((item, idx) => (
                              <li
                                key={idx}
                                className={`list-group-item d-flex justify-content-between align-items-center ${
                                  isDarkMode ? "bg-dark text-light" : ""
                                }`}
                              >
                                <MwiIcon id={item.itemHrid.replace("/items/", "")} />
                                <span>{item.count}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <span> None</span>
                        )}
                      </li>
                      <li className={`list-group-item ${isDarkMode ? "bg-dark text-light" : ""}`}>
                        <strong>Transmutes To:</strong>
                        {itemInfo.alchemyDetail?.transmuteDropTable?.length ? (
                          <ul className="list-group mt-2">
                            {itemInfo.alchemyDetail.transmuteDropTable.map((item, idx) => (
                              <li
                                key={idx}
                                className={`list-group-item d-flex justify-content-between align-items-center ${
                                  isDarkMode ? "bg-dark text-light" : ""
                                }`}
                              >
                                <MwiIcon id={item.itemHrid.replace("/items/", "")} />
                                <span>{(item.dropRate * 100).toFixed(2)}% Chance</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <span> None</span>
                        )}
                      </li>
                      <li className={`list-group-item ${isDarkMode ? "bg-dark text-light" : ""}`}>
                        <strong>Is Tradable:</strong> {itemInfo.isTradable ? "Yes" : "No"}
                      </li>
                      <li className={`list-group-item ${isDarkMode ? "bg-dark text-light" : ""}`}>
                        <strong>Description:</strong> {itemInfo.description || "N/A"}
                      </li>
                    </ul>
                  </>
                )}

                {activeTab === "calculator" && (
                  <div>
                    <h4 className="text-center">Calculator</h4>
                  {/* show icon of item and name */}
                  <div className="text-center mb-4">
                      <MwiIcon id={selectedItem} />
                    </div>
                    {/* show the item name */}
                    <div className="text-center mb-4">
                      <h4>{itemInfo.name}</h4>
                    </div>
                    <div>
                      {/*  */}
                      <Calculator itemInfo={itemInfo} isDarkMode={isDarkMode} itemName={itemInfo.name} />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-center">Select an item to view details</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
