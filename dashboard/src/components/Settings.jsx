import React, { useState } from "react";
import { Card, Typography, Tabs, Tab, Box, Container,TextField, Stack,CardContent } from "@mui/material";
import {
PersonOutlined as AccountIcon,
ShieldOutlined as SecurityIcon,
NotificationsNoneOutlined as NotificationIcon,
LanguageOutlined as PreferencesIcon,
  Payment as BillingIcon,
  SaveOutlined as SaveIcon
} from "@mui/icons-material";
import { PaperClipIcon } from '@heroicons/react/20/solid'
import { Icon1, Icon2, Icon3, Icon4, Icon5, Icon6 } from "./icons"; // Assuming icons are impor
//import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
const Settings = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  const alerts = [
    { id: 1, alertName: "Price Alert 1", account: "Account A", maxDrawdown: "5%" },
    { id: 2, alertName: "Price Alert 2", account: "Account B", maxDrawdown: "3%" },
    { id: 3, alertName: "Technical Alert", account: "Account C", maxDrawdown: "7%" },
    { id: 4, alertName: "News Alert", account: "Account D", maxDrawdown: "2%" },
  ];
  const tabs = [
    { label: "Account", icon: <AccountIcon /> },
    { label: "Security", icon: <SecurityIcon /> },
    { label: "Notification", icon: <NotificationIcon /> },
    { label: "Preferences", icon: <PreferencesIcon /> },
    { label: "Billing", icon: <BillingIcon /> },
  ];

  return (
    <Container maxWidth={false} disableGutters  sx={{ ml: 9,mt:1.5, width:'100%'}}>
    <Typography variant="h5" fontWeight="bold" sx={{pl:2,textAlign:'left',pt:1}} >
    Settings
      </Typography>
      
    <Card sx={{ mt:2,ml:2,mr:18,height:50,borderRadius:4,backgroundColor:'#151818' }}>
      {/* Title */}
     
      {/* Tabs */}
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        variant="fullWidth"
        sx={{
          "& .MuiTabs-indicator": {
          display: "none", // Hide the indicator (underline)
        },
          "& .MuiTab-root": {
            textTransform: "none",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: 1,
            padding: "10px 16px",
            minHeight: "48px",
            minWidth: "120px",
            backgroundColor: "transparent",
            "&.Mui-selected": {
              backgroundColor: "#4CAF4F",
              color: "white",
            },
          },
        }}
      >
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            label={tab.label}
            icon={tab.icon}
            iconPosition="start"
            sx={{height:50,width:'auto'}}
          />
        ))}
      </Tabs>

      {/* Tab Content */}
     </Card>
     <Box sx={{display: activeTab==0?'flex':'none',mt:3,ml:2,mr:18,borderRadius:3}}>
     
    
     <div className="w-full bg-[#151818] border-[#637260] rounded-2xl p-8 text-white shadow-lg flex-grow"><h2 className="text-xl font-bold mb-8 text-left">Account Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label htmlFor="fullName" className="block text-gray-300 mb-2 text-left">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            defaultValue="John Doe"
            className="w-full bg-[#0A0B0E] border border-gray-800 rounded-lg p-4 text-white"
            style={{height:40}}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-gray-300 mb-2 text-left">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            defaultValue="john.doe@example.com"
            style={{height:40}}
            className="w-full bg-[#0A0B0E] border border-gray-800 rounded-lg p-4 text-white"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-gray-300 mb-2 text-left">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            style={{height:40}}
            defaultValue="+1 (555) 123-4567"
            className="w-full bg-[#0A0B0E] border border-gray-800 rounded-lg p-4 text-white"
          />
        </div>
        <div>
          <label htmlFor="timezone" className="block text-gray-300 mb-2 text-left">
            Timezone
          </label>
          <select
            id="timezone"
            defaultValue="UTC-8"
            style={{height:40}}
            className="w-full bg-[#0A0B0E] border border-gray-800 rounded-lg pl-4 text-white appearance-none"
          >
            <option value="UTC-8">UTC-8 (PST)</option>
            <option value="UTC-7">UTC-7 (MST)</option>
            <option value="UTC-6">UTC-6 (CST)</option>
            <option value="UTC-5">UTC-5 (EST)</option>
          </select>
        </div>
        <div>
          <label htmlFor="currency" className="block text-gray-300 mb-2 text-left">
            Preferred Currency
          </label>
          <select
            id="currency"
            defaultValue="USD"
            style={{height:40}}
            className="w-full bg-[#0A0B0E] border border-gray-800 rounded-lg pl-4 text-white appearance-none"
          >
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
            <option value="JPY">JPY (¥)</option>
          </select>
        </div>
        <div>
          <label htmlFor="fullName" className="block text-gray-300 mb-2 text-left">
            Meta API
          </label>
          <input
            type="text"
            id="fullName"
            defaultValue="AxaWeiw79dojokf9wjk"
            
            className="w-full bg-[#0A0B0E] border border-gray-800 rounded-lg p-4 text-white"
            style={{height:40}}
          />
        
      </div>
      <div></div>
      <div className="flex justify-end mt-8">
        <button className="flex items-right gap-2 bg-[#7FED64]  text-black font-medium py-2 px-6 rounded-full" style={{height:40}}>
          <SaveIcon size={20} />
          Save Changes
        </button>
      </div></div>
    </div>
    </Box>
    <Box sx={{display: activeTab==1?'flex':'none',mt:3,ml:2,mr:18,borderRadius:3}}>
    <div className="mt-0 mb-0 w-full bg-[#0A0B0D] text-white text-base leading-6 font-sans">
      {/* Change Password Section */}
      <div className="bg-[#151818] border-[#637260] border  rounded-xl p-6">
        <h3 className="text-lg font-semibold leading-7 mb-6 text-left">Change Password</h3>
        <div className="mb-6">
          {/* Current Password */}
          <div>
            <label className="block text-[#A7B1C2] mb-2 text-left">Current Password</label>
            <input
              type="password"
              className="w-full bg-[#0A0B0D] border border-[#2C2F36] rounded-lg p-2 text-white"
            />
          </div>
          {/* New Password */}
          <div className="mt-4">
            <label className="block text-[#A7B1C2] mb-2 text-left">New Password</label>
            <input
              type="password"
              className="w-full bg-[#0A0B0D] border border-[#2C2F36] rounded-lg p-2 text-white"
            />
          </div>
          {/* Confirm New Password */}
          <div className="mt-4">
            <label className="block text-[#A7B1C2] mb-2 text-left">Confirm New Password</label>
            <input
              type="password"
              className="w-full bg-[#0A0B0D] border border-[#2C2F36] rounded-lg p-2 text-white"
            />
          </div>
        </div>
        {/* Update Password Button */}
        <div className="flex justify-end">
          <button className="bg-[#80EE64] text-[#020617] font-medium text-sm leading-5 px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-200 ease-in-out border border-[#80EE64] hover:bg-[#6ED84F]">
            Update Password
          </button>
        </div>
      </div>

      {/* Security Settings Section */}
      <div className="mt-6 bg-[#151818] border-[#637260] border  rounded-xl p-6">
        <h3 className="text-lg font-semibold leading-7 mb-6 text-left">Security Settings</h3>
        {/* Two-Factor Authentication */}
        <div className="bg-[#0A0B0D] rounded-lg p-4 flex items-center justify-between">
          <div>
            <h4 className="text-base font-medium text-left">Two-Factor Authentication</h4>
            <p className="text-sm text-[#A7B1C2] mt-1 text-left">
              Add an extra layer of security to your account
            </p>
          </div>
          <label class="inline-flex items-center cursor-pointer">
  <input type="checkbox" value="" class="sr-only peer"/>
  <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#80ee64] dark:peer-focus:ring-[#80ee64] rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#80ee64] dark:peer-checked:bg-[#80ee64]"></div>
