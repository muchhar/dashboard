import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  
  const [accountNumbers, setAccountNumbers] = useState([]);
  const [accountData, setAccountData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Fetch all account numbers first
  useEffect(() => {
    const fetchAccountNumbers = async () => {
      try {
        const response = await axios.get(
          'https://mt4api.frequencee.io/cgi-bin/MT4AccountList.py'
        );
        setAccountNumbers(response.data);
      } catch (err) {
        setError('Failed to load account numbers');
        console.error(err);
      }
    };

    fetchAccountNumbers();
  }, []);

  // 2. Fetch data for each account
  useEffect(() => {
    if (accountNumbers.length === 0) return;

    const fetchAllAccountData = async () => {
      try {
        setLoading(true);
        const promises = accountNumbers.map(async (accountNumber) => {
          const response = await axios.get(
            `https://mt4api.frequencee.io/cgi-bin/MT4AccountData.py?FrequenceeID=${accountNumber}`
          );
          return {
            accountId: `ACC${accountNumber}`,
            ...response.data
          };
        });

        const data = await Promise.all(promises);
        setAccountData(data);
      } catch (err) {
        setError('Failed to load account details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllAccountData();
  }, [accountNumbers]);

  // const accountData = Array.from({ length: 20 }, (_, i) => ({
  //   accountId: `ACC${1000 + i}`, // Example: ACC1000, ACC1001, etc.
  //   accountBalance: Math.floor(Math.random() * 100000), // Random balance between 0 and 100,000
  //   drawdown:`-$${Math.floor(Math.random() * 100000)} (${Math.floor(Math.random() * 100)})` , // Random drawdown between 0 and 100
  // }));
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
      {accountData.map((account) => (
        <div
          key={account.accountId}
          className="flex flex-col justify-between items-start min-h-[150px] bg-[#151818] border border-[#637260] rounded-2xl p-6 hover:border-[#80ee64] transition-colors"
        >
          {/* Account ID */}
          <h2 className="text-2xl leading-8 font-degular font-normal mb-2">
            {account.accountId}
          </h2>

          {/* Account Balance */}
          <p className="text-lg leading-6 text-[#80ee64] mb-2">
            Balance: ${account.Balance?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>

          {/* Drawdown */}
          <p className={`text-sm leading-[21px] ${
            account['Max Drawdown'] < 0 ? 'text-[#EF4444]' : 'text-[#80ee64]'
          }`}>
            Drawdown: {account['Max Drawdown']?.toFixed(2)}%
          </p>

          {/* Additional Metrics */}
          <div className="mt-3 pt-3 border-t border-[#637260]/50 w-full">
            <p className="text-xs text-[#ddffdc]/60">Win Rate: {account['Win Rate']}%</p>
            <p className="text-xs text-[#ddffdc]/60">Trades: {account['Total Trade']}</p>
            <p className="text-xs text-[#ddffdc]/60">Profit: ${account['Total Profit']?.toFixed(2)}</p>
          </div>
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