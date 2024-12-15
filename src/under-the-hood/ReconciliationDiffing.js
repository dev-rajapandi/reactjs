import React, { useState } from "react";

function ReconciliationDiffing() {
  const [items, setItems] = useState([1, 2, 3]);

  const addItem = () => {
    setItems([items.length + 1, ...items]);
  };

  return (
    <div>
      <h1>Reconciliation and Diffing Example</h1>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item} - {index}
          </li>
        ))}
      </ul>
      <button onClick={addItem}>Add Item</button>
      <UidKey />
    </div>
  );
}

export default ReconciliationDiffing;

const UidKey = () => {
  // Initial state with unique `id` values
  const [items, setItems] = useState([
    { id: 1, name: "Apple" },
    { id: 2, name: "Banana" },
    { id: 3, name: "Cherry" },
  ]);

  // Add a new item to the beginning of the list
  const addItem = () => {
    const newItem = { id: items.length + 1, name: `Item ${items.length + 1}` };
    setItems([newItem, ...items]);
  };

  // Shuffle the list to test reconciliation
  const shuffleItems = () => {
    setItems((prevItems) => [...prevItems].sort(() => Math.random() - 0.5));
  };

  return (
    <div>
      <h1>Reconciliation Example</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <button onClick={addItem}>Add Item</button>
      <button onClick={shuffleItems}>Shuffle Items</button>
    </div>
  );
};
