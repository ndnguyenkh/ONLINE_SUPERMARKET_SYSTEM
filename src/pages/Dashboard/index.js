
import * as React from 'react';
import { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
 
import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {' © '}
      <Link color="inherit" href="https://mui.com/">
        ONMART - Tous droits de propriété intellectuelle réservés
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

function Dashboard() {

  // const [role, setRole] = useState('');
  // chuyển hướng page theo roles
  const getRedirectPath = (authority) => {
    switch (authority) {
      case 'CUSTOMER': {
        return window.location.href = ('/profile');
      }
      case 'ADMIN': 
      case 'WAREHOUSE_STAFFS':
      case 'SELLER':
        window.location.href = ('/dashboard');
        break;
      default: {
        return window.location.href = ('/login'); // Hoặc trang khác nếu không xác định được vai trò
      }
        
    }
};

  useEffect(() => {
    // const role = JSON.parse(localStorage.getItem('role'));
    // // setRole(JSON.parse(localStorage.getItem('role')));
    // getRedirectPath(role);

  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
      <Toolbar />
        <Typography sx={{mt: 20, textAlign: 'center'}} variant='h4' >Welcome to OnMart manage page</Typography>
        {/* content page */}
        {/* <Box
            //className='heloo'
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          
          <Orders />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}> */}

              {/* Chart today*/}
              {/* <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Chart />
                </Paper>
              </Grid> */}

              {/* Recent Deposits */}
              {/* <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Deposits />
                </Paper>
              </Grid> */}

              {/* Recent Orders */}
              {/* <Grid item md={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  
                </Paper>
              </Grid> */}
              
            {/* </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container> */}
        {/* </Box> */}

      </Box>
    </ThemeProvider>
  );
}

export default Dashboard;