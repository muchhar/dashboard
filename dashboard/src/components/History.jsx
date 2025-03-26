import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Box, Container, Typography, Card, CardContent, Divider, Stack ,Button,useMediaQuery} from '@mui/material';
import ShowChartIcon from '@mui/icons-material/TrendingUp';
import PnlIcon from '@mui/icons-material/AttachMoneyTwoTone';
import PercentIcon from '@mui/icons-material/Percent';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

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
const series = [{ data: [100, -200, 300, 500, -300, -100] }];
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

function createData( type, lot, entry, exit,profit,time,tcolor,ticon,pcolor,ctime) {
  return {  type, lot, entry, exit,profit,time,tcolor,ticon,pcolor,ctime };
}
function createDataTab2(symbol, total, winrate, netprofit, avgprofit,ncolor,acolor) {
  return { symbol, total, winrate, netprofit, avgprofit,ncolor,acolor };
}

const rows = [
  createData('BUY ', 0.1, "$1.08"	,"$1.55", "$12.89","Mar 17, 2025 22:16","#22C05C",CallMadeIcon,"#22C05C","Mar 17, 2025 22:16"),
  createData('SELL', 1.25, "$1.26	","$1.50", "$39.62","Mar 17, 2025 22:16","#EF4444",CallReceivedIcon,"#22C05C","Mar 17, 2025 22:16"),
  createData('BUY ', 0.01, "$150.50","$200.40", "$-50.62","Mar 17, 2025 22:16","#22C05C",CallMadeIcon,"#EF4444","Mar 17, 2025 22:16"),
  createData('SELL', 0.15, "$2320.50	","$2430.40", "$500.62","Mar 17, 2025 22:16","#EF4444",CallReceivedIcon,"#22C05C","Mar 17, 2025 22:16"),
  
];
const tab2rows = [
  createDataTab2('EURUSD',42, "61.8%"	,"$105", "$12.89","#22C05C","#22C05C"),
  createDataTab2('GBPUSD', 30, "80.02%","$150", "$39.62","#22C05C","#22C05C"),
  createDataTab2('XAUUSD', 120, "40.33%","$230.40", "$50.62","#22C05C","#22C05C"),
  createDataTab2('EURUSD', 66, "20.45%", "$-430.40", "$-50.62","#EF4444","#EF4444"),
  createDataTab2('EURUSD', 30, "73.32%", "$-250", "$-20.62","#EF4444","#EF4444"),
];

