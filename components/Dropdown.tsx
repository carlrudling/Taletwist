import React from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

interface DropdownProps {
  selectedSubject: string;
  setSelectedSubject: (subject: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ selectedSubject, setSelectedSubject }) => {
  const handleMenuItemClick = (value: string) => {
    setSelectedSubject(value);
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-between gap-x-1.5 font-SourceSansPro rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          {selectedSubject}
          <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            {({ active }) => (
              <button
                onClick={() => handleMenuItemClick('New Feature')}
                className={`block w-full text-left font-SourceSansPro px-4 py-2 text-sm ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}
              >
                New Feature
              </button>
            )}
          </MenuItem>
          <MenuItem>
            {({ active }) => (
              <button
                onClick={() => handleMenuItemClick('Bug')}
                className={`block w-full text-left font-SourceSansPro px-4 py-2 text-sm ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}
              >
                Bug
              </button>
            )}
          </MenuItem>
          <MenuItem>
            {({ active }) => (
              <button
                onClick={() => handleMenuItemClick('Other')}
                className={`block w-full text-left px-4 py-2 font-SourceSansPro text-sm ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}
              >
                Other
              </button>
            )}
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
};

export default Dropdown;
