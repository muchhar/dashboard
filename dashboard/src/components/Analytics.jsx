import React from 'react';
import { Box, Container, Typography, Card, CardContent, Divider, Stack,useMediaQuery } from '@mui/material';
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
const series = [{ data: [100, -200, 300, 500, -300, -100] }];

function createData(symbol, type, lot, entry, exit,profit,time,tcolor,ticon,pcolor) {
  return { symbol, type, lot, entry, exit,profit,time,tcolor,ticon,pcolor };
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
  createData('EURUSD','BUY ', 0.1, "$1.08"	,"$1.55", "$12.89","Mar 17, 2025 22:16","#22C05C",CallMadeIcon,"#22C05C"),
  createData('GBPUSD', 'SELL', 1.25, "$1.26	","$1.50", "$39.62","Mar 17, 2025 22:16","#EF4444",CallReceivedIcon,"#22C05C"),
  createData('XAUUSD', 'BUY ', 0.01, "$150.50","$200.40", "$-50.62","Mar 17, 2025 22:16","#22C05C",CallMadeIcon,"#EF4444"),
  createData('EURUSD', 'SELL', 0.15, "$2320.50	","$2430.40", "$500.62","Mar 17, 2025 22:16","#EF4444",CallReceivedIcon,"#22C05C"),
  createData('EURUSD', 'BUY ', 2.0, "$232	","$250", "$-20.62","Mar 17, 2025 22:16","#22C05C",CallMadeIcon,"#EF4444"),
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
              Daily Profit/Loss
            </Typography>
          </Box>

          {/* Bar Chart */}
          <BarChart
            dataset={combinedData2}
            xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
            series={[
              {
                dataKey: 'value_positive',
                valueFormatter,
                color: '#4CAF50', // Green for positive
              },
              {
                dataKey: 'value_negative',
                valueFormatter,
                color: '#F44336', // Red for negative
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
        <Box height={20} width={20} sx={{backgroundColor:'#7FED64'}}></Box> <Typography variant="h6" sx={{ fontFamily: 'system-ui' ,color:'#7FED64',fontSize:16,ml:1}}>Winning Trades 65%</Typography>
        <Box height={20} width={20} sx={{backgroundColor:'#EF4444',ml:2}}></Box>  <Typography variant="h6" sx={{ fontFamily: 'system-ui',color:'#EF4444',fontSize:16,ml:1 }}>Losing Trades 35%</Typography>
         
       </Box>
       
      
       <PieChart
        height={250}
        alignItems='center'
        series={[
          {
            data: desktopOS.slice(0, 2),
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
   dataset={dataset}
   xAxis={[{ dataKey: 'x' }]}
   series={[{ dataKey: 'y',color: '#80ee64'  }]}
   height={300}
   margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
   grid={{ vertical: true, horizontal: true }}
   
 />
      </CardContent>
  
       </Card>
 
     </Container>
  );
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

