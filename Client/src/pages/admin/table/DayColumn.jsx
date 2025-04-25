import React from 'react';
import { format } from "date-fns";
const Day = ({ showEdit, date, _id }) => {
    return (
        <>
            {showEdit === _id ? (
                <div
                    className="text-gray-700 text-sm font-medium px-1 py-1 rounded text-center placeholder:text-center focus:outline-none focus:ring-0 border-none bg-transparent cursor-default"
                >
                    {format(new Date(date), "EEEE")}
                </div>
            ) : (
                format(new Date(date), "EEEE")
            )}
        </>
    );
}
export default Day;