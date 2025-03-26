import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Container, Typography, Card, CardContent, Divider, Stack,useMediaQuery } from '@mui/material';
import ShowChartIcon from '@mui/icons-material/TrendingUp';
import PnlIcon from '@mui/icons-material/AttachMoneyTwoTone';
import PercentIcon from '@mui/icons-material/Percent';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import Skeleton from '@mui/material/Skeleton';

import PortfolioIcon from '@mui/icons-material/PieChart';
import BarChartIcon from '@mui/icons-material/BarChart';
import FunctionsIcon from '@mui/icons-material/Functions';
import CallMadeIcon from '@mui/icons-material/CallMade';
import CallReceivedIcon from '@mui/icons-material/CallReceived';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import ShowChartOutlinedIcon from '@mui/icons-material/ShowChartOutlined';
import { LineChart } from '@mui/x-charts/LineChart';
import { dataset } from './basicDataset';

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
import {  valueFormatter } from './profit'
import { PieChart } from '@mui/x-charts/PieChart';
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
const calculateWinLossPercentage = (trades) => {
  if (!trades || trades.length === 0) {
    return { winPercentage: 0, lossPercentage: 0 };
  }

  const totalTrades = trades.length;
  const winningTrades = trades.filter(trade => trade.Profit > 0).length;
  const losingTrades = totalTrades - winningTrades;

  return {
    winPercentage: parseFloat(((winningTrades / totalTrades) * 100).toFixed(2)),
    lossPercentage: parseFloat(((losingTrades / totalTrades) * 100).toFixed(2)),
  };
};

