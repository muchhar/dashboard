import React from 'react';
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


function createData(symbol, type, lot, entry, exit,profit,time,tcolor,ticon,pcolor,ctime) {
  return { symbol, type, lot, entry, exit,profit,time,tcolor,ticon,pcolor,ctime };
}
function createDataTab2(symbol, total, winrate, netprofit, avgprofit,ncolor,acolor) {
  return { symbol, total, winrate, netprofit, avgprofit,ncolor,acolor };
}
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
    
   const isWideScreen = useMediaQuery('(min-width: 1024px)'); // Check if screen width is >= 1024px  
   const isLargeScreen = useMediaQuery('(min-width: 1024px)'); // >= 1024px
  const isMediumScreen = useMediaQuery('(min-width: 766px) and (max-width: 1023px)'); // 766px - 1023px
  const isSmallScreen = useMediaQuery('(max-width: 765px)'); // <= 765px
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
  
  const desktopOS = [
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
];
  
  const handleChange2 = (event) => {
    setSymobl(event.target.value);
  };
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
      $26,321.3
      </Typography>
      <Box display={'flex'} sx={{pt:1.5}}>
      <ShowChartIcon sx={{color:'#22C05C',fontSize:24,pl:0.5}}/>
      <Typography variant="body2" sx={{ fontFamily: 'system-ui',color:'#22C05C' }}>
      +368.51 (+1.40%)
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
              sx={{ color: '#22C05C', fontSize: 24, fontFamily: 'system-ui', margin: 0, pt: 0, fontWeight: 700 }}
            >
              +$3,245.75
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
              12.8%
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
              8
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
            data: desktopOS.slice(0, 5),
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
        dataset={combinedData2 }
        xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
        series={[
          { 
            dataKey: 'value_positive', 
           // valueFormatter,
            color: '#4CAF50', // Green for positive
          },
          { 
            dataKey: 'value_negative', 
           // valueFormatter,
            color: '#F44336', // Red for negative
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
                0.70
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
                -16.06%
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
                67.60%
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
                2.04
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
                sx={{ color: '#22C05C', fontSize: 20, fontFamily: 'system-ui', margin: 0, pt: 0, fontWeight: 700 }}
              >
                $16.37
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
  );
  
}
const chartSetting = {
    height: 300,
    barGap: 0, // Minimal gap between bars
    categoryGapRatio: 0.1
  };

export default Portfolio;

