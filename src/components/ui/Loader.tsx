import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 z-50">
      <div className="animate-spin rounded-full border-4 border-t-4 border-t-white border-gray-600 h-32 w-32"></div>
    </div>
  );
};

export default Loader;
