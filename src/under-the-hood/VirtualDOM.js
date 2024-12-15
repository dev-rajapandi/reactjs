import React, { useState } from "react";

const VDom = () => {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1); // Increment function

  return (
    <div>
      <h1>Virtual DOM Example</h1>
      <p>Current Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
};

export default VDom;
