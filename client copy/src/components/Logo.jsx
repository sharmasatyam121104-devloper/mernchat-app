import React from "react";

const Logo = () => {
  return (
    <div className="flex items-center space-x-2 bg-gray-900 p-2 sm:p-3 rounded-md shadow-lg">
      {/* Icon */}
      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-600 rounded-full flex items-center justify-center text-white text-lg sm:text-xl font-bold">
        T
      </div>

      {/* Text */}
      <span className="text-white text-xl sm:text-2xl font-extrabold tracking-wide">
        TalkTo
      </span>
    </div>
  );
};

export default Logo;
