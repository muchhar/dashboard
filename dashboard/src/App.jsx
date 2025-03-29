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
import AccountSelector from './components/SelectAccount';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute';

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
      <AccountSelector/>
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
          <Dashboard />
          </ProtectedRoute>
          } />
        <Route path="/trade-history" element={
          <ProtectedRoute>
          <History />
          </ProtectedRoute>
          } />
        <Route path="/analytics" element={
          <ProtectedRoute>
          <Analytics />
          </ProtectedRoute>
          } />
        <Route path="/portfolio" element={
          <ProtectedRoute>
          <Portfolio />
          </ProtectedRoute>
          } />
        <Route path="/pnl-analysis" element={
          <ProtectedRoute>
          <Pnlanalysis />
          </ProtectedRoute>
          } />
        <Route path="/live-drawdown" element={
          <ProtectedRoute>
          <LiveDropdown />
          </ProtectedRoute>
          } />
        <Route path="/settings" element={
          <ProtectedRoute>
          <Settings />
          </ProtectedRoute>
          } />
        <Route path="/login-signup" element={<LoginSignup />} />
      </Routes>
    </Router>
    );
  }
export default App
