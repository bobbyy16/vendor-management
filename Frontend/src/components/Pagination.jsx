import React from 'react';

const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <tr>
      <td colSpan="9">
        <div className="flex justify-center items-center mt-4 mb-4">
          <ul className="flex justify-center items-center">
            {pageNumbers.map((number) => (
              <li key={number}>
                <button
                  className="px-3 py-1 border mx-1 rounded-md bg-orange-200 hover:bg-orange-300"
                  onClick={() => paginate(number)}
                >
                  {number}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </td>
    </tr>
  );
};

export default Pagination;
