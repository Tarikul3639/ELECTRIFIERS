import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { HiOutlineChevronRight } from 'react-icons/hi';
import { createPortal } from 'react-dom';
import { twMerge } from 'tailwind-merge';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const CustomSelect = ({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  classNames = {},
  isSearchable = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPlaceholder, setCurrentPlaceholder] = useState(placeholder);
  const [dropdownPositionStyle, setDropdownPositionStyle] = useState({});
  const selectRef = useRef(null);
  const dropdownRef = useRef(null);

  const calculatePosition = useCallback(() => {
    if (!selectRef.current) return;

    const selectRect = selectRef.current.getBoundingClientRect();
    const selectWidth = selectRef.current.offsetWidth;
    const spaceBelow = window.innerHeight - selectRect.bottom;
    const spaceAbove = selectRect.top;
    const maxHeight = 240;

    let top, bottom, maxHeightValue;

    if (spaceBelow >= maxHeight || spaceBelow > spaceAbove) {
      top = selectRect.bottom;
      maxHeightValue = Math.min(spaceBelow - 10, maxHeight);
    } else {
      bottom = window.innerHeight - selectRect.top;
      maxHeightValue = Math.min(spaceAbove - 10, maxHeight);
    }

    setDropdownPositionStyle({
      position: 'absolute',
      top: top ? `${top}px` : undefined,
      bottom: bottom ? `${bottom}px` : undefined,
      left: selectRect.left + window.scrollX,
      width: `${selectWidth}px`,
      maxHeight: `${maxHeightValue}px`,
      zIndex: 2147483647,
    });
  }, []);

  const handleToggle = useCallback(() => {
    if (!isOpen) calculatePosition();
    setIsOpen((prev) => !prev);
  }, [isOpen, calculatePosition]);

  const handleSelect = useCallback((option) => {
    // console.log('Selected option:', option);
    onChange(option);
    setCurrentPlaceholder(option.label);
    setIsOpen(false);
    setSearchTerm('');
  }, [onChange]);

  const filteredOptions = useMemo(() =>
    options.filter((option) =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [options, searchTerm]
  );

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!selectRef.current?.contains(e.target) && !dropdownRef.current?.contains(e.target)) {
        setIsOpen(false);
      }
    };

    const handleScrollResize = () => {
      if (isOpen) calculatePosition();
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScrollResize, { passive: true });
    window.addEventListener('resize', handleScrollResize);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScrollResize);
      window.removeEventListener('resize', handleScrollResize);
    };
  }, [calculatePosition, isOpen]);

  return (
    <div ref={selectRef} className="relative inline-block" aria-expanded={isOpen}>
      <div
        className={twMerge(
          clsx(
            'bg-black px-4 py-2 text-white rounded-md cursor-pointer flex items-center justify-between pr-2',
            classNames.menuButton ? classNames.menuButton() : ""
          )
        )}
        onClick={handleToggle}
      >
        {isOpen && isSearchable ? (
          <input
            type="text"
            className="w-0 flex-1 bg-transparent text-white outline-none placeholder-gray-400"
            placeholder={currentPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
        ) : (
          <span className="truncate mr-1">{value?.label || currentPlaceholder}</span>
        )}
        <span
          className={`flex items-center transition-transform duration-500 text-[14px] ${isOpen ? "rotate-90 text-gray-500" : "rotate-0"
            }`}
        >
          <HiOutlineChevronRight strokeWidth={3.5} />
        </span>
      </div>

      {isOpen &&
        createPortal(
          <div
            ref={dropdownRef}
            className={twMerge(
              clsx(
                'border-2 border-gray-300 bg-white rounded-md shadow-lg overflow-y-auto',
                classNames.menu ? classNames.menu : ""
              )
            )}
            style={dropdownPositionStyle}
          >
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  className={twMerge(clsx(
                    // Default styles
                    'px-2 py-1 font-["Roboto"] text-black cursor-pointer hover:bg-[#DEEBFF] whitespace-nowrap tracking-wider',
                    // Conditional listItem styles and maximum priority applied last
                    classNames.listItem ? classNames.listItem({ isSelected: currentPlaceholder === option.value }) : ""
                  ))}
                  onClick={() => handleSelect(option)}
                >
                  {option.label}
                </div>

              ))
            ) : (
              <div
                className={twMerge(
                  clsx(
                    classNames.listItem ? classNames.listItem({ isSelected: false }) : "",
                    // Default style and Maximum priority applied last
                    "px-2 py-1 text-gray-500 hover:bg-transparent cursor-default"
                  )
                )}
              >
                Not found
              </div>
            )}
          </div>,
          document.body
        )}
    </div>
  );
};

CustomSelect.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  value: PropTypes.shape({
    value: PropTypes.any,
    label: PropTypes.string,
  }),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  classNames: PropTypes.shape({
    menuButton: PropTypes.func,
    menu: PropTypes.string,
    listItem: PropTypes.func,
  }),
  isSearchable: PropTypes.bool,
};

export default CustomSelect;