function History() {
  const [Period, setPeriod] = React.useState('');
  const [Symbols, setSymobl] = React.useState('');
  const [Date, setDate] = React.useState('');
  
  const [colorX, setColorX] = React.useState('piecewise');
  const [colorY, setColorY] = React.useState('None');
  
  const isWideScreen = useMediaQuery('(min-width: 766px)'); // Check if screen width is >= 766px
   //backend
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
    "All Historical Data":[
      createData('BUY ', 0.1, "$1.08"	,"$1.55", "$12.89","Mar 17, 2025 22:16","#22C05C",CallMadeIcon,"#22C05C","Mar 17, 2025 22:16"),
      createData( 'SELL', 1.25, "$1.26	","$1.50", "$39.62","Mar 17, 2025 22:16","#EF4444",CallReceivedIcon,"#22C05C","Mar 17, 2025 22:16"),
      createData( 'BUY ', 0.01, "$150.50","$200.40", "$-50.62","Mar 17, 2025 22:16","#22C05C",CallMadeIcon,"#EF4444","Mar 17, 2025 22:16"),
      createData( 'SELL', 0.15, "$2320.50	","$2430.40", "$500.62","Mar 17, 2025 22:16","#EF4444",CallReceivedIcon,"#22C05C","Mar 17, 2025 22:16"),
      createData( 'BUY ', 2.0, "$232	","$250", "$-20.62","Mar 17, 2025 22:16","#22C05C",CallMadeIcon,"#EF4444","Mar 17, 2025 22:16"),
    ],
   


  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTradingData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('https://mt4api.frequencee.io/cgi-bin/MT4AccountData.py?FrequenceeID=103');
      
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
        
        "All Historical Data": transformApiData(response.data["All Historical Data"])||
        [
          createData('BUY ', 0.1, "$1.08"	,"$1.55", "$12.89","Mar 17, 2025 22:16","#22C05C",CallMadeIcon,"#22C05C"),
          createData( 'SELL', 1.25, "$1.26	","$1.50", "$39.62","Mar 17, 2025 22:16","#EF4444",CallReceivedIcon,"#22C05C"),
          createData( 'BUY ', 0.01, "$150.50","$200.40", "$-50.62","Mar 17, 2025 22:16","#22C05C",CallMadeIcon,"#EF4444"),
          createData( 'SELL', 0.15, "$2320.50	","$2430.40", "$500.62","Mar 17, 2025 22:16","#EF4444",CallReceivedIcon,"#22C05C"),
          createData( 'BUY ', 2.0, "$232	","$250", "$-20.62","Mar 17, 2025 22:16","#22C05C",CallMadeIcon,"#EF4444"),
        ],
       

    
        
    
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

  useEffect(() => {
    // Fetch data immediately on component mount
    fetchTradingData();

    // Set up periodic polling (every 5 seconds)
    const intervalId = setInterval(fetchTradingData, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array means this effect runs once on mount and sets up recurring calls


  ////////

  const handleChange = (event) => {
    setPeriod(event.target.value);
  };
  const handleChange2 = (event) => {
    setSymobl(event.target.value);
  };
  const handleChange3 = (event) => {
    setDate(event.target.value);
  };
  return (
    <Container maxWidth={false} disableGutters  sx={{ ml: 1,mr:1,pr:1 }} > {/* Align left with margin */}
      {/* Account Overview Title */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2} sx={{ pt: 2,mr:3 }}>
  <Typography variant="h5" fontWeight="bold" sx={{pl:2}} >
    Trade History
  </Typography>
  <Button variant="outlined" onClick={exportToCSV} startIcon={<FileDownloadOutlinedIcon />} 
  sx={{
    color: "#ffffff",
    borderColor: "#ffffff",
    "&:hover": {
      color: "#80ee64",
      borderColor: "#80ee64",
      backgroundColor: "transparent",
    },
    "&:focus": {
      color: "#80ee64",
      borderColor: "#80ee64",
      backgroundColor: "transparent",
    },
    "&.Mui-disabled": {
      color: "#637260", // Text color when disabled
      borderColor: "#637260", // Border color when disabled
    },
  }}
  >
    Export
  </Button>
</Stack>
<Stack
      direction={isWideScreen ? 'row' : 'column'} // Horizontal on wide screens, vertical on smaller screens
      spacing={2} // Add spacing between cards
      sx={{ mt: 1, ml: 2, pt: 1,mr:3 }}
    >
      {/* Total Trades Card */}
      <Card
        sx={{
          flex: isWideScreen ? 1 : 'auto', // Take equal space in horizontal layout
          width: isWideScreen ? '25%' : '100%', // 25% width in horizontal layout, 100% in vertical
          boxShadow: 3,
          backgroundColor: '#151818',
          borderRadius: 3,
          border: 1,
          borderColor: '#637260',
        }}
      >
        <CardContent>
          {/* Title */}
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="body2" sx={{ color: '#A7B1C1', fontFamily: 'system-ui', margin: 0 }}>
              Total Trades
            </Typography>
          </Box>

          {/* Value */}
          <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ pt: 1 }}>
            <Typography variant="h5" marginLeft={0} fontWeight="bold" gutterBottom>
              {tradingData['Total Trade']}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Win Rate Card */}
      <Card
        sx={{
          flex: isWideScreen ? 1 : 'auto', // Take equal space in horizontal layout
          width: isWideScreen ? '25%' : '100%', // 25% width in horizontal layout, 100% in vertical
          boxShadow: 3,
          backgroundColor: '#151818',
          borderRadius: 3,
          border: 1,
          borderColor: '#637260',
        }}
      >
        <CardContent>
          {/* Title */}
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="body2" sx={{ color: '#A7B1C1', fontFamily: 'system-ui', margin: 0 }}>
              Win Rate
            </Typography>
          </Box>

          {/* Value */}
          <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ pt: 1 }}>
            <Typography variant="h5" marginLeft={0} fontWeight="bold" gutterBottom>
              {tradingData['Win Rate']}%
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Total Profit/Loss Card */}
      <Card
        sx={{
          flex: isWideScreen ? 1 : 'auto', // Take equal space in horizontal layout
          width: isWideScreen ? '25%' : '100%', // 25% width in horizontal layout, 100% in vertical
          boxShadow: 3,
          backgroundColor: '#151818',
          borderRadius: 3,
          border: 1,
          borderColor: '#637260',
        }}
      >
        <CardContent>
          {/* Title */}
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="body2" sx={{ color: '#A7B1C1', fontFamily: 'system-ui', margin: 0 }}>
              Total Profit/Loss
            </Typography>
          </Box>

          {/* Value */}
          <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ pt: 1 }}>
            <Typography variant="h5" marginLeft={0} fontWeight="bold" gutterBottom sx={{ color: tradingData['Total Profit'] >= 0 ? '#22C05C' : '#EF4444' }}>
              ${tradingData['Total Profit'].toFixed(2)}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Average P/L per Trade Card */}
      <Card
        sx={{
          flex: isWideScreen ? 1 : 'auto', // Take equal space in horizontal layout
          width: isWideScreen ? '25%' : '100%', // 25% width in horizontal layout, 100% in vertical
          boxShadow: 3,
          backgroundColor: '#151818',
          borderRadius: 3,
          border: 1,
          borderColor: '#637260',
        }}
      >
        <CardContent>
          {/* Title */}
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="body2" sx={{ color: '#A7B1C1', fontFamily: 'system-ui', margin: 0 }}>
              Average P/L per Trade
            </Typography>
          </Box>

          {/* Value */}
          <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ pt: 1 }}>
            <Typography variant="h5" marginLeft={0} fontWeight="bold" gutterBottom sx={{ color: tradingData['Average Win'] >= 0 ? '#22C05C' : '#EF4444' }}>
              ${((tradingData['Average Win']+tradingData['Average Loss'])/tradingData['Total Trade']).toFixed(2)}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Stack>
 
      
      {/* Trading Account Card */}
      <Card sx={{mr:3, p: 0.5, mb: 1,ml:2,my:2, boxShadow: 3,  backgroundColor: '#151818', borderRadius: 5,border:1,borderColor:'#637260',
        
       }}> {/* Limit width */}
        <CardContent>
          {/* Title and Graph Icon */}
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Stack direction="row" alignItems="center">
            <FilterAltOutlinedIcon sx={{color:'#9EA7B7'}}/>
            <Typography variant="body2" sx={{ fontFamily: 'system-ui', fontSize:'18',pl:1}}>Filters</Typography>
          
            </Stack>
          <Stack direction={'row'}>
            
          <div className="w-full">
      <div className="flex relative">
        <select
          id="period-select"
          value={Period}
          onChange={handleChange}
          className="
             px-5 py-2
            bg-[#212525] border border-[#637260] rounded-lg
            text-[#ddffdc] text-sm
            appearance-none
            hover:border-[#80ee64] focus:border-[#80ee64] focus:outline-none
            transition-colors duration-200
          "
        >
          <option value={10} className="bg-[#212525] text-[#ddffdc]">
            Today
          </option>
          <option value={20} className="bg-[#212525] text-[#ddffdc]">
            This Week
          </option>
          <option value={30} className="bg-[#212525] text-[#ddffdc]">
            This Month
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
    <div style={{width:'4px'}}></div>
      <div className="relative">
        <select
          id="period-select"
          value={Period}
          onChange={handleChange}
          className="
             px-5 py-2
             
            bg-[#212525] border border-[#637260] rounded-lg
            text-[#ddffdc] text-sm
            appearance-none
            hover:border-[#80ee64] focus:border-[#80ee64] focus:outline-none
            transition-colors duration-200
          "
        >
          <option value={10} className="bg-[#212525] text-[#ddffdc]">
            Newest
          </option>
          <option value={20} className="bg-[#212525] text-[#ddffdc]">
            This Month
          </option>
          <option value={30} className="bg-[#212525] text-[#ddffdc]">
            Oldest
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
    </Stack>
          </Box>
          <TableContainer component={Paper} sx={{ background: 'transparent' }}>
  <Table sx={{ minWidth: 650 }} aria-label="simple table">
    <TableHead>
      <TableRow>
        <TableCell align="right">
        <Typography fontWeight={500} fontFamily={'system-ui'} sx={{ color: '#6B717D' }}>
            Type
          </Typography>
        
        </TableCell>
        <TableCell align="right">
        <Typography fontWeight={500} fontFamily={'system-ui'} sx={{ color: '#6B717D' }}>
            Lot Size
          </Typography>
        
        </TableCell>
        <TableCell align="right">
        <Typography fontWeight={500} fontFamily={'system-ui'} sx={{ color: '#6B717D' }}>
            Entry Price
          </Typography>
        
        </TableCell>
        <TableCell align="right">
        <Typography fontWeight={500} fontFamily={'system-ui'} sx={{ color: '#6B717D' }}>
            Exit Price 
          </Typography>
        </TableCell>
        <TableCell align="right">
        <Typography fontWeight={500} fontFamily={'system-ui'} sx={{ color: '#6B717D' }}>
        Profit/Loss	Open Time
          </Typography>
        </TableCell>
        <TableCell align="right">
        <Typography fontWeight={500} fontFamily={'system-ui'} sx={{ color: '#6B717D' }}>
        Close Time
          </Typography>
        </TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {tradingData['All Historical Data'].map((row) => (
        <TableRow key={row.symbol}>
          <TableCell align="right">
  <Box display="flex" justifyContent="flex-end" alignItems="center">
    <row.ticon sx={{ color: row.tcolor, mr: 1, height: 16, width: 16 }} />
    <Typography variant="body1" sx={{ color: row.tcolor }}>
      {row.type}
    </Typography>
  </Box>
</TableCell><TableCell align="right">
            <Typography variant="body1" sx={{ color: '#EBEBEB' }}>
              {row.lot}
            </Typography>
          </TableCell>
          <TableCell align="right">
            <Typography variant="body1" sx={{ color: '#EBEBEB' }}>
              {row.entry}
            </Typography>
          </TableCell>
          <TableCell align="right">
            <Typography variant="body1" sx={{ color: '#EBEBEB' }}>
              {row.exit}
            </Typography>
          </TableCell>
          <TableCell align="right">
        <Box display="flex" justifyContent="flex-end" alignItems="center">
          <Typography variant="body1" sx={{ color: row.pcolor }}>
            {row.profit}
          </Typography>
          <CalendarTodayIcon sx={{ color: "#A7B1C1", mr: 1, height: 16, width: 16 }} />
          <Typography variant="body1" sx={{ color: "#A7B1C1" }}>
            {row.time}
          </Typography>
          
        </Box>
      </TableCell>
      <TableCell align="right">
        <Box display="flex" justifyContent="flex-end" alignItems="center">
          <CalendarTodayIcon sx={{ color: "#A7B1C1", mr: 1, height: 16, width: 16 }} />
          <Typography variant="body1" sx={{ color: "#A7B1C1" }}>
            {row.ctime}
          </Typography>
          
        </Box>
      </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
         </CardContent>
      </Card>
      
     </Container>
  );
}

export default History;
