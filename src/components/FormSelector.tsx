import { ChevronDownIcon } from "@heroicons/react/outline";
import React, { useState } from "react";

interface FormSelectorProps {
  selected: any;
  setSelected: (a: any) => void;
  selection: any[];
}

const FormSelector: React.FC<FormSelectorProps> = ({
  selected,
  setSelected,
  children,
  selection,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={() => setIsOpen((s) => !s)}
        >
          <div className="flex items-center justify-between space-x-2">
            <span>{selected}</span>
            <ChevronDownIcon className="w-4 h-4" />
          </div>
        </button>
      </div>
      {isOpen && (
        <div
          className="z-10 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div className="py-1" role="none">
            {selection.map((a, i) => (
              <a
                key={i}
                href="#"
                className="text-gray-700 block px-4 py-2 text-sm"
                role="menuitem"
                tabIndex={-1}
                id="menu-item-0"
                onClick={() => {
                  setSelected(a);
                  setIsOpen(false);
                }}
              >
                {a}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FormSelector;
