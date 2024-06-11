import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  Box, Button, Card, CardContent, Grid, Stack, Step, CssBaseline, StepLabel, Stepper, Typography, Link
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

import AddressForm from './AddressForm';
import getCheckoutTheme from './getCheckoutTheme';
import Info from './Info';
import InfoMobile from './InfoMobile';
import PaymentForm from './PaymentForm';
import axios from 'axios';
import { ProductAPI, UserAPI } from '~/apis';
import Images from '~/utils/Images';

const steps = ['Shipping address', 'Payment details'];

const logoStyle = {
  width: '60px',
  height: '56px',
  marginLeft: '-4px',
  marginRight: '-8px',
  paddingTop: 5,
};

export default function Checkout() {
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState('light');
  const [showCustomTheme, setShowCustomTheme] = useState(true);
  const checkoutTheme = createTheme(getCheckoutTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });
  const [activeStep, setActiveStep] = useState(0);
  const jwt = JSON.parse(localStorage.getItem('jwt'));

  const [yourCart, setYourCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState({ email: '', phone: '', address: { specific_address: '' } });
  const [address, setAddress] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);
  const [total, setTotal] = useState(0);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [productsResponse, userResponse, cartsResponse, addressResponse] = await Promise.all([
        axios.get(ProductAPI.getAll, { headers: { 'Content-Type': 'application/json' } }),
        axios.get(UserAPI.getUser, { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${jwt}` } }),
        axios.get('http://localhost:9090/api/v1/private/carts', { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${jwt}` } }),
        axios.get(UserAPI.getAddress, { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${jwt}` } })
      ]);

      setProducts(productsResponse.data.content);
      setUser(userResponse.data);
      setYourCart(cartsResponse.data);
      setAddress(addressResponse.data);

      calculateTotal(cartsResponse.data, productsResponse.data.content);
    } catch (error) {
      console.error(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = (cartItems, products) => {
    const totalAmount = cartItems.reduce((sum, cartItem) => {
      const product = products.find(p => p.id === cartItem.product_id);
      return product ? sum + cartItem.quantity * product.sell_price : sum;
    }, 0);
    setTotal(totalAmount);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0: return <AddressForm />;
      case 1: return <PaymentForm total={total} />;
      default: throw new Error('Unknown step');
    }
  };

  const handleNext = async () => {
    if (activeStep === steps.length - 1) {
      await buy();
    }
    setActiveStep(prevStep => prevStep + 1);
  };

  const handleBack = () => setActiveStep(prevStep => prevStep - 1);

  const loadOrders = () => {
    setOrderDetails(yourCart.map(cartItem => ({
      quantity: cartItem.quantity,
      product_id: cartItem.product_id
    })));
  };

  const buy = async () => {
    loadOrders();
    //const userAddress = JSON.parse(localStorage.getItem('user_address')) || address[0].specific_address;
    const userAddress = address[0].specific_address;

    const data = {
      note: "Contact before delivery",
      loyalty_points_pay: user.loyaty_points,
      delivery_fee: 30000,
      total_price: total + 30000,
      delivery_address: userAddress,
      order_details: orderDetails
    };

    setLoading(true);
    try {
      const response = await axios.post(`${UserAPI.payment}?amount=${total}&bankCode=NCB`, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`
        }
      });
      window.location.href = response.data.paymentUrl;
    } catch (error) {
      console.error(`Error: ${error.message}`);
      alert("Payment failed");
    } finally {
      localStorage.removeItem("user_address");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    loadOrders();
  }, []);

  const productsInCart = products.filter(product =>
    yourCart.some(cartItem => cartItem.product_id === product.id)
  );

  return (
    <ThemeProvider theme={showCustomTheme ? checkoutTheme : defaultTheme}>
      <CssBaseline />
      <Grid container sx={{ height: { xs: '100%', sm: '100dvh' }, mb: 30 }}>
        <Grid item xs={12} sm={5} lg={4}  
          sx={{
            display: { xs: 'none', md: 'flex' },
            flexDirection: 'column',
            backgroundColor: 'background.paper',
            borderRight: { sm: 'none', md: '1px solid' },
            borderColor: { sm: 'none', md: 'divider' },
            alignItems: 'start',
            pt: 4,
            px: 10,
            gap: 4,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'end', height: 150 }}>
            <Button startIcon={<ArrowBackRoundedIcon />} component="a" href="/" sx={{ ml: '-8px' }}>
              Back to
              <img src={Images.logoNoBackground} style={logoStyle} alt="Sitemark's logo" />
              <Typography>OnMart</Typography>
            </Button>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, width: '100%', maxWidth: 500 }}>
            <Info totalPrice={total} products={productsInCart} />
          </Box>
        </Grid>
        <Grid item sm={12} md={7} lg={8}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '100%',
            width: '100%',
            backgroundColor: { xs: 'transparent', sm: 'background.default' },
            alignItems: 'start',
            pt: { xs: 2, sm: 4 },
            px: { xs: 2, sm: 10 },
            gap: { xs: 4, md: 8 },
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: { sm: 'space-between', md: 'flex-end' }, alignItems: 'center', width: '100%', maxWidth: { sm: '100%', md: 600 } }}>
            <Box sx={{ display: { xs: 'flex', md: 'none' }, flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
              <Button startIcon={<ArrowBackRoundedIcon />} component="a" href="/" sx={{ alignSelf: 'start' }}>
                Back to
                <img src={Images.logoNoBackground} style={logoStyle} alt="Sitemark's logo" />
                <Typography>OnMart</Typography>
              </Button>
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end', flexGrow: 1, height: 150 }}>
              <Stepper id="desktop-stepper" activeStep={activeStep} sx={{ width: '100%', height: 40, mt: 15 }}>
                {steps.map(label => (
                  <Step key={label} sx={{ ':first-child': { pl: 0 }, ':last-child': { pr: 0 } }}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </Box>

          <Card sx={{ display: { xs: 'flex', md: 'none' }, width: '100%' }}>
            <CardContent sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between', ':last-child': { pb: 2 } }}>
              <div>
                <Typography variant="subtitle2" gutterBottom>Selected products</Typography>
                <Typography variant="body2" gutterBottom>{productsInCart.length} products</Typography>
              </div>
              <div>
                <Typography variant="subtitle2" gutterBottom>Total price</Typography>
                <Typography variant="body2" gutterBottom>${total}</Typography>
              </div>
              <Stepper id="mobile-stepper" activeStep={activeStep} sx={{ width: '100%', pt: 2, display: 'flex', justifyContent: 'center', flexGrow: 1 }}>
                {steps.map(label => (
                  <Step key={label} sx={{ ':first-child': { pl: 0 }, ':last-child': { pr: 0 } }}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </CardContent>
          </Card>

          <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: 600 }}>
            {getStepContent(activeStep)}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              {activeStep !== 0 && (
                <Button variant="contained" onClick={handleBack} startIcon={<ChevronLeftRoundedIcon />}>
                  Back
                </Button>
              )}
              <Button variant="contained" onClick={handleNext} disabled={loading} endIcon={<ChevronRightRoundedIcon />}>
                {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
