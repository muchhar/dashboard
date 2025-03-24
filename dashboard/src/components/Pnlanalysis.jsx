import React, { useState,useEffect } from 'react';
import { Box, Container, Typography, Card, CardContent, Divider, Stack ,Button,Dialog, DialogTitle, DialogContent,useMediaQuery,Grid} from '@mui/material';
import ShowChartIcon from '@mui/icons-material/TrendingUp';
import PnlIcon from '@mui/icons-material/AttachMoneyTwoTone';
import PercentIcon from '@mui/icons-material/Percent';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { PieChart } from '@mui/x-charts/PieChart';

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
const series = [{ data: [100, -200, 300, 500, -300, -100] }];

function createData(symbol, type, lot, entry, exit,profit,time,tcolor,ticon,pcolor,ctime) {
  return { symbol, type, lot, entry, exit,profit,time,tcolor,ticon,pcolor,ctime };
}
function createDataTab2(symbol, total, winrate, netprofit, avgprofit,ncolor,acolor) {
  return { symbol, total, winrate, netprofit, avgprofit,ncolor,acolor };
}

 
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
    const profitEntry = profitData.find((entry) => entry.date === dateString);
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
            {profit >= 0 ? `+$${profit}` : `-$${Math.abs(profit)}`}
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
            {profit >= 0 ? `+$${profit}` : `-$${Math.abs(profit)}`}
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
        <button style={{height:'40px'}} className="flex items-center justify-center gap-2 bg-[#1e2026] text-white text-base leading-6 cursor-pointer transition-all duration-150 border border-[#637260] rounded-lg px-4 py-2 hover:border-[#80ee64]">
          <FileDownloadOutlinedIcon className="text-[#a7b1c2]" />
          Export
        </button>
      </div>
    </div>
</Stack> 


<Stack direction="column" maxWidth={false} display={!isWideSc?'flex':'none'} alignItems="left" justifyContent="space-between" spacing={2} sx={{ pt: 1 }}>
  <Typography variant="h5" fontWeight="bold" sx={{pl:2,textAlign:"left"}} >
  Profit & Loss Analysis
  </Typography>
  <Box sx={{pl:1.5}}>
  <LocalizationProvider dateAdapter={AdapterDayjs}>
   
  <Button variant="outlined" startIcon={<CalendarTodayIcon />} sx={{color:'#637260',m:1,height:40,borderColor:'#404343',width:'100%'}} onClick={handleOpenCalendar}>
    Select Date
  </Button>
  <Dialog open={open} onClose={handleCloseCalendar} >
        <DialogContent>
      <DateCalendar  />
        </DialogContent>
      </Dialog>
      </LocalizationProvider>
  <FormControl sx={{ m: 1, minWidth: 120,width:'100%' }} size="small">
    <InputLabel id="demo-simple-select-label">Period</InputLabel>
 
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={Symbols}
        label="Period"
        onChange={handleChange2}
      >
        <MenuItem value={10}>All Time</MenuItem>
        <MenuItem value={20}>This Year</MenuItem>
        <MenuItem value={30}>This Quarter</MenuItem>
        <MenuItem value={20}>This Month</MenuItem>
        
      </Select>
    </FormControl>
  
  <Button variant="outlined" startIcon={<FileDownloadOutlinedIcon />} sx={{color:'#ffffff',m:1,height:40,borderColor:'#404343',width:'100%'}}>
    Export
  </Button>
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
              <ShowChartIcon
                sx={{
                  color: '#4caf50',
                  borderRadius: '50%',
                  padding: '0px',
                }}
              />
            </Box>

            {/* Profit & Loss */}
            <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ pt: 1 }}>
              <Typography variant="h5" marginLeft={0} fontWeight="bold" gutterBottom sx={{ color: '#7FED64' }}>
                $2047.902
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
                80.02%
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
                246
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
                $58.88
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
            dataset={dataset}
            xAxis={[{ dataKey: 'x' }]}
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
            dataset={combinedData2}
            xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
            series={[
              {
                dataKey: "value_positive",
                valueFormatter,
                itemStyle: {
                  fill: "#4CAF50", // Green for positive
                },
              },
              {
                dataKey: "value_negative",
                valueFormatter,
                itemStyle: {
                  fill: "red", // Red for negative
                },
              },
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
        dataset={combinedData}
        yAxis={[{ scaleType: 'band', dataKey: 'month' }]}
        series={[
          { 
            dataKey: 'seoul_positive', 
            valueFormatterday,
            color: '#4CAF50', // Green for positive
            
          },
          { 
            dataKey: 'seoul_negative', 
            valueFormatterday,
            color: '#F44336', // Red for negative
            
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
                  {index === 1 ? '27' :
                    index === 2 ? '4' :
                      index === 3 ? '$146.27' : '$-49.40'}
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{ color: '#A7B1C1',textAlign:'left', fontSize: 14, fontFamily: 'system-ui', margin: 0, pt: 1 }}
              >
                {index === 1 ? '87.1% of total days' :
                  index === 2 ? '12.9% of total days' :
                    index === 3 ? 'Mar 12' : 'Feb 28'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>

      </CardContent>
   </Card>
    
     </Container>
  );
}
const chartSetting = {
  yAxis: [
    {
      colorMap: {
        type: 'continuous',
        min: -10,
        max: 10,
        color: ['#80ee64', '#80ee64'],
      },
    },
  ],
  series: [{ dataKey: 'seoul', valueFormatter }],
  height: 300,
  sx: {
   
  },
};
const pieParams = {
  slotProps: { legend: { hidden: true, // Show the legend
    } },
};
export default Pnlanalysis;
