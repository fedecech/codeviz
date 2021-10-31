import { CogIcon, XIcon } from "@heroicons/react/outline";
import React from "react";
import {
  algorithms,
  speeds,
  useSettingsStore,
} from "src/stores/useSettingsStore";
import FormSelector from "./FormSelector";

interface SettingsProps {
  setIsSettingsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Settings: React.FC<SettingsProps> = ({ setIsSettingsOpen }) => {
  const { algorithm, setAlgorithm, speed, setSpeed } = useSettingsStore();

  const algNameSelected =
    Object.keys(algorithms).find((v) => algorithms[v] === algorithm) ||
    "Breath First Search";

  const speedNameSelected =
    Object.keys(speeds).find((v) => speeds[v] === speed) || "fast";

  return (
    <div
      className="h-full w-full absolute top-0 left-0 z-10"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
    >
      <div
        className="bg-white w-full h-full md:w-1/2 md:h-1/2 md:top-1/2 md:left-1/2 md:transform md:translate-x-1/2 md:translate-y-1/2 rounded-lg p-4"
        onBlur={(event) =>
          !event.currentTarget.contains(event.relatedTarget) &&
          setIsSettingsOpen(false)
        }
      >
        <div className="flex flex-col items-start">
          <div className="flex w-full justify-end">
            <button onClick={() => setIsSettingsOpen(false)}>
              <XIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="flex flex-col space-y-6 w-full">
          <div className="flex items-center space-x-2">
            <CogIcon className="w-8 h-8 text-gray-800" />
            <h1 className="text-3xl font-semibold text-gray-800">Settings</h1>
          </div>
          <div className="ml-3 flex items-center justify-between pr-8">
            <p className="text-gray-700 font-medium ">Choose the algorithm</p>
            <FormSelector
              selection={Object.keys(algorithms)}
              selected={algNameSelected}
              setSelected={(a) => {
                setAlgorithm(algorithms[a]);
              }}
            />
          </div>
          <div className="ml-3 flex items-center justify-between pr-8">
            <p className="text-gray-700 font-medium ">Animation speed</p>
            <FormSelector
              selection={Object.keys(speeds)}
              selected={speedNameSelected}
              setSelected={(s) => {
                setSpeed(speeds[s]);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
