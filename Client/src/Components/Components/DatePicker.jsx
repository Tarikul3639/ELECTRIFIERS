import { useRef } from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { clsx } from "clsx";
import { FaRegCalendarAlt } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

const CustomDatePicker = ({
  selected,
  onChange,
  classNames = {},
  dateFormat = "yyyy-MM-dd"
}) => {
  const datepickerRef = useRef(null); 

  const toggleDatePicker = () => {
    if (datepickerRef.current) {
      console.log("DatePicker ref:", datepickerRef.current);
      datepickerRef.current.setOpen(!datepickerRef.current.isCalendarOpen());
    }
  };

  return (
    <div
      className={twMerge(
        clsx(
          "flex items-center",
          classNames.Button ? classNames.Button() : ""
        )
      )}
    >
      {/* ✅ `ref` is set for the DatePicker */}
      <DatePicker
        ref={datepickerRef}
        selected={selected}
        onChange={onChange}
        dayClassName={() =>
          classNames.Day ? classNames.Day() : ""
        }
        calendarClassName={() =>
          classNames.Calendar ? classNames.Calendar() : ""
        }
        clearButtonClassName={() =>
          classNames.ClearButton ? classNames.ClearButton() : ""
        }
        weekDayClassName={() =>
          classNames.WeekDay ? classNames.WeekDay() : ""
        }
        yearClassName={() =>
          classNames.Year ? classNames.Year() : ""
        }
        popperClassName={() =>
          classNames.Popper ? classNames.Popper() : ""
        }
        timeClassName={() =>
          classNames.Time ? classNames.Time() : ""
        }
        wrapperClassName={() =>
          classNames.Wrapper ? classNames.Wrapper() : ""
        }
        calendarIconClassName={() =>
          twMerge(
            // "bg-gray-200 rounded-full p-1",
            classNames.CalendarIcon ? classNames.CalendarIcon() : ""
          )
        }
        className={twMerge(
          clsx(
            "text-gray-700 text-sm font-medium w-auto font-semibold min-w-[120px] rounded text-center border placeholder:text-center h-full focus:outline-none",
            classNames.Input ? classNames.Input() : ""
          )
        )}
        dateFormat={dateFormat}
      />
      {/* ✅ Clicking on the icon will toggle the DatePicker */}
      <div onClick={toggleDatePicker} className="cursor-pointer">
        <FaRegCalendarAlt
          className={twMerge(
            clsx(
              "text-gray-600 hover:text-gray-900 ml-1",
              classNames.Icon ? classNames.Icon() : ""
            )
          )}
        />
      </div>
    </div>
  );
};

CustomDatePicker.propTypes = {
  selected: PropTypes.instanceOf(Date),
  onChange: PropTypes.func.isRequired,
  classNames: PropTypes.shape({
    Button: PropTypes.func,
    Icon: PropTypes.func,
    Calendar: PropTypes.func,
    Day: PropTypes.func,
    ClearButton: PropTypes.func,
    WeekDay: PropTypes.func,
    Year: PropTypes.func,
    Popper: PropTypes.func,
    Time: PropTypes.func,
    Wrapper: PropTypes.func,
    CalendarIcon: PropTypes.func,
    Input: PropTypes.func,
  }),
  dateFormat: PropTypes.string,
};

export default CustomDatePicker;
