import React from 'react';

interface PaginationProps {
    currentPage: number;
    setCurrentPage: (page: number) => void;
    totalItems: number;
    itemsPerPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, setCurrentPage, totalItems, itemsPerPage }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };
 

    return (
        <div className="flex justify-center my-20 gap-2">
            
            {/* Page Numbers */}
            {[...Array(totalPages)].map((_, index) => {
                const pageNumber = index + 1;
                return (
                    <button
                        key={pageNumber}
                        onClick={() => setCurrentPage(pageNumber)}
                        className={`w-12 h-12 rounded-lg border border-gray-500 
                        ${currentPage === pageNumber ? "bg-[#B88E2F] text-white" : "bg-gray-200 hover:bg-[#B88E2F] hover:text-white"}`}
                    >
                        {pageNumber}
                    </button>
                );
            })}

            {/* Next Button */}
            <button 
                onClick={handleNext} 
                disabled={currentPage === totalPages} 
                className={`w-16 h-12 rounded-lg border border-gray-500 ${currentPage === totalPages ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-gray-200 hover:bg-[#B88E2F] hover:text-white"}`}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