function transformGraphData(apiData) {
  var setd= apiData.x.map((datex, index) => ({
    x: datex,          // Keep as string or convert to Date object if needed
    y: apiData.y[index]
  }))
  //return setd;
  return {
    "For display graph": apiData.x.map((dateStr, index) => {
      const date = new Date(dateStr);
      const formattedDate = date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short'
      });
      
      return {
        x: formattedDate.replace(',', ''), // "24 Mar" instead of "24 Mar,"
        y: apiData.y[index]
      };
    })
  };
}

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
const transformToMonthlyProfit = (trades) => {
  // Initialize monthly profit tracker
  const monthlyProfits = {
    Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0, Jun: 0,
    Jul: 0, Aug: 0, Sep: 0, Oct: 0, Nov: 0, Dec: 0
  };

  // Process each trade
  trades.forEach(trade => {
    const month = new Date(trade["Open Time"]).toLocaleString('default', { month: 'short' });
    monthlyProfits[month] += trade.Profit;
  });

  // Convert to array format
  return Object.entries(monthlyProfits).map(([month, value]) => ({
    month,
    value: parseFloat(value.toFixed(2)) // Round to 2 decimal places
  }));
};
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
const dataset2 = [
  { month: 'Jan', value: 100 },
  { month: 'Feb', value: -30 },
  { month: 'Mar', value: 70 },
  { month: 'Apr', value: -50 },
  { month: 'May', value: 120 },
  { month: 'Jun', value: 90 },
  { month: 'Jul', value: -120 },
  { month: 'Aug', value: -45 },
  { month: 'Nov', value: 70 },
  { month: 'Oct', value: 120 },
  { month: 'Sep', value: 150 },
  { month: 'Dec', value: 120 }
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
const rows = [
  createData('BUY ', 0.1, "$1.08"	,"$1.55", "$12.89","Mar 17, 2025 22:16","#22C05C",CallMadeIcon,"#22C05C",'Mar 17, 2025 22:16'),
  createData( 'SELL', 1.25, "$1.26	","$1.50", "$39.62","Mar 17, 2025 22:16","#EF4444",CallReceivedIcon,"#22C05C",'Mar 17, 2025 22:16'),
  createData( 'BUY ', 0.01, "$150.50","$200.40", "$-50.62","Mar 17, 2025 22:16","#22C05C",CallMadeIcon,"#EF4444",'Mar 17, 2025 22:16'),
  createData( 'SELL', 0.15, "$2320.50	","$2430.40", "$500.62","Mar 17, 2025 22:16","#EF4444",CallReceivedIcon,"#22C05C",'Mar 17, 2025 22:16'),
 ];
const tab2rows = [
  createDataTab2('EURUSD',42, "61.8%"	,"$105", "$12.89","#22C05C","#22C05C"),
  createDataTab2('GBPUSD', 30, "80.02%","$150", "$39.62","#22C05C","#22C05C"),
  createDataTab2('XAUUSD', 120, "40.33%","$230.40", "$50.62","#22C05C","#22C05C"),
  createDataTab2('EURUSD', 66, "20.45%", "$-430.40", "$-50.62","#EF4444","#EF4444"),
  createDataTab2('EURUSD', 30, "73.32%", "$-250", "$-20.62","#EF4444","#EF4444"),
];

function Analytics() {
  const [Period, setPeriod] = React.useState('');
  const [Symbols, setSymobl] = React.useState('');
  const [colorX, setColorX] = React.useState('piecewise');
  const [colorY, setColorY] = React.useState('None');
  //backend
  const [tradingData, setTradingData] = useState({
    "All Historical Data":[
          createData('BUY ', 0.1, "$1.08"	,"$1.55", "$12.89","Mar 17, 2025 22:16","#22C05C",CallMadeIcon,"#22C05C","Mar 17, 2025 22:16"),
          createData( 'SELL', 1.25, "$1.26	","$1.50", "$39.62","Mar 17, 2025 22:16","#EF4444",CallReceivedIcon,"#22C05C","Mar 17, 2025 22:16"),
          createData( 'BUY ', 0.01, "$150.50","$200.40", "$-50.62","Mar 17, 2025 22:16","#22C05C",CallMadeIcon,"#EF4444","Mar 17, 2025 22:16"),
          createData( 'SELL', 0.15, "$2320.50	","$2430.40", "$500.62","Mar 17, 2025 22:16","#EF4444",CallReceivedIcon,"#22C05C","Mar 17, 2025 22:16"),
          createData( 'BUY ', 2.0, "$232	","$250", "$-20.62","Mar 17, 2025 22:16","#22C05C",CallMadeIcon,"#EF4444","Mar 17, 2025 22:16"),
        ],
        "series" : [{ data: [ -200, 300, 500, -300, -100] }],
        "For display graph":[
     
        ],
        "Month Data":[],
        "Days Data":[],
        "Wining Trade":[
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
      ],
      "Hour Chart":[]


  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTradingData = async () => {
    try {
      setIsLoading(true);
      const account = localStorage.getItem("selectedAccount");
      var accountSel=103;
      if (account) {
        accountSel=account;
      }
      
      const response = await axios.get('https://mt4api.frequencee.io/cgi-bin/MT4AccountData.py?FrequenceeID='+accountSel.toLocaleString());
      const winLossStats = calculateWinLossPercentage(response.data["All Historical Data"] || []);


      // Update state with new data
      setTradingData({
        "All Historical Data": transformApiData(response.data["All Historical Data"])||
        [
          createData('BUY ', 0.1, "$1.08"	,"$1.55", "$12.89","Mar 17, 2025 22:16","#22C05C",CallMadeIcon,"#22C05C","Mar 17, 2025 22:16"),
          createData( 'SELL', 1.25, "$1.26	","$1.50", "$39.62","Mar 17, 2025 22:16","#EF4444",CallReceivedIcon,"#22C05C","Mar 17, 2025 22:16"),
          createData( 'BUY ', 0.01, "$150.50","$200.40", "$-50.62","Mar 17, 2025 22:16","#22C05C",CallMadeIcon,"#EF4444","Mar 17, 2025 22:16"),
          createData( 'SELL', 0.15, "$2320.50	","$2430.40", "$500.62","Mar 17, 2025 22:16","#EF4444",CallReceivedIcon,"#22C05C","Mar 17, 2025 22:16"),
          createData( 'BUY ', 2.0, "$232	","$250", "$-20.62","Mar 17, 2025 22:16","#22C05C",CallMadeIcon,"#EF4444","Mar 17, 2025 22:16"),
        ],
        "series" :[{ data: [ response.data["DoW PL Info"]["Monday"], 
          response.data["DoW PL Info"]["Tuesday"], 
          response.data["DoW PL Info"]["Wednesday"], 
          response.data["DoW PL Info"]["Thursday"],
          response.data["DoW PL Info"]["Friday"], 
          
        ] }]||[{ data: [ -200, 300, 500, -300, -100] }]
        ,
        "For display graph": transformGraphData(response.data['For display graph'])['For display graph'] || tradingData["For display graph"],
        "Month Data": transformToMonthlyProfit(response.data["All Historical Data"]) || tradingData["Month Data"],
        "Days Data": transformDaysData(response.data["DoW PL Info"]) || tradingData["Days Data"],
         "Wining Trade": [
          {
            label: `Winning Trades ${winLossStats.winPercentage.toLocaleString()}%`,
            value: winLossStats.winPercentage,
            color: '#22C05C'
          },
          {
            label: `Losing Trades ${winLossStats.lossPercentage.toLocaleString()}%`,
            value: winLossStats.lossPercentage,
            color: '#EF4444'
          }
        ] || tradingData["Wining Trade"],
        "Hour Chart": transformToHourlyProfit(response.data["All Historical Data"] || [])
       
           
    
        
    
      });
      console.log(winLossStats);
      
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


  ////////

  const isWideScreen = useMediaQuery('(min-width: 1024px)'); // Check if screen width is >= 1024px  
  const handleChange = (event) => {
    setPeriod(event.target.value);
  };
  const handleChange2 = (event) => {
    setSymobl(event.target.value);
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
    height: 300,
    barGap: 0, // Minimal gap between bars
    categoryGapRatio: 0.1
  };
  if(tradingData["For display graph"].length==0){
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
    <Container maxWidth={false} disableGutters  sx={{mr:1,ml:1,mt:1,  width:'100%'}} > {/* Align left with margin */}
      {/* Account Overview Title */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2} sx={{ pt: 1,pb:0.5,mr:2 }}>
  <Typography variant="h5" fontWeight="bold" sx={{pl:1}} >
  Trading Analytics
      
  </Typography>
  <div className="">
      <div className="relative">
        <select
          id="period-select"
          value={Period}
          onChange={handleChange}
          className="
            w-full px-6 py-2
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
</Stack>
      {/* Trading Account Card */}
      
      {/* Trading Account Card */}
      <Stack
      direction={isWideScreen ? 'row' : 'column'} // Horizontal on wide screens, vertical on smaller screens
      spacing={2} // Add spacing between cards
      alignItems="center"
      justifyContent="space-between"
      sx={{pt:2,ml:0,mr:2}}
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
              Cumulative Performance
            </Typography>
          </Box>

          {/* Line Chart */}
          <LineChart
            dataset={tradingData['For display graph']}
            xAxis={[{ dataKey: 'x',scaleType: 'band' }]}
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
              Daily Profit/Loss
            </Typography>
          </Box>

          {/* Bar Chart */}
          <BarChart
            dataset={tradingData["Month Data"]}
            xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
            series={[
              {
               dataKey: 'value',
                valueFormatter,
                color: '#4CAF50', // Green for positive
              },
             
            ]}
            {...chartSetting}
          />
        </CardContent>
      </Card>
    </Stack>
     

      <Stack direction={isWideScreen ? 'row' : 'column'} spacing={2}  // Add spacing between cards
      // Horizontal on wide screens, vertical on smaller screens
       alignItems="center" justifyContent="space-between" sx={{pt:2,ml:0,mr:2}}>
      <Card sx={{ p: 0.5, mb: 1,ml:0,my:2, boxShadow: 3,width:'100%',  backgroundColor: '#151818', borderRadius: 5,border:1,borderColor:'#637260',
        
    }}> {/* Limit width */}
     <CardContent>
       {/* Title and Graph Icon */}
       <Box display="flex" justifyContent="space-between" alignItems="center">
         <Typography variant="h6" sx={{ fontFamily: 'system-ui' }}>Daily Profit/Loss</Typography>
         
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
      </CardContent>
   </Card>
   <Card sx={{ p: 0.5, mb: 1,ml:2,my:2, boxShadow: 3,width:'100%',  backgroundColor: '#151818', borderRadius: 5,border:1,borderColor:'#637260',
        
    }}> {/* Limit width */}
     <CardContent>
       {/* Title and Graph Icon */}
       <Box display="flex" justifyContent="space-between" alignItems="center" sx={{mb:2}}>
         <Typography variant="h6" sx={{ fontFamily: 'system-ui' }}>Trade Distribution</Typography>
         
       </Box>
       <Box display="flex"  alignItems="center">
        <Box height={20} width={20} sx={{backgroundColor:'#7FED64'}}></Box> <Typography variant="h6" sx={{ fontFamily: 'system-ui' ,color:'#7FED64',fontSize:16,ml:1}}> {tradingData["Wining Trade"][0]["label"]}</Typography>
        <Box height={20} width={20} sx={{backgroundColor:'#EF4444',ml:2}}></Box>  <Typography variant="h6" sx={{ fontFamily: 'system-ui',color:'#EF4444',fontSize:16,ml:1 }}>{tradingData["Wining Trade"][1]["label"]}</Typography>
         
       </Box>
       
      
       <PieChart
        height={250}
        alignItems='center'
        series={[
          {
            data: tradingData["Wining Trade"].slice(0, 2),
            innerRadius:50,
           
            
          },
          
        ]}
       {...pieParams}
        skipAnimation={false}
      />
      
      </CardContent>
   </Card>
  
      </Stack>
     
      {/* Trading Account Card */}
       <Card sx={{ p: 0.5, mb: 1,ml:0,mr:2,my:2, boxShadow: 3,  backgroundColor: '#151818', borderRadius: 5,border:1,borderColor:'#637260',
        
    }}> {/* Limit width */}
     <CardContent>
       {/* Title and Graph Icon */}
       <Box display="flex" justifyContent="space-between" alignItems="center">
         <Typography variant="h6" sx={{ fontFamily: 'system-ui' }}>Hourly Performance</Typography>
         
       </Box>
       <LineChart
   dataset={tradingData["Hour Chart"]}
   xAxis={[{ dataKey: 'x' }]}
   series={[{ dataKey: 'y',color: '#80ee64'  }]}
   height={300}
   margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
   grid={{ vertical: true, horizontal: true }}
   
 />
      </CardContent>
  
       </Card>
 
     </Container>
  );}
}
const chartSetting = {
    height: 300,
    barGap: 0, // Minimal gap between bars
    categoryGapRatio: 0.1
  };

  const pieParams = {
    slotProps: { legend: { hidden: true, // Show the legend
      } },
  };
export default Analytics;

