const StatusColumn = ({ showEdit, status, _id }) => {
    return (
        <>
            {status === "Active" ? (
                <div className="text-green-500 text-sm font-medium px-1 py-1 rounded text-center placeholder:text-center focus:outline-none focus:ring-0 border-none bg-transparent cursor-default">
                    {status}
                </div>
            ) : status === "Completed" ? (
                <div className="text-gray-500 text-sm font-medium px-1 py-1 rounded text-center placeholder:text-center focus:outline-none focus:ring-0 border-none bg-transparent cursor-default">
                    {status}
                </div>
            ) : (
                <div className="text-orange-500 text-sm font-medium px-1 py-1 rounded text-center placeholder:text-center focus:outline-none focus:ring-0 border-none bg-transparent cursor-default">
                    {status}
                </div>
            )}
        </>
    );
}

export default StatusColumn;