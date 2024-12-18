import React, { useState, startTransition } from "react";

function FiberScheduler() {
  const [highPriorityState, setHighPriorityState] = useState(0);
  const [lowPriorityState, setLowPriorityState] = useState([]);

  const handleHighPriorityUpdate = () => {
    // Synchronous, high-priority state update
    setHighPriorityState((prev) => prev + 1);
    console.log("High-priority update triggered!");
  };

  const handleLowPriorityUpdate = () => {
    // Low-priority state update using startTransition
    startTransition(() => {
      const newItems = [];
      for (let i = 0; i < 9999999; i++) {
        newItems.push(`Item ${i}`);
      }
      setLowPriorityState(newItems);
    });
    console.log("Low-priority update scheduled!");
  };

  return (
    <div>
      <h1>React Scheduler Demo</h1>
      <button onClick={handleHighPriorityUpdate}>
        Increment High-Priority Counter
      </button>
      <p>High-Priority Counter: {highPriorityState}</p>

      <button onClick={handleLowPriorityUpdate}>
        Trigger Low-Priority Update
      </button>
      <p>Low-Priority Items Count: {lowPriorityState.length}</p>
    </div>
  );
}

export default FiberScheduler;