</label>
        </div>
        {/* Login Notifications */}
        <div className="bg-[#0A0B0D] rounded-lg p-4 flex items-center justify-between mt-4">
          <div>
            <h4 className="text-base font-medium text-left">Login Notifications</h4>
            <p className="text-sm text-[#A7B1C2] mt-1 text-left">
              Receive alerts when your account is accessed
            </p>
          </div>
          <label class="inline-flex items-center cursor-pointer">
  <input type="checkbox" value="" class="sr-only peer"/>
  <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#80ee64] dark:peer-focus:ring-[#80ee64] rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#80ee64] dark:peer-checked:bg-[#80ee64]"></div>
  </label>
        </div>
        {/* Trading Confirmations */}
        <div className="bg-[#0A0B0D] rounded-lg p-4 flex items-center justify-between mt-4">
          <div>
            <h4 className="text-base font-medium text-left">Trading Confirmations</h4>
            <p className="text-sm text-[#A7B1C2] mt-1 text-left">
              Require confirmation for all trading actions
            </p>
          </div>
          <label class="inline-flex items-center cursor-pointer">
  <input type="checkbox" value="" class="sr-only peer"/>
  <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#80ee64] dark:peer-focus:ring-[#80ee64] rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#80ee64] dark:peer-checked:bg-[#80ee64]"></div>
  </label>
        </div>
      </div>
    </div>
    </Box>
    <Box sx={{display: activeTab==2?'flex':'none',mt:3,ml:2,mr:18,borderRadius:3}}>
    <div className="mt-0 bg-[#151818] border border-[#637260] rounded-xl p-6 w-full text-white text-base leading-6 font-sans">
      {/* Notification Preferences Section */}
      <h3 className="text-lg font-semibold leading-7 mb-6 text-left">Notification Preferences</h3>
      <div className="mb-6">
        {/* Price Alerts */}
        <div className="bg-[#0A0B0D] rounded-lg p-4 flex items-center justify-between">
          <div>
            <h4 className="text-base font-medium text-left">Price Alerts</h4>
            <p className="text-sm text-[#A7B1C2] mt-1 text-left">
              Notifications when price targets are reached
            </p>
          </div>
          <label class="inline-flex items-center cursor-pointer">
  <input type="checkbox" value="" class="sr-only peer"/>
  <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#80ee64] dark:peer-focus:ring-[#80ee64] rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#80ee64] dark:peer-checked:bg-[#80ee64]"></div>
  </label>
        </div>
        {/* Trade Executions */}
        <div className="bg-[#0A0B0D] rounded-lg p-4 flex items-center justify-between mt-4">
          <div>
            <h4 className="text-base font-medium text-left">Trade Executions</h4>
            <p className="text-sm text-[#A7B1C2] mt-1 text-left">
              Notifications when trades are opened or closed
            </p>
          </div>
          <label class="inline-flex items-center cursor-pointer">
  <input type="checkbox" value="" class="sr-only peer"/>
  <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#80ee64] dark:peer-focus:ring-[#80ee64] rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#80ee64] dark:peer-checked:bg-[#80ee64]"></div>
  </label>
        </div>
        {/* Market News */}
        <div className="bg-[#0A0B0D] rounded-lg p-4 flex items-center justify-between mt-4">
          <div>
            <h4 className="text-base font-medium text-left">Market News</h4>
            <p className="text-sm text-[#A7B1C2] mt-1 text-left">
              Updates on important market events and news
            </p>
          </div>
          <label class="inline-flex items-center cursor-pointer">
  <input type="checkbox" value="" class="sr-only peer"/>
  <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#80ee64] dark:peer-focus:ring-[#80ee64] rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#80ee64] dark:peer-checked:bg-[#80ee64]"></div>
