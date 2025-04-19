import PropTypes from 'prop-types';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

const Button = ({ text, onClick, variant = "primary", disabled = false, icon, className = "", loading = false }) => {
    const variants = {
        primary: "bg-[#00B56F] text-white text-xs font-semibold px-4 py-2 m-1 rounded-sm flex items-center space-x-2 hover:bg-[#09a567] transition duration-300",
        secondary: "bg-[#2489f4] text-white text-xs font-semibold px-4 py-2 m-1 rounded-sm flex items-center space-x-2 ml-4 hover:bg-[#1179e0] transition duration-300",
        danger: "bg-red-500 text-white text-xs font-semibold px-4 py-2 m-1 rounded-sm space-x-2 hover:bg-red-700 transition duration-300",
        disabled: "bg-gray-300 text-gray-700 cursor-not-allowed",
    };

    return (
        <button
            onClick={onClick}
            className={twMerge(
                clsx(
                    variants[variant],
                    className,
                    disabled && variants.disabled
                )
            )}
            disabled={disabled}
        >
            {/* Show icon only if not loading */}
            {icon && !loading && <span className="mr-2">{icon}</span>}
            {/* Loading spinner */}
            {loading && (
                <span className="mr-2">
                    <svg
                        className="animate-spin h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        ></path>
                    </svg>
                </span>
            )}
            {/* Button text */}
            {text}
        </button>

    );
}

Button.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'disabled']),
    disabled: PropTypes.bool,
    icon: PropTypes.node,
    className: PropTypes.string,
};

export default Button;
