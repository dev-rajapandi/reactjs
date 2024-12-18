# **React Fiber Deep Dive**

### **1. Fiber Architecture and Design**

#### **Theory**

React Fiber is a **reimplementation of React's core algorithm**. It introduces a data structure called a **fiber**, which is a virtual representation of a React component instance.

##### Key Points:

1. **Fiber Node**:

   - Each element in the Virtual DOM is represented as a **fiber node**.
   - A fiber contains information like:
     - The component it corresponds to (function, class, or host component like `div`).
     - Its parent, child, and sibling fibers.
     - State and props of the component.
     - Side effects (like updates or deletions).

2. **Goals of Fiber**:

   - **Concurrency**: Ability to break rendering work into smaller chunks and handle high-priority updates first.
   - **Interruptibility**: Pause work and resume when React has enough time.
   - **Scheduling**: Assign priority levels to tasks.

3. **Core Data Structure**:
   - Each fiber has fields like `tag`, `key`, `stateNode`, `return`, `child`, `sibling`, and `memoizedProps`.

---

#### **Practical**

1. **Fiber Node Representation**:
   Create a simple React application and inspect how Fiber nodes are represented using React Developer Tools.

   **Steps**:

   - Install and set up **React Developer Tools** in your browser.
   - Create a basic React component hierarchy:

     ```javascript
     function Header() {
       return <h1>Welcome to React Fiber!</h1>;
     }

     function Footer() {
       return <footer>Thanks for visiting.</footer>;
     }

     function FiberNode() {
       return (
         <div>
           <Header />
           <Footer />
         </div>
       );
     }

     export default FiberNode;
     ```

   - Open **React Developer Tools** and inspect the `App`, `Header`, and `Footer` components. Each component corresponds to a **fiber node**, with details like:
     - **Props**: The props passed to the component.
     - **State**: The current state of the component (if applicable).
     - **Type**: Whether it's a function component, class component, or a host component (e.g., `div`).

2. **Pause Work Simulation**:
   Use a computationally expensive task to observe how React Fiber prioritizes rendering:

   ```javascript
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
   ```

   - Observe in **React DevTools Profiler** how React Fiber splits the rendering into chunks, prioritizing button clicks over rendering the expensive computation.

---

### **2. React Fiber Scheduler**

#### **Theory**

The Fiber Scheduler is responsible for managing priorities and deciding which tasks to execute.

##### Key Concepts:

1. **Update Prioritization**:

   - Updates have different priorities:
     - **Discrete Events** (e.g., button clicks): Highest priority.
     - **Animation Updates**: Medium priority.
     - **Non-urgent Updates** (e.g., data loading): Lowest priority.
   - React Fiber schedules updates based on their priority and available time.

2. **Interruptible Rendering**:

   - React Fiber can pause rendering and resume later if a higher-priority task arises (like user input).

3. **Time-Slicing**:
   - Fiber breaks rendering into small units of work that can be completed within a frame (~16ms).

---

#### **Practical**

1. **Simulating Update Priorities**:
   Create a component with multiple update priorities:

```javascript
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
```

**High-Priority Updates:**
The handleHighPriorityUpdate function updates the highPriorityState using setState.
This update is treated as synchronous and high-priority by React.
The update will happen immediately, blocking other tasks.

**Low-Priority Updates with startTransition:**
The handleLowPriorityUpdate function generates a large array of items and updates lowPriorityState within a startTransition block.
React schedules this update as low priority to avoid blocking the UI for other critical updates.
The startTransition method explicitly informs React that this work can be deferred.

**What Happens During Execution:**
If you click the "Increment High-Priority Counter" button, the counter updates instantly.
If you click the "Trigger Low-Priority Update" button:
React delays the rendering of the lowPriorityState array if there's a more urgent update happening (like clicking the high-priority button).

**Observing React’s Scheduling Behavior**
**Test concurrent updates:**
Click the "Trigger Low-Priority Update" button.
While the list is being processed, click "Increment High-Priority Counter".
You’ll see that the counter updates instantly, while the list rendering may be slightly delayed.

**CPU Profiling:**
Open the React DevTools profiler.
Profile the component while interacting with it to observe:
Which updates are batched.
The rendering priority of each update.

---

### **3. React Fiber Lifecycle**

#### **Theory**

Fiber introduces additional lifecycle hooks for managing work priorities and updates.

##### Key Changes in Lifecycle:

1. **Legacy Lifecycle Methods** (e.g., `componentWillMount`) were deprecated due to issues with Fiber's asynchronous rendering.
2. **New Lifecycle Methods**:
   - `getDerivedStateFromProps`: Invoked right before rendering.
   - `getSnapshotBeforeUpdate`: Captures information before the DOM updates.

---

#### **Practical**

Experiment with new lifecycle methods in class components:

```javascript
import React, { Component } from "react";

class DemoComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
  }

  static getDerivedStateFromProps(props, state) {
    console.log("getDerivedStateFromProps called");
    return null;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("getSnapshotBeforeUpdate called");
    return null;
  }

  componentDidUpdate() {
    console.log("componentDidUpdate called");
  }

  increment = () => {
    this.setState({ counter: this.state.counter + 1 });
  };

  render() {
    return (
      <div>
        <h1>Counter: {this.state.counter}</h1>
        <button onClick={this.increment}>Increment</button>
      </div>
    );
  }
}

export default DemoComponent;
```

