import React from 'react';
import { Box, Container, Typography, Card, CardContent, Divider, Stack, useMediaQuery,Grid  } from '@mui/material';
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

const series = [{ data: [100, -200, 300, 500, -300, -100] }];

function createData( type, lot, entry, exit,profit,time,tcolor,ticon,pcolor) {
  return {  type, lot, entry, exit,profit,time,tcolor,ticon,pcolor };
}
function createDataTab2(symbol, total, winrate, netprofit, avgprofit,ncolor,acolor) {
  return {  symbol,total, winrate, netprofit, avgprofit,ncolor,acolor };
}

const rows = [
  createData('BUY ', 0.1, "$1.08"	,"$1.55", "$12.89","Mar 17, 2025 22:16","#22C05C",CallMadeIcon,"#22C05C"),
  createData( 'SELL', 1.25, "$1.26	","$1.50", "$39.62","Mar 17, 2025 22:16","#EF4444",CallReceivedIcon,"#22C05C"),
  createData( 'BUY ', 0.01, "$150.50","$200.40", "$-50.62","Mar 17, 2025 22:16","#22C05C",CallMadeIcon,"#EF4444"),
  createData( 'SELL', 0.15, "$2320.50	","$2430.40", "$500.62","Mar 17, 2025 22:16","#EF4444",CallReceivedIcon,"#22C05C"),
  createData( 'BUY ', 2.0, "$232	","$250", "$-20.62","Mar 17, 2025 22:16","#22C05C",CallMadeIcon,"#EF4444"),
];
const tab2rows = [
  createDataTab2('Monday',42, "61.8%"	,"$105", "$12.89","#22C05C","#22C05C"),
  createDataTab2('Tuesday', 30, "80.02%","$150", "$39.62","#22C05C","#22C05C"),
  createDataTab2('Wednesday', 120, "40.33%","$230.40", "$50.62","#22C05C","#22C05C"),
  createDataTab2('Thursday', 66, "20.45%", "$-430.40", "$-50.62","#EF4444","#EF4444"),
  createDataTab2('Friday', 30, "73.32%", "$-250", "$-20.62","#EF4444","#EF4444"),
];