</label>
        </div>
        {/* Account Updates */}
        <div className="bg-[#0A0B0D] rounded-lg p-4 flex items-center justify-between mt-4">
          <div>
            <h4 className="text-base font-medium text-left">Account Updates</h4>
            <p className="text-sm text-[#A7B1C2] mt-1 text-left">
              Notifications about account status and changes
            </p>
          </div>
          <label class="inline-flex items-center cursor-pointer">
  <input type="checkbox" value="" class="sr-only peer"/>
  <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#80ee64] dark:peer-focus:ring-[#80ee64] rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#80ee64] dark:peer-checked:bg-[#80ee64]"></div>
  </label>
        </div>
      </div>

      {/* Notification Channels Section */}
      <h4 className="text-base font-medium mb-4 text-left">Notification Channels</h4>
      <div>
        {/* Email Notifications */}
        <div className="bg-[#0A0B0D] rounded-lg p-4 flex items-center justify-between">
          <div>
            <h4 className="text-base font-medium text-left">Email Notifications</h4>
            <p className="text-sm text-[#A7B1C2] mt-1 text-left">
              Receive notifications via email
            </p>
          </div>
          <label class="inline-flex items-center cursor-pointer">
  <input type="checkbox" value="" class="sr-only peer"/>
  <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#80ee64] dark:peer-focus:ring-[#80ee64] rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#80ee64] dark:peer-checked:bg-[#80ee64]"></div>
</label>
        </div>
        {/* Push Notifications */}
        <div className="bg-[#0A0B0D] rounded-lg p-4 flex items-center justify-between mt-4">
          <div>
            <h4 className="text-base font-medium text-left">Push Notifications</h4>
            <p className="text-sm text-[#A7B1C2] mt-1 text-left">
              Receive notifications in your browser
            </p>
          </div>
          <label class="inline-flex items-center cursor-pointer">
  <input type="checkbox" value="" class="sr-only peer"/>
  <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#80ee64] dark:peer-focus:ring-[#80ee64] rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#80ee64] dark:peer-checked:bg-[#80ee64]"></div>
