const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
    const getPageNumbers = () => {
        let pageNumbers = [];
        let startPage = Math.max(1, currentPage - 1); 
        let endPage = Math.min(totalPages, currentPage + 1);

        if (startPage === 1) {
            endPage = Math.min(3, totalPages);
        }
        if (endPage === totalPages) {
            startPage = Math.max(totalPages - 2, 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    };

    return (
        <div className="p-6 flex flex-col md:flex-row md:justify-end items-center justify-between border-t border-gray-100 gap-4">
            <div className="flex items-center gap-2">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 disabled:opacity-40 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                    Previous
                </button>

                <div className="flex items-center gap-1">
                    {getPageNumbers().map((page, idx) => (
                        <button
                            key={idx}
                            onClick={() => handlePageChange(page)}
                            className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-bold transition-all cursor-pointer ${
                                currentPage === page
                                    ? "bg-primary text-white shadow-sm"
                                    : "text-gray-500 hover:bg-gray-100"
                            }`}
                        >
                            {page}
                        </button>
                    ))}
                </div>

                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 disabled:opacity-40 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Pagination