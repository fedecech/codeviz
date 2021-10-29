// import { CogIcon } from "@heroicons/react/outline";
import { CogIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import Settings from "src/components/Settings";
import { useGridStore } from "src/stores/useGridStore";
import Visualizer from "../components/Viz/Visualizer";

interface HomeProps {}

const Home: React.FC<HomeProps> = ({}) => {
  const { resetGrid } = useGridStore();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  return (
    <div className="h-full w-full relative">
      <div className="flex flex-col items-center">
        <div className="w-full flex items-center justify-center px-4 py-2 space-x-4">
          <button
            className={`bg-red-600 text-white text-sm px-4 py-2 rounded-md`}
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
        </div>
        <Visualizer isRunning={isRunning} setIsRunning={setIsRunning} />
      </div>
      {isSettingsOpen && <Settings setIsSettingsOpen={setIsSettingsOpen} />}
      <button
        className="absolute bottom-7 left-7 w-12 h-12 flex items-center justify-center rounded-lg"
        style={{ backgroundColor: "#5332DA" }}
        onClick={() => setIsSettingsOpen(true)}
      >
        <CogIcon className="w-7 h-7 text-white" />
      </button>
    </div>
  );
};

export default Home;
