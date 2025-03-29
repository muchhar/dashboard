import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { Box, Container, Typography, Card, CardContent, Divider, Stack ,Button,Dialog, DialogTitle, DialogContent,useMediaQuery,Grid} from '@mui/material';
import ShowChartIcon from '@mui/icons-material/TrendingUp';
import PnlIcon from '@mui/icons-material/AttachMoneyTwoTone';
import PercentIcon from '@mui/icons-material/Percent';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { PieChart } from '@mui/x-charts/PieChart';
import Skeleton from '@mui/material/Skeleton';
import api from '../utils/api';

import PortfolioIcon from '@mui/icons-material/PieChart';
import BarChartIcon from '@mui/icons-material/BarChart';
import FunctionsIcon from '@mui/icons-material/Functions';
import CallMadeIcon from '@mui/icons-material/CallMade';
import CallReceivedIcon from '@mui/icons-material/CallReceived';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import ShowChartOutlinedIcon from '@mui/icons-material/ShowChartOutlined';
import { LineChart } from '@mui/x-charts/LineChart';
import { dataset } from './basicDataset';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import RestaurantIcon from '@mui/icons-material/Restaurant'; // Import an Icon
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { BarChart } from '@mui/x-charts/BarChart';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { dataset2, valueFormatter } from './profit'
import {  Icon3, Icon4, Icon5, Icon6 } from "./icons"; // Assuming icons are impor
import Icon1 from '@mui/icons-material/ChevronLeft';
import Icon2 from '@mui/icons-material/ChevronRight';
import NoDataFound from "./nodata.jsx";

const series = [{ data: [100, -200, 300, 500, -300, -100] }];
const transformToHourlyProfit = (trades) => {
  // Initialize hours with 0 profit
  const hourlyProfit = Array(24).fill().map((_, i) => ({ x: i, y: 0 }));
  
  trades.forEach(trade => {
    const hour = new Date(trade["Open Time"]).getHours();
    hourlyProfit[hour].y += trade.Profit;
  });

  // Filter out hours with no trades if needed
  return hourlyProfit;
  // OR return hourlyProfit.filter(hour => hour.y !== 0); // Only hours with trades
};
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const transformApiData = (apiData) => {
  return apiData.map((position) => {
    const isBuy = position.Type === "BUY";
    
    return {
      type: position.Type,
      lot: position["Lot Size"],
      entry: `$${position["Entry Price"].toFixed(2)}`,
      exit: `$${position["Exit Price"].toFixed(2)}`,
      profit: `$${position.Profit.toFixed(2)}`,
      time: formatDate(position["Open Time"]),
      tcolor: isBuy ? "#22C05C" : "#EF4444",
      ticon: isBuy ? CallMadeIcon : CallReceivedIcon, // ✅ Valid component
      pcolor: position.Profit >= 0 ? "#22C05C" : "#EF4444",
      ctime: formatDate(position['Close Time'])
    };
  });
};

function createData(symbol, type, lot, entry, exit,profit,time,tcolor,ticon,pcolor,ctime) {
  return { symbol, type, lot, entry, exit,profit,time,tcolor,ticon,pcolor,ctime };
}
function createDataTab2(symbol, total, winrate, netprofit, avgprofit,ncolor,acolor) {
  return { symbol, total, winrate, netprofit, avgprofit,ncolor,acolor };
}
const transformDaysData = (dowData) => {
  const daysOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const shortDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  return daysOrder.map((day, index) => {
    const value = dowData[day] || 0;
    return {
      month: shortDays[index],
      seoul: value,
      seoul_positive: value >= 0 ? value : null,
      seoul_negative: value < 0 ? value : null
    };
  });
};
const formatToShortDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { 
    month: 'short',  // "Mar"
    day: 'numeric'   // "22"
  }).replace(',', ''); // Remove comma if present
};
const analyzeTradingDays = (trades) => {
  if (!trades?.length) return {};
  
  const dailyProfits = {};
  
  trades.forEach(trade => {
    const date = new Date(trade["Open Time"]);
    // Format as "Mar 24"
    const dayKey = date.toLocaleDateString('default', { month: 'short', day: 'numeric' });
    
    if (!dailyProfits[dayKey]) {
      dailyProfits[dayKey] = 0;
    }
    dailyProfits[dayKey] += trade.Profit;
  });

  const days = Object.entries(dailyProfits);
  const profitableDays = days.filter(([_, profit]) => profit > 0);
  const unprofitableDays = days.filter(([_, profit]) => profit < 0);
  
  const maxDay = days.reduce((max, current) => 
    current[1] > max[1] ? current : max, ['', -Infinity]);
  
  const minDay = days.reduce((min, current) => 
    current[1] < min[1] ? current : min, ['', Infinity]);

  return {
    totalProfitableDays: profitableDays.length,
    totalUnprofitableDays: unprofitableDays.length,
    maxProfitDay: [maxDay[1], maxDay[0]],  // [87.36, "Mar 24"]
    minProfitDay: [minDay[1], minDay[0]],   // [-3.22, "Mar 25"]
    profitableDayPercentage: (profitableDays.length / days.length) * 100,
    unprofitableDayPercentage: (unprofitableDays.length / days.length) * 100,
    allDays: days.length
  };
};
 
