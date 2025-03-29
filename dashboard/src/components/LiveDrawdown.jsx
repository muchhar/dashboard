import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Tabs,
  Tab,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from '@mui/icons-material/Close';
import { PlusIcon } from "./PlusIcon";
import Skeleton from '@mui/material/Skeleton';
import NoDataFound from "./nodata.jsx";
import api from '../utils/api';

const LiveDropdown = () => {
  const [tabValue, setTabValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [newAlert, setNewAlert] = useState({
    alertName: '',
    account: 'All',
    unit: '%',
    value: ''
  });

  // Account data states
  const [accountNumbers, setAccountNumbers] = useState([]);
  const [accountData, setAccountData] = useState([]);
  const [loading, setLoading] = useState(true);
 const [dataerror,setdataerror] = React.useState(false);

  // Load saved alerts from localStorage
  useEffect(() => {
    const savedAlerts = localStorage.getItem('drawdownAlerts');
    if (savedAlerts) {
      setAlerts(JSON.parse(savedAlerts));
    }

    // Request notification permission on component mount
    if ('Notification' in window) {
      Notification.requestPermission();
    }
  }, []);

  // Save alerts to localStorage when they change
  useEffect(() => {
    localStorage.setItem('drawdownAlerts', JSON.stringify(alerts));
  }, [alerts]);

  // Fetch account numbers
  useEffect(() => {
    const fetchAccountNumbers = async () => {
      try {
        const response = await api.get('/cgi-bin/MT4AccountList.py');
      
        // const response = await axios.get(
        //   'https://mt4api.frequencee.io/cgi-bin/MT4AccountList.py'
        // );
        setAccountNumbers(response.data);
      } catch (err) {
        console.error('Failed to load account numbers:', err);
        toast.error('Failed to load account numbers');
      }
    };
    fetchAccountNumbers();
  }, []);

  // Fetch account data
  useEffect(() => {
    if (accountNumbers.length === 0) return;

    const fetchAllAccountData = async () => {
      try {
        setLoading(true);
        const promises = accountNumbers.map(async (accountNumber) => {
          // const response = await axios.get(

          //   `https://mt4api.frequencee.io/cgi-bin/MT4AccountData.py?FrequenceeID=${accountNumber}`
          // );
          const response = await api.get(`/cgi-bin/MT4AccountData.py?FrequenceeID=${accountNumber.toLocaleString()}`);
      
          if(response.status==200){
            if(response.data){
              console.log(response.data);
              setdataerror(false);
              
            }else{
              console.log("No data found");
              setdataerror(true);
              return;
    
            }
          }
          else{
            console.log("No data found");
            setdataerror(true);
            return;
          }
          if (response.data.error) {
            return;
  
          }
          
          return {
            accountId: `ACC${accountNumber}`,
            ...response.data
          };
        });

        const data = await Promise.all(promises);
        setAccountData(data);
      } catch (err) {
        console.error('Failed to load account details:', err);
        toast.error('Failed to load account details');
      } finally {
        setLoading(false);
      }
    };

    fetchAllAccountData();

    // Check every 30 seconds for new data
    const interval = setInterval(fetchAllAccountData, 30000);
    return () => clearInterval(interval);
  }, [accountNumbers]);

  // Check for triggered alerts
  useEffect(() => {
    if (accountData.length === 0) return;
    checkAlerts();
  }, [accountData]);

  const checkAlerts = () => {
    alerts.forEach(alert => {
      accountData.forEach(account => {
        const accountMatch = alert.account === 'All' || alert.account === account.accountId;
        if (!accountMatch) return;

        const currentDrawdown = Math.abs(account['Max Drawdown'] || 0);
        const alertValue = parseFloat(alert.value);
        const isTriggered = currentDrawdown >= alertValue;

        if (isTriggered && !alert.triggered) {
          triggerAlert(alert, account, currentDrawdown);
        } else if (!isTriggered && alert.triggered) {
          // Reset if drawdown goes below threshold
          const updatedAlerts = alerts.map(a => 
            a.id === alert.id ? {...a, triggered: false} : a
          );
          setAlerts(updatedAlerts);
        }
      });
    });
  };

  const triggerAlert = (alert, account, currentDrawdown) => {
    // Show browser notification
    if (Notification.permission === 'granted') {
      try {
        new Notification(`Drawdown Alert: ${alert.alertName}`, {
          body: `Account ${account.accountId} reached ${currentDrawdown.toFixed(2)}${alert.unit} drawdown (Threshold: ${alert.value}${alert.unit})`,
          icon: '/notification-icon.png'
        });
      } catch (err) {
        console.error('Browser notification failed:', err);
      }
    }

    // Show toast notification
    toast.warn(
      `🚨 ${alert.alertName}\nAccount ${account.accountId} drawdown reached ${currentDrawdown.toFixed(2)}${alert.unit}`,
      { 
        position: "bottom-right",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
      }
    );

    // Mark alert as triggered
    const updatedAlerts = alerts.map(a => 
      a.id === alert.id ? {...a, triggered: true} : a
    );
    setAlerts(updatedAlerts);
  };

  const handleCreateAlert = () => {
    if (!newAlert.alertName || !newAlert.value) {
      toast.error('Please fill all alert fields');
      return;
    }
    
    if (isNaN(newAlert.value)) {
      toast.error('Please enter a valid number for threshold');
      return;
    }

    const alert = {
      id: Date.now(),
      ...newAlert,
      triggered: false
    };
    
    setAlerts([...alerts, alert]);
    setNewAlert({
      alertName: '',
      account: 'All',
      unit: '%',
      value: ''
    });
    setIsVisible(false);
    toast.success('Alert created successfully');
  };

  const deleteAlert = (id) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
    toast.info('Alert deleted');
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  return (
    <Box sx={{ textAlign: "left", ml:2, mt:2, mr:2 }}>
      <ToastContainer />
      
      <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ textAlign: 'left', ml:0, pt:1 }}>
        Live Dropdown
      </Typography>
      
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        sx={{
          "& .MuiTab-root": {
            color: "#ddffdc",
            "&.Mui-selected": { color: "#80ee64" },
          },
          "& .MuiTabs-indicator": { backgroundColor: "#80ee64" },
        }}
      >
        <Tab label="Account" />
        <Tab label="Alert" />
      </Tabs>
      <Box sx={{ mt: 2 }}>
        {tabValue === 0 &&  (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-[1400px] pt-5 text-white text-base leading-6 font-inter">
            {accountData
  .filter(account => account && account.accountId) // Filter out null/undefined accounts
  .map((account) => {
    // Validate required fields with fallbacks
    const balance = account.Balance !== undefined ? 
      account.Balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 
      'N/A';
      
    const drawdown = account['Max Drawdown'] !== undefined ? 
      parseFloat(account['Max Drawdown']) : 
      null;

    const winRate = account['Win Rate'] !== undefined ? 
      account['Win Rate'] : 
      'N/A';

    const totalTrades = account['Total Trade'] !== undefined ? 
      account['Total Trade'] : 
      'N/A';

    const totalProfit = account['Total Profit'] !== undefined ? 
      account['Total Profit'].toFixed(2) : 
      'N/A';

    return (
      <div
        key={account.accountId}
        className="flex flex-col justify-between items-start min-h-[150px] bg-[#151818] border border-[#637260] rounded-2xl p-6 hover:border-[#80ee64] transition-colors"
      >
        <h2 className="text-2xl leading-8 font-degular font-normal mb-2">
          {account.accountId || 'Unknown Account'}
        </h2>
        
        <p className="text-lg leading-6 text-[#80ee64] mb-2">
          Balance: ${balance}
        </p>
        
        <p className={`text-sm leading-[21px] ${
          drawdown !== null && drawdown < 0 ? 'text-[#EF4444]' : 'text-[#80ee64]'
        }`}>
          Drawdown: {drawdown !== null ? `${drawdown.toFixed(2)}%` : 'N/A'}
        </p>
        
        <div className="mt-3 pt-3 border-t border-[#637260]/50 w-full">
          <p className="text-xs text-[#ddffdc]/60">Win Rate: {winRate}%</p>
          <p className="text-xs text-[#ddffdc]/60">Trades: {totalTrades}</p>
          <p className="text-xs text-[#ddffdc]/60">Profit: ${totalProfit}</p>
        </div>
      </div>
    );
  })
}{accountData.length==0 && (
                <Skeleton animation="wave" />
            )
            }
          </div>
        )}
        
        {tabValue === 1 && (
          <Box>
            <button
              className="box-border font-sans text-sm font-medium leading-5 text-gray-900 
                bg-[#7FED64] cursor-pointer w-[132.898px] flex items-center 
                justify-center gap-2 transition-all duration-200 ease-in-out 
                opacity-100 border border-green-300 rounded-full py-2 px-4 m-0
                hover:opacity-90 focus:outline-none"
              onClick={() => setIsVisible(true)}>
              <PlusIcon className="block align-middle mr-1" />
              New Alert
            </button>

            {isVisible && (
              <div className="mt-6 mb-0 bg-[#151818] border border-[#80ee64] rounded-xl p-6 w-full text-white text-base leading-6 font-sans">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-semibold leading-7 text-white m-0">
                    Create New Alert
                  </h3>
                  <button 
                    className="text-base font-normal leading-6 text-white-400 bg-[#0A0B0F] border border-gray-700 rounded-lg p-2" 
                    onClick={() => setIsVisible(false)}>
                    <CloseIcon className="block align-middle"/>
                  </button>
                </div>
                
                <div className="mb-4 grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-gray-400">Alert Name</label>
                    <input
                      type="text"
                      value={newAlert.alertName}
                      onChange={(e) => setNewAlert({...newAlert, alertName: e.target.value})}
                      placeholder="Alert name"
                      className="w-full bg-[#0A0B0F] border border-gray-700 rounded-lg p-2 text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block mb-2 text-gray-400">Account</label>
                    <select
                      value={newAlert.account}
                      onChange={(e) => setNewAlert({...newAlert, account: e.target.value})}
                      className="w-full bg-[#0A0B0F] border border-gray-700 rounded-lg p-2 text-white"
                    >
                      <option value="All">All Accounts</option>
                      {accountNumbers.map(num => (
                        <option key={num} value={`ACC${num}`}>ACC{num}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block mb-2 text-gray-400">Unit</label>
                    <select
                      value={newAlert.unit}
                      onChange={(e) => setNewAlert({...newAlert, unit: e.target.value})}
                      className="w-full bg-[#0A0B0F] border border-gray-700 rounded-lg p-2 text-white"
                    >
                      <option value="%">Percentage (%)</option>
                      <option value="$">Dollar ($)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block mb-2 text-gray-400">Threshold Value</label>
                    <input
                      type="number"
                      value={newAlert.value}
                      onChange={(e) => setNewAlert({...newAlert, value: e.target.value})}
                      placeholder="e.g. 5.0"
                      className="w-full bg-[#0A0B0F] border border-gray-700 rounded-lg p-2 text-white"
                    />
                  </div>
                </div>
                
                <div className="flex flex-row justify-end gap-3">
                  <button 
                    className="text-sm font-medium leading-5 text-green-300 bg-transparent border border-green-300 rounded-full px-4 py-2 flex items-center justify-center"
                    onClick={() => setIsVisible(false)}>
                    Cancel
                  </button>
                  <button 
                    className="text-sm font-medium leading-5 text-gray-900 bg-[#7FED64] border border-green-300 rounded-full px-4 py-2 flex items-center justify-center"
                    onClick={handleCreateAlert}>
                    Create Alert
                  </button>
                </div>
              </div>
            )}

            <div className="flex items-left justify-left pt-10">
              <div className="w-full bg-[#151818] border border-[#637260] rounded-2xl p-8">
                <h2 className="text-2xl font-inter font-semibold text-[#80ee64] mb-6">
                  Active Alerts
                </h2>

                <div className="space-y-4">
                  {alerts.length === 0 ? (
                    <p className="text-[#ddffdc]/60">No alerts created yet</p>
                  ) : (
                    alerts.map((alert) => (
                      <div
                        key={alert.id}
                        className={`p-4 bg-[#151818] border rounded-lg transition-colors w-full ${
                          alert.triggered 
                            ? 'border-[#EF4444] animate-pulse' 
                            : 'border-[#637260] hover:border-[#80ee64]'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex-1">
                            <p className="text-lg font-inter font-semibold text-[#ddffdc]">
                              {alert.alertName}
                            </p>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-inter text-[#ddffdc]/60">
                              Account: <span className="text-[#80ee64]">{alert.account}</span>
                            </p>
                          </div>
                          <div className="flex-1 text-right">
                            <p className="text-sm font-inter text-[#ddffdc]/60">
                              Threshold: <span className="text-[#80ee64]">{alert.value}{alert.unit}</span>
                            </p>
                          </div>
                          <IconButton 
                            onClick={() => deleteAlert(alert.id)}
                            sx={{ color: '#EF4444' }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </div>
                        {alert.triggered && (
                          <p className="text-xs text-[#EF4444] mt-2">
                            Alert triggered! Check account drawdown.
                          </p>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default LiveDropdown;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {
//   Tabs,
//   Tab,
//   Box,
//   Typography,
//   Card,
//   CardContent,
//   List,
//   ListItem,
//   ListItemText,
//   MenuItem,
//   Select,
//   Button,
//   TextField,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   IconButton,
// } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// import CloseIcon from '@mui/icons-material/Close';
// import EditIcon from "@mui/icons-material/Edit";
// import { Icon1 } from "./Icon1";
// import { PlusIcon } from "./PlusIcon";
// const LiveDropdown = () => {
//   const [tabValue, setTabValue] = useState(0);
//   const [openAlertDialog, setOpenAlertDialog] = useState(false);
//   const [openEditDialog, setOpenEditDialog] = useState(false);
//   const [isVisible, setIsVisible] = useState(false);
//   const toggleVisibility = () => {
//     setIsVisible(!isVisible);
//   };
//   const handleTabChange = (event, newValue) => {
//     setTabValue(newValue);
//   };
//   const alerts = [
//     { id: 1, alertName: "Price Alert 1", account: "Account A", maxDrawdown: "5%" },
//     { id: 2, alertName: "Price Alert 2", account: "Account B", maxDrawdown: "3%" },
//     { id: 3, alertName: "Technical Alert", account: "Account C", maxDrawdown: "7%" },
//     { id: 4, alertName: "News Alert", account: "Account D", maxDrawdown: "2%" },
//   ];
  
//   const [accountNumbers, setAccountNumbers] = useState([]);
//   const [accountData, setAccountData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // 1. Fetch all account numbers first
//   useEffect(() => {
//     const fetchAccountNumbers = async () => {
//       try {
//         const response = await axios.get(
//           'https://mt4api.frequencee.io/cgi-bin/MT4AccountList.py'
//         );
//         setAccountNumbers(response.data);
//       } catch (err) {
//         setError('Failed to load account numbers');
//         console.error(err);
//       }
//     };

//     fetchAccountNumbers();
//   }, []);

//   // 2. Fetch data for each account
//   useEffect(() => {
//     if (accountNumbers.length === 0) return;

//     const fetchAllAccountData = async () => {
//       try {
//         setLoading(true);
//         const promises = accountNumbers.map(async (accountNumber) => {
//           const response = await axios.get(
//             `https://mt4api.frequencee.io/cgi-bin/MT4AccountData.py?FrequenceeID=${accountNumber}`
//           );
//           return {
//             accountId: `ACC${accountNumber}`,
//             ...response.data
//           };
//         });

//         const data = await Promise.all(promises);
//         setAccountData(data);
//       } catch (err) {
//         setError('Failed to load account details');
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAllAccountData();
//   }, [accountNumbers]);

//   // const accountData = Array.from({ length: 20 }, (_, i) => ({
//   //   accountId: `ACC${1000 + i}`, // Example: ACC1000, ACC1001, etc.
//   //   accountBalance: Math.floor(Math.random() * 100000), // Random balance between 0 and 100,000
//   //   drawdown:`-$${Math.floor(Math.random() * 100000)} (${Math.floor(Math.random() * 100)})` , // Random drawdown between 0 and 100
//   // }));
//   return (
//     <Box sx={{  textAlign: "left",ml:2,mt:2,mr:2 }}>
//       <Typography variant="h5"  fontWeight="bold" gutterBottom sx={{ textAlign: 'left',ml:0,pt:1 }}>
//               Live Dropdown
//       </Typography>
//       <Tabs
//       value={tabValue}
//       onChange={handleTabChange}
//       sx={{
//         fontFamily: "Inter, sans-serif", // Apply font family to the Tabs
//         "& .MuiTab-root": {
//           fontFamily: "Inter, sans-serif", // Apply font family to the Tab labels
//           color: "#ddffdc", // Default text color
//           "&.Mui-selected": {
//             color: "#80ee64", // Active tab text color
//           },
//         },
//         "& .MuiTabs-indicator": {
//           backgroundColor: "#80ee64", // Active tab indicator color
//         },
//       }}
//     >
//       <Tab label="Account" />
//       <Tab label="Alert" />
//     </Tabs>
//     <Box sx={{ mt: 2 }}>
//         {tabValue === 0 && (
           
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-[1400px] pt-5 text-white text-base leading-6 font-inter">
//       {accountData.map((account) => (
//         <div
//           key={account.accountId}
//           className="flex flex-col justify-between items-start min-h-[150px] bg-[#151818] border border-[#637260] rounded-2xl p-6 hover:border-[#80ee64] transition-colors"
//         >
//           {/* Account ID */}
//           <h2 className="text-2xl leading-8 font-degular font-normal mb-2">
//             {account.accountId}
//           </h2>

//           {/* Account Balance */}
//           <p className="text-lg leading-6 text-[#80ee64] mb-2">
//             Balance: ${account.Balance?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
//           </p>

//           {/* Drawdown */}
//           <p className={`text-sm leading-[21px] ${
//             account['Max Drawdown'] < 0 ? 'text-[#EF4444]' : 'text-[#80ee64]'
//           }`}>
//             Drawdown: {account['Max Drawdown']?.toFixed(2)}%
//           </p>

//           {/* Additional Metrics */}
//           <div className="mt-3 pt-3 border-t border-[#637260]/50 w-full">
//             <p className="text-xs text-[#ddffdc]/60">Win Rate: {account['Win Rate']}%</p>
//             <p className="text-xs text-[#ddffdc]/60">Trades: {account['Total Trade']}</p>
//             <p className="text-xs text-[#ddffdc]/60">Profit: ${account['Total Profit']?.toFixed(2)}</p>
//           </div>
//         </div>
//       ))}
//     </div>
              
           
          
//         )}
//         {tabValue === 1 && (
            
//      <Box>
//      <button
//       className="
//         box-border font-sans text-sm font-medium leading-5 text-gray-900 
//         bg-[#7FED64] cursor-pointer w-[132.898px] flex items-center 
//         justify-center gap-2 transition-all duration-200 ease-in-out 
//         opacity-100 border border-green-300 rounded-full py-2 px-4 m-0
//         hover:opacity-90 focus:outline-none
//       "
//       onClick={toggleVisibility}>
//       <PlusIcon className="block align-middle mr-1" />
//       New Alert
//     </button>
//     {isVisible && (
//      <div className="mt-6 mb-0 bg-[#151818] border border-[#80ee64] rounded-xl p-6 w-full text-white text-base leading-6 font-sans">
//       <div className="mb-4 flex items-center justify-between">
//         <h3 className="text-lg font-semibold leading-7 text-white m-0">
//           Create New Alert
//         </h3>
//         <button className="text-base font-normal leading-6 text-white-400 bg-[#0A0B0F] border border-gray-700 rounded-lg p-2" onClick={toggleVisibility}>
//           <CloseIcon className="block align-middle"/>
//         </button>
//       </div>
//       <div className="mb-4 grid grid-cols-2 gap-4">
//         <div>
//           <label className="block mb-2 text-gray-400">Alert</label>
//           <input
//             type="text"
//             placeholder="Alert name"
//             className="w-full bg-[#0A0B0F] border border-gray-700 rounded-lg p-2 text-white"
//           />
//         </div>
//         <div>
//           <label className="block mb-2 text-gray-400">Account</label>
//           <select className="w-full bg-[#0A0B0F] border border-gray-700 rounded-lg p-2 text-white">
//             <option value="price">All</option>
//             <option value="technical">Account1</option>
//             <option value="news">Account2</option>
//           </select>
//         </div>
//         <div>
//           <label className="block mb-2 text-gray-400">Unit</label>
//           <select className="w-full bg-[#0A0B0F] border border-gray-700 rounded-lg p-2 text-white">
//             <option value="above">%</option>
//             <option value="below">$</option>
//           </select>
//         </div>
//         <div>
//           <label className="block mb-2 text-gray-400">Value</label>
//           <input
//             type="text"
//             placeholder="e.g. 1.0950"
//             className="w-full bg-[#0A0B0F] border border-gray-700 rounded-lg p-2 text-white"
//           />
//         </div>
//       </div>
//       <div className="flex flex-row justify-end gap-3">
//         <button className="text-sm font-medium leading-5 text-green-300 bg-transparent border border-green-300 rounded-full px-4 py-2 flex items-center justify-center">
//           Cancel
//         </button>
//         <button className="text-sm font-medium leading-5 text-gray-900 bg-[#7FED64] border border-green-300 rounded-full px-4 py-2 flex items-center justify-center">
//           Create Alert
//         </button>
//       </div>
//     </div>)}

//     <div className=" flex items-left justify-left pt-10">
//       <div className="w-full  bg-[#151818] border border-[#637260] rounded-2xl p-8">
//         {/* Header */}
//         <h2 className="text-2xl font-inter font-semibold text-[#80ee64] mb-6">
//           Alerts List
//         </h2>

//         {/* Table for Alerts */}
//         <div className="space-y-4 " >
//           {alerts.map((alert) => (
//             <div
//               key={alert.id}
//               className="p-4 bg-[#151818] border border-[#637260] rounded-lg hover:border-[#80ee64] transition-colors w-full"
//             >
//               <div className="flex justify-between items-center">
//                 {/* Alert Name */}
//                 <div className="flex-1">
//                   <p className="text-lg font-inter font-semibold text-[#ddffdc]">
//                     {alert.alertName}
//                   </p>
//                 </div>

//                 {/* Account */}
//                 <div className="flex-1">
//                   <p className="text-sm font-inter text-[#ddffdc]/60">
//                     Account: <span className="text-[#80ee64]">{alert.account}</span>
//                   </p>
//                 </div>

//                 {/* Max Drawdown */}
//                 <div className="flex-1 text-right">
//                   <p className="text-sm font-inter text-[#ddffdc]/60">
//                     Max Drawdown: <span className="text-[#80ee64]">{alert.maxDrawdown}</span>
//                   </p>
//                 </div>
//                 <DeleteIcon className="block align-middle mr-1 ml-5" />
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Add New Alert Button */}
//         </div>
//     </div>
//     </Box>
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default LiveDropdown;