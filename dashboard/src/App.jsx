import React,{ useState } from 'react'
import './App.css'
import SidePanel from './components/SidePanel';
import Dashboard from './components/Dashboard';
import Analytics from './components/Analytics';
import History from './components/History';
import TopAppBar from './components/TopAppBar';
import { AppBar, Divider } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import Portfolio from './components/Portfolio';
import Pnlanalysis from './components/Pnlanalysis';
import LiveDropdown from './components/LiveDrawdown';
import Settings from './components/Settings';
import {  useMediaQuery, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'; 
import LoginSignup from './components/LoginSignup';
import Appbar from './components/Appbar'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function DashboardPage() {
  return <Dashboard/>;
}

function TradeHistoryPage() {
  return <LoginSignup/>;
  return <History/>;
}

function AnalyticsPage() {
  return <Analytics/>;
}

function PortfolioPage() {
  return <Portfolio/>;
}

function PnlAnalysisPage() {
  return <Pnlanalysis/>;
}

function AlertsPage() {
  return <LiveDropdown/>;
}

function SettingsPage() {
  return <Settings/>;
}

function App() {
  const [selectedPage, setSelectedPage] = useState('Dashboard'); // Default page
  
    const [drawerOpen, setDrawerOpen] = useState(false);
    const isMobile = useMediaQuery('(max-width: 1023px)');
  
    // Handler to update the selected page
    // const handlePageChange = (page) => {
    //   setSelectedPage(page);
    //   if (isMobile) {
    //     setDrawerOpen(false); // Close the drawer on mobile after selecting a page
    //   }
    // };
  
    // const toggleDrawer = () => {
    //   setDrawerOpen(!drawerOpen);
    // };
  
    // Render the appropriate page based on the selectedPage state
    // const renderPage = () => {
    //   switch (selectedPage) {
    //     case 'Dashboard':
    //       return <DashboardPage />;
    //     case 'Trade History':
    //       return <TradeHistoryPage />;
    //     case 'Analytics':
    //       return <AnalyticsPage />;
    //     case 'Portfolio':
    //       return <PortfolioPage />;
    //     case 'PnL Analysis':
    //       return <PnlAnalysisPage />;
    //     case 'Live Drowdown':
    //       return <AlertsPage />;
    //     case 'Settings':
    //       return <SettingsPage />;
    //     default:
    //       return <DashboardPage />;
    //   }
    // };
  
    return (
      <Router>
      <Appbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/trade-history" element={<History />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/pnl-analysis" element={<Pnlanalysis />} />
        <Route path="/live-drawdown" element={<LiveDropdown />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/login-signup" element={<LoginSignup />} />
      </Routes>
    </Router>
  //     <div className="App" sx={{mt:6}}>
  //       {/* Fixed SidePanel */}
  //       {/* <SidePanel 
  //        onPageChange={handlePageChange}
  //        selectedPage={selectedPage}
  //        drawerOpen={!isMobile || drawerOpen}
  //        drawerWidth={isMobile ? 240 : 240}
  //        toggleDrawer={toggleDrawer}
  //       />
  //  */}
  //       {/* Main container including TopAppBar and content */}
  //       {/* <Box
  //         component="main"
  //         sx={{
  //           //flexGrow: 1,
  //          // marginLeft: isMobile ? 0 : '0px', 
  //         //  marginLeft: '240px', // Offset by the width of the SidePanel
  //         }}
  //       >
  //         {/* TopAppBar inside the main container  */}
  //         {/* <TopAppBar toggleDrawer={toggleDrawer}/> */}
  //         <Appbar sx={{}}/>
  //         {/* <Divider></Divider>
  //          */}
  //         {/* Content area */}
  //         <Box  sx={{ pl: 3, mt: 1 }}> {/* Add padding and margin top to account for the app bar height */}
  //           <Container>
  //             {renderPage()} {/* Render the selected page */}
  //           </Container>
  //         </Box>
  //       {/* </Box> */}
  //     </div>
    );
  }
export default App
