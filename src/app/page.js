"use client";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./page.module.css";
import Client from "./init_client_info.json";

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
  const [searchQuery, setSearchQuery] = useState("");

  const handleClick = (id) => {
    setSelectedItem(id);
    const selectedItemDetails = Client.itemDetailMap[`/items/${id}`];
    setItemInfo(selectedItemDetails);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Filter items based on the search query
  const filteredItems = allItems.filter((item) =>
    item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className={`container-fluid p-0 ${
        isDarkMode ? "bg-dark text-light" : "bg-light text-dark"
      }`}
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
        <button
          className={`btn ${isDarkMode ? "btn-light" : "btn-dark"}`}
          onClick={toggleDarkMode}
        >
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      {/* Search Bar */}
      <div className="p-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search items..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Main Content */}
      <div className="row m-0">
        {/* Left Panel: Item Grid */}
        <div className="col-md-6 p-3">
          <div
            className={`border rounded p-3 overflow-auto ${
              isDarkMode ? "bg-secondary" : "bg-white"
            }`}
            style={{ height: "75vh" }}
          >
            <div
              className="d-flex flex-wrap justify-content-start"
              style={{
                gap: "10px", // Add gap between items
              }}
            >
              {filteredItems.map((id) => (
                <div
                  key={id}
                  onClick={() => handleClick(id)}
                  style={{
                    cursor: "pointer",
                    width: "65px", // Set the width to match the image size
                    height: "65px", // Same as width for square icons
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

        {/* Right Panel: Selected Item */}
        <div className="col-md-6 p-3">
          <div
            className={`border rounded p-4 overflow-auto ${
              isDarkMode ? "bg-secondary" : "bg-white"
            }`}
            style={{ height: "75vh" }}
          >
            {itemInfo ? (
              <div>
                <h4 className="text-center mb-3">{itemInfo.name}</h4>
                <div className="text-center mb-4">
                  <MwiIcon id={selectedItem} />
                </div>
                <ul className="list-group">
                  <li
                    className={`list-group-item ${
                      isDarkMode ? "bg-dark text-light" : ""
                    }`}
                  >
                    <strong>Item Level:</strong> {itemInfo.itemLevel || "N/A"}
                  </li>
                  <li
                    className={`list-group-item ${
                      isDarkMode ? "bg-dark text-light" : ""
                    }`}
                  >
                    <strong>Sell Price:</strong> {itemInfo.sellPrice || "N/A"}
                  </li>
                  <li
                    className={`list-group-item ${
                      isDarkMode ? "bg-dark text-light" : ""
                    }`}
                  >
                    <strong>Category:</strong>{" "}
                    {itemInfo.categoryHrId?.replace("/item_categories/", "") ||
                      "N/A"}
                  </li>
                  <li
                    className={`list-group-item ${
                      isDarkMode ? "bg-dark text-light" : ""
                    }`}
                  >
                    <strong>Decompose Items:</strong>
                    {itemInfo.alchemyDetail?.decomposeItems &&
                    itemInfo.alchemyDetail.decomposeItems.length > 0 ? (
                      <ul className="list-group mt-2">
                        {itemInfo.alchemyDetail.decomposeItems.map(
                          (item, idx) => (
                            <li
                              key={idx}
                              className={`list-group-item d-flex justify-content-between align-items-center ${
                                isDarkMode ? "bg-dark text-light" : ""
                              }`}
                            >
                              <MwiIcon
                                id={item.itemHrid.replace("/items/", "")}
                              />
                              <span>{item.count}</span>
                            </li>
                          )
                        )}
                      </ul>
                    ) : (
                      <span> None</span>
                    )}
                  </li>
                  <li
                    className={`list-group-item ${
                      isDarkMode ? "bg-dark text-light" : ""
                    }`}
                  >
                    <strong>Is Tradable:</strong>{" "}
                    {itemInfo.isTradable ? "Yes" : "No"}
                  </li>
                  <li
                    className={`list-group-item ${
                      isDarkMode ? "bg-dark text-light" : ""
                    }`}
                  >
                    <strong>Description:</strong>{" "}
                    {itemInfo.description || "N/A"}
                  </li>
                </ul>
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
