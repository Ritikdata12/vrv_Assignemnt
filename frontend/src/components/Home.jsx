import React, { useState } from "react";
import UserManagement from "./UserManagement";
import RoleManagement from "./RoleManagement";
import PermissionManagement from "./Permissionmanagement";



const Home = () => {
  const [currentTab, setCurrentTab] = useState("users");
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div
      className={`min-h-screen ${
        theme === "light" ? "bg-gray-100 text-black" : "bg-gray-900 text-white"
      } overflow-hidden`}
    >
      <header
        className={`${
          theme === "light"
            ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
            : "bg-gray-800 text-gray-200"
        } p-4 shadow-md`}
      >
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold animate-fade-in-down">
            RBAC Admin Dashboard
          </h1>
          <button
            onClick={toggleTheme}
            className={`p-2 rounded ${
              theme === "light"
                ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
                : "bg-gray-700 text-white hover:bg-gray-600"
            }`}
          >
            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </button>
        </div>
      </header>
      <main className="p-6">
        <div className="mb-4">
          <nav className="flex space-x-4">
            <button
              className={`px-4 py-2 rounded transform transition-all duration-300 ${
                currentTab === "users"
                  ? "bg-blue-500 text-white scale-105"
                  : `${
                      theme === "light"
                        ? "bg-white text-gray-800 border hover:bg-gray-200"
                        : "bg-gray-700 text-gray-200 border-gray-600 hover:bg-gray-600"
                    }`
              }`}
              onClick={() => setCurrentTab("users")}
            >
              User Management
            </button>
            <button
              className={`px-4 py-2 rounded transform transition-all duration-300 ${
                currentTab === "roles"
                  ? "bg-blue-500 text-white scale-105"
                  : `${
                      theme === "light"
                        ? "bg-white text-gray-800 border hover:bg-gray-200"
                        : "bg-gray-700 text-gray-200 border-gray-600 hover:bg-gray-600"
                    }`
              }`}
              onClick={() => setCurrentTab("roles")}
            >
              Role Management
            </button>
            <button
              className={`px-4 py-2 rounded transform transition-all duration-300 ${
                currentTab === "permissions"
                  ? "bg-blue-500 text-white scale-105"
                  : `${
                      theme === "light"
                        ? "bg-white text-gray-800 border hover:bg-gray-200"
                        : "bg-gray-700 text-gray-200 border-gray-600 hover:bg-gray-600"
                    }`
              }`}
              onClick={() => setCurrentTab("permissions")}
            >
              Permission Management
            </button>
          </nav>
        </div>
        <div
          className={`${
            theme === "light" ? "bg-white text-black" : "bg-gray-800 text-gray-200"
          } p-6 rounded shadow-lg animate-fade-in-up`}
          key={currentTab}
        >
          {currentTab === "users" && <UserManagement />}
          {currentTab === "roles" && <RoleManagement />}
          {currentTab === "permissions" && <PermissionManagement />}
        </div>
      </main>
    </div>
  );
};

export default Home;
