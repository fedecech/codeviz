import { ChevronDownIcon, XIcon } from "@heroicons/react/outline";
import React, { useState } from "react";

interface SettingsProps {
  setIsSettingsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Settings: React.FC<SettingsProps> = ({ setIsSettingsOpen }) => {
  const [isAlgoSelectOpen, setIsAlgoSelectOpen] = useState(false);

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
        <div className="relative inline-block text-left">
          <div>
            <button
              type="button"
              className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
              id="menu-button"
              aria-expanded="true"
              aria-haspopup="true"
              onClick={() => setIsAlgoSelectOpen((s) => !s)}
            >
              Options
              <ChevronDownIcon className="w-7 h-7" />
            </button>
          </div>
          {isAlgoSelectOpen && (
            <div
              className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabIndex={-1}
            >
              <div className="py-1" role="none">
                <a
                  href="#"
                  className="text-gray-700 block px-4 py-2 text-sm"
                  role="menuitem"
                  tabIndex={-1}
                  id="menu-item-0"
                >
                  Account settings
                </a>
                <a
                  href="#"
                  className="text-gray-700 block px-4 py-2 text-sm"
                  role="menuitem"
                  tabIndex={-1}
                  id="menu-item-1"
                >
                  Support
                </a>
                <a
                  href="#"
                  className="text-gray-700 block px-4 py-2 text-sm"
                  role="menuitem"
                  tabIndex={-1}
                  id="menu-item-2"
                >
                  License
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
