
import * as React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import SimCardRoundedIcon from '@mui/icons-material/SimCardRounded';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';

import { styled } from '@mui/system';

import Loading from '~/components/containers/Loading';
import { UserAPI } from '~/apis';


const FormGrid = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export default function PaymentForm({total}) {

  // ui
  const [loading, setLoading] = useState(false);
  const [paymentType, setPaymentType] = React.useState('creditCard');
  const [cardNumber, setCardNumber] = React.useState('NCB');
  const [bankCode, setBankCode] = React.useState('NCB');
  const [expirationDate, setExpirationDate] = React.useState('');

  const handlePaymentTypeChange = (event) => {
    setPaymentType(event.target.value);
  };

  const handleCardNumberChange = (event) => {
    const value = event.target.value.replace(/\D/g, '');
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    if (value.length <= 16) {
      setCardNumber(formattedValue);
    }
  };

  // const handleCvvChange = (event) => {
  //   const value = event.target.value.replace(/\D/g, '');
  //   if (value.length <= 3) {
  //     setCvv(value);
  //   }
  // };
  const handleCvvChange = (event) => {
    setBankCode(event.target.value);
  };

  const handleExpirationDateChange = (eventOrDate) => {
    let value;
    if (eventOrDate instanceof Date) {
      const date = eventOrDate;
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
      const year = String(date.getFullYear()).slice(-2); // Last two digits of the year
      value = `${day}/${month}/${year}`;
    } else {
      value = eventOrDate.target.value.replace(/\D/g, '');
    }

    const formattedValue = value.replace(/(\d{2})(?=\d{2})/, '$1/').replace(/(\d{2})(?=\d{2})/, '$1/');
    if (value.length <= 8) {
      setExpirationDate(formattedValue);
    }
  };

  // information user
  // jwt
  const jwt = JSON.parse(localStorage.getItem('jwt'));

  // variable
  const [user, setUser] = useState({
    email: '',
    phone: '',
    address: {
      specific_address: ''
    }
  });

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
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAddressChange = (e) => {
    const { value } = e.target;
    setUser(prevState => ({
      ...prevState,
      address: {
        ...prevState.address,
        specific_address: value
      }
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      await getUser();
      handleExpirationDateChange(new Date());
    };
    fetchData();
  }, []);

  return (
    <Stack spacing={{ xs: 3, sm: 6 }} useFlexGap>
      <FormControl component="fieldset" fullWidth>
        <RadioGroup
          aria-label="Payment options"
          name="paymentType"
          value={paymentType}
          onChange={handlePaymentTypeChange}
          sx={{
            flexDirection: { sm: 'column', md: 'row' },
            gap: 2,
          }}
        >
          <Card
            raised={paymentType === 'creditCard'}
            sx={{
              maxWidth: { sm: '100%', md: '50%' },
              flexGrow: 1,
              outline: '1px solid',
              outlineColor:
                paymentType === 'creditCard' ? 'primary.main' : 'divider',
              backgroundColor:
                paymentType === 'creditCard' ? 'background.default' : '',
            }}
          >
            <CardActionArea onClick={() => setPaymentType('creditCard')}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CreditCardRoundedIcon color="primary" fontSize="small" />
                <Typography fontWeight="medium">NCB</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card
            raised={paymentType === 'bankTransfer'}
            sx={{
              maxWidth: { sm: '100%', md: '50%' },
              flexGrow: 1,
              outline: '1px solid',
              outlineColor:
                paymentType === 'bankTransfer' ? 'primary.main' : 'divider',
              backgroundColor:
                paymentType === 'bankTransfer' ? 'background.default' : '',
            }}
          >
            <CardActionArea onClick={() => setPaymentType('bankTransfer')}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AccountBalanceRoundedIcon color="primary" fontSize="small" />
                <Typography fontWeight="medium">ZALOPAY</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </RadioGroup>
      </FormControl>
      {paymentType === 'creditCard' && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          {/* <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              p: 3,
              height: { xs: 300, sm: 350, md: 375 },
              width: '100%',
              borderRadius: '20px',
              border: '1px solid ',
              borderColor: 'divider',
              backgroundColor: 'background.paper',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.05)',
            }}
          >  */}
          {/* visa */}
            {/* <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="subtitle2">VNPAY</Typography>
              <CreditCardRoundedIcon sx={{ color: 'text.secondary' }} />
            </Box>
            <SimCardRoundedIcon
              sx={{
                fontSize: { xs: 48, sm: 56 },
                transform: 'rotate(90deg)',
                color: 'text.secondary',
              }}
            /> */}
            {/* <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                gap: 2,
              }}
            >
              <FormGrid sx={{ flexGrow: 1 }}>
                <FormLabel htmlFor="card-number" required>
                  CARD NAME
                </FormLabel>
                <OutlinedInput
                  id="card-number"
                  autoComplete="card-number"
                  placeholder="0000 0000 0000 0000"
                  required
                  value={user.first_name + " " + user.last_name}
                  //onChange={handleCardNumberChange}
                />
              </FormGrid>
              <FormGrid sx={{ maxWidth: '20%' }}>
                <FormLabel htmlFor="cvv" required>
                  BANK CODE
                </FormLabel>
                <OutlinedInput
                  id="cvv"
                  autoComplete="CVV"
                  placeholder="123"
                  required
                  value={bankCode}
                  onChange={handleCvvChange}
                />
              </FormGrid>
            </Box> */}
            {/* <Box sx={{ display: 'flex', gap: 2 }}>
              <FormGrid sx={{ flexGrow: 1 }}>
                <FormLabel htmlFor="card-name" required>
                  EMAIL
                </FormLabel>
                <OutlinedInput
                  id="card-name"
                  autoComplete="card-name"
                  placeholder="John Smith"
                  required
                  value={user.email}
                />
              </FormGrid>
              <FormGrid sx={{ flexGrow: 1 }}>
                <FormLabel htmlFor="card-expiration" required>
                  Expiration date
                </FormLabel>
                <OutlinedInput
                  id="card-expiration"
                  autoComplete="card-expiration"
                  placeholder="DD/MM/YY"
                  required
                  value={expirationDate}
                  onChange={handleExpirationDateChange}
                />
              </FormGrid>
            </Box> */}
          {/* </Box> */}
        </Box>
      )}

      {paymentType === 'bankTransfer' && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Alert severity="warning" icon={<WarningRoundedIcon />}>
            The function is temporarily not supported.
          </Alert>
        </Box>
      )}

      <Loading open={loading} />
    </Stack>
  );
}