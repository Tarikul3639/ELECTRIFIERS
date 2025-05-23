import React from "react";
import CustomSelect from "../../components/ui/Select.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faFilter } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/ui/Button.jsx";

const LocationFilter = ({onChangeLocation,locationData, loading}) => {
    const [location, setLocation] = React.useState({
        division: "",
        district: "",
    });

    const [showFilter, setShowFilter] = React.useState(false);

    // Handle division change
    const handleDivisionChange = (selected) => {
        const updated = {
            division: selected.value,
            district: "",
        };
        setLocation(updated);
        onChangeLocation?.(updated);
    };

    // Handle district change
    const handleDistrictChange = (selected) => {
        const updated = {
            ...location,
            district: selected.value,
        };
        setLocation(updated);
        onChangeLocation?.(updated);
    };

    const handleFilterClick = () => {
        if (Object.keys(locationData).length > 0) {
            setShowFilter((prev) => !prev);
        }
    };

    return (
        <>
            {/* Filter Button */}
            <Button
                text="Filter"
                onClick={handleFilterClick}
                variant="secondary"
                loading={loading}
                icon={
                    <FontAwesomeIcon
                        icon={faFilter}
                        className={`text-xs transition-transform duration-300 ${showFilter ? "rotate-90" : "rotate-0"}`}
                    />
                }
            />

            {/* Filter Dropdowns */}
            {showFilter && !loading && locationData && (
                <div className="transform translate-x-0 transition-transform duration-500 ease-in-out flex items-center space-x-2 ml-4">
                    {/* Division Select */}
                    <CustomSelect
                        value={location.division ? { value: location.division, label: location.division } : null}
                        options={Object.keys(locationData).map((div) => ({
                            value: div,
                            label: div,
                        }))}
                        placeholder="Select Division"
                        onChange={handleDivisionChange}
                        classNames={{
                            menuButton: () =>
                                " bg-[#0051a2] text-[#e7efff] text-xs w-auto font-semibold min-w-[120px] rounded-sm flex items-center hover:bg-[#00287e]",
                            menu: " z-50 bg-[#0051a2] w-full text-xs shadow-lg rounded-sm mt-1 p-0",
                            listItem: ({ isSelected }) =>
                                `block transition duration-200 pl-2 py-2 mt-1 mb-1 cursor-pointer select-none truncate rounded-none ${
                                    isSelected
                                        ? ` bg-[#00287e] text-white hover:bg-[#00287e] `
                                        : `text-white hover:bg-[#00287e]`
                                }`,
                        }}
                        isSearchable
                    />

                    {/* District Select */}
                    <CustomSelect
                        value={location.district ? { value: location.district, label: location.district } : null}
                        options={
                            (locationData[location.division] || []).map((district) => ({
                                value: district,
                                label: district,
                            }))
                        }
                        placeholder="Select District"
                        onChange={handleDistrictChange}
                        classNames={{
                            menuButton: () =>
                                " bg-[#0051a2] text-[#e7efff] text-xs w-auto font-semibold min-w-[120px] rounded-sm flex items-center hover:bg-[#00287e]",
                            menu: " z-50 bg-[#0051a2] w-full text-xs shadow-lg rounded-sm mt-1 p-0",
                            listItem: ({ isSelected }) =>
                                `block transition duration-200 pl-2 py-2 mt-1 mb-1 cursor-pointer select-none truncate rounded-none ${
                                    isSelected
                                        ? ` bg-[#00287e] text-white hover:bg-[#00287e] `
                                        : `text-white hover:bg-[#00287e]`
                                }`,
                        }}
                        isSearchable
                    />

                    {/* Optional Month Button */}
                    <button className="bg-[#2489f4] hidden text-white text-xs font-semibold px-4 py-2 rounded-sm flex items-center space-x-2 ml-4 hover:bg-[#1179e0] transition duration-300">
                        <FontAwesomeIcon icon={faCalendar} className="text-xs mr-2" />
                        Month
                    </button>
                </div>
            )}
        </>
    );
};

export default LocationFilter;
