import React from "react";

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="w-[160px] h-[160px] border-t-4 border-b-4 border-primaryPurple rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
