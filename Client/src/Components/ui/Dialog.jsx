import React from "react";

const Dialog = ({ isOpen, title, message, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed h-[100vh] w-[100vw] inset-0 bg-black/70 z-50 flex items-center justify-center">
            <div className="flex flex-col space-y-2 bg-white rounded-lg shadow-2xl w-full max-w-lg px-4 py-3">
                {/* Title */}
                <h2 className="text-left text-gray-800 text-lg font-semibold text-center mb-3">
                    {title}
                </h2>

                {/* Content */}
                <div className="text-left text-gray-700 text-center mb-6 ">
                    {message}
                </div>

                {/* Actions */}
                <div className="flex justify-end ">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-sm font-[600] tracking-[-0.01em] text-blue-600 hover:bg-blue-200 transition"
                    >
                        DISAGREE
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 rounded-sm text-blue-600 font-[600] tracking-[-0.01em] hover:bg-blue-200 transition"
                    >
                        AGREE
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dialog;
