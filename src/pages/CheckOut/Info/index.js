
import axios from "axios";
import { useState, useEffect } from "react";
import * as React from 'react';
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { Box, Button, ButtonGroup } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Loading from "~/components/containers/Loading";
import { CartAPI } from "~/apis";

function Info({ totalPrice, products }) {

  const [loading, setLoading] = useState(false);
  const [number, setNumber] = useState(1);

  const [cart, setCart] = useState([]);
  const jwt = JSON.parse(localStorage.getItem('jwt'));
  
  //console.log(products);

  const productss = [
    {
      name: 'Professional plan',
      desc: 'Shipping fee costs',
      price: 30000,
    },
  ];  

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
        setCart(response.data);
        //console.log('Cart:', response.data);
    } catch (err) {
        console.log("Error getall:", err.message);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    getAllCarts();
  }, []);

  return (
    <React.Fragment>
      <Typography variant="subtitle2" color="text.secondary">
        Total
      </Typography>
      <Typography variant="h4" gutterBottom>
        {(totalPrice+30000).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
      </Typography>
      <List disablePadding>
        {productss.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText
              sx={{ mr: 2 }}
              primary={product.name}
              secondary={product.desc}
            />
            <Typography variant="body1" fontWeight="medium">
              {product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
            </Typography>
          </ListItem>
        ))}
      </List>
      
      {/* other */}
      <Loading open={loading} />
    </React.Fragment>
  );
}

Info.propTypes = {
  totalPrice: PropTypes.string.isRequired,
};

export default Info;