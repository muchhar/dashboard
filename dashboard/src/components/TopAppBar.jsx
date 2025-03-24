import React from 'react';
import {
  AppBar,
  Toolbar,
  InputBase,
  IconButton,
  Box,
  Badge,
  useMediaQuery
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/NotificationsNoneOutlined';
import MenuIcon from '@mui/icons-material/Menu'; // Import the MenuIcon

function TopAppBar({ toggleDrawer }) { // Accept toggleDrawer as a prop
  const hoverclr = '#5E6585';
  const isWideScreen = useMediaQuery('(min-width: 1024px)');
  return (
    <AppBar
      position="static" // Change from 'fixed' to 'static'
      sx={{
        background: 'none',
        backgroundColor: 'transparent',
        boxShadow: 'none',
        width: 'calc(100%)', // Adjust width to account for the SidePanel
      }}
    >
      <Toolbar>
        {/* Menu button for mobile/tablet */}
        {!isWideScreen && ( // Only render the IconButton if the screen is 1024px or wider
          <IconButton
            edge="start"
            color="secondary"
            aria-label="menu"
            onClick={toggleDrawer}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}

        {/* Logo or brand can go here */}
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-start' }}>
          {/* Search Box - 60% width on the left side */}
          <Box
            sx={{
              position: 'relative',
              borderRadius: 1,
              backgroundColor: '#1E2025',
              width: '60%',
              display: 'flex',
              alignItems: 'center',
              border: 0.5,
              borderRadius: 2,
              borderColor: hoverclr, //'#5E6585',
            }}
          >
            <Box sx={{ padding: '0 12px', height: '100%', display: 'flex', alignItems: 'center' }}>
              <SearchIcon color='secondary' />
            </Box>
            <InputBase
              placeholder="Search trades, symbols.."
              sx={{
                color: 'inherit',
                width: '100%',
                '& .MuiInputBase-input': {
                  padding: '8px 8px 8px 0',
                  ":focus": {
                    hoverclr: "#ffffff"
                  }
                }
              }}
            />
          </Box>
        </Box>
       
        {/* Right side with notification bell */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton color="secondary" size="large">
            <Badge
              variant="dot" // Use a dot instead of a number
              color="primary" // Blue color for the dot
              overlap="circular" // Ensure the dot overlaps the icon properly
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default TopAppBar;

// import React from 'react';
// import {
//   AppBar,
//   Toolbar,
//   InputBase,
//   IconButton,
//   Box,
//    Badge
  
// } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import NotificationsIcon from '@mui/icons-material/NotificationsNoneOutlined';
// function TopAppBar() {
//   var hoverclr = '#5E6585';
  
//   return (
//     <AppBar 
//       position="static" // Change from 'fixed' to 'static'
//       sx={{ 
//         background: 'none',
//     backgroundColor: 'transparent',
//     boxShadow: 'none',width: 'calc(100%)', // Adjust width to account for the SidePanel
//       }}
//     >
//       <Toolbar>
//         {/* Logo or brand can go here */}
//         <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-start' }}>
//           {/* Search Box - 60% width on the left side */}
//           <Box 
//             sx={{ 
//               position: 'relative',
//               borderRadius: 1,
//               backgroundColor: '#1E2025',
//               width: '60%',
//               display: 'flex',
//               alignItems: 'center',
              
//               border: 0.5,
//               borderRadius:2,
//               borderColor: hoverclr //'#5E6585',
             
//             }}
//           >
//             <Box sx={{ padding: '0 12px', height: '100%', display: 'flex', alignItems: 'center' }}>
//               <SearchIcon color='secondary'/>
//             </Box>
//             <InputBase
//               placeholder="Search trades, symbols.."
//               sx={{
//                 color: 'inherit',
//                 width: '100%',
//                 '& .MuiInputBase-input': {
//                   padding: '8px 8px 8px 0',
//                   ":focus":{
//                     hoverclr : "#ffffff"
//                   }
//                 }
//               }}
//             />
//           </Box>
//         </Box>
        
//         {/* Right side with notification bell */}
//         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//           <IconButton color="secondary" size="large">
//             <Badge
//           variant="dot" // Use a dot instead of a number
//           color="primary" // Blue color for the dot
//           overlap="circular" // Ensure the dot overlaps the icon properly
//         >
//           <NotificationsIcon />
//         </Badge>
//           </IconButton>
//         </Box>
//       </Toolbar>
           
//     </AppBar>
//   );
// }

// export default TopAppBar;