const rows = [
  createData('EURUSD','BUY ', 0.1, "$1.08"	,"$1.55", "$12.89","Mar 17, 2025 22:16","#22C05C",CallMadeIcon,"#22C05C","Mar 17, 2025 22:16"),
  createData('GBPUSD', 'SELL', 1.25, "$1.26	","$1.50", "$39.62","Mar 17, 2025 22:16","#EF4444",CallReceivedIcon,"#22C05C","Mar 17, 2025 22:16"),
  createData('XAUUSD', 'BUY ', 0.01, "$150.50","$200.40", "$-50.62","Mar 17, 2025 22:16","#22C05C",CallMadeIcon,"#EF4444","Mar 17, 2025 22:16"),
  createData('EURUSD', 'SELL', 0.15, "$2320.50	","$2430.40", "$500.62","Mar 17, 2025 22:16","#EF4444",CallReceivedIcon,"#22C05C","Mar 17, 2025 22:16"),
  createData('EURUSD', 'BUY ', 2.0, "$232	","$250", "$-20.62","Mar 17, 2025 22:16","#22C05C",CallMadeIcon,"#EF4444","Mar 17, 2025 22:16"),
  createData('EURUSD','BUY ', 0.1, "$1.08"	,"$1.55", "$12.89","Mar 17, 2025 22:16","#22C05C",CallMadeIcon,"#22C05C","Mar 17, 2025 22:16"),
  createData('GBPUSD', 'SELL', 1.25, "$1.26	","$1.50", "$39.62","Mar 17, 2025 22:16","#EF4444",CallReceivedIcon,"#22C05C","Mar 17, 2025 22:16"),
  createData('XAUUSD', 'BUY ', 0.01, "$150.50","$200.40", "$-50.62","Mar 17, 2025 22:16","#22C05C",CallMadeIcon,"#EF4444","Mar 17, 2025 22:16"),
  createData('EURUSD', 'SELL', 0.15, "$2320.50	","$2430.40", "$500.62","Mar 17, 2025 22:16","#EF4444",CallReceivedIcon,"#22C05C","Mar 17, 2025 22:16"),
  createData('EURUSD', 'BUY ', 2.0, "$232	","$250", "$-20.62","Mar 17, 2025 22:16","#22C05C",CallMadeIcon,"#EF4444","Mar 17, 2025 22:16"),
  createData('EURUSD','BUY ', 0.1, "$1.08"	,"$1.55", "$12.89","Mar 17, 2025 22:16","#22C05C",CallMadeIcon,"#22C05C","Mar 17, 2025 22:16"),
  createData('GBPUSD', 'SELL', 1.25, "$1.26	","$1.50", "$39.62","Mar 17, 2025 22:16","#EF4444",CallReceivedIcon,"#22C05C","Mar 17, 2025 22:16"),
  createData('XAUUSD', 'BUY ', 0.01, "$150.50","$200.40", "$-50.62","Mar 17, 2025 22:16","#22C05C",CallMadeIcon,"#EF4444","Mar 17, 2025 22:16"),
  createData('EURUSD', 'SELL', 0.15, "$2320.50	","$2430.40", "$500.62","Mar 17, 2025 22:16","#EF4444",CallReceivedIcon,"#22C05C","Mar 17, 2025 22:16"),
  createData('EURUSD', 'BUY ', 2.0, "$232	","$250", "$-20.62","Mar 17, 2025 22:16","#22C05C",CallMadeIcon,"#EF4444","Mar 17, 2025 22:16"),
  createData('EURUSD','BUY ', 0.1, "$1.08"	,"$1.55", "$12.89","Mar 17, 2025 22:16","#22C05C",CallMadeIcon,"#22C05C","Mar 17, 2025 22:16"),
  createData('GBPUSD', 'SELL', 1.25, "$1.26	","$1.50", "$39.62","Mar 17, 2025 22:16","#EF4444",CallReceivedIcon,"#22C05C","Mar 17, 2025 22:16"),
  createData('XAUUSD', 'BUY ', 0.01, "$150.50","$200.40", "$-50.62","Mar 17, 2025 22:16","#22C05C",CallMadeIcon,"#EF4444","Mar 17, 2025 22:16"),
  createData('EURUSD', 'SELL', 0.15, "$2320.50	","$2430.40", "$500.62","Mar 17, 2025 22:16","#EF4444",CallReceivedIcon,"#22C05C","Mar 17, 2025 22:16"),
  createData('EURUSD', 'BUY ', 2.0, "$232	","$250", "$-20.62","Mar 17, 2025 22:16","#22C05C",CallMadeIcon,"#EF4444","Mar 17, 2025 22:16"),
  createData('EURUSD','BUY ', 0.1, "$1.08"	,"$1.55", "$12.89","Mar 17, 2025 22:16","#22C05C",CallMadeIcon,"#22C05C","Mar 17, 2025 22:16"),
  createData('GBPUSD', 'SELL', 1.25, "$1.26	","$1.50", "$39.62","Mar 17, 2025 22:16","#EF4444",CallReceivedIcon,"#22C05C","Mar 17, 2025 22:16"),
  createData('XAUUSD', 'BUY ', 0.01, "$150.50","$200.40", "$-50.62","Mar 17, 2025 22:16","#22C05C",CallMadeIcon,"#EF4444","Mar 17, 2025 22:16"),
  createData('EURUSD', 'SELL', 0.15, "$2320.50	","$2430.40", "$500.62","Mar 17, 2025 22:16","#EF4444",CallReceivedIcon,"#22C05C","Mar 17, 2025 22:16"),
  createData('EURUSD', 'BUY ', 2.0, "$232	","$250", "$-20.62","Mar 17, 2025 22:16","#22C05C",CallMadeIcon,"#EF4444","Mar 17, 2025 22:16"),
  createData('EURUSD','BUY ', 0.1, "$1.08"	,"$1.55", "$12.89","Mar 17, 2025 22:16","#22C05C",CallMadeIcon,"#22C05C","Mar 17, 2025 22:16"),
  createData('GBPUSD', 'SELL', 1.25, "$1.26	","$1.50", "$39.62","Mar 17, 2025 22:16","#EF4444",CallReceivedIcon,"#22C05C","Mar 17, 2025 22:16"),
  createData('XAUUSD', 'BUY ', 0.01, "$150.50","$200.40", "$-50.62","Mar 17, 2025 22:16","#22C05C",CallMadeIcon,"#EF4444","Mar 17, 2025 22:16"),
  createData('EURUSD', 'SELL', 0.15, "$2320.50	","$2430.40", "$500.62","Mar 17, 2025 22:16","#EF4444",CallReceivedIcon,"#22C05C","Mar 17, 2025 22:16"),
  createData('EURUSD', 'BUY ', 2.0, "$232	","$250", "$-20.62","Mar 17, 2025 22:16","#22C05C",CallMadeIcon,"#EF4444","Mar 17, 2025 22:16"),
  createData('EURUSD','BUY ', 0.1, "$1.08"	,"$1.55", "$12.89","Mar 17, 2025 22:16","#22C05C",CallMadeIcon,"#22C05C","Mar 17, 2025 22:16"),
  createData('GBPUSD', 'SELL', 1.25, "$1.26	","$1.50", "$39.62","Mar 17, 2025 22:16","#EF4444",CallReceivedIcon,"#22C05C","Mar 17, 2025 22:16"),
  createData('XAUUSD', 'BUY ', 0.01, "$150.50","$200.40", "$-50.62","Mar 17, 2025 22:16","#22C05C",CallMadeIcon,"#EF4444","Mar 17, 2025 22:16"),
  createData('EURUSD', 'SELL', 0.15, "$2320.50	","$2430.40", "$500.62","Mar 17, 2025 22:16","#EF4444",CallReceivedIcon,"#22C05C","Mar 17, 2025 22:16"),
  createData('EURUSD', 'BUY ', 2.0, "$232	","$250", "$-20.62","Mar 17, 2025 22:16","#22C05C",CallMadeIcon,"#EF4444","Mar 17, 2025 22:16"),

];
const tab2rows = [
  createDataTab2('EURUSD',42, "61.8%"	,"$105", "$12.89","#22C05C","#22C05C"),
  createDataTab2('GBPUSD', 30, "80.02%","$150", "$39.62","#22C05C","#22C05C"),
  createDataTab2('XAUUSD', 120, "40.33%","$230.40", "$50.62","#22C05C","#22C05C"),
  createDataTab2('EURUSD', 66, "20.45%", "$-430.40", "$-50.62","#EF4444","#EF4444"),
  createDataTab2('EURUSD', 30, "73.32%", "$-250", "$-20.62","#EF4444","#EF4444"),
];
const profitData = [
  { date: "2025-03-01", profit: 56 },
  { date: "2025-03-02", profit: -24 },
  { date: "2025-03-03", profit: 53 },
  { date: "2025-03-04", profit: 41 },
  { date: "2025-03-05", profit: 12 },
  { date: "2025-03-06", profit: 15 },
  { date: "2025-03-07", profit: 43 },
  { date: "2025-03-08", profit: 46 },
  { date: "2025-03-09", profit: 51 },
  { date: "2025-03-10", profit: 53 },
  { date: "2025-03-11", profit: 37 },
  { date: "2025-03-12", profit: 64 },
  { date: "2025-03-14", profit: 50 },
  { date: "2025-03-15", profit: 25 },
  { date: "2025-03-16", profit: 3 },
  { date: "2025-03-17", profit: 7 },
  { date: "2025-03-19", profit: 63 },
  { date: "2025-03-20", profit: 26 },
  { date: "2025-03-21", profit: 48 },
  { date: "2025-03-22", profit: 25 },
  { date: "2025-03-23", profit: 4 },
  { date: "2025-03-24", profit: 22 },
  { date: "2025-03-25", profit: 39 },
  { date: "2025-03-26", profit: 3 },
  { date: "2025-03-27", profit: 9 },
  { date: "2025-03-29", profit: -24 },
  { date: "2025-03-30", profit: 9 },
  { date: "2025-03-31", profit: -11 },
];

function Pnlanalysis() {
  const [Period, setPeriod] = React.useState('');
  const [Symbols, setSymobl] = React.useState('');
  const [Date2, setDate] = React.useState('');
  const isWideScreen = useMediaQuery('(min-width: 1024px)'); // Check if screen width is >= 1024px  
  const isWideSc = useMediaQuery('(min-width: 850px)'); // Check if screen width is >= 1024px  
  const isLargeScreen = useMediaQuery('(min-width: 1024px)'); // >= 1024px
  const isMediumScreen = useMediaQuery('(min-width: 766px) and (max-width: 1023px)'); // 766px - 1023px
  const isSmallScreen = useMediaQuery('(max-width: 765px)'); // <= 765px
  const [tradingData, setTradingData] = useState({
    Balance: 10000.56,
    "Margin Level": 2050.15,
    Equity: 10250.75,
    "Free Margin": 9750.75,
    "Total Profit": 500.25,
    "Win Rate":80.02,
    "Profit Factor":2.46,
    "Total Trade":12,
    "Average Win":1089.77,
    "Average Loss":-447.90,
    "Max Drawdown":2047.902,
    "Sharpe ratio":1.80,
    "For display graph":[
      // { x: "2025-03-24", y: 2 },
      // { x: "2025-03-23", y: 5.5 },
      // { x: "2025-03-20", y: 2 },
      // { x: "2025-03-19", y: 8.5 },
      // { x: "2025-03-18", y: 1.5 },
      // { x: "2025-03-18", y: 5 },
    ],
    "For Loading":[],
    
     "series" : [{ data: [ -200, 300, 500, -300, -100] }],
     "profit day":0,
     "unprodit days":0,
     "prodit day percentage":0.0,
     "unprofit percentage":0.0,
     "maxProfitDay":[0,''],
     "minProfitDay":[0,''],
     "Hour Chart":[],
     "Days Data":[],
     "All Historical Data":[
     ],
     "Calender":[]
        

   


  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
 const [dataerror,setdataerror] = React.useState(false);

  const fetchTradingData = async () => {
    try {
      setIsLoading(true);
      const account = localStorage.getItem("selectedAccount");
      var accountSel=103;
      if (account) {
        accountSel=account;
      }
      const response = await api.get(`/cgi-bin/MT4AccountData.py?FrequenceeID=${accountSel.toLocaleString()}`);
      
     // const response = await axios.get('https://mt4api.frequencee.io/cgi-bin/MT4AccountData.py?FrequenceeID='+accountSel.toLocaleString());
      if(response.status==200){
        if (response.data.error) {
          setdataerror(true);
          return;

        }
        
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
      // Update state with new data
      setTradingData({
        Balance: response.data.Balance || tradingData.Balance,
        "Margin Level": response.data["Margin Level"] || tradingData["Margin Level"],
        Equity: response.data.Equity || tradingData.Equity,
        "Free Margin": response.data["Free Margin"] || tradingData["Free Margin"],
        "Total Profit": response.data["Total Profit"] || tradingData["Total Profit"],
        "Win Rate":response.data["Win Rate"] || tradingData["Win Rate"],
        "Profit Factor":response.data["Profit Factor"] || tradingData["Profit Factor"],
        "Total Trade":response.data["Total Trade"] || tradingData["Total Trade"],
        "Average Win":response.data["Average Win"] || tradingData["Average Win"],
        "Average Loss":response.data["Average Loss"] || tradingData["Average Loss"],
        "Max Drawdown":response.data["Max Drawdown"] || tradingData["Max Drawdown"],
        "Sharpe ratio":response.data["Sharpe ratio"] || tradingData["Sharpe ratio"],
        
        "For display graph": response.data["For display graph"].x.map((date, index) => ({
          x: formatToShortDate(date),          // Keep as string or convert to Date object if needed
          y: response.data["For display graph"].y[index]
        })) || tradingData["For display graph"]
        ,
        "series" :[{ data: [ response.data["DoW PL Info"]["Monday"], 
          response.data["DoW PL Info"]["Tuesday"], 
          response.data["DoW PL Info"]["Wednesday"], 
          response.data["DoW PL Info"]["Thursday"],
          response.data["DoW PL Info"]["Friday"], 
          
        ] }]
        ||[{ data: [ -200, 300, 500, -300, -100] }],

        "profit day": analyzeTradingDays(response.data["All Historical Data"]).totalProfitableDays,
        "unprodit days": analyzeTradingDays(response.data["All Historical Data"]).totalUnprofitableDays,
        "prodit day percentage": analyzeTradingDays(response.data["All Historical Data"]).profitableDayPercentage,
        "unprofit percentage": analyzeTradingDays(response.data["All Historical Data"]).unprofitableDayPercentage,
        "maxProfitDay": analyzeTradingDays(response.data["All Historical Data"]).maxProfitDay,
        "minProfitDay": analyzeTradingDays(response.data["All Historical Data"]).minProfitDay,
        "Hour Chart": transformToHourlyProfit(response.data["All Historical Data"] || []),
        "Days Data": transformDaysData(response.data["DoW PL Info"]) || tradingData["Days Data"],
        "All Historical Data": transformApiData(response.data["All Historical Data"])||
        [
        ],
        "Calender":response.data["For display graph"].x.map((date, i) => ({ 
          date, 
          profit: response.data["For display graph"].y[i] 
        })) || [],
        "For Loading":[1],

        
       
        

    
        
    
      });

      
      setError(null);
     // console.log(transformApiData(response.data["Position Info"]));
    } catch (err) {
      console.error('Error fetching trading data:', err);
      setError('Failed to fetch trading data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Fetch data immediately on component mount
    fetchTradingData();

    // Set up periodic polling (every 5 seconds)
    const intervalId = setInterval(fetchTradingData, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array means this effect runs once on mount and sets up recurring calls

  const exportToCSV = () => {
    // Prepare CSV headers
    const headers = [
      'Type',
      'Lot Size',
      'Entry Price',
      'Exit Price',
      'Profit',
      'Open Time',
      'Close Time'
      
    ].join(',');

    // Prepare CSV rows
    const rows = tradingData['All Historical Data'].map(item => [
      `"${item.type}"`,
      item.lot,
      `"${item.entry}"`,
      `"${item.exit}"`,
      `"${item.profit}"`,
      `"${item.time}"`,
      `"${item.ctime}"`,
      
    ].join(','));

    // Combine headers and rows
    const csvContent = [headers, ...rows].join('\n');

    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'trading_data.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Determine the number of columns based on screen size
  const columns = isLargeScreen ? 4 : isMediumScreen ? 2 : 1;

  // Calculate the width of each card dynamically
  const cardWidth = `${100 / columns}%`;

  const [colorX, setColorX] = React.useState('piecewise');
  const [colorY, setColorY] = React.useState('None');
  const [currentDate, setCurrentDate] = useState(new Date(2025, 2, 1));
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // Function to get the days in the current month
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  // Function to get the starting day of the month (0 = Sunday, 1 = Monday, etc.)
  const getStartingDayOfMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  // Function to change the month
  const changeMonth = (offset) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + offset);
    setCurrentDate(newDate);
  };

  // Generate the calendar grid
  const daysInMonth = getDaysInMonth(currentDate);
  const startingDay = getStartingDayOfMonth(currentDate);
  const calendarDays = [];
  const calendarDays2=[];

  // Fill the beginning of the grid with empty cells
  for (let i = 0; i < startingDay; i++) {
    calendarDays.push(<div key={`empty-${i}`} className="h-12"></div>);
    calendarDays2.push(<div key={`empty-${i}`} className="h-12"></div>);
    
  }

  // Fill the grid with days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const dateString = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const profitEntry = tradingData["Calender"].find((entry) => entry.date === dateString);
    const profit = profitEntry ? profitEntry.profit : null;

    calendarDays.push(
      <div
        key={day}
        className={`flex flex-col items-center justify-center h-12 text-sm leading-5 rounded-lg ${
          profit !== null
            ? profit >= 0
              ? "bg-[#22c55e]/15 text-[#22c55e]"
              : "bg-[#ef4444]/15 text-[#ef4444]"
            : "bg-[#0a0b0d] text-[#2c2f36]"
        }`}
      >
        <span>{day}</span>
        {profit !== null && (
          <span className="mt-0.5 text-[10px]">
            {profit >= 0 ? `+$${profit.toFixed(2)}` : `-$${Math.abs(profit.toFixed(2))}`}
          </span>
        )}
      </div>
    );
    calendarDays2.push(
      <button
        key={day}
        className={`flex flex-col items-center justify-center h-9 w-9 text-sm leading-5 rounded-lg ${
          profit !== null
            ? profit >= 0
              ? "text-[#22c55e]"
              : "text-[#ef4444]"
            : "text-[#a7b1c2]"
        }`}
        onClick={() => setIsCalendarOpen(!isCalendarOpen)}
            
      >
        {day}
        {profit !== null && (
          <span className="mt-0.5 text-[8px]">
            {profit >= 0 ? `+$${profit.toFixed(2)}` : `-$${Math.abs(profit.toFixed(2))}`}
          </span>
        )}
      </button>
    );
  }

  console.log(currentDate);
  const handleOpenCalendar = () => {
    setOpen(true);
  };

  const handleCloseCalendar = () => {
    setOpen(false);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log('Selected Date:', date);
    handleCloseCalendar();
  };

  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleChange = (event) => {
    setPeriod(event.target.value);
  };
  const handleChange2 = (event) => {
    setSymobl(event.target.value);
  };
  const handleChange3 = (event) => {
    setDate(event.target.value);
  };

  const datasetday = [
    {
      seoul: 100,
      month: 'Mon',
    },
    {
      seoul: 120,
      month: 'Tue',
    },
   { seoul: -50,
    month: 'Wed',
    }, 
    { seoul: 90,
    month: 'Thu',
  }, 
  { seoul: 150,
  month: 'Fri',
  }, 
  
  
  ];
  const desktopOS = [
    {
      label: 'Winning Trades 65%',
      value: 54.72,
       color: '#22C05C'
    },
    {
      label: 'Losing Trades 35%',
      value: 45.38,
       color: '#EF4444'
    }
];
  const valueFormatterday = (value) => `${value} mm`;
  const positiveData = datasetday.map(item => ({
    ...item,
    seoul_positive: item.seoul >= 0 ? item.seoul : null
  }));
  
  const negativeData = datasetday.map(item => ({
    ...item,
    seoul_negative: item.seoul < 0 ? item.seoul : null
  }));

  // Merge the datasets
  const combinedData = positiveData.map((item, index) => ({
    ...item,
    ...negativeData[index]
  }));
  


  const positiveData2 = dataset2.map(item => ({
    ...item,
    value_positive: item.value >= 0 ? item.value : null
  }));
  
  const negativeData2 = dataset2.map(item => ({
    ...item,
    value_negative: item.value < 0 ? item.value : null
  }));
  
  // Merge the datasets
  const combinedData2 = positiveData2.map((item, index) => ({
    ...item,
    ...negativeData2[index]
  }));
  const chartSetting2 = {
    xAxis: [
      {
      },
    ],
    width: 500,
    height: 350,
    barGap: 0, // Minimal gap between bars
    categoryGapRatio: 0.1
  };
  if(dataerror){
    return <NoDataFound message={"No data available for ACC"+localStorage.getItem("selectedAccount")}/>;
  }
 else
  if(tradingData["For Loading"].length==0){
    return(
      <Box
      sx={{
        bgcolor: '#121212',
        p: 8,
        width: '100%',
        display: 'flex',
        height:700,
        justifyContent: 'center',
      }}
    >
      <Skeleton
        sx={{ bgcolor: 'grey.900' }}
        variant="rectangular"
        width={"100%"}
        height={"100%"}
        
      />
    </Box>
    );
  }
  else{
  
  return (
    <Container maxWidth={false} disableGutters  sx={{ ml: 1}} > {/* Align left with margin */}
      {/* Account Overview Title */}
      <Stack direction="row" display={isWideSc?'flex':'none'} alignItems="center" justifyContent="space-between" spacing={2} sx={{ pt: 2,mr:2 }}>
      <div className="flex flex-row items-center justify-between gap-4 w-full bg-[#0a0b0d] text-white text-base leading-6 font-sans">
      {/* Title */}
      <h2 className="text-2xl font-semibold leading-8 text-white ml-5 text-left">
        Profit & Loss Analysis
      </h2>

      {/* Controls Container */}
      <div className="flex flex-row gap-4 ">
        {/* Date Picker Button */}
        <div className="relative ">
          <button
            onClick={() => setIsCalendarOpen(!isCalendarOpen)}
            style={{height:'40px'}}
            className="color-[#637260] flex w-full items-center justify-start gap-2 bg-[#1e2026] text-white text-base leading-6 cursor-pointer transition-all duration-150 border border-[#637260] rounded-lg px-4 py-2 hover:border-[#80ee64]"
          >
            <CalendarTodayIcon className="text-[#637260]" />
            Select Date
          </button>

          {/* Calendar Dropdown */}
          {isCalendarOpen && (
            <div className="absolute right-0 z-10 mt-2 w-80 bg-[#1e2026] shadow-lg border border-[#2c2f36] rounded-lg p-4">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => changeMonth(-1)}
                  className="p-1 text-white bg-transparent cursor-pointer rounded-full"
                >
                  <Icon1 className="text-[#a7b1c2]" />
                </button>
                <h3 className="text-base font-medium text-white m-0">
                  {currentDate.toLocaleString("default", { month: "long" })}{" "}
                  {currentDate.getFullYear()}
                </h3>
                <button
                  onClick={() => changeMonth(1)}
                  className="p-1 text-white bg-transparent cursor-pointer rounded-full"
                >
                  <Icon2 className="text-[#a7b1c2]" />
                </button>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
                {/* Weekday Headers */}
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                  <div
                    key={day}
                    className="py-1 text-center text-xs leading-4 text-[#a7b1c2]"
                  >
                    {day}
                  </div>
                ))}

                {/* Calendar Days */}
                {calendarDays2}
              </div>
            </div>
          )}
        </div>

        {/* Time Range Select */}
         <Box>
                  <div className="w-full">
              <div className="relative">
                <select
                  id="period-select"
                  value={Period}
                  onChange={handleChange}
                  className="
                    w-full px-5 py-2
                    bg-[#212525] border border-[#637260] rounded-lg
                    text-[#ddffdc] text-sm
                    appearance-none
                    hover:border-[#80ee64] focus:border-[#80ee64] focus:outline-none
                    transition-colors duration-200
                  "
                >
                  <option value={10} className="bg-[#212525] text-[#ddffdc]">
                    Last 7 Days
                  </option>
                  <option value={20} className="bg-[#212525] text-[#ddffdc]">
                    Last 30 Days
                  </option>
                  <option value={30} className="bg-[#212525] text-[#ddffdc]">
                    Last 90 Days
                  </option>
                </select>
                {/* Custom Dropdown Arrow */}
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#ddffdc]">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
            </Box>
        {/* Export Button */}
        <button style={{height:'40px'}} onClick={exportToCSV} className="flex items-center justify-center gap-2 bg-[#1e2026] text-white text-base leading-6 cursor-pointer transition-all duration-150 border border-[#637260] rounded-lg px-4 py-2 hover:border-[#80ee64]">
          <FileDownloadOutlinedIcon className="text-[#a7b1c2]" />
          Export
        </button>
      </div>
    </div>
</Stack> 


<Stack direction="column" maxWidth={true} width={'100%'} display={!isWideSc?'flex':'none'} alignItems="left" justifyContent="space-between" spacing={2} sx={{ pt: 1,mr:2 }}>
  <Typography variant="h5" fontWeight="bold" sx={{pl:2,textAlign:"left",width:'100%'}} >
  Profit & Loss Analysis
  </Typography>
  <Box sx={{pl:1.5}}>
  <div className="relative w-full pr-5">
          <button
            onClick={() => setIsCalendarOpen(!isCalendarOpen)}
            style={{height:'40px'}}
            className="color-[#637260] flex w-full items-center justify-start gap-2 bg-[#1e2026] text-white text-base leading-6 cursor-pointer transition-all duration-150 border border-[#637260] rounded-lg px-4 py-2 hover:border-[#80ee64]"
          >
            <CalendarTodayIcon className="text-[#637260]" />
            Select Date
          </button>

          {/* Calendar Dropdown */}
          {isCalendarOpen && (
            <div className="absolute right-0 z-10 mt-2 w-80 bg-[#1e2026] shadow-lg border border-[#2c2f36] rounded-lg p-4">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => changeMonth(-1)}
                  className="p-1 text-white bg-transparent cursor-pointer rounded-full"
                >
                  <Icon1 className="text-[#a7b1c2]" />
                </button>
                <h3 className="text-base font-medium text-white m-0">
                  {currentDate.toLocaleString("default", { month: "long" })}{" "}
                  {currentDate.getFullYear()}
                </h3>
                <button
                  onClick={() => changeMonth(1)}
                  className="p-1 text-white bg-transparent cursor-pointer rounded-full"
                >
                  <Icon2 className="text-[#a7b1c2]" />
                </button>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
                {/* Weekday Headers */}
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                  <div
                    key={day}
                    className="py-1 text-center text-xs leading-4 text-[#a7b1c2]"
                  >
                    {day}
                  </div>
                ))}

                {/* Calendar Days */}
                {calendarDays2}
              </div>
            </div>
          )}
        </div>

        {/* Time Range Select */}
         <Box>
                  <div className="w-full pr-5 pt-2">
              <div className="relative">
                <select
                  id="period-select"
                  value={Period}
                  onChange={handleChange}
                  className="
                    w-full px-5 py-2 
                    bg-[#212525] border border-[#637260] rounded-lg
                    text-[#ddffdc] text-sm
                    appearance-none
                    hover:border-[#80ee64] focus:border-[#80ee64] focus:outline-none
                    transition-colors duration-200
                  "
                >
                  <option value={10} className="bg-[#212525] text-[#ddffdc]">
                    Last 7 Days
                  </option>
                  <option value={20} className="bg-[#212525] text-[#ddffdc]">
                    Last 30 Days
                  </option>
                  <option value={30} className="bg-[#212525] text-[#ddffdc]">
                    Last 90 Days
                  </option>
                </select>
                {/* Custom Dropdown Arrow */}
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#ddffdc]">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
            </Box>
        {/* Export Button */}
        <div className='w-full pr-5'>
        <button onClick={exportToCSV} style={{height:'40px',marginTop:'8px'}} className="w-full flex items-center justify-center gap-2 bg-[#1e2026] text-white text-base leading-6 cursor-pointer transition-all duration-150 border border-[#637260] rounded-lg px-4 py-2 hover:border-[#80ee64]">
          <FileDownloadOutlinedIcon className="text-[#a7b1c2]" />
          Export
        </button>
        </div>
  </Box>
</Stack> 
<Grid container   sx={{ mt: 2.5, ml: 1,pr:2 }} >
      {/* Total P&L Card */}
      <Grid  sx={{ width: cardWidth }}>
        <Card
          sx={{
            boxShadow: 3,
            m:1,
            //maxWidth: 280,
            width: '100%-16px',
            backgroundColor: '#151818',
            borderRadius: 3,
            border: 1,
            borderColor: '#637260',
          }}
        >
          <CardContent>
            {/* Title and Graph Icon */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography
                variant="body2"
                sx={{ color: '#A7B1C1', fontFamily: 'system-ui', margin: 0 }}
              >
                Total P&L
              </Typography>
              {tradingData["Total Profit"] >= 0 ? (
                  <ShowChartIcon sx={{ color: '#4caf50', borderRadius: '50%',
                    padding: '0px', }} />
                ) : (
                  <TrendingDownIcon sx={{ color: '#EF4444', borderRadius: '50%',
                    padding: '0px', }} />
                )}
              
            </Box>

            {/* Profit & Loss */}
            <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ pt: 1 }}>
              <Typography variant="h5" marginLeft={0} fontWeight="bold" gutterBottom sx={{ color: tradingData["Total Profit"]>=0? '#7FED64':'#EF4444' }}>
                ${(tradingData["Total Profit"]).toFixed(2)}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Win Rate Card */}
      <Grid  sx={{ width: cardWidth }}>
        <Card
          sx={{
            boxShadow: 3,
           // maxWidth: 280,
           m:1,
            width: '100%-16px',
            backgroundColor: '#151818',
            borderRadius: 3,
            border: 1,
            borderColor: '#637260',
          }}
        >
          <CardContent>
            {/* Title and Graph Icon */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography
                variant="body2"
                sx={{ color: '#A7B1C1', fontFamily: 'system-ui', margin: 0 }}
              >
                Win Rate
              </Typography>
              <PortfolioIcon
                sx={{
                  color: '#80ee64',
                  borderRadius: '50%',
                  padding: '0px',
                }}
              />
            </Box>

            {/* Profit & Loss */}
            <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ pt: 1 }}>
              <Typography variant="h5" marginLeft={0} fontWeight="bold" gutterBottom>
                {tradingData["Win Rate"]}%
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Total Trades Card */}
      <Grid  sx={{ width: cardWidth }}>
        <Card
          sx={{
            boxShadow: 3,
           // maxWidth: 280,
           m:1,

            width: '100%-16px',
            backgroundColor: '#151818',
            borderRadius: 3,
            border: 1,
            borderColor: '#637260',
          }}
        >
          <CardContent>
            {/* Title and Graph Icon */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography
                variant="body2"
                sx={{ color: '#A7B1C1', fontFamily: 'system-ui', margin: 0 }}
              >
                Total Trades
              </Typography>
              <BarChartIcon
                sx={{
                  color: '#A7B1C1',
                  borderRadius: '50%',
                  padding: '0px',
                }}
              />
            </Box>

            {/* Profit & Loss */}
            <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ pt: 1 }}>
              <Typography variant="h5" marginLeft={0} fontWeight="bold" gutterBottom>
                {tradingData["Total Trade"]}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Avg. Daily P&L Card */}
      <Grid  sx={{ width: cardWidth }}>
        <Card
          sx={{
            boxShadow: 3,
            m:1,
           // maxWidth: 280,
            width: '100%-16px',
            backgroundColor: '#151818',
            borderRadius: 3,
            border: 1,
            borderColor: '#637260',
          }}
        >
          <CardContent>
            {/* Title and Graph Icon */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography
                variant="body2"
                sx={{ color: '#A7B1C1', fontFamily: 'system-ui', margin: 0 }}
              >
                Avg. Daily P&L
              </Typography>
              <PnlIcon
                sx={{
                  color: '#7FED64',
                  borderRadius: '50%',
                  padding: '0px',
                }}
              />
            </Box>

            {/* Profit & Loss */}
            <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ pt: 1 }}>
              <Typography variant="h5" marginLeft={0} fontWeight="bold" gutterBottom sx={{ color: '#7FED64' }}>
                ${(tradingData["Average Win"]).toFixed(2)}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
        <Stack
      direction={isWideScreen ? 'row' : 'column'} // Horizontal on wide screens, vertical on smaller screens
      spacing={2} // Add spacing between cards
      alignItems="center"
      justifyContent="space-between"
      sx={{pt:2,ml:1,pr:2}}
    >
      {/* Cumulative Performance Card */}
      <Card
        sx={{
          p: 0.5,
          mb: 1,
          ml: 2,
          my: 2,
          boxShadow: 3,
          width: isWideScreen ? '50%' : '100%', // 50% width in horizontal layout, 100% in vertical
          backgroundColor: '#151818',
          borderRadius: 5,
          border: 1,
          borderColor: '#637260',
        }}
      >
        <CardContent>
          {/* Title */}
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" sx={{ fontFamily: 'system-ui' }}>
            Daily P&L
            </Typography>
          </Box>

          {/* Line Chart */}
          <LineChart
            dataset={tradingData['For display graph']}
            xAxis={[{ dataKey: 'x' ,scaleType: 'band'}]}
            series={[{ dataKey: 'y', color: '#22C05C' }]}
            height={300}
            margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
            grid={{ vertical: true, horizontal: true }}
          />
        </CardContent>
      </Card>

      {/* Daily Profit/Loss Card */}
      <Card
        sx={{
          p: 0.5,
          mb: 1,
          ml: 2,
          my: 2,
          boxShadow: 3,
          width: isWideScreen ? '50%' : '100%', // 50% width in horizontal layout, 100% in vertical
          backgroundColor: '#151818',
          borderRadius: 5,
          border: 1,
          borderColor: '#637260',
        }}
      >
        <CardContent>
          {/* Title */}
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" sx={{ fontFamily: 'system-ui' }}>
            Hourly P&L Distribution
            </Typography>
          </Box>

          {/* Bar Chart */}
          <BarChart
            dataset={tradingData["Hour Chart"]}
            xAxis={[{ scaleType: 'band', dataKey: 'x' }]}
            series={[
              {
                dataKey: "y",
                
              },
              // {
              //   dataKey: "value_negative",
              //   valueFormatter,
              //   itemStyle: {
              //     fill: "red", // Red for negative
              //   },
              // },
            ]}
            {...chartSetting}
          />
        </CardContent>
      </Card>
    </Stack>
     

      <Stack direction={isWideScreen ? 'row' : 'column'} spacing={2} // Add spacing between cards
      // Horizontal on wide screens, vertical on smaller screens
       alignItems="stretch" justifyContent="space-between" sx={{pt:2,ml:1,mr:2}}>
   
   <Card sx={{ p: 0.5, mb: 1,ml:4,my:0, boxShadow: 3,width:'100%',  backgroundColor: '#151818', borderRadius: 5,border:1,borderColor:'#637260',
        
    }}> {/* Limit width */}
     <CardContent>
       {/* Title and Graph Icon */}
       <Box>
       <div className="bg-transparent  rounded-xl p-0 w-[100%] text-white text-base leading-6 font-sans">
      <h3 className="text-lg font-semibold leading-7 mb-4 text-left">P&L Calendar</h3>
      <div className="mb-4">
        <div className="flex items-center justify-between mb-4">
          <button className="p-1" onClick={() => changeMonth(-1)}>
            <Icon1 className="block align-middle text-[#a7b1c2]" />
          </button>
          <h3 className="text-base font-medium m-0">
            {currentDate.toLocaleString("default", { month: "long" })}{" "}
            {currentDate.getFullYear()}
          </h3>
          <button className="p-1" onClick={() => changeMonth(1)}>
            <Icon2 className="block align-middle text-[#a7b1c2]" />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
            <div
              key={day}
              className="py-1 text-center text-xs leading-4 text-[#a7b1c2]"
            >
              {day}
            </div>
          ))}
          {calendarDays}
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between text-sm leading-5">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-[#ef4444]/15 rounded-sm mr-2"></div>
          <span className="text-[#a7b1c2]">Loss</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-[#0a0b0d] rounded-sm mr-2"></div>
          <span className="text-[#a7b1c2]">No Trades</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-[#22c55e]/15 rounded-sm mr-2"></div>
          <span className="text-[#a7b1c2]">Profit</span>
        </div>
      </div>
    </div>
       </Box>
      </CardContent>
   </Card>
   <Card  sx={{ p: 0.5, mb: 1,ml:2,my:2, boxShadow: 3,width:'100%',  backgroundColor: '#151818', borderRadius: 5,border:1,borderColor:'#637260',
        
      }}> {/* Limit width */}
       <CardContent   >
         {/* Title and Graph Icon */}
         <Box display="flex" justifyContent="space-between" alignItems="center">
           <Typography variant="h6" sx={{ fontFamily: 'system-ui' }}>Day P&L Analysis</Typography>
           
         </Box>
         <BarChart
         dataset={tradingData["Days Data"]}
              yAxis={[{ scaleType: 'band', dataKey: 'month' }]}
              series={[
                { 
                  dataKey: 'seoul_positive', 
                  color: '#4CAF50', // Green for positive
                  label: 'Profit'
                },
                { 
                  dataKey: 'seoul_negative', 
                  color: '#F44336', // Red for negative
                  label: 'Loss'
                }
              ]}
              layout="horizontal"
             {...chartSetting2}
      />
       <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}></div>
        </CardContent>
     </Card>
      </Stack>
 









           <Card sx={{ p: 0.5, mb: 1,ml:1,mr:2,my:2, boxShadow: 3,  backgroundColor: '#151818', borderRadius: 5,border:1,borderColor:'#637260',
        
    }}> {/* Limit width */}
     <CardContent>
       {/* Title and Graph Icon */}
       <Stack direction="row" alignItems="left" justifyContent="space-between" spacing={2} sx={{ pt: 1 }}>
      <Typography variant="h6" sx={{ fontFamily: 'system-ui', marginLeft:-18 }} >
      P&L Statistics
      </Typography>
      
</Stack> 
<Grid
      container
      spacing={2} // Adds spacing between grid items
      sx={{ pb: 1,pt: 1}}
    >
      {[1, 2, 3, 4].map((index) => (
        <Grid
          key={index}
          item
          xs={12} // 1 card per row for screens < 766px
          sm={6}  // 2 cards per row for screens between 766px and 1023px
          md={3}  // 4 cards per row for screens >= 1024px
        >
          <Card
            sx={{
              boxShadow: 3,
              backgroundColor: '#0A0B0E',
              borderRadius: 2,
              border: 0.5,
              borderColor: '#5E6585',
            }}
          >
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box display="flex">
                  <Typography
                    variant="body2"
                    sx={{ color: '#A7B1C1', fontSize: 16, fontFamily: 'system-ui', margin: 0, pt: 0 }}
                  >
                    {index === 1 ? 'Profitable Days' :
                      index === 2 ? 'Unprofitable Days' :
                        index === 3 ? 'Best Day' : 'Worst Day'}
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ pl: 0.5, pt: 1 }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: index === 1 || index === 3 ? '#7FED64' : '#EF4444',
                    fontSize: index === 2 ? 24 : 20,
                    fontFamily: 'system-ui',
                    margin: 0,
                    pt: 0,
                    fontWeight: 700
                  }}
                >
                  {index === 1 ? tradingData["profit day"] :
                    index === 2 ? tradingData["unprodit days"] :
                      index === 3 ? '$'+ tradingData["maxProfitDay"][0].toFixed(2).toLocaleString() : '$'+tradingData["minProfitDay"][0].toFixed(2).toLocaleString()}
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{ color: '#A7B1C1',textAlign:'left', fontSize: 14, fontFamily: 'system-ui', margin: 0, pt: 1 }}
              >
                {index === 1 ? tradingData["prodit day percentage"].toFixed(0).toLocaleString()+'% of total days' :
                  index === 2 ? tradingData["unprofit percentage"].toFixed(0).toLocaleString()+'% of total days' :
                    index === 3 ? tradingData["maxProfitDay"][1] : tradingData["minProfitDay"][1]}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>

      </CardContent>
   </Card>
    
     </Container>
  );}
}
const chartSetting = {
  yAxis: [
    {
      colorMap: {
        type: 'continuous',
        color: ['#80ee64', '#80ee64'],
      },
    },
  ],
  series: [{ dataKey: 'y' }],
  height: 300,
  sx: {
   
  },
};
const pieParams = {
  slotProps: { legend: { hidden: true, // Show the legend
    } },
};
export default Pnlanalysis;
