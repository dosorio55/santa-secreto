import React from "react";

const Tabs = () => {
  return (
    <ul className="hidden text-sm font-medium text-center text-gray-500 rounded-lg divide-x divide-gray-200 shadow sm:flex dark:divide-gray-700 dark:text-gray-400">
      <li className="w-full">
        <div
          className="inline-block p-4 w-full text-gray-900 bg-gray-100 rounded-l-lg focus:ring-4 focus:ring-blue-300 active focus:outline-none dark:bg-gray-700 dark:text-white"
          aria-current="page"
        >
          <p>Profile</p>  
        </div>
      </li>
      <li className="w-full">
        <div className="inline-block p-4 w-full bg-white rounded-r-lg hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700">
          Invoice
        </div>
      </li>
    </ul>
  );
};

export default Tabs;
