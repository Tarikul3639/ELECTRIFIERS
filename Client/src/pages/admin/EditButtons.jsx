import React from "react";
import Button from "../../components/ui/Button.jsx";

const EditButtons = ({
    _Id,
    day,
    date,
    scheduleTime,
    showEdit,
    handleEdit,
    handleUpdate,
    handleCancel,
}) => {
    const isEditing = showEdit === _Id;

    return (
        <div className="flex items-center justify-center space-x-2">
            {isEditing ? (
                <>
                    <Button
                        text="Update"
                        onClick={() => handleUpdate(_Id)}
                        variant="primary"
                    />
                    <Button
                        text="Cancel"
                        onClick={() => handleCancel(_Id)}
                        variant="danger"
                    />
                </>
            ) : (
                <Button
                    text="Edit"
                    onClick={() => handleEdit(_Id)}
                    variant="primary"
                />
            )}
        </div>
    );
};

export default EditButtons;
