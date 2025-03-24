import React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import DashboardIcon from '@mui/icons-material/DashboardOutlined';
import HistoryIcon from '@mui/icons-material/History';
import AnalyticsIcon from '@mui/icons-material/AnalyticsOutlined';
import PortfolioIcon from '@mui/icons-material/PieChart';
import PnlIcon from '@mui/icons-material/AttachMoneyTwoTone';
import AlertIcon from '@mui/icons-material/NotificationsNoneTwoTone';
import SettingsIcon from '@mui/icons-material/Settings';
import { ListItemAvatar } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import Avatar from '@mui/material/Avatar';
import mySvg from '../icon.svg';
import CloseIcon from '@mui/icons-material/Close'; 
import { IconButton, useMediaQuery } from '@mui/material'; // Add useMediaQuery


function SidePanel({ onPageChange, selectedPage, drawerOpen, drawerWidth, toggleDrawer }) {
  const hoverGreen = '#4caf50';
  const activeColor = '#4caf50';
  const textColor = '#A9B1C0';
  const isMobile = useMediaQuery('(max-width: 1023px)'); // Detect mobile/tablet screens

  const menuItemStyle = {
    padding: '4px 8px',
    mx: 1.5,
    my: 0.2,
    borderRadius: 2,
    border: '2px solid transparent',
    backgroundColor: 'inherit'
  };

  const activeMenuItemStyle = {
    border: `2px solid ${activeColor}`,
    color: activeColor,
    '& .MuiListItemIcon-root': {
      color: activeColor,
    },
    '& .MuiTypography-root': {
      color: activeColor,
    },
  };

  const pages = [
    { name: 'Dashboard', icon: <DashboardIcon /> },
    { name: 'Trade History', icon: <HistoryIcon /> },
    { name: 'Analytics', icon: <AnalyticsIcon /> },
    { name: 'Portfolio', icon: <PortfolioIcon /> },
    { name: 'PnL Analysis', icon: <PnlIcon /> },
    { name: 'Live Drowdown', icon: <AlertIcon /> },
    { name: 'Settings', icon: <SettingsIcon /> },
  ];

  return (
    <Box
      sx={{
        width: drawerWidth,
        height: '100vh',
        backgroundColor: 'background.default',
        borderRight: 1,
        borderColor: 'divider',
        position: 'fixed',
        left: 0,
        top: 0,
        display: 'flex',
        flexDirection: 'column',
        transform: drawerOpen ? 'translateX(0)' : `translateX(-${drawerWidth}px)`,
        transition: 'transform 0.3s ease-in-out',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      {/* Header */}
      <Box sx={{ padding: '12px 5px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <img src={mySvg} alt="My SVG" height={30} />
        {/* Close button for mobile/tablet */}
        {isMobile && ( // Only show on mobile/tablet
          <IconButton
            color="secondary"
            aria-label="close"
            onClick={toggleDrawer} // Close the SidePanel
          >
            <CloseIcon />
          </IconButton>
        )}
      </Box><Divider />

      {/* Main navigation */}
      <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
        <List>
          {pages.map((page) => (
            <ListItem key={page.name} disablePadding>
              <ListItemButton
                sx={{
                  ...menuItemStyle,
                  ...(selectedPage === page.name && activeMenuItemStyle),
                  ...(selectedPage !== page.name && {
                    '&:hover': {
                      border: `2px solid ${hoverGreen}`,
                      color: "#5E6585",
                      '& .MuiListItemIcon-root': {
                        color: "#5E6585",
                      },
                      '& .MuiTypography-root': {
                        color: hoverGreen,
                      }
                    },
                    '& .MuiTypography-root': {
                      color: textColor,
                    },
                    '& .MuiListItemIcon-root': {
                      color: "#5E6585",
                    },
                  }),
                }}
                onClick={() => onPageChange(page.name)}
                selected={selectedPage === page.name}
              >
                <ListItemIcon color='secondary'>{page.icon}</ListItemIcon>
                <ListItemText primary={page.name} sx={{ marginLeft: '-15px' }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Footer text at bottom */}
      <Box
        sx={{
          p: 0,
          borderTop: 1,
          borderColor: 'divider',
          mt: 'auto',
        }}
      >
        <List sx={{ height: 80 }}>
          <ListItem sx={{ fontSize: 40 }}>
            <ListItemAvatar>
              <Avatar>
                <ImageIcon sx={{ fontSize: 20 }} />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="John Doe" secondary="Pro Trader" />
          </ListItem>
        </List>
      </Box>
    </Box>
  );
}

export default SidePanel;



// import React from 'react';
// import Box from '@mui/material/Box';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import Divider from '@mui/material/Divider';
// import DashboardIcon from '@mui/icons-material/DashboardOutlined';
// import HistoryIcon from '@mui/icons-material/History';
// import AnalyticsIcon from '@mui/icons-material/AnalyticsOutlined';
// import PortfolioIcon from '@mui/icons-material/PieChart';
// import PnlIcon from '@mui/icons-material/AttachMoneyTwoTone';
// import AlertIcon from '@mui/icons-material/NotificationsNoneTwoTone';
// import SettingsIcon from '@mui/icons-material/Settings';
// import { ListItemAvatar } from '@mui/material';
// import ImageIcon from '@mui/icons-material/Image';
// import Avatar from '@mui/material/Avatar';
// import mySvg from '../icon.svg';

// function SidePanel({ onPageChange, selectedPage }) {
//   // Define the green color to use consistently
//   const hoverGreen = '#4caf50';
//   const activeColor = '#4caf50'; // Color for active button and text
//   const textColor = '#A9B1C0'; // Default text color

//   // Style for menu items
//   const menuItemStyle = {
//     // Reduce padding inside the button for a tighter layout
//     padding: '4px 8px',
//     mx: 1.5,
//     my: 0.2,
//     borderRadius: 2,
//     border: '2px solid transparent',
//     backgroundColor: 'inherit'
//   };

//   // Style for active menu items
//   const activeMenuItemStyle = {
//     border: `2px solid ${activeColor}`,
//     color: activeColor,
//     '& .MuiListItemIcon-root': {
//       color: activeColor,
//     },
//     '& .MuiTypography-root': {
//       color: activeColor,
//     },
//     //backgroundColor: 'inherit !important',
//   };
//   // List of pages and their corresponding icons
//   const pages = [
//     { name: 'Dashboard', icon: <DashboardIcon /> },
//     { name: 'Trade History', icon: <HistoryIcon /> },
//     { name: 'Analytics', icon: <AnalyticsIcon /> },
//     { name: 'Portfolio', icon: <PortfolioIcon /> },
//     { name: 'PnL Analysis', icon: <PnlIcon /> },
//     { name: 'Alerts', icon: <AlertIcon /> },
//     { name: 'Settings', icon: <SettingsIcon /> },
//   ];

//   return (
//     <Box
//       sx={{
//         width: 240,
//         height: '100vh',
//         backgroundColor: 'background.default',
//         borderRight: 1,
//         borderColor: 'divider',
//         position: 'fixed',
//         left: 0,
//         top: 0,
//         display: 'flex',
//         flexDirection: 'column',
//       }}
//     >
//       {/* Header */}
//       <Box sx={{ padding: '12px 5px',height:60}}>
//         <img src={mySvg} alt="My SVG" height={30} />
//       </Box>
//       <Divider />

//       {/* Main navigation */}
//       <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
//         <List>
//           {pages.map((page) => (
//             <ListItem key={page.name} disablePadding>
//               <ListItemButton
//                 sx={{
//                   ...menuItemStyle, // Apply default styles
//                   ...(selectedPage === page.name && activeMenuItemStyle),
//                   ...(selectedPage !== page.name && {
//                     '&:hover': {
//                           border: `2px solid ${hoverGreen}`,
//                           color: "#5E6585",
//                           '& .MuiListItemIcon-root': {
//                             color: "#5E6585",
//                           },
//                           '& .MuiTypography-root': {
//                             color: hoverGreen,
//                           }
//                         },
//                         '& .MuiTypography-root': {
//                           color: textColor,
//                         },
//                         '& .MuiListItemIcon-root': {
//                             color: "#5E6585",
//                           },
//                           //backgroundColor: 'inherit'
                        
//                   }), // Apply active styles if selected
//                 }}
//                 onClick={() => onPageChange(page.name)} // Call handler on click
//                 selected={selectedPage === page.name} // Highlight selected page
//               >
//                 <ListItemIcon color='secondary'>{page.icon}</ListItemIcon>
//                 <ListItemText primary={page.name} sx={{ marginLeft: '-15px' }} />
//               </ListItemButton>
//             </ListItem>
//           ))}
//         </List>
//       </Box>

//       {/* Footer text at bottom */}
//       <Box
//         sx={{
//           p: 0,
//           borderTop: 1,
//           borderColor: 'divider',
//           mt: 'auto',
//         }}
//       >
//         <List sx={{ height: 80 }}>
//           <ListItem sx={{ fontSize: 40 }}>
//             <ListItemAvatar>
//               <Avatar>
//                 <ImageIcon sx={{ fontSize: 20 }} />
//               </Avatar>
//             </ListItemAvatar>
//             <ListItemText primary="John Doe" secondary="Pro Trader" />
//           </ListItem>
//         </List>
//       </Box>
//     </Box>
//   );
// }

// export default SidePanel;