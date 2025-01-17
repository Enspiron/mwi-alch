"use client";
import React, { useState } from "react";
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
  // Extract all item IDs and remove the '/items/' prefix
  const allItems = Object.keys(Client.itemDetailMap).map((key) =>
    key.replace("/items/", "")
  );

  const [selectedItem, setSelectedItem] = useState(null);
  const [itemInfo, setItemInfo] = useState(null);

  const handleClick = (id) => {
    setSelectedItem(id);
    const selectedItemDetails = Client.itemDetailMap[`/items/${id}`];
    console.log("Selected item:", selectedItemDetails);
    setItemInfo(selectedItemDetails);
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "10px",
      }}
    >
      {/* Left Panel: Item Grid */}
      <div
        style={{
          border: "3px solid black",
          padding: "10px",
          height: "95vh",
          overflow: "auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(65px, 1fr))",
          gap: "1px",
        }}
      >
        {allItems.map((id) => (
          <div
            key={id}
            onClick={() => handleClick(id)}
            style={{
              border: id === selectedItem ? "2px solid black" : "none",
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              cursor: "pointer",
            }}
          >
            <MwiIcon id={id} />
          </div>
        ))}
      </div>

      {/* Right Panel: Selected Item */}
      <div
        style={{
          border: "3px solid black",
          padding: "10px",
          height: "95vh",
          overflow: "auto",
        }}
      >
        {itemInfo ? (
          <div>
            <h2 style={{ textAlign: "center" }}>{itemInfo.name}</h2>
            <MwiIcon id={selectedItem} />
            <ul>
              <li>
                <strong>Item Level:</strong> {itemInfo.itemLevel || "N/A"}
              </li>
              <li>
                <strong>Sell Price:</strong> {itemInfo.sellPrice || "N/A"}
              </li>
              <li>
                <strong>Category:</strong> {itemInfo.categoryHrId?.replace(
                  "/item_categories/",
                  ""
                ) || "N/A"}
              </li>
              <li>
                <strong>Decompose Items:</strong>
                {itemInfo.alchemyDetail?.decomposeItems && itemInfo.alchemyDetail.decomposeItems.length > 0 ? (
                  <ul>
                    {itemInfo.alchemyDetail.decomposeItems.map((item, idx) => (
                      <li key={idx}>
                        <MwiIcon id={item.itemHrid.replace("/items/", "")}/>: {item.count}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span> None</span>
                )}
              </li>


              <li>
                <strong>Is Tradable:</strong>{" "}
                {itemInfo.isTradable ? "Yes" : "No"}
              </li>
              <li>
                <strong>Description:</strong> {itemInfo.description || "N/A"}
              </li>
            </ul>
          </div>
        ) : (
          <p>Select an item to view details</p>
        )}
      </div>
    </div>
  );
}