</label>
        </div>
      </div>
    </div>
      </Box>
      <Box sx={{display: activeTab==3?'flex':'none',mt:3,ml:2,mr:18,borderRadius:3}}>
      <div className="mt-0 bg-[#151818] border border-[#637260] rounded-xl p-6 w-full text-white text-base leading-6 font-sans">
     <h3 className="text-lg font-semibold leading-7 mb-6 text-left">Display Preferences</h3>
      <div>
        {/* Theme Selection */}
        <div>
          <label className="block text-[#A7B1C2] mb-2 text-left">Theme</label>
          <div className="grid grid-cols-2 gap-4">
            {/* Dark Mode */}
            <div className="flex items-center bg-[#0A0B0D] border border-[#80ee64] rounded-lg p-4">
              <div className="h-4 w-4 bg-[#80ee64] border-2 border-green rounded-full mr-3"></div>
              <span className="text-white">Dark Mode</span>
            </div>
            {/* Light Mode (Coming Soon) */}
            <div className="flex items-center bg-[#0A0B0D] border border-[#2C2F36] rounded-lg p-4">
              <div className="h-4 w-4 border-2 border-[#2C2F36] rounded-full mr-3"></div>
              <span className="text-[#A7B1C2]">Light Mode (Coming Soon)</span>
            </div>
          </div>
        </div>

        {/* Chart Default Timeframe */}
        <div className="mt-6">
          <label className="block text-[#A7B1C2] mb-2 text-left">Chart Default Timeframe</label>
          <select className="w-full bg-[#0A0B0D] border border-[#2C2F36] rounded-lg p-2 text-white">
            <option value="1m">1 Minute</option>
            <option value="5m">5 Minutes</option>
            <option value="15m">15 Minutes</option>
            <option value="30m">30 Minutes</option>
            <option value="1h">1 Hour</option>
            <option value="4h">4 Hours</option>
            <option value="1d">1 Day</option>
            <option value="1w">1 Week</option>
          </select>
        </div>

        {/* Default Order Size */}
        <div className="mt-6">
          <label className="block text-[#A7B1C2] mb-2 text-left">Default Order Size</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            defaultValue="0.01"
            className="w-full bg-[#0A0B0D] border border-[#2C2F36] rounded-lg p-2 text-white"
          />
        </div>

        {/* Language Selection */}
        <div className="mt-6">
          <label className="block text-[#A7B1C2] mb-2 text-left">Language</label>
          <select className="w-full bg-[#0A0B0D] border border-[#2C2F36] rounded-lg p-2 text-white">
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="ja">Japanese</option>
            <option value="zh">Chinese</option>
          </select>
        </div>
      </div>

      {/* Save Preferences Button */}
      <div className="mt-6 flex justify-end">
        <button className="bg-[#80EE64] text-[#020617] font-medium text-sm leading-5 px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-200 ease-in-out border border-[#80EE64] hover:bg-[#6ED84F]">
        <SaveIcon size={20} />
        Save Preferences
        </button>
      </div>
    </div>
      </Box>
      <Box sx={{display: activeTab==4?'flex':'none',mt:3,ml:2,mr:18,borderRadius:3}}>
      <div className="mt-0 w-full bg-[#0A0B0D] text-white text-base leading-6 font-sans">
      {/* Current Plan Section */}
      <div className="bg-[#151818] border border-[#637260] rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold leading-7 text-left">Current Plan</h3>
          <span className="bg-[rgba(0,82,255,0.1)] text-[#80ee64] text-sm font-medium px-3 py-1 rounded-full">
            Pro
          </span>
        </div>
        <div className="bg-[#0A0B0D] rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-base font-medium">Pro Trading Plan</h4>
            <span className="font-bold">$49.99/month</span>
          </div>
          <p className="text-sm text-[#A7B1C2] text-left">Next billing date: June 15, 2025</p>
          <div className="pt-4 mt-4 border-t border-[#2C2F36]">
            <h5 className="text-base font-medium mb-2 text-left">Features:</h5>
            <ul className="list-none p-0 m-0">
              <li className="flex items-center text-[#A7B1C2]">
                <Icon1 className="mr-2 text-[#22C55E]" />
                Real-time market data
              </li>
              <li className="flex items-center text-[#A7B1C2] mt-2">
                <Icon2 className="mr-2 text-[#22C55E]" />
                Advanced analytics
              </li>
              <li className="flex items-center text-[#A7B1C2] mt-2">
                <Icon3 className="mr-2 text-[#22C55E]" />
                Unlimited price alerts
              </li>
              <li className="flex items-center text-[#A7B1C2] mt-2">
                <Icon4 className="mr-2 text-[#22C55E]" />
                Priority support
              </li>
            </ul>
          </div>
        </div>
        <div className="flex">
          <button className="bg-[#80EE64] text-[#020617] text-sm font-medium px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-200 hover:bg-[#6ED84F]">
            Upgrade Plan
          </button>
          <button className="bg-transparent text-[#80EE64] text-sm font-medium px-4 py-2 rounded-full border border-[#80EE64] ml-4 flex items-center gap-2 transition-all duration-200 hover:bg-[#80EE64] hover:text-[#020617]">
            Cancel Subscription
          </button>
        </div>
      </div>

      {/* Payment Methods Section */}
      <div className="mt-6 bg-[#151818] border border-[#637260] rounded-xl p-6">
        <h3 className="text-lg font-semibold leading-7 mb-6 text-left">Payment Methods</h3>
        <div className="mb-6">
          <div className="bg-[#0A0B0D] rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-[#0052FF] text-white text-xs font-bold px-2 py-1 rounded mr-3">
                VISA
              </div>
              <div>
                <p className="text-white">•••• •••• •••• 4242</p>
                <p className="text-sm text-[#A7B1C2]">Expires 12/25</p>
              </div>
            </div>
            <div className="flex items-center">
              <span className="bg-[rgba(34,197,94,0.1)] text-[#22C55E] text-xs px-2 py-1 rounded mr-3">
                Default
              </span>
              <button className="text-[#A7B1C2]">
                <Icon5 />
              </button>
            </div>
          </div>
          <button className="w-full bg-transparent border border-dashed border-[#2C2F36] rounded-lg p-4 mt-4 flex items-center justify-center text-[#A7B1C2]">
            <Icon6 className="mr-2" />
            Add Payment Method
          </button>
        </div>
      </div>

      {/* Billing History Section */}
      <div className="mt-6 bg-[#151818] border border-[#637260] rounded-xl p-6">
        <h3 className="text-lg font-semibold leading-7 mb-6 text-left">Billing History</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-sm text-[#A7B1C2]">
                <th className="text-left pb-4">Date</th>
                <th className="text-left pb-4">Description</th>
                <th className="text-right pb-4">Amount</th>
                <th className="text-right pb-4">Status</th>
                <th className="text-right pb-4">Invoice</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-white">
                <td className="py-4 text-left">May 15, 2025</td>
                <td className="py-4 text-left">Pro Trading Plan - Monthly</td>
                <td className="py-4 text-right">$49.99</td>
                <td className="py-4 text-right">
                  <span className="bg-[rgba(34,197,94,0.1)] text-[#22C55E] text-xs px-2 py-1 rounded">
                    Paid
                  </span>
                </td>
                <td className="py-4 text-right">
                  <button className="text-[#0052FF]">Download</button>
                </td>
              </tr>
              <tr className="text-white border-t border-[#2C2F36]">
                <td className="py-4 text-left">Apr 15, 2025</td>
                <td className="py-4 text-left">Pro Trading Plan - Monthly</td>
                <td className="py-4 text-right">$49.99</td>
                <td className="py-4 text-right">
                  <span className="bg-[rgba(34,197,94,0.1)] text-[#22C55E] text-xs px-2 py-1 rounded">
                    Paid
                  </span>
                </td>
                <td className="py-4 text-right">
                  <button className="text-[#0052FF]">Download</button>
                </td>
              </tr>
              <tr className="text-white border-t border-[#2C2F36]">
                <td className="py-4 text-left">Mar 15, 2025</td>
                <td className="py-4 text-left">Pro Trading Plan - Monthly</td>
                <td className="py-4 text-right">$49.99</td>
                <td className="py-4 text-right">
                  <span className="bg-[rgba(34,197,94,0.1)] text-[#22C55E] text-xs px-2 py-1 rounded">
                    Paid
                  </span>
                </td>
                <td className="py-4 text-right">
                  <button className="text-[#0052FF]">Download</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
      </Box>
    </Container>
  );
};

export default Settings;