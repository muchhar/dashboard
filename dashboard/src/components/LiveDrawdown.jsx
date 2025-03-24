import React, { useState } from "react";
import {
  Tabs,
  Tab,
  Box,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from "@mui/icons-material/Edit";
import { Icon1 } from "./Icon1";
import { PlusIcon } from "./PlusIcon";
const LiveDropdown = () => {
  const [tabValue, setTabValue] = useState(0);
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const alerts = [
    { id: 1, alertName: "Price Alert 1", account: "Account A", maxDrawdown: "5%" },
    { id: 2, alertName: "Price Alert 2", account: "Account B", maxDrawdown: "3%" },
    { id: 3, alertName: "Technical Alert", account: "Account C", maxDrawdown: "7%" },
    { id: 4, alertName: "News Alert", account: "Account D", maxDrawdown: "2%" },
  ];
  
  const accounts = Array.from({ length: 20 }, (_, i) => ({
    id: `accountid${i + 1}`,
    name: `Account ${i + 1}`,
    balance: Math.floor(Math.random() * 10000),
  }));
  const accountData = Array.from({ length: 20 }, (_, i) => ({
    accountId: `ACC${1000 + i}`, // Example: ACC1000, ACC1001, etc.
    accountBalance: Math.floor(Math.random() * 100000), // Random balance between 0 and 100,000
    drawdown:`-$${Math.floor(Math.random() * 100000)} (${Math.floor(Math.random() * 100)})` , // Random drawdown between 0 and 100
  }));
  return (
    <Box sx={{  textAlign: "left",ml:2,mt:2,mr:2 }}>
      <Typography variant="h5"  fontWeight="bold" gutterBottom sx={{ textAlign: 'left',ml:0,pt:1 }}>
              Live Dropdown
      </Typography>
      <Tabs
      value={tabValue}
      onChange={handleTabChange}
      sx={{
        fontFamily: "Inter, sans-serif", // Apply font family to the Tabs
        "& .MuiTab-root": {
          fontFamily: "Inter, sans-serif", // Apply font family to the Tab labels
          color: "#ddffdc", // Default text color
          "&.Mui-selected": {
            color: "#80ee64", // Active tab text color
          },
        },
        "& .MuiTabs-indicator": {
          backgroundColor: "#80ee64", // Active tab indicator color
        },
      }}
    >
      <Tab label="Account" />
      <Tab label="Alert" />
    </Tabs>
    <Box sx={{ mt: 2 }}>
        {tabValue === 0 && (
           
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-[1400px] pt-5 bg-black text-white text-base leading-6 font-inter">
      {accountData.map(({ accountId, accountBalance, drawdown }) => (
        <div
          key={accountId}
          className="flex flex-col justify-between items-start min-h-[150px] bg-[#151818] border border-[#637260] rounded-2xl p-6"
        >
          {/* Account ID */}
          <h2 className="text-2xl leading-8 font-degular font-normal">
            {accountId}
          </h2>

          {/* Account Balance */}
          <p className="text-lg leading-6 text-[#80ee64]">
            Balance: ${accountBalance.toLocaleString()}
          </p>

          {/* Drawdown */}
          <p className="text-sm leading-[21px] text-[#ddffdc]/60 font-inter">
            Drawdown: {drawdown}%
          </p>
        </div>
      ))}
    </div>
              
           
          
        )}
        {tabValue === 1 && (
            
     <Box>
     <button
      className="
        box-border font-sans text-sm font-medium leading-5 text-gray-900 
        bg-[#7FED64] cursor-pointer w-[132.898px] flex items-center 
        justify-center gap-2 transition-all duration-200 ease-in-out 
        opacity-100 border border-green-300 rounded-full py-2 px-4 m-0
        hover:opacity-90 focus:outline-none
      "
      onClick={toggleVisibility}>
      <PlusIcon className="block align-middle mr-1" />
      New Alert
    </button>
    {isVisible && (
     <div className="mt-6 mb-0 bg-[#151818] border border-[#80ee64] rounded-xl p-6 w-full text-white text-base leading-6 font-sans">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold leading-7 text-white m-0">
          Create New Alert
        </h3>
        <button className="text-base font-normal leading-6 text-white-400 bg-[#0A0B0F] border border-gray-700 rounded-lg p-2" onClick={toggleVisibility}>
          <CloseIcon className="block align-middle"/>
        </button>
      </div>
      <div className="mb-4 grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-2 text-gray-400">Alert</label>
          <input
            type="text"
            placeholder="Alert name"
            className="w-full bg-[#0A0B0F] border border-gray-700 rounded-lg p-2 text-white"
          />
        </div>
        <div>
          <label className="block mb-2 text-gray-400">Account</label>
          <select className="w-full bg-[#0A0B0F] border border-gray-700 rounded-lg p-2 text-white">
            <option value="price">All</option>
            <option value="technical">Account1</option>
            <option value="news">Account2</option>
          </select>
        </div>
        <div>
          <label className="block mb-2 text-gray-400">Unit</label>
          <select className="w-full bg-[#0A0B0F] border border-gray-700 rounded-lg p-2 text-white">
            <option value="above">%</option>
            <option value="below">$</option>
          </select>
        </div>
        <div>
          <label className="block mb-2 text-gray-400">Value</label>
          <input
            type="text"
            placeholder="e.g. 1.0950"
            className="w-full bg-[#0A0B0F] border border-gray-700 rounded-lg p-2 text-white"
          />
        </div>
      </div>
      <div className="flex flex-row justify-end gap-3">
        <button className="text-sm font-medium leading-5 text-green-300 bg-transparent border border-green-300 rounded-full px-4 py-2 flex items-center justify-center">
          Cancel
        </button>
        <button className="text-sm font-medium leading-5 text-gray-900 bg-[#7FED64] border border-green-300 rounded-full px-4 py-2 flex items-center justify-center">
          Create Alert
        </button>
      </div>
    </div>)}

    <div className=" flex items-left justify-left pt-10">
      <div className="w-full  bg-[#151818] border border-[#637260] rounded-2xl p-8">
        {/* Header */}
        <h2 className="text-2xl font-inter font-semibold text-[#80ee64] mb-6">
          Alerts List
        </h2>

        {/* Table for Alerts */}
        <div className="space-y-4 " >
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="p-4 bg-[#151818] border border-[#637260] rounded-lg hover:border-[#80ee64] transition-colors w-full"
            >
              <div className="flex justify-between items-center">
                {/* Alert Name */}
                <div className="flex-1">
                  <p className="text-lg font-inter font-semibold text-[#ddffdc]">
                    {alert.alertName}
                  </p>
                </div>

                {/* Account */}
                <div className="flex-1">
                  <p className="text-sm font-inter text-[#ddffdc]/60">
                    Account: <span className="text-[#80ee64]">{alert.account}</span>
                  </p>
                </div>

                {/* Max Drawdown */}
                <div className="flex-1 text-right">
                  <p className="text-sm font-inter text-[#ddffdc]/60">
                    Max Drawdown: <span className="text-[#80ee64]">{alert.maxDrawdown}</span>
                  </p>
                </div>
                <DeleteIcon className="block align-middle mr-1 ml-5" />
              </div>
            </div>
          ))}
        </div>

        {/* Add New Alert Button */}
        </div>
    </div>
    </Box>
        )}
      </Box>
    </Box>
  );
};

export default LiveDropdown;