import PropTypes from 'prop-types';

const Button = ({ text, onClick, variant = "primary", disabled = false, icon, className = "" }) => {
    const variants = {
        primary: "bg-[#00B56F] text-white text-xs font-semibold px-4 py-2 m-1 rounded-sm flex items-center space-x-2 hover:bg-[#09a567] transition duration-300",
        secondary: "bg-[#2489f4] text-white text-xs font-semibold px-4 py-2 m-1 rounded-sm flex items-center space-x-2 ml-4 hover:bg-[#1179e0] transition duration-300",
        danger: "bg-red-500 text-white text-xs font-semibold px-4 py-2 m-1 rounded-sm space-x-2 hover:bg-red-700 transition duration-300",
        disabled: "bg-gray-300 text-gray-700 cursor-not-allowed",
    };

    return (
        <button
            onClick={onClick}
            className={`${variants[variant]} ${className}`}
            disabled={disabled}
        >
            {icon && <span className="mr-2">{icon}</span>}
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
