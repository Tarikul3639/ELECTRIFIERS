import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaRegCalendarAlt } from "react-icons/fa";

const ScheduleTable = ({ users, showEdit, setShowEdit, handleEdit, handleDelete, handleUpdate, handleCancel, handleDateChange, handleScheduleTimeChange, scheduleTimes, newUser, handleAddNew, handleNewUserChange, handleNewDateChange }) => {

    const renderEditButtons = (userId, day, date, scheduleTime) => {
        return showEdit === userId ? (
            <div className="flex items-center justify-center space-x-2">
                <button
                    onClick={() => handleUpdate(userId, day, date, scheduleTime)}
                    className="bg-[#00B56F] text-white text-xs font-semibold px-4 py-2 rounded-sm space-x-2 hover:bg-[#09a567] transition duration-300"
                >
                    UPDATE
                </button>
                <button
                    onClick={() => handleCancel(userId)}
                    className="bg-red-500 text-white text-xs font-semibold px-4 py-2 rounded-sm space-x-2 hover:bg-red-700 transition duration-300"
                >
                    CANCEL
                </button>
            </div>
        ) : (
            <button
                onClick={() => handleEdit(userId)}
                className="bg-[#00B56F] text-white text-xs font-semibold px-4 py-2 rounded-sm space-x-2 hover:bg-[#09a567] transition duration-300"
            >
                EDIT
            </button>
        );
    };

    return (
        <div className="overflow-auto">
            <table className="min-w-full border-collapse bg-white border border-gray-200">
                <thead>
                    <tr className="border border-gray-500 border-solid bg-white text-gray-700">
                        <th className="px-1 py-2 border-3 border-gray-200">ID</th>
                        <th className="px-1 py-2 border-3 border-gray-200">Day</th>
                        <th className="px-1 py-2 border-3 border-gray-200">Date</th>
                        <th className="px-1 py-2 border-3 border-gray-200">Schedule Time</th>
                        <th className="px-1 py-2 border-3 border-gray-200">EDIT</th>
                        <th className="px-1 py-2 border-3 border-gray-200">DELETE</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map(({ id, day, date, scheduleTime }) => (
                        <tr key={id} className="border border-gray-500 border-solid bg-white text-gray-700 text-center">
                            <td className="px-1 py-2 border-3 border-gray-200">{id}</td>
                            <td className="px-1 py-2 border-3 border-gray-200">
                                {showEdit === id ? (
                                    <input
                                        type="text"
                                        value={day}
                                        readOnly
                                        className="text-gray-700 text-sm font-medium px-1 py-1 rounded text-center placeholder:text-center 
                       focus:outline-none focus:ring-0 border-none bg-transparent cursor-default"
                                    />
                                ) : (
                                    day
                                )}
                            </td>

                            <td className="px-1 py-2 border-3 border-gray-200">
                                {showEdit === id ? (
                                    <div className="flex items-center justify-center ">
                                        <DatePicker
                                            selected={new Date(date)}
                                            onChange={(date) => handleDateChange(id, date)}
                                            className="text-gray-700 text-sm font-medium px-1 py-1 rounded flex text-center placeholder:text-center"
                                            dateFormat="yyyy-MM-dd"
                                        />
                                        <FaRegCalendarAlt className="text-gray-00 pointer-events-none" />
                                    </div>
                                ) : (
                                    date
                                )}
                            </td>
                            <td className="px-1 py-2 border-3 border-gray-200">
                                {showEdit === id ? (
                                    <select
                                        value={scheduleTime}
                                        onChange={(e) => handleScheduleTimeChange(id, e.target.value)}
                                        className="text-gray-700 text-sm font-medium px-1 py-1 rounded"
                                    >
                                        {scheduleTimes.map((time) => (
                                            <option key={time} value={time}>
                                                {time}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    scheduleTime
                                )}
                            </td>
                            <td className="px-1 py-2 border-3 border-gray-200">
                                {renderEditButtons(id, day, date, scheduleTime)}
                            </td>
                            <td className="px-1 py-2 border-3 border-gray-200">
                                <button
                                    onClick={() => handleDelete(id)}
                                    className="bg-red-500 text-white text-xs font-semibold px-4 py-2 rounded-sm space-x-2 hover:bg-red-700 transition duration-300"
                                >
                                    DELETE
                                </button>
                            </td>
                        </tr>
                    ))}
                    {showEdit === "new" && (
                        <tr className="border border-gray-500 border-solid bg-white text-gray-700 text-center">
                            <td className="px-1 py-2 border-3 border-gray-200"></td>
                            <td className="px-0 py-0 border-3 border-gray-200">
                                <input
                                    type="text"
                                    name="day"
                                    value={newUser.day}
                                    readOnly
                                    className="border px-1 py-1 rounded text-center placeholder:text-center"
                                />
                            </td>
                            <td className="px-0 py-0 border-3 border-gray-200">
                                <DatePicker
                                    selected={newUser.date ? new Date(newUser.date) : null}
                                    onChange={handleNewDateChange}
                                    className="border px-1 py-1 rounded text-center placeholder:text-center"
                                    dateFormat="yyyy-MM-dd"
                                    placeholderText="Select a date"
                                />
                            </td>

                            <td className="px-0 py-0 border-3 border-gray-200">
                                <select
                                    name="scheduleTime"
                                    value={newUser.scheduleTime}
                                    onChange={handleNewUserChange}
                                    className="border px-1 py-1 rounded text-center placeholder:text-center"
                                >
                                    {scheduleTimes.map((time) => (
                                        <option key={time} value={time}>
                                            {time}
                                        </option>
                                    ))}
                                </select>
                            </td>
                            <td className="px-0 py-0 border-3 border-gray-200">
                                <button
                                    onClick={handleAddNew}
                                    className="bg-[#00B56F] text-white text-xs font-semibold px-4 py-2 rounded-sm space-x-2 hover:bg-[#09a567] transition duration-300"
                                >
                                    Add
                                    <span className="hidden md:inline-block pl-1">New</span>
                                </button>

                            </td>
                            <td className="px-0 py-1 border-3 border-gray-200">
                                <button
                                    onClick={() => setShowEdit(null)}
                                    className="bg-red-500 text-white text-xs font-semibold px-4 py-2 rounded-sm space-x-2 hover:bg-red-700 transition duration-300"
                                >
                                    DELETE
                                </button>
                            </td>
                        </tr>
                    )}

                </tbody>
            </table>
        </div>
    );
};
ScheduleTable.propTypes = {
    users: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            day: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
            scheduleTime: PropTypes.string.isRequired,
        })
    ).isRequired,
    showEdit: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    setShowEdit: PropTypes.func.isRequired,
    handleEdit: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleUpdate: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired,
    handleDateChange: PropTypes.func.isRequired,
    handleScheduleTimeChange: PropTypes.func.isRequired,
    scheduleTimes: PropTypes.arrayOf(PropTypes.string).isRequired,
    newUser: PropTypes.shape({
        day: PropTypes.string,
        date: PropTypes.string,
        scheduleTime: PropTypes.string,
    }).isRequired,
    handleAddNew: PropTypes.func.isRequired,
    handleNewUserChange: PropTypes.func.isRequired,
    handleNewDateChange: PropTypes.func.isRequired,
};

export default ScheduleTable;