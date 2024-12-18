// import FiberNode from "./react-fiber/FiberNode";
// import PauseWorkSimulation from "./react-fiber/PauseWorkSimulation";
import FiberScheduler from "./react-fiber/FiberScheduler";

const App = () => {
  return (
    <div>
      <h1>React app</h1>
      {/* <FiberNode /> */}
      {/* <PauseWorkSimulation /> */}
      <FiberScheduler />
    </div>
  );
};
export default App;
