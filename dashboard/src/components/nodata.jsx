import React from 'react';
import { Box, Typography, keyframes } from "@mui/material";
import Icon1 from '@mui/icons-material/BrowserNotSupported';
const pulse = keyframes`
  0% { opacity: 0.6; transform: scale(0.95); }
  50% { opacity: 1; transform: scale(1.05); }
  100% { opacity: 0.6; transform: scale(0.95); }
`;

const NoDataFound = ({ message = "No data available", iconSize = 80 }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '300px',
        backgroundColor: '#151818',
        border: '1px solid #637260',
        borderRadius: '16px',
        p: 4,
        mt:10,
        ml:5,
        mr:5,
        textAlign: 'center',
        '&:hover': {
          borderColor: '#80ee64',
          transition: 'border-color 0.3s ease'
        }
      }}
    >
      <Box
        sx={{
          animation: `${pulse} 2s infinite ease-in-out`,
          mb: 3
        }}
      >
        <Icon1
          sx={{
            fontSize: iconSize,
            color: '#637260',
          }}
        />
      </Box>
      <Typography
        variant="h6"
        sx={{
          color: '#ddffdc',
          fontFamily: 'Inter, sans-serif',
          fontWeight: 500,
          mb: 1,
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}
      >
        {message}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: '#637260',
          fontFamily: 'Inter, sans-serif',
          maxWidth: '400px',
          lineHeight: '1.6'
        }}
      >
        We couldn't find any matching records. Please check back later or try different parameters.
      </Typography>
      <Box
        component="span"
        sx={{
          display: 'inline-block',
          width: '40px',
          height: '2px',
          backgroundColor: '#80ee64',
          mt: 3,
          mb: 2
        }}
      />
      <Typography
        variant="caption"
        sx={{
          color: '#637260',
          fontFamily: 'Inter, sans-serif',
          fontStyle: 'italic'
        }}
      >
        Need help? Contact support
      </Typography>
    </Box>
  );
};

export default NoDataFound;