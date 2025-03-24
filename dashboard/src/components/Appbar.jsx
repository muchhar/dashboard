import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Box, Container, Typography, Card, CardContent, Divider, Stack, useMediaQuery,Grid  } from '@mui/material';

const AppBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage menu visibility
  const isLargeScreen = useMediaQuery('(min-width: 1024px)'); // >= 1024px
  
  return (
    <div className="sticky fixed top-[20px] left-0 right-0 z-50 flex flex-row mt-[20px] ${isLargeScreen ? 'ml-[50px] mr-[50px]' : 'ml-[5px] mr-[5px]'} h-[62.5px] px-6 bg-[#212525] rounded-[100px] text-white text-base leading-6 font-inter">
      {/* Logo Section */}
      <div className="flex items-center">
        <a
          href="#"
          className="float-left text-[#333] no-underline relative mr-11"
        >
          <img
            alt=""
            src="https://cdn.prod.website-files.com/6793093080b39121c4d1a7e9/67931a4c5e4b4fe51bd965bf_Frame%201.svg"
            className="block w-[165px] h-[44.5px] overflow-visible border-none"
          />
        </a>
        <div className="bg-[#637260] w-px h-[25px] mr-5"></div>
      </div>

      {/* Navigation Links (Visible on larger screens) */}
      <nav className="hidden md:flex flex-1 overflow-x-auto scrollbar-hide items-center">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `bg-transparent no-underline relative flex justify-center items-center text-sm transition-all duration-200 ease-in-out py-5 px-4 whitespace-nowrap ${
              isActive ? "text-[#80ee64]" : "text-white"
            }`
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/trade-history"
          className={({ isActive }) =>
            `bg-transparent no-underline relative flex justify-center items-center text-sm transition-all duration-200 ease-in-out py-5 px-4 whitespace-nowrap ${
              isActive ? "text-[#80ee64]" : "text-white"
            }`
          }
        >
          Trade History
        </NavLink>
        <NavLink
          to="/analytics"
          className={({ isActive }) =>
            `bg-transparent no-underline relative flex justify-center items-center text-sm transition-all duration-200 ease-in-out py-5 px-4 whitespace-nowrap ${
              isActive ? "text-[#80ee64]" : "text-white"
            }`
          }
        >
          Analytics
        </NavLink>
        <NavLink
          to="/portfolio"
          className={({ isActive }) =>
            `bg-transparent no-underline relative flex justify-center items-center text-sm transition-all duration-200 ease-in-out py-5 px-4 whitespace-nowrap ${
              isActive ? "text-[#80ee64]" : "text-white"
            }`
          }
        >
          Portfolio
        </NavLink>
        <NavLink
          to="/pnl-analysis"
          className={({ isActive }) =>
            `bg-transparent no-underline relative flex justify-center items-center text-sm transition-all duration-200 ease-in-out py-5 px-4 whitespace-nowrap ${
              isActive ? "text-[#80ee64]" : "text-white"
            }`
          }
        >
          P&L Analysis
        </NavLink>
        <NavLink
          to="/live-drawdown"
          className={({ isActive }) =>
            `bg-transparent no-underline relative flex justify-center items-center text-sm transition-all duration-200 ease-in-out py-5 px-4 whitespace-nowrap ${
              isActive ? "text-[#80ee64]" : "text-white"
            }`
          }
        >
          Live Drawdown
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `bg-transparent no-underline relative flex justify-center items-center text-sm transition-all duration-200 ease-in-out py-5 px-4 whitespace-nowrap ${
              isActive ? "text-[#80ee64]" : "text-white"
            }`
          }
        >
          Settings
        </NavLink>
      </nav>

      {/* Bell Icon and Sign Up Button (Visible on larger screens) */}
      <div className="hidden md:flex gap-3 justify-center items-center ml-4 text-base">
        {/* Bell Icon with Green Dot */}
        <div className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          {/* Green Dot */}
          <div className="absolute top-0 right-0 w-2 h-2 bg-[#80ee64] rounded-full"></div>
        </div>

        {/* Sign Up Button */}
        <a
          href="/login-signup"
          className="bg-[#80ee64] text-[#020617] leading-6 cursor-pointer block text-center text-base font-medium transition-opacity duration-200 ease-in-out border border-[#80ee64] rounded-[100px] py-3 px-8 no-underline whitespace-nowrap"
        >
          Sign Up
        </a>
      </div>

      {/* Menu Icon (Visible on smaller screens) */}
      <div className="md:hidden flex items-center ml-auto">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* Dropdown Menu (Visible on smaller screens) */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full top-[-5px] left-0 right-0 bg-[#212525] rounded-b-[50px] p-4">
          <NavLink
            to="/"
            className="block text-white py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/trade-history"
            className="block text-white py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Trade History
          </NavLink>
          <NavLink
            to="/analytics"
            className="block text-white py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Analytics
          </NavLink>
          <NavLink
            to="/portfolio"
            className="block text-white py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Portfolio
          </NavLink>
          <NavLink
            to="/pnl-analysis"
            className="block text-white py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            P&L Analysis
          </NavLink>
          <NavLink
            to="/live-drawdown"
            className="block text-white py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Live Drawdown
          </NavLink>
          <NavLink
            to="/settings"
            className="block text-white py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Settings
          </NavLink>
          {/* Sign Up Button in Dropdown */}
          <a
            href="/login-signup"
            className="block text-white py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Sign Up
          </a>
        </div>
      )}
    </div>
  );
};

export default AppBar;