import {
  CogIcon,
  ChevronDoubleDownIcon,
  ChevronDoubleUpIcon,
} from "@heroicons/react/outline";
import React, { useState } from "react";
import { useGridStore } from "src/stores/useGridStore";
import Visualizer from "../components/Viz/Visualizer";

interface HomeProps {}

const Home: React.FC<HomeProps> = ({}) => {
  const { resetGrid } = useGridStore();
  const [isActionOpen, setIsActionOpen] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const toggleisActionOpen = () => setIsActionOpen((s) => !s);

  return (
    <div className="h-full w-full relative">
      <div className="flex flex-col items-center">
        <div className="w-full flex items-center justify-between px-4 mt-2">
          <button
            className={`bg-red-600 text-white px-4 py-2 rounded-md`}
            onClick={() => !isRunning && resetGrid()}
          >
            Reset board
          </button>
          <button
            className={`${
              isRunning ? `bg-red-600` : `bg-green-600`
            } text-white px-4 py-2 rounded-md`}
            onClick={() => !isRunning && setIsRunning(true)}
          >
            Visualize!
          </button>
          <button onClick={toggleisActionOpen}>
            <div className="flex items-center space-x-2">
              {isActionOpen ? (
                <ChevronDoubleUpIcon className="w-4 h-4" />
              ) : (
                <ChevronDoubleDownIcon className="w-4 h-4" />
              )}
              <p>Actions</p>
            </div>
          </button>
        </div>
        {isActionOpen && <div className={`w-full`}>Actions</div>}
        <Visualizer isRunning={isRunning} setIsRunning={setIsRunning} />
      </div>
      <button
        className="absolute bottom-6 left-6 w-14 h-14 rounded-lg shadow-lg z-10"
        style={{ backgroundColor: "#5332DA" }}
      >
        <div className="h-full w-full flex items-center justify-center">
          <CogIcon className="w-7 h-7 text-white" />
        </div>
      </button>
    </div>
  );
};

export default Home;
