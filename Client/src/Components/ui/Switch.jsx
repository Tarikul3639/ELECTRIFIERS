import React, { useState } from 'react';

const CustomSwitch = ({ isOn, handleToggle }) => {
  return (
    <div
      onClick={handleToggle}
      className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
        isOn ? 'bg-[#155DFC]' : 'bg-gray-500'
      }`}
    >
      <div
        className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${
          isOn ? 'translate-x-6' : 'translate-x-0'
        }`}
      ></div>
    </div>
  );
};

export default CustomSwitch;
