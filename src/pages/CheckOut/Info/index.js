import * as React from 'react';
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

function Info({ totalPrice }) {


  const totalShip = 30000;
  const totalInsurance = 300000;
  const totalLicense = 1000000;

  const products = [
    {
      name: 'Professional plan',
      desc: 'Shipping fee costs',
      price: totalShip,
    },
    {
      name: 'Dedicated support',
      desc: 'Included in the Professional plan',
      price: 'Free',
    },
    {
      name: 'Hardware',
      desc: 'insurance for products',
      price: totalInsurance,
    },
    {
      name: 'Landing page template',
      desc: 'License',
      price: totalLicense,
    },
  ];  

  return (
    <React.Fragment>
      <Typography variant="subtitle2" color="text.secondary">
        Total
      </Typography>
      <Typography variant="h4" gutterBottom>
        {totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
      </Typography>
      <List disablePadding>
        {products.map((product) => (
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
    </React.Fragment>
  );
}

Info.propTypes = {
  totalPrice: PropTypes.string.isRequired,
};

export default Info;