import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Skeleton from '@mui/material/Skeleton';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Card, CardContent, Divider, Stack ,Button,useMediaQuery,Grid} from '@mui/material';
import ShowChartIcon from '@mui/icons-material/TrendingUp';
import PnlIcon from '@mui/icons-material/AttachMoneyTwoTone';
import PercentIcon from '@mui/icons-material/Percent';
import BarChartIcon from '@mui/icons-material/BarChart';
import CallMadeIcon from '@mui/icons-material/CallMade';
import CallReceivedIcon from '@mui/icons-material/CallReceived';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { dataset2 } from './profit';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import NoDataFound from "./nodata.jsx";
import api from '../utils/api';

function createData(symbol, type, lot, entry, exit,profit,time,tcolor,ticon,pcolor,ctime) {
  return { symbol, type, lot, entry, exit,profit,time,tcolor,ticon,pcolor,ctime };
}
function createDataTab2(symbol, total, winrate, netprofit, avgprofit,ncolor,acolor) {
  return { symbol, total, winrate, netprofit, avgprofit,ncolor,acolor };
}
const transformDaysData = (dowData) => {
  const daysOrder = ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'];
  const shortDays = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug','Sep','Oct','Nov','Dec'];
  
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
const dataset3 = [
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

const rows = [
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

function Portfolio() {
  const [Symbols, setSymobl] = React.useState('');
  const [Period, setPeriod] = React.useState('');
  const navigate = useNavigate();

   const isWideScreen = useMediaQuery('(min-width: 1024px)'); // Check if screen width is >= 1024px  
   const isLargeScreen = useMediaQuery('(min-width: 1024px)'); // >= 1024px
  const isMediumScreen = useMediaQuery('(min-width: 766px) and (max-width: 1023px)'); // 766px - 1023px
  const isSmallScreen = useMediaQuery('(max-width: 765px)'); // <= 765px
   //backend
   const [tradingData, setTradingData] = useState({
    Balance: 0,
    "Margin Level": 0,
    Equity: 0,
    "Free Margin": 0,
    "Total Profit": 0,
    "Win Rate":0,
    "Profit Factor":0,
    "Total Trade":0,
    "Average Win":0,
    "Average Loss":0,
    "Max Drawdown":0,
    "Sharpe ratio":0,
    "For display graph":[
      // { x: "2025-03-24", y: 2 },
      // { x: "2025-03-23", y: 5.5 },
      // { x: "2025-03-20", y: 2 },
      // { x: "2025-03-19", y: 8.5 },
      // { x: "2025-03-18", y: 1.5 },
      // { x: "2025-03-18", y: 5 },
    ],
    "For Loading":[],
    
     "series" : [{ data: [ ] }],
     "Open Position":0,
     "Month Data":[],
     "Days Wise": [
      {
        label: 'Mon',
        value: 120,
         color: '#22C05C'
      },
      {
        label: 'Tue',
        value: 45,
         color: '#EF4444'
      },
      {
        label: 'Wed',
        value: 90,
         color: '#e8c813'
      },
      {
        label: 'Thu',
        value: 34,
         color: '#3f1ee9'
      },
      {
        label: 'Fri',
        value: 10,
         color: '#e91e63'
      }
  ]


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
      
      //const response = await axios.get('https://mt4api.frequencee.io/cgi-bin/MT4AccountData.py?FrequenceeID='+accountSel.toLocaleString());
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
      else if(response.status==401){
        localStorage.removeItem('mt4_token');
       localStorage.removeItem('mt4_username');
       localStorage.removeItem('selectedAccount');
       localStorage.removeItem('mt4_password');
          
      navigate('/login-signup');
      alert('Session expired. Please login again.');
  
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
          x: date,          // Keep as string or convert to Date object if needed
          y: response.data["For display graph"].y[index]
        })) || tradingData["For display graph"]
        ,
        "series" :[{ data: [ response.data["DoW PL Info"]["Monday"], 
          response.data["DoW PL Info"]["Tuesday"], 
          response.data["DoW PL Info"]["Wednesday"], 
          response.data["DoW PL Info"]["Thursday"],
          response.data["DoW PL Info"]["Friday"], 
          
        ] }]
        ||[{ data: [ ] }],
        "Open Position": response.data["Position Info"].length,
        "Days Wise": [
          {
            label: 'Mon',
            value: response.data["DoW PL Info"]["Monday"],
             color: '#22C05C'
          },
          {
            label: 'Tue',
            value: response.data["DoW PL Info"]["Tuesday"],
             color: '#EF4444'
          },
          {
            label: 'Wed',
            value: response.data["DoW PL Info"]["Wednesday"], 
                
             color: '#e8c813'
          },
          {
            label: 'Thu',
            value: response.data["DoW PL Info"]["Thursday"],
                
             color: '#3f1ee9'
          },
          {
            label: 'Fri',
            value: response.data["DoW PL Info"]["Friday"], 
                
             color: '#e91e63'
          }
      ],
       "Month Data":transformDaysData(response.data["DoM PL Info"]) || tradingData["Month Data"],
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


  ////////

  const handleChange = (event) => {
    setPeriod(event.target.value);
  };
  // Determine the number of cards per row based on screen size
  const cardsPerRow = isLargeScreen ? 4 : isMediumScreen ? 2 : 1;

  const cardsPerRow2 = isLargeScreen ? 3 : isMediumScreen ? 2 : 1;
  const columns = isLargeScreen ? 3 : isMediumScreen ? 2 : 1;

  
  // Merge the datasets
  const positiveData2 = dataset3.map(item => ({
    ...item,
    value_positive: item.value >= 0 ? item.value : null
  }));
  
  const negativeData2 = dataset3.map(item => ({
    ...item,
    value_negative: item.value < 0 ? item.value : null
  }));
  
  // Merge the datasets
  const combinedData2 = positiveData2.map((item, index) => ({
    ...item,
    ...negativeData2[index]
  }));
  
  //const desktopOS = ;
  
  const handleChange2 = (event) => {
    setSymobl(event.target.value);
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
    <Container maxWidth={false} disableGutters  sx={{ ml: 1,mt:1}} > {/* Align left with margin */}
      {/* Account Overview Title */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2} sx={{ pt: 1 ,mr:2}}>
  <Typography variant="h5" fontWeight="bold" sx={{pl:3}} >
  Portfolio Overview
  </Typography>
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
            All Time
          </option>
          <option value={20} className="bg-[#212525] text-[#ddffdc]">
            This Year
          </option>
          <option value={30} className="bg-[#212525] text-[#ddffdc]">
            This Quarter
          </option>
          <option value={40} className="bg-[#212525] text-[#ddffdc]">
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
    </Box>
</Stack> 
     
<Card sx={{ p: 0.5, mb: 1,ml:2,my:2,mr:2, boxShadow: 3,  backgroundColor: '#151818', borderRadius: 5,border:1,borderColor:'#637260',
        
    }}> {/* Limit width */}
     <CardContent>
       {/* Title and Graph Icon */}
       <Stack direction={isWideScreen ? 'row' : 'column'} alignItems="left" justifyContent="space-between" spacing={2} sx={{ pt: 1 }}>
       <Stack direction="column" display={'flex'} alignItems="left">
      <Typography variant="h6" sx={{ fontFamily: 'system-ui',textAlign:"left" }} >
        Portfolio Value
      </Typography>
      <Stack direction="row" display={'flex'} spacing={2}>
      <Typography variant="h6" fontWeight={700} sx={{ fontFamily: 'system-ui',fontSize:'24px' }}>
      ${tradingData["Balance"].toFixed(2)}
      </Typography>
      <Box display={'flex'} sx={{pt:1.5}}>
      {tradingData["Total Profit"] >= 0 ? (
  <ShowChartIcon sx={{ color: '#22C05C', fontSize: 24, pl: 0.5 }} />
) : (
  <TrendingDownIcon sx={{ color: '#EF4444', fontSize: 24, pl: 0.5 }} />
)}
      <Typography variant="body2" sx={{ fontFamily: 'system-ui',color: tradingData["Total Profit"]>=0?'#22C05C':'#EF4444' }}>
      {tradingData["Total Profit"].toFixed(2)} ({((tradingData["Total Profit"]/tradingData["Balance"])*100).toFixed(2)}%)
      </Typography>
      </Box>
      </Stack>
      </Stack> 
      <Stack direction="row" display={'flex'}>
      <Button
      variant="contained" // Makes the button filled
      sx={{
        backgroundColor: '#7FED64', // Green background color
        borderRadius: '25px', // Rounded corners
        padding: '10px 20px', // Padding for the button
        fontSize: '16px', // Font size
        color:'#1E2025',
        height:'40px',
        textTransform: 'none', // Prevents uppercase transformation
        '&:hover': {
          backgroundColor: '#7FED60', // Darker green on hover
        },
      }}
    >
      Deposit
    </Button>
    <Button
      variant="contained" // Makes the button filled
      sx={{
        backgroundColor: 'transparent', // Green background color
        borderRadius: '25px', // Rounded corners
        padding: '10px 20px', // Padding for the button
        fontSize: '16px', // Font size
        color:'#7FED64',
        borderColor:'#7FED64',
        height:'40px',
        border:1,
        ml:1,
        textTransform: 'none', // Prevents uppercase transformation
        '&:hover': {
          backgroundColor: '#7FED64', // Darker green on hover
          color:'#1E2025'
        },
      }}
    >
      Withdraw
    </Button>
        </Stack> 
      
</Stack> 
<Stack
      direction="row"
      flexWrap="wrap" // Allow wrapping of cards
      sx={{ pt: 2 }}
      
    >
      {/* Total Profit Card */}
      <Card
        sx={{
          flex: `1 1 calc(${100 / cardsPerRow}% - 16px)`, // Dynamic width based on cardsPerRow
          m: 1,
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
              <PnlIcon
                sx={{
                  color: '#A7B1C1',
                  borderRadius: '50%',
                  pr: 0.5,
                  fontSize: 24,
                }}
              />
              <Typography
                variant="body2"
                sx={{ color: '#A7B1C1', fontSize: 16, fontFamily: 'system-ui', margin: 0, pt: 0 }}
              >
                Total Profit
              </Typography>
            </Box>
          </Box>
          <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ pl: 0.5, pt: 1 }}>
            <Typography
              variant="body2"
              sx={{ color:tradingData["Total Profit"]>=0? '#22C05C':'#EF4444', fontSize: 24, fontFamily: 'system-ui', margin: 0, pt: 0, fontWeight: 700 }}
            >
              ${tradingData["Total Profit"].toFixed(2)}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Return Rate Card */}
      <Card
        sx={{
          flex: `1 1 calc(${100 / cardsPerRow}% - 16px)`, // Dynamic width based on cardsPerRow
          m: 1,
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
              <PercentIcon
                sx={{
                  color: '#A7B1C1',
                  borderRadius: '50%',
                  pr: 0.5,
                  fontSize: 24,
                }}
              />
              <Typography
                variant="body2"
                sx={{ color: '#A7B1C1', fontSize: 16, fontFamily: 'system-ui', margin: 0, pt: 0 }}
              >
                Return Rate
              </Typography>
            </Box>
          </Box>
          <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ pl: 0.5, pt: 1 }}>
            <Typography
              variant="body2"
              sx={{ color: '#FFFFFF', fontSize: 24, fontFamily: 'system-ui', margin: 0, pt: 0, fontWeight: 700 }}
            >
              {((tradingData["Total Profit"]/tradingData["Balance"])*100).toFixed(2)}%
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Open Positions Card */}
      <Card
        sx={{
          flex: `1 1 calc(${100 / cardsPerRow}% - 16px)`, // Dynamic width based on cardsPerRow
          m: 1,
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
              <BarChartIcon
                sx={{
                  color: '#A7B1C1',
                  borderRadius: '50%',
                  pr: 0.5,
                  fontSize: 24,
                }}
              />
              <Typography
                variant="body2"
                sx={{ color: '#A7B1C1', fontSize: 16, fontFamily: 'system-ui', margin: 0, pt: 0 }}
              >
                Open Positions
              </Typography>
            </Box>
          </Box>
          <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ pl: 0.5, pt: 1 }}>
            <Typography
              variant="body2"
              sx={{ color: '#FFFFFF', fontSize: 24, fontFamily: 'system-ui', margin: 0, pt: 0, fontWeight: 700 }}
            >
              {tradingData["Open Position"]}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Trading Since Card */}
      <Card
        sx={{
          flex: `1 1 calc(${100 / cardsPerRow}% - 16px)`, // Dynamic width based on cardsPerRow
          m: 1,
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
              <CalendarTodayIcon
                sx={{
                  color: '#A7B1C1',
                  borderRadius: '50%',
                  pr: 0.5,
                  fontSize: 24,
                }}
              />
              <Typography
                variant="body2"
                sx={{ color: '#A7B1C1', fontSize: 16, fontFamily: 'system-ui', margin: 0, pt: 0 }}
              >
                Trading Since
              </Typography>
            </Box>
          </Box>
          <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ pl: 0.5, pt: 1 }}>
            <Typography
              variant="body2"
              sx={{ color: '#FFFFFF', fontSize: 24, fontFamily: 'system-ui', margin: 0, pt: 0, fontWeight: 700 }}
            >
              Jan 2023
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Stack>
    
      </CardContent>
   </Card>
 
   <Stack direction={isWideScreen ? 'row' : 'column'} alignItems="center" justifyContent="space-between">
      <Card sx={{ p: 0.5, mb: 1,ml:2,my:2,mr:0, boxShadow: 3,width:'100%',  backgroundColor: '#151818', borderRadius: 5,border:1,borderColor:'#637260',
        
    }}> {/* Limit width */}
     <CardContent>
       {/* Title and Graph Icon */}
       <Box display="flex" justifyContent="space-between" alignItems="center">
         <Typography variant="h6" sx={{ fontFamily: 'system-ui' }}>Portfolio Allocation</Typography>
         
       </Box>
       <Box sx={{height:50}}></Box>
      
       <PieChart
        height={200}
        sx={{marginLeft:-10}}
        series={[
          {
            data: tradingData["Days Wise"].slice(0, 5),
            innerRadius:50,
            
          },
          
        ]}
        skipAnimation={false}
      />
     <Box sx={{height:50}}></Box>
      
    
      </CardContent>
   </Card>
   <Card sx={{ p: 0.5, mb: 1,ml:2,my:2,mr:2, boxShadow: 3,width:'100%',  backgroundColor: '#151818', borderRadius: 5,border:1,borderColor:'#637260',
        
    }}> {/* Limit width */}
     <CardContent>
       {/* Title and Graph Icon */}
       <Box display="flex" justifyContent="space-between" alignItems="center">
         <Typography variant="h6" sx={{ fontFamily: 'system-ui' }}>Monthly Returns</Typography>
         
       </Box>
       <BarChart
        dataset={tradingData["Month Data"] }
        xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
        series={[
          { 
            dataKey: 'seoul_positive', 
            color: '#4CAF50', // Green for positive
            //label: 'Profit'
          },
          { 
            dataKey: 'seoul_negative', 
            color: '#F44336', // Red for negative
            //label: 'Loss'
          }
        ]} 
        {...chartSetting}
      />
        
      </CardContent>
   </Card>
  
      </Stack>

       

            <Card sx={{ p: 0.5, mb: 1,ml:2,my:2,mr:2, boxShadow: 3,  backgroundColor: '#151818', borderRadius: 5,border:1,borderColor:'#637260',
        
    }}> {/* Limit width */}
     <CardContent>
       {/* Title and Graph Icon */}
       <Stack direction="row" alignItems="left" justifyContent="space-between" spacing={2} sx={{ pt: 1 }}>
      <Typography variant="h6" sx={{ fontFamily: 'system-ui', marginLeft:-18 }} >
      Risk Metrics
      </Typography>
      
</Stack> 

<Grid container spacing={2} sx={{ pt: 2 }}>
      {/* Sharpe Ratio Card */}
      <Grid item xs={12} sm={6} md={4}>
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
                <PnlIcon
                  sx={{
                    color: '#A7B1C1',
                    borderRadius: '50%',
                    pr: 0.5,
                    fontSize: 24,
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{ color: '#A7B1C1', fontSize: 16, fontFamily: 'system-ui', margin: 0, pt: 0 }}
                >
                  Sharpe Ratio
                </Typography>
              </Box>
            </Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ pl: 0.5, pt: 1 }}>
              <Typography
                variant="body2"
                sx={{ color: '#FFFFFF', fontSize: 20, fontFamily: 'system-ui', margin: 0, pt: 0, fontWeight: 700 }}
              >
                {tradingData["Sharpe ratio"].toFixed(2)}
              </Typography>
            </Box>
            <Typography
              variant="body2"
              sx={{ color: '#A7B1C1', fontSize: 14, fontFamily: 'system-ui', margin: 0, pt: 1, ml: 0,textAlign:'left' }}
            >
              Higher is better (greater than 1 is good)
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Max Drawdown Card */}
      <Grid item xs={12} sm={6} md={4}>
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
                <PercentIcon
                  sx={{
                    color: '#A7B1C1',
                    borderRadius: '50%',
                    pr: 0.5,
                    fontSize: 24,
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{ color: '#A7B1C1', fontSize: 16, fontFamily: 'system-ui', margin: 0, pt: 0 }}
                >
                  Max Drawdown
                </Typography>
              </Box>
            </Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ pl: 0.5, pt: 1 }}>
              <Typography
                variant="body2"
                sx={{ color: '#EF4444', fontSize: 24, fontFamily: 'system-ui', margin: 0, pt: 0, fontWeight: 700 }}
              >
                {tradingData["Max Drawdown"].toFixed(2)}%
              </Typography>
            </Box>
            <Typography
              variant="body2"
              sx={{ color: '#A7B1C1', fontSize: 14, fontFamily: 'system-ui', margin: 0, pt: 1, ml: 0,textAlign:'left' }}
            >
              Lower is better
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Volatility Card */}
      <Grid item xs={12} sm={6} md={4}>
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
                <PnlIcon
                  sx={{
                    color: '#A7B1C1',
                    borderRadius: '50%',
                    pr: 0.5,
                    fontSize: 24,
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{ color: '#A7B1C1', fontSize: 16, fontFamily: 'system-ui', margin: 0, pt: 0 }}
                >
                  Volatility
                </Typography>
              </Box>
            </Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ pl: 0.5, pt: 1 }}>
              <Typography
                variant="body2"
                sx={{ color: '#FFFFFF', fontSize: 20, fontFamily: 'system-ui', margin: 0, pt: 0, fontWeight: 700 }}
              >
                9.81%
              </Typography>
            </Box>
            <Typography
              variant="body2"
              sx={{ color: '#A7B1C1', fontSize: 14, fontFamily: 'system-ui', margin: 0, pt: 1, ml: 0,textAlign:'left' }}
            >
              Measure of price fluctuation
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Win Rate Card */}
      <Grid item xs={12} sm={6} md={4}>
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
                <PnlIcon
                  sx={{
                    color: '#A7B1C1',
                    borderRadius: '50%',
                    pr: 0.5,
                    fontSize: 24,
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{ color: '#A7B1C1', fontSize: 16, fontFamily: 'system-ui', margin: 0, pt: 0 }}
                >
                  Win Rate
                </Typography>
              </Box>
            </Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ pl: 0.5, pt: 1 }}>
              <Typography
                variant="body2"
                sx={{ color: '#22C05C', fontSize: 20, fontFamily: 'system-ui', margin: 0, pt: 0, fontWeight: 700 }}
              >
                {tradingData["Win Rate"]}%
              </Typography>
            </Box>
            <Typography
              variant="body2"
              sx={{ color: '#A7B1C1', fontSize: 14, fontFamily: 'system-ui', margin: 0, pt: 1, ml: 0,textAlign:'left' }}
            >
              Percentage of winning trades
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Profit Factor Card */}
      <Grid item xs={12} sm={6} md={4}>
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
                <PnlIcon
                  sx={{
                    color: '#A7B1C1',
                    borderRadius: '50%',
                    pr: 0.5,
                    fontSize: 24,
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{ color: '#A7B1C1', fontSize: 16, fontFamily: 'system-ui', margin: 0, pt: 0 }}
                >
                  Profit Factor
                </Typography>
              </Box>
            </Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ pl: 0.5, pt: 1 }}>
              <Typography
                variant="body2"
                sx={{ color: '#FFFFFF', fontSize: 20, fontFamily: 'system-ui', margin: 0, pt: 0, fontWeight: 700 }}
              >
                {tradingData["Profit Factor"]}
              </Typography>
            </Box>
            <Typography
              variant="body2"
              sx={{ color: '#A7B1C1', fontSize: 12, fontFamily: 'system-ui', margin: 0, pt: 1, ml: 0,textAlign:'left' }}
            >
              Gross profit / gross loss (greater than 1 is profitable)
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Average Trade Card */}
      <Grid item xs={12} sm={6} md={4}>
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
                <PnlIcon
                  sx={{
                    color: '#A7B1C1',
                    borderRadius: '50%',
                    pr: 0.5,
                    fontSize: 24,
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{ color: '#A7B1C1', fontSize: 16, fontFamily: 'system-ui', margin: 0, pt: 0 }}
                >
                  Average Trade
                </Typography>
              </Box>
            </Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ pl: 0.5, pt: 1 }}>
              <Typography
                variant="body2"
                sx={{ color: tradingData['Average Win'] >= 0 ? '#22C05C' : '#EF4444', fontSize: 20, fontFamily: 'system-ui', margin: 0, pt: 0, fontWeight: 700 }}
              >
               ${((tradingData['Average Win']+tradingData['Average Loss'])/tradingData['Total Trade']).toFixed(2)}
               </Typography>
            </Box>
            <Typography
              variant="body2"
              sx={{ color: '#A7B1C1', fontSize: 14, fontFamily: 'system-ui', margin: 0, pt: 1, ml: 0,textAlign:'left' }}
            >
              Average profit/loss per trade
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>



      </CardContent>
   </Card>

      {/* Trading Account Card */}
      
     </Container>
  );}
  
}
const chartSetting = {
    height: 300,
    barGap: 0, // Minimal gap between bars
    categoryGapRatio: 0.1
  };

export default Portfolio;