- Observe the logs in the console to understand how Fiber manages lifecycle methods.

---

To further deep dive into React Fiber, let’s explore **advanced internal mechanisms and concepts** that underpin the architecture. These concepts will take us closer to understanding how React Fiber enables React's capabilities.

---

### **4. Fiber Internals: Breaking Down the Fiber Node**

#### **Theory**

A **fiber node** is the smallest unit of work in React Fiber. Each fiber represents a virtual component and contains details about the component’s rendering process.

##### **Structure of a Fiber Node**:

- **Type**: Identifies what the fiber node represents. Examples:
  - Host components: HTML tags like `div` or `span`.
  - Composite components: Custom React components like `MyComponent`.
- **Key**: Used for reconciling children in lists.
- **StateNode**: Stores a reference to the local state or DOM node.
- **Return**: Points to the parent fiber.
- **Child**: Points to the first child fiber.
- **Sibling**: Points to the next sibling fiber.
- **PendingProps**: Props passed during the current render phase.
- **MemoizedProps**: Props from the last render.
- **EffectTag**: Describes the type of change needed for the node (e.g., placement, update, or deletion).

#### **Practical**

1. **Create a Nested Component Tree**:

   ```javascript
   function Child() {
     return <p>I am a child</p>;
   }

   function Parent() {
     return (
       <div>
         <h1>Parent Component</h1>
         <Child />
       </div>
     );
   }

   function App() {
     return <Parent />;
   }

   export default App;
   ```

2. **Observe Fiber Nodes Using DevTools**:

   - Open React Developer Tools and inspect the components.
   - Each node (`App`, `Parent`, `Child`, and `div`) corresponds to a fiber.
   - Inspect the properties of each node, such as `props`, `stateNode`, `child`, and `sibling`.

3. **Inspect Fiber Tags in the Source Code**:
   - Open the **React Source Code** in the `react-reconciler` package.
   - Look for the `ReactFiber` file where fiber tags are defined (e.g., `HostComponent`, `ClassComponent`, `FunctionComponent`).

---

### **5. React Fiber WorkLoop**

#### **Theory**

The **WorkLoop** is the engine behind React Fiber's reconciliation and rendering process. It controls how and when React renders updates.

##### **Steps in the WorkLoop**:

1. **Render Phase**:

   - React traverses the fiber tree, determining changes that need to be made.
   - This phase is asynchronous and can be paused or interrupted.

2. **Commit Phase**:
   - React applies changes to the DOM.
   - This phase is synchronous and includes:
     - Updating DOM nodes.
     - Calling `componentDidMount` and `componentDidUpdate`.

##### Scheduling and Priority:

- **Discrete Priority**: High-priority updates, like user input.
- **Continuous Priority**: Animations and transitions.
- **Idle Priority**: Low-priority updates that can wait.

---

#### **Practical**

1. **Simulate Different Priority Levels**:

   ```javascript
   import React, { useState } from "react";

   function App() {
     const [state, setState] = useState(0);
     const handleClick = () => {
       setState((prev) => prev + 1);
       for (let i = 0; i < 1000000000; i++) {} // Simulate expensive task
     };

     return (
       <div>
         <button onClick={handleClick}>Update State</button>
         <p>State: {state}</p>
       </div>
     );
   }

   export default App;
   ```

2. **Observe Behavior**:

   - Click the button and notice how React remains responsive.
   - Use React DevTools Profiler to observe how the **WorkLoop** schedules updates.

3. **Inspect Scheduling in Source Code**:
   - Look at the `ReactFiberWorkLoop` file in the React source code.
   - Examine functions like `performUnitOfWork` and `completeUnitOfWork`.

---

### **6. React Fiber and Concurrent Mode**

#### **Theory**

**Concurrent Mode** is a key feature of React Fiber, enabling React to render multiple tasks simultaneously.

##### Features:

1. **Time Slicing**:
   - Splits rendering into chunks, allowing React to yield control back to the browser for higher-priority tasks.
2. **Suspense**:
   - Lets components wait for asynchronous data before rendering.

---

#### **Practical**

1. **Time Slicing in Action**:

   ```javascript
   import React, { useState } from "react";

   function App() {
     const [count, setCount] = useState(0);

     const increment = () => {
       setCount((prev) => prev + 1);
       for (let i = 0; i < 1000000000; i++) {} // Simulate a long task
     };

     return (
       <div>
         <h1>Counter: {count}</h1>
         <button onClick={increment}>Increment</button>
       </div>
     );
   }

   export default App;
   ```

   - Notice how React yields to the browser, ensuring UI responsiveness.

2. **Suspense Example**:

   ```javascript
   import React, { Suspense } from "react";

   const LazyComponent = React.lazy(
     () =>
       new Promise((resolve) =>
         setTimeout(() => resolve({ default: () => <p>Loaded!</p> }), 3000)
       )
   );

   function App() {
     return (
       <Suspense fallback={<p>Loading...</p>}>
         <LazyComponent />
       </Suspense>
     );
   }

   export default App;
   ```

   - Observe how React delays rendering until the lazy component is ready.

---

### Key Takeaways:

1. **Fiber Internals**:
   - Fiber nodes are rich data structures that store all the details React needs for rendering.
2. **WorkLoop**:
   - React Fiber splits work into phases and prioritizes updates efficiently.
3. **Concurrent Mode**:
   - React Fiber enables responsiveness and seamless rendering with features like time slicing and suspense.

---
