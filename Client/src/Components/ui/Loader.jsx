import React from "react";
import PulseLoader from "react-spinners/PulseLoader";

const Loader = (loading) => {

    if (!loading) return null;

    return (
        <div className="fixed top-16 left-1/2 transform -translate-x-1/2 z-50">
            <PulseLoader
                color="#00c896"
                cssOverride={{}}
                margin={0}
                size={20}
                speedMultiplier={0.9}
            />
        </div>
    );
};

export default Loader;
