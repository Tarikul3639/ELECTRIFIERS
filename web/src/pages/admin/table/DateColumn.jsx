import DatePicker from "../../../components/ui/DatePicker.jsx";
import { format } from "date-fns";
const DateColumn = ({ showEdit, date, _id, setUpdateSchedule, updateSchedule }) => {
    return (
        <>
            {showEdit === _id ? (
                <div className="flex items-center justify-center ">
                    <DatePicker
                        selected={updateSchedule.date ? new Date(updateSchedule.date) : new Date(date)}
                        onChange={(date) => setUpdateSchedule((prev) => ({
                            ...prev,
                            id: _id,
                            date: date,
                        }))}
                        classNames={{
                            Button: () => "bg-white text-gray-700 border-1 border-gray-700 m-1 text-sm font-medium w-auto px-1 py-1 min-w-[120px] rounded-sm  shadow-none hover:bg-gray-100",
                            Input: () => "border-0 px-1 py-1 rounded text-center placeholder:text-center",
                        }}
                        dateFormat="yyyy-MM-dd"
                    />
                </div>
            ) : (
                format(new Date(date), "yyyy-MM-dd")
            )}
        </>
    );
}
export default DateColumn;