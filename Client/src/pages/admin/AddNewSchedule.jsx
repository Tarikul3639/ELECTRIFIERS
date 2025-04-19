import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/ui/Button.jsx";
import DatePicker from "../../components/ui/DatePicker.jsx";
import CustomSelect from "../../components/ui/Select.jsx";

const AddNewRow = ({
    newUser,
    scheduleTimes,
    handleNewDateChange,
    handleScheduleTimeChange,
    handleAddNew,
    setShowEdit,
}) => {
    return (
        <tr className="border border-gray-500 border-solid bg-white text-gray-700 text-center">
            <td className="px-1 py-2 border-3 border-gray-200"></td>
            <td className="px-0 py-0 border-3 border-gray-200">
                <input
                    type="text"
                    name="day"
                    value={newUser.day}
                    readOnly
                    className="border-1 px-1 py-1 rounded text-center placeholder:text-center focus:outline-none focus:ring-0 cursor-default"
                />
            </td>
            <td className="px-0 py-0 border-0 border-gray-200 flex items-center justify-center ">
                <DatePicker
                    selected={newUser.date ? new Date(newUser.date) : null}
                    onChange={handleNewDateChange}
                    placeholderText="Select a New Date"
                    dateFormat="yyyy-MM-dd"
                    classNames={{
                        Button: () => "flex justify-center items-center bg-white text-gray-700 border-1 border-gray-700 text-sm font-medium px-0 max-w-[200px] py-1 rounded-sm shadow-none hover:bg-gray-100",
                        Input: () => "border-0 px-0 py-1 text-gray-700 rounded text-center placeholder:text-center",
                        Icon: () => "mr-1",
                    }}

                />
            </td>

            <td className="px-0 py-0 border-3 border-gray-200">
                <CustomSelect
                    value={scheduleTimes.find((time) => time === newUser.scheduleTime) ? {
                        value: newUser.scheduleTime, label: newUser.scheduleTime
                    } : null}
                    onChange={(e) => handleScheduleTimeChange("new", e)}
                    options={scheduleTimes.map((time) => ({ value: time, label: time }))}
                    classNames={
                        {
                            menuButton: () => " bg-white text-gray-700 border-1 m-1 text-sm font-medium w-auto font-semibold min-w-[120px] rounded-sm  shadow-none hover:bg-white",
                            menu: " z-50 bg-white w-full text-sm shadow-lg rounded-sm mt-1 p-0",
                            listItem: ({ isSelected }) => (
                                `block transition duration-200 pl-2 py-2 mt-1 mb-1 cursor-pointer select-none truncate rounded-none ${isSelected
                                    ? ` bg-[#00287e] text-white hover:bg-[#00287e] `
                                    : `text-gray-700`
                                }`
                            ),
                        }
                    }
                />
            </td>

            <td className="px-0 py-1 m-0 border-0 border-gray-10 flex items-center justify-center ">
                <Button
                    text="Add"
                    onClick={handleAddNew}
                    variant="primary"
                    icon={<FontAwesomeIcon icon={faPlus} className="text-[1rem]" />}
                />
            </td>

            <td className="px-0 py-1 border-3 border-gray-200">
                <Button
                    text="DELETE"
                    onClick={() => setShowEdit(null)}
                    variant="danger"
                />
            </td>
        </tr>
    );
};

export default AddNewRow;