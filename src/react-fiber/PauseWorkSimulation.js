import React, { useState } from "react";

function ExpensiveComponent() {
  let computation = 0;
  for (let i = 0; i < 1000000000; i++) {
    computation += i;
  }
  return <p>Computation complete: {computation}</p>;
}

function PauseWorkSimulation() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount((prev) => prev + 1)}>Increment</button>
      <p>Counter: {count}</p>
      <ExpensiveComponent />
    </div>
  );
}

export default PauseWorkSimulation;
