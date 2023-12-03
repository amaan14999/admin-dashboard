import React from "react";
import "./assets/Pagination.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faAnglesRight,
  faAngleLeft,
  faAnglesLeft,
} from "@fortawesome/free-solid-svg-icons";

const Pagination = ({ rowsPerPage, totalRows, paginate, currentPage }) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination-wrapper">
      <div className="pagination-info">
        Page {currentPage} of {totalPages}
      </div>
      <nav className="pagination-nav">
        <ul className="pagination">
          <li>
            <button
              className="first-page"
              onClick={() => paginate(1)}
              disabled={currentPage === 1}
            >
              <FontAwesomeIcon icon={faAnglesLeft} />
            </button>
          </li>
          <li>
            <button
              className="prev-page"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <FontAwesomeIcon icon={faAngleLeft} />
            </button>
          </li>
          {pageNumbers.map((number) => (
            <li key={number}>
              <button
                onClick={() => paginate(number)}
                className={currentPage === number ? "active" : ""}
              >
                {number}
              </button>
            </li>
          ))}
          <li>
            <button
              className="next-page"
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === pageNumbers.length}
            >
              <FontAwesomeIcon icon={faAngleRight} />
            </button>
          </li>
          <li>
            <button
              className="last-page"
              onClick={() => paginate(pageNumbers.length)}
              disabled={currentPage === pageNumbers.length}
            >
              <FontAwesomeIcon icon={faAnglesRight} />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
