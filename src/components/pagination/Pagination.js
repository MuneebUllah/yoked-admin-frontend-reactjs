import React, { useState } from "react";
import { colors } from "../../helpers/constants";
import PaginationButton from "./PaginationButton";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const Pagination = ({ totalRecords = 0, perPage = 0, handleFetchNextRecords }) => {
  const numberOfPaginationButtons = Math.ceil(totalRecords / perPage);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageClick = (page) => {
    setCurrentPage(page);
    handleFetchNextRecords((page - 1) * perPage)
  };

  const handleNextClick = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, numberOfPaginationButtons));
    handleFetchNextRecords((currentPage) * perPage)
  };

  const handlePrevClick = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    handleFetchNextRecords((currentPage - 2) * perPage)
  };

  const renderPaginationButtons = () => {
    if (numberOfPaginationButtons <= 5) {
      return Array.from({ length: numberOfPaginationButtons }, (_, index) => (
        <PaginationButton
          key={index}
          active={index + 1 === currentPage}
          onClick={() => handlePageClick(index + 1)}
        >
          <p className=" text-lg font-medium">{index + 1}</p>
        </PaginationButton>
      ));
    } else {
      const buttons = [];
      let startPage, endPage;

      if (currentPage <= 3) {
        startPage = 1;
        endPage = 4;
      } else if (currentPage > numberOfPaginationButtons - 3) {
        startPage = numberOfPaginationButtons - 3;
        endPage = numberOfPaginationButtons;
      } else {
        startPage = currentPage - 1;
        endPage = currentPage + 2;
      }

      for (let i = startPage; i <= endPage; i++) {
        buttons.push(
          <PaginationButton
            key={i}
            active={i === currentPage}
            onClick={() => handlePageClick(i)}
          >
            <p className=" text-lg font-medium">{i}</p>
          </PaginationButton>
        );
      }

      return (
        <>
          {startPage > 1 && (
            <>
              <PaginationButton
                key={1}
                active={currentPage === 1}
                onClick={() => handlePageClick(1)}
              >
                <p className=" text-lg font-medium">1</p>
              </PaginationButton>
              {startPage > 2 && <p className="text-lg font-medium">...</p>}
            </>
          )}
          {buttons}
          {endPage < numberOfPaginationButtons && (
            <>
              {endPage < numberOfPaginationButtons - 1 && (
                <p className="text-lg font-medium">...</p>
              )}
              <PaginationButton
                key={numberOfPaginationButtons}
                active={currentPage === numberOfPaginationButtons}
                onClick={() => handlePageClick(numberOfPaginationButtons)}
              >
                <p className=" text-lg font-medium">{numberOfPaginationButtons}</p>
              </PaginationButton>
            </>
          )}
        </>
      );
    }
  };

  return (
    <div className="flex flex-row justify-between items-center px-4">
      <p className={`text-base text-[${colors.primary}] font-semibold`}>
        Showing {Math.min((currentPage - 1) * perPage + 1, totalRecords)}-
        {Math.min(currentPage * perPage, totalRecords)} of {totalRecords}
      </p>
      <div className="flex flex-row gap-2">
        <PaginationButton classes={"mx-2"} onClick={handlePrevClick} disabled={currentPage === 1}>
          <FaAngleLeft size={20} color="black" />
        </PaginationButton>
        {renderPaginationButtons()}
        <PaginationButton classes={"mx-2"} onClick={handleNextClick} disabled={currentPage === numberOfPaginationButtons}>
          <FaAngleRight size={20} color="black" />
        </PaginationButton>
      </div>
    </div>
  );
};

export default Pagination;
