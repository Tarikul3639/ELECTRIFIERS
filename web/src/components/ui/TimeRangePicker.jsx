// TimeRangePicker.jsx
import React from "react";

const TimeRangePicker = ({ startTime, endTime, onStartTimeChange, onEndTimeChange }) => {
  return (
    <div className="flex items-center justify-center space-x-2 m-1 border border-gray-900 rounded text-sm font-semibold">
      <input
        type="time"
        value={startTime}
        onChange={onStartTimeChange}
        className="no-border py-2 text-sm w-full h-full px-2"
      />
      <span className="text-lg">-</span>
      <input
        type="time"
        value={endTime}
        onChange={onEndTimeChange}
        className="no-border py-2 text-sm w-full h-full px-2"
      />
    </div>
  );
};

export default TimeRangePicker;
