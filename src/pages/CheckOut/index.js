import * as React from 'react';
import { useEffect, useState } from 'react';
import { Box, Button, Card, CardContent, Grid, Stack, Step, CssBaseline, StepLabel, Stepper, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

import AddressForm from './AddressForm';
import getCheckoutTheme from './getCheckoutTheme';
import Info from './Info';
import InfoMobile from './InfoMobile';
import PaymentForm from './PaymentForm';
import Review from './Review';

// file
import Images from '~/utils/Images';
import DATA_PRODUCT from '~/utils/content/Product';
import { Link } from '@mui/material';
import axios from 'axios';
import { ProductAPI, UserAPI } from '~/apis';

const steps = ['Shipping address', 'Payment details']; // , 'Review your order'

const logoStyle = {
  width: '60px',
  height: '56px',
  marginLeft: '-4px',
  marginRight: '-8px',
  paddingTop: 5,
};

export default function Checkout() {
    
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = React.useState('light');
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const checkoutTheme = createTheme(getCheckoutTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });
  const [activeStep, setActiveStep] = React.useState(0);
  // jwt
  const jwt = JSON.parse(localStorage.getItem('jwt'));
  // variables
  const [yourCart, setYourCart] = React.useState([]);
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState({
    email: '',
    phone: '',
    address: {
      specific_address: ''
    }
  });
  const [address, setAddress] = useState([]);

  // Lọc các sản phẩm trong giỏ hàng và tính tổng giá trị
  // Lọc sản phẩm theo product_id có trong giỏ hàng
  const productsInCart = products.filter(product => 
    yourCart.some(cartItem => cartItem.product_id === product.id)
  );
  //const productsInCart = products.filter(data => yourCart.includes(data.id));
  const [orderDetails, setOrderDetails] = useState([]); 

  // const formattedProductsInCart = productsInCart.map(product => ({
  //   quantity: 2,
  //   product_id: product.id
  // }));

  const [total, setTotal] = useState(0);
  const calculateTotal = () => {
    let totalAmount = 0;
    yourCart.forEach(cartItem => {
      const product = products.find(p => p.id === cartItem.product_id);
      if (product) {
        totalAmount += cartItem.quantity * product.sell_price;
      }
    });
    setTotal(totalAmount);
  };

  const totalPrice = total;
  const totalPriceNew = totalPrice;

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <AddressForm />;
      case 1:
        return <PaymentForm total={totalPrice}/>;
      // case 2:
      //   return <Review />;
      default:
        throw new Error('Unknown step');
    }
  }

  // getAllProducts
  const getAllProducts = async () => {
    try {
      const response = await axios.get(ProductAPI.getAll, {
        'Content-Type': 'application/json',
        //  Authorization: `Bearer ${jwt}`
      });
      setProducts(response.data.content);
    } catch (error) {
      console.log(`${error.message}}`);
    }
  }

  // get user
  const getUser = async () => {
    setLoading(true);
    try {
      const response = await axios.get(UserAPI.getUser, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`
        }
      });
      setUser(response.data);
    } catch (error) {
      console.log(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }; 

  // get all cart
  const getAllCarts = async () => {
    setLoading(true);
    try {
        const response = await axios.get('http://localhost:9090/api/v1/private/carts', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`
            }
        });
        setYourCart(response.data);
        //console.log('Cart:', response.data);
    } catch (err) {
        console.log("Error getall:", err.message);
    } finally {
        setLoading(false);
    }
  };

  function loadOrders() {
    const newOrderDetails = yourCart.map(cartItem => ({
      quantity: cartItem.quantity,
      product_id: cartItem.product_id
    }));
    return setOrderDetails(newOrderDetails);
  }

  const getAddressUser = async () => {
    setLoading(true);
    try {
      const response = await axios.get(UserAPI.getAddress, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`
        }
      });
      setAddress(response.data);
    } catch (error) {
      console.log(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // buy api
  const buy = async () => {
    loadOrders();
    const userAddress = JSON.parse(localStorage.getItem('user_address'));

    const data = {
      note: "Contact before delivery",
      loyalty_points_pay: user.loyaty_points,
      delivery_fee: 0,
      total_price: totalPriceNew,
      delivery_address: userAddress ? userAddress : address[0].specific_address,
      order_details: orderDetails
    }
    setLoading(true);
    try {
      const response = await axios.post(`${UserAPI.payment}?amount=${totalPrice}&bankCode=NCB`, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`
        }
      });
      window.location.href = response.data.paymentUrl;
      //alert("Payment success");
    } catch (error) {
      console.log(`Error: ${error.message}`);
      alert("UN Payment success");
      
    } finally {
      removeAccountFromLocalStorage("user_address");
      setLoading(false);
    }

  };

  useEffect(() => {
    getAllCarts();
    getUser();
    getAddressUser();
    getAllProducts();
    calculateTotal();
  }, []);

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      buy();
      setActiveStep(activeStep + 1);
    }else {
      setActiveStep(activeStep + 1);
    }
    
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setUser(prevState => ({
  //     ...prevState,
  //     [name]: value
  //   }));
  // };

  // const handleAddressChange = (e) => {
  //   const { value } = e.target;
  //   setUser(prevState => ({
  //     ...prevState,
  //     address: {
  //       ...prevState.address,
  //       specific_address: value
  //     }
  //   }));
  // };

  // Hàm xóa mảng vào localStorage 2
  const removeAccountFromLocalStorage = (key) => {
    localStorage.removeItem(key);
  }; 

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
          <Box
            sx={{
              display: 'flex',
              alignItems: 'end',
              height: 150,
            }}
          >
            {/* button to back md */}
            <Button
              startIcon={<ArrowBackRoundedIcon />}
              component="a"
              href="/"
              sx={{ ml: '-8px' }}
            >
              Back to
              <img
                src={
                  Images.logoNoBackground
                }
                style={logoStyle}
                alt="Sitemark's logo"
              />
              <Typography>OnMart</Typography>
            </Button>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
              width: '100%',
              maxWidth: 500,
            }}
          >
            <Info totalPrice={activeStep >= 2 ? totalPriceNew : totalPrice} products={productsInCart} />
          </Box>
        </Grid>
        <Grid
          item
          sm={12}
          md={7}
          lg={8}
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
          <Box
            sx={{
              display: 'flex',
              justifyContent: { sm: 'space-between', md: 'flex-end' },
              alignItems: 'center',
              width: '100%',
              maxWidth: { sm: '100%', md: 600 },
            }}
          >
            <Box
              sx={{
                display: { xs: 'flex', md: 'none' },
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
              }}
            >

              {/* button to back xs */}
              <Button
                startIcon={<ArrowBackRoundedIcon />}
                component="a"
                href="/"
                sx={{ alignSelf: 'start' }}
              >
                Back to
                <img
                  src={
                    Images.logoNoBackground
                  }
                  style={logoStyle}
                  alt="Sitemark's logo"
                />
                <Typography>OnMart</Typography>
              </Button>
              {/* <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} /> */}
            </Box>

            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                flexGrow: 1,
                height: 150,
              }}
            >
              {/* <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} /> */}
              <Stepper
                id="desktop-stepper"
                activeStep={activeStep}
                sx={{
                  width: '100%',
                  height: 40,
                  mt: 15,
                }}
              >
                {steps.map((label) => (
                  <Step
                    sx={{
                      ':first-child': { pl: 0 },
                      ':last-child': { pr: 0 },
                    }}
                    key={label}
                  >
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </Box>

          {/* card xs  */}
          <Card
            sx={{
              display: { xs: 'flex', md: 'none' },
              width: '100%',
            }}
          >
            <CardContent
              sx={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-between',
                ':last-child': { pb: 2 },
              }}
            >
              <div>
                <Typography variant="subtitle2" gutterBottom>
                  Selected products
                </Typography>
                <Typography variant="body1">
                  {activeStep >= 2 ? '$144.97' : '$134.98'}
                </Typography>
              </div>
              <InfoMobile totalPrice={activeStep >= 2 ? '$144.97' : '$134.98'} />
            </CardContent>
          </Card>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
              width: '100%',
              maxWidth: { sm: '100%', md: 600 },
              maxHeight: '720px',
              gap: { xs: 5, md: 'none' },
            }}
          >

            {/* xs */}
            <Stepper
              id="mobile-stepper"
              activeStep={activeStep}
              alternativeLabel
              sx={{ display: { sm: 'flex', md: 'none' } }}
            >
              {steps.map((label) => (
                <Step
                  sx={{
                    ':first-child': { pl: 0 },
                    ':last-child': { pr: 0 },
                    '& .MuiStepConnector-root': { top: { xs: 6, sm: 12 } },
                  }}
                  key={label}
                >
                  <StepLabel
                    sx={{ '.MuiStepLabel-labelContainer': { maxWidth: '70px' } }}
                  >
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>

            {/* card thanh toán thành công  */}
            {activeStep === steps.length ? (
              <Stack spacing={2} useFlexGap>
                <Typography variant="h1">📦</Typography>
                <Typography variant="h5">Thank you for your order!</Typography>
                <Typography variant="body1" color="text.secondary">
                  Your order number is
                  <strong>&nbsp;#140396</strong>. We have emailed your order
                  confirmation and will update you once its shipped.
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    alignSelf: 'start',
                    width: { xs: '100%', sm: 'auto' },
                  }}
                >
                  <Link href="/" sx={{color: 'white'}}>Go to my orders</Link>
                </Button>
              </Stack>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column-reverse', sm: 'row' },
                    justifyContent: activeStep !== 0 ? 'space-between' : 'flex-end',
                    alignItems: 'end',
                    flexGrow: 1,
                    gap: 1,
                    pb: { xs: 12, sm: 0 },
                    mt: { xs: 2, sm: 0 },
                    mb: '60px',
                  }}
                >
                  {activeStep !== 0 && (
                    <Button
                      startIcon={<ChevronLeftRoundedIcon />}
                      onClick={handleBack}
                      variant="text"
                      sx={{
                        display: { xs: 'none', sm: 'flex' },
                      }}
                    >
                      Previous
                    </Button>
                  )}

                  {activeStep !== 0 && (
                    <Button
                      startIcon={<ChevronLeftRoundedIcon />}
                      onClick={handleBack}
                      variant="outlined"
                      fullWidth
                      sx={{
                        display: { xs: 'flex', sm: 'none' },
                      }}
                    >
                      Previous
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    endIcon={<ChevronRightRoundedIcon />}
                    onClick={handleNext}
                    sx={{
                      width: { xs: '100%', sm: 'fit-content' },
                    }}
                  >
                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </Box>
        </Grid>
      </Grid>
 
    </ThemeProvider>
  );
}