function Dashboard() {
  const [Period, setPeriod] = React.useState('');
  const [Symbols, setSymobl] = React.useState('');
  const [colorX, setColorX] = React.useState('piecewise');
  const [colorY, setColorY] = React.useState('None');

  const isMobile = useMediaQuery('(max-width: 766px)'); // Detect mobile/tablet screens
  const isLargeScreen = useMediaQuery('(min-width: 1024px)'); // >= 1024px
  const isMediumScreen = useMediaQuery('(min-width: 766px) and (max-width: 1023px)'); // 766px - 1023px
  const isSmallScreen = useMediaQuery('(max-width: 765px)'); // <= 765px

  // Determine the number of cards per row based on screen size
  const cardsPerRow = isLargeScreen ? 4 : isMediumScreen ? 2 : 1;
  const isWideScreen = useMediaQuery('(min-width: 1024px)'); // Check if screen width is >= 1024
  const handleChange = (event) => {
    setPeriod(event.target.value);
  };
  const handleChange2 = (event) => {
    setSymobl(event.target.value);
  };
  return (
    
    <Container   maxWidth={false}  sx={{ ml:1,mt:1,mr: 1}} > {/* Align left with margin */}
      {/* Account Overview Title */}
      <Typography variant="h5"  fontWeight="bold" gutterBottom sx={{ textAlign: 'left',ml:1,pt:1 }}>
        Account Overview
      </Typography>
      {/* Trading Account Card */}
      <Card sx={{mr:1, p: 0.5, mb: 1,ml:0,my:2, boxShadow: 3,  maxWidth: isMobile ? '100%' : 400,  backgroundColor: '#151818', borderRadius: 5,border:1,borderColor:'#637260',
        transition: 'border-color 0.3s ease', // Smooth transition
        '&:hover': {
          borderColor: '#80ee64', // Change color on hover
        },

       }}> {/* Limit width */}
        <CardContent>
          {/* Title and Graph Icon */}
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" sx={{ fontFamily: 'system-ui' }}>Demo Trading Account</Typography>
            <ShowChartIcon color="#4caf50"
            sx={{
              color: '#80ee64', // Custom icon color (Green)
              borderRadius: '50%', // Rounded background
              padding: '0px', // Add spacing around the icon
            }} 
            />
          </Box>

          {/* Balance & Margin Level */}
          <Stack direction="row" justifyContent="space-between" sx={{ mt: 2, pr:6 }}>
          <Box >
            <Box   display="inline-flex" alignItems="flex-start" sx={{marginLeft:'0px'}}>
              <PnlIcon 
                sx={{
                  color: '#A7B1C1',
                  borderRadius: '50%',
                  height: 18,
                  width: 18,
                  padding: 0,
                  margin: 0, // Ensure no extra margin
                }} 
              />
              <Typography 
                variant="body2" 
                sx={{ color: '#A7B1C1', fontFamily: 'system-ui', margin: 0 }}
              >
                Balance
              </Typography>
              </Box>

              <Typography variant="h6" sx={{  pr:0 ,fontFamily: 'system-ui'}}>$10,000.56</Typography>
            </Box>
            <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <PercentIcon color="secondary" 
              sx={{
                color: '#A7B1C1', // Custom icon color (Green)
                borderRadius: '50%', // Rounded background
                padding: '0px', // Add spacing around the icon
                height: 18,
                width:18,
                marginLeft:'-0px'
              }} 
              />
               <Typography color='#A7B1C1' variant="body2" sx={{ fontFamily: 'system-ui', marginLeft:'0px',fontFamily: 'system-ui' }}>Margin Level</Typography>
             
            </Box>


              <Typography variant="h6" sx={{  pr:0 ,fontFamily: 'system-ui'}}>2050.15%</Typography>
            </Box>
          </Stack>
          <Stack direction="row" justifyContent="space-between" sx={{ mt: 2, pr:6 }}>
            <Box>
            <Box display="inline-flex" alignItems="flex-start" sx={{marginLeft:'0px'}}>
              <SignalCellularAltIcon color="secondary" 
              sx={{
                color: '#A7B1C1', // Custom icon color (Green)
                borderRadius: '50%', // Rounded background
                padding: '0px', // Add spacing around the icon
                height: 18,
                marginLeft:'-0px'
              }} 
              />
               <Typography color='#A7B1C1' variant="body2" sx={{ fontFamily: 'system-ui', marginLeft:'0px' }}>Equity</Typography>
             
            </Box>

              <Typography variant="h6" sx={{  pr:0 ,fontFamily: 'system-ui'}}>$10,250.75</Typography>
            </Box>
            <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <TrendingDownIcon color="secondary" 
              sx={{
                color: '#A7B1C1', // Custom icon color (Green)
                borderRadius: '50%', // Rounded background
                padding: '0px', // Add spacing around the icon
                height: 18,
                marginLeft:'-8px'
              }} 
              />
               <Typography color='#A7B1C1' variant="body2" sx={{ fontFamily: 'system-ui', marginLeft:'0px',fontFamily: 'system-ui' }}>Free Margin</Typography>
             
            </Box>


              <Typography variant="h6" sx={{  pr:0 ,fontFamily: 'system-ui'}}>9750.75</Typography>
            </Box>
          </Stack>


          {/* Divider */}
          <Divider sx={{ my: 2 }} />

          {/* Profit & Loss */}
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="body2" color="textSecondary" fontSize={18}>
              P/L
            </Typography>
            <Typography variant="h6"   fontWeight={700} sx={{color:'#80ee64'}}>$500.25</Typography>
          </Box>
        </CardContent>
      </Card>
      <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ textAlign: 'left',ml:1 }}>
        Portfolio Analytics
      </Typography>
      <Grid container spacing={2} sx={{ mt: 1, ml: 0,pr:1 }}>
      {[
        { title: 'Total Profit', value: '$2047.902', icon: <ShowChartIcon color="#4caf50" /> },
        { title: 'Win Rate', value: '80.02%', icon: <PortfolioIcon color="#0D49D6" /> },
        { title: 'Profit Factor', value: '2.46', icon: <BarChartIcon color="#0D49D6" /> },
        { title: 'Total Trade', value: '12', icon: <FunctionsIcon color="#A7B1C1" /> },
        { title: 'Average Win', value: '$1089.77', icon: <CallMadeIcon color="#80ee64" />, color: '#80ee64' },
        { title: 'Average Loss', value: '$-447.90', icon: <CallReceivedIcon color="#EF4444" />, color: '#EF4444' },
        { title: 'Max Drawdown', value: '$2047.902', icon: <WarningAmberOutlinedIcon color="#4caf50" />, color: '#4caf50' },
        { title: 'Sharpe Ratio', value: '1.80', icon: <ShowChartOutlinedIcon color="#0D49D6" /> },
      ].map((card, index) => (
        <Grid item xs={12 / cardsPerRow} key={index}>
          <Card
            sx={{
              boxShadow: 3,
              backgroundColor: '#151818',
              borderRadius: 3,
              border: 1,
              borderColor: '#637260',
            }}
          >
            <CardContent>
              {/* Title and Icon */}
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="body2" sx={{ color: '#A7B1C1', fontFamily: 'system-ui', margin: 0 }}>
                  {card.title}
                </Typography>
                <Box
                  sx={{
                    color: card.color || '#4caf50',
                    borderRadius: '50%',
                    padding: '0px',
                  }}
                >
                  {card.icon}
                </Box>
              </Box>

              {/* Value */}
              <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ pt: 1 }}>
                <Typography variant="h5" marginLeft={0} fontWeight="bold" gutterBottom sx={{ color: card.color || 'inherit' }}>
                  {card.value}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>

      
        <Typography variant="h5"  fontWeight="bold" gutterBottom sx={{ textAlign: 'left',ml:1,mt:2 }}>
        Performance Overview
      </Typography>
      {/* Trading Account Card */}
      <Card sx={{ mr:1, mb: 1,ml:1,width:'100%',my:2, boxShadow: 3,p:0.5,  backgroundColor: '#151818', borderRadius: 5,border:1,borderColor:'#637260',
        
       }}> {/* Limit width */}
        <CardContent >
          {/* Title and Graph Icon */}
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" sx={{ fontFamily: 'system-ui' }}>Performance Overview</Typography>
            
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
      
      <Typography variant="h5"  fontWeight="bold" gutterBottom sx={{ textAlign: 'left',ml:1,mt:2 }}>
      Open Positions
      </Typography>
      {/* Trading Account Card */}
      <Card sx={{mr:1, p: 0.5, mb: 1,ml:1,width:'100%',my:2, boxShadow: 3,  backgroundColor: '#151818', borderRadius: 5,border:1,borderColor:'#637260',
        
       }}> {/* Limit width */}
        <CardContent>
          {/* Title and Graph Icon */}
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" sx={{ fontFamily: 'system-ui' }}>Trade History</Typography>
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
    </Box>
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
        Profit/Loss	Close Time
          </Typography>
        </TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {rows.map((row) => (
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
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
         </CardContent>
      </Card>
        <Typography variant="h5"  fontWeight="bold" sx={{ textAlign: 'left',ml:1,mt:2 }}>
        Day Performance
      </Typography>
      <Card
      sx={{
        mr:1,
        p: 0.5,
        mb: 1,
        ml: 1,
        width:'100%',
        my: 2,
        boxShadow: 3,
        backgroundColor: '#151818',
        borderRadius: 5,
        border: 1,
        borderColor: '#637260',
      }}
    >
      <CardContent>
        {/* Title */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" sx={{ fontFamily: 'system-ui' }}>Day Performance</Typography>
        </Box>

        {/* Chart and Table */}
        <Stack
          direction={isWideScreen ? 'row' : 'column'} // Horizontal on wide screens, vertical on smaller screens
          spacing={2} // Add spacing between chart and table
          sx={{ pt: 2 }}
        >
          {/* Chart */}
          <Box sx={{ flex: isWideScreen ? 1 : 'auto', width: isWideScreen ? '50%' : '100%' }}>
            <BarChart
              height={300}
              grid={{ horizontal: true }}
              series={series}
              margin={{
                top: 10,
                bottom: 20,
              }}
              yAxis={[
                {
                  colorMap: {
                    type: 'continuous',
                    min: -10,
                    max: 10,
                    color: ['#80ee64', '#80ee64'],
                  },
                },
              ]}
              xAxis={[
                {
                  scaleType: 'band',
                  data: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                  colorMap: {
                    type: 'ordinal',
                    colors: ['#ccebc5', '#a8ddb5', '#7bccc4', '#4eb3d3', '#2b8cbe'],
                  },
                },
              ]}
            />
          </Box>

          {/* Table */}
          <Box sx={{ flex: isWideScreen ? 1 : 'auto', width: isWideScreen ? '50%' : '100%' }}>
            <TableContainer component={Paper} sx={{ background: 'transparent' }}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="right">
                      <Typography fontWeight={500} fontFamily={'system-ui'} sx={{ color: '#6B717D' }}>
                        Day
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography fontWeight={500} fontFamily={'system-ui'} sx={{ color: '#6B717D' }}>
                        Total Trade
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography fontWeight={500} fontFamily={'system-ui'} sx={{ color: '#6B717D' }}>
                        Win Rate
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography fontWeight={500} fontFamily={'system-ui'} sx={{ color: '#6B717D' }}>
                        Net Profit
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography fontWeight={500} fontFamily={'system-ui'} sx={{ color: '#6B717D' }}>
                        Avg. Profit
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tab2rows.map((row) => (
                    <TableRow key={row.symbol}>
                      <TableCell align="right">
                        <Typography variant="body1" sx={{ color: '#EBEBEB' }}>
                          {row.symbol}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body1" sx={{ color: '#EBEBEB' }}>
                          {row.total}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body1" sx={{ color: '#EBEBEB' }}>
                          {row.winrate}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body1" sx={{ color: row.ncolor }}>
                          {row.netprofit}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body1" sx={{ color: row.acolor }}>
                          {row.avgprofit}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Stack>
      </CardContent>
    </Card>
      {/* Trading Account Card */}
    




      <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ textAlign: 'left',ml:1,mt:2 }}>
      Trading Sessions
      </Typography>
      {/* Trading Account Card */}
      <Card
      sx={{
        mr:1,
        p: 0.5,
        mb: 1,
        ml: 1,
        width:'100%',
        my: 2,
        boxShadow: 3,
        backgroundColor: '#151818',
        borderRadius: 5,
        border: 1,
        borderColor: '#637260',
      }}
    >
      <CardContent>
        {/* Title */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" sx={{ fontFamily: 'system-ui' }}>Trading Sessions Analysis</Typography>
        </Box>

        {/* Cards for Asian, London, and New York Sessions */}
        <Stack
          direction={isWideScreen ? 'row' : 'column'} // Horizontal on wide screens, vertical on smaller screens
          spacing={2} // Add spacing between cards
          sx={{ pt: 2 }}
        >
          {/* Asian Session Card */}
          <Card
            sx={{
              flex: isWideScreen ? 1 : 'auto', // Take equal space in horizontal layout
              width: isWideScreen ? '33%' : '100%', // 33% width in horizontal layout, 100% in vertical
              boxShadow: 3,
              backgroundColor: '#0A0B0E',
              borderRadius: 1,
              border: 0.5,
              borderColor: '#5E6585',
            }}
          >
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box display="flex">
                  <ScheduleIcon
                    sx={{
                      color: '#80ee64',
                      borderRadius: '50%',
                      pr: 1,
                      fontSize: 32,
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{ color: '#FFFFFF', fontSize: 18, fontFamily: 'system-ui', margin: 0, pt: 0.2 }}
                  >
                    Asian Session
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  sx={{ color: '#22C05C', fontSize: 18, fontFamily: 'system-ui', margin: 0 }}
                >
                  $88.20
                </Typography>
              </Box>

              <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ pt: 1 }}>
                <Typography
                  variant="body2"
                  sx={{ color: '#9EA7B7', fontSize: 16, fontFamily: 'system-ui', margin: 0, pt: 0.2 }}
                >
                  Total Trades
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: '#FFFFFF', fontSize: 18, fontFamily: 'system-ui', margin: 0 }}
                >
                  40
                </Typography>
              </Box>

              <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ pt: 1 }}>
                <Typography
                  variant="body2"
                  sx={{ color: '#9EA7B7', fontSize: 16, fontFamily: 'system-ui', margin: 0, pt: 0.2 }}
                >
                  Win Rate
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: '#FFFFFF', fontSize: 18, fontFamily: 'system-ui', margin: 0 }}
                >
                  68.4%
                </Typography>
              </Box>

              <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ pt: 1 }}>
                <Typography
                  variant="body2"
                  sx={{ color: '#9EA7B7', fontSize: 16, fontFamily: 'system-ui', margin: 0, pt: 0.2 }}
                >
                  Avg. Profit/Trade
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: '#22C05C', fontSize: 18, fontFamily: 'system-ui', margin: 0 }}
                >
                  $2.21
                </Typography>
              </Box>
            </CardContent>
          </Card>

          {/* London Session Card */}
          <Card
            sx={{
              flex: isWideScreen ? 1 : 'auto', // Take equal space in horizontal layout
              width: isWideScreen ? '33%' : '100%', // 33% width in horizontal layout, 100% in vertical
              boxShadow: 3,
              backgroundColor: '#0A0B0E',
              borderRadius: 1,
              border: 0.5,
              borderColor: '#5E6585',
            }}
          >
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box display="flex">
                  <ScheduleIcon
                    sx={{
                      color: '#80ee64',
                      borderRadius: '50%',
                      pr: 1,
                      fontSize: 32,
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{ color: '#FFFFFF', fontSize: 18, fontFamily: 'system-ui', margin: 0, pt: 0.2 }}
                  >
                    London Session
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  sx={{ color: '#22C05C', fontSize: 18, fontFamily: 'system-ui', margin: 0 }}
                >
                  $172.20
                </Typography>
              </Box>

              <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ pt: 1 }}>
                <Typography
                  variant="body2"
                  sx={{ color: '#9EA7B7', fontSize: 16, fontFamily: 'system-ui', margin: 0, pt: 0.2 }}
                >
                  Total Trades
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: '#FFFFFF', fontSize: 18, fontFamily: 'system-ui', margin: 0 }}
                >
                  40
                </Typography>
              </Box>

              <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ pt: 1 }}>
                <Typography
                  variant="body2"
                  sx={{ color: '#9EA7B7', fontSize: 16, fontFamily: 'system-ui', margin: 0, pt: 0.2 }}
                >
                  Win Rate
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: '#FFFFFF', fontSize: 18, fontFamily: 'system-ui', margin: 0 }}
                >
                  68.4%
                </Typography>
              </Box>

              <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ pt: 1 }}>
                <Typography
                  variant="body2"
                  sx={{ color: '#9EA7B7', fontSize: 16, fontFamily: 'system-ui', margin: 0, pt: 0.2 }}
                >
                  Avg. Profit/Trade
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: '#22C05C', fontSize: 18, fontFamily: 'system-ui', margin: 0 }}
                >
                  $2.21
                </Typography>
              </Box>
            </CardContent>
          </Card>

          {/* New York Session Card */}
          <Card
            sx={{
              flex: isWideScreen ? 1 : 'auto', // Take equal space in horizontal layout
              width: isWideScreen ? '33%' : '100%', // 33% width in horizontal layout, 100% in vertical
              boxShadow: 3,
              backgroundColor: '#0A0B0E',
              borderRadius: 1,
              border: 0.5,
              borderColor: '#5E6585',
            }}
          >
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box display="flex">
                  <ScheduleIcon
                    sx={{
                      color: '#80ee64',
                      borderRadius: '50%',
                      pr: 1,
                      fontSize: 32,
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{ color: '#FFFFFF', fontSize: 18, fontFamily: 'system-ui', margin: 0, pt: 0.2 }}
                  >
                    New York Session
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  sx={{ color: '#EF4444', fontSize: 18, fontFamily: 'system-ui', margin: 0 }}
                >
                  $-253.55
                </Typography>
              </Box>

              <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ pt: 1 }}>
                <Typography
                  variant="body2"
                  sx={{ color: '#9EA7B7', fontSize: 16, fontFamily: 'system-ui', margin: 0, pt: 0.2 }}
                >
                  Total Trades
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: '#FFFFFF', fontSize: 18, fontFamily: 'system-ui', margin: 0 }}
                >
                  40
                </Typography>
              </Box>

              <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ pt: 1 }}>
                <Typography
                  variant="body2"
                  sx={{ color: '#9EA7B7', fontSize: 16, fontFamily: 'system-ui', margin: 0, pt: 0.2 }}
                >
                  Win Rate
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: '#FFFFFF', fontSize: 18, fontFamily: 'system-ui', margin: 0 }}
                >
                  68.4%
                </Typography>
              </Box>

              <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ pt: 1 }}>
                <Typography
                  variant="body2"
                  sx={{ color: '#9EA7B7', fontSize: 16, fontFamily: 'system-ui', margin: 0, pt: 0.2 }}
                >
                  Avg. Profit/Trade
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: '#EF4444', fontSize: 18, fontFamily: 'system-ui', margin: 0 }}
                >
                  $-9.06
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Stack>
      </CardContent>
    </Card>
     
     </Container>
  );
}

export default Dashboard;
