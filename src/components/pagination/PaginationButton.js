// import React from "react";
import { colors } from "../../helpers/constants";

// const PaginationButton = ({ children, active, classes }) => {
//   return active ? (
//     <button
//       className={`bg-[${colors.orange}] h-11 w-11 rounded-lg flex justify-center items-center text-white ${classes}`}
//     >
//       {children}
//     </button>
//   ) : (
//     <button
//       className={`bg-white h-11 w-11 rounded-lg flex justify-center items-center text-black ${classes}`}
//     >
//       {children}
//     </button>
//   );
// };

// export default PaginationButton;
import React from "react";

const PaginationButton = ({ children, onClick, active, classes = "", disabled = false }) => {
  return (
    <button
      className={`h-11 w-11 rounded-lg flex justify-center items-center ${classes} ${active ? `bg-[${colors.orange}] text-white` : "bg-white text-black"} ${disabled ? "cursor-not-allowed" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default PaginationButton;