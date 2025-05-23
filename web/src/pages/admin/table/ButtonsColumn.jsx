import React from "react";
import Button from "../../../components/ui/Button.jsx";

const EditButtons = ({
    _Id,
    showEdit,
    handleEdit,
    handleUpdate,
    handleCancel,
    loadingForUpdate,
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
                        loading={loadingForUpdate === _Id}
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
