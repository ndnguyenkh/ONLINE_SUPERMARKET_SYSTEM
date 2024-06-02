import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/system';

import Loading from '~/components/containers/Loading';
import { UserAPI } from '~/apis';

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export default function AddressForm() {
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const jwt = JSON.parse(localStorage.getItem('jwt'));
  const [user, setUser] = useState({});
  const [address, setAddress] = useState([]);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAddressChange = (e) => {
    const { value } = e.target;
    setAddress(prevState => ({
      ...prevState,
      specific_address: value
    }));
  };

  const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const handleChecked = (e) => {
    setChecked(e.target.checked);
    saveToLocalStorage('user_address', user.address?.specific_address);
  }

  useEffect(() => {
    getUser();
    getAddressUser();
  }, []);

  return (
    <Grid container spacing={3}>
      <FormGrid item xs={12} md={12}>
        <FormLabel htmlFor="email" required>
          Email
        </FormLabel>
        <OutlinedInput
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          autoComplete="email"
          required
          value={user.email || ''}
          onChange={handleChange}
        />
      </FormGrid>
      <FormGrid item xs={12} md={6}>
        <FormLabel htmlFor="phone" required>
          Phone
        </FormLabel>
        <OutlinedInput
          id="phone"
          name="phone"
          type="tel"
          placeholder="(+84) 123 456 789"
          autoComplete="tel"
          required
          value={user.phone || ''}
          onChange={handleChange}
        />
      </FormGrid>
      <FormGrid item xs={12}>
        <FormLabel htmlFor="address1" required>
          Default Address
        </FormLabel>
        <OutlinedInput
          id="address1"
          name="address1"
          type="text"
          placeholder="Street name and number"
          autoComplete="shipping address-line1"
          required
          value={address.length > 0 ? address[0].specific_address : ''}
          onChange={handleAddressChange}
        />
      </FormGrid>
      <FormGrid item xs={12}>
        <FormLabel htmlFor="address2">New Address</FormLabel>
        <OutlinedInput
          id="address2"
          name="address2"
          type="text"
          placeholder="Apartment, suite, unit, etc. (optional)"
          autoComplete="shipping address-line2"
          value={user.address?.specific_address || ''}
          onChange={handleAddressChange}
        />
      </FormGrid>
      <FormGrid item xs={12}>
        <FormControlLabel
          control={<Checkbox name="saveAddress" 
            checked={checked} onChange={handleChecked} 
          />}
          label="Use the new address for payment"
        />
      </FormGrid>
      <Loading open={loading} />
    </Grid>
  );
}
