import axios from 'axios';
import { useEffect, useState } from "react";
import { Alert, Box, Button, ButtonGroup, Drawer, Grid, Link, List, ListItem, ListItemText, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Product from "../../Product";
import Loading from "../../Loading";
import Images from '~/utils/Images';
import { CartAPI } from '~/apis';

function DrawerCart({ openDrawer, children, ...props }) {
  // UI states
  const [loading, setLoading] = useState(false);
  const [loginUser, setLoginUser] = useState(false);
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const jwt = JSON.parse(localStorage.getItem('jwt'));

  // Fetch all products
  const getAllProducts = async () => {
    try {
      const response = await axios.get('http://localhost:9090/api/v1/public/products');
      setProducts(response.data.content);
    } catch (error) {
      console.error(`Error fetching products: ${error}`);
    }
  };

  // Fetch all cart items
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
    } catch (err) {
      console.error("Error getting cart items:", err.message);
    } finally {
      setLoading(false);
    }
  };

  // Increase quantity of a product in the cart
  const addQuantity = async (productId) => {
    const cartItem = cart.find(item => item.product_id === productId);
    if (!cartItem) {
      console.error("Cart item not found");
      return;
    }
    setLoading(true);
    try {
      await axios.put(`${CartAPI.addQuantity}${cartItem.id}`, {}, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`
        }
      });
      getAllCarts(); // Refresh cart items after updating quantity
    } catch (err) {
      console.error("Error adding quantity:", err.message);
    } finally {
      setLoading(false);
    }
  };

  // Decrease quantity of a product in the cart
  const removeQuantity = async (productId) => {
    const cartItem = cart.find(item => item.product_id === productId);
    if (!cartItem) {
      console.error("Cart item not found");
      return;
    }
    setLoading(true);
    try {
      await axios.put(`${CartAPI.removeQuantity}${cartItem.id}`, {}, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`
        }
      });
      getAllCarts(); // Refresh cart items after updating quantity
    } catch (err) {
      console.error("Error removing quantity:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const logged = JSON.parse(localStorage.getItem('logged'));
    setLoginUser(logged ? true : false);
    getAllProducts();
    getAllCarts();
  }, [openDrawer]);

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      window.location.href = loginUser ? '/checkout' : '/login';
    }, 2000);
  };

  const filteredProducts = products.filter(product =>
    cart.some(cartItem => cartItem.product_id === product.id)
  );

  return (
    <Drawer anchor='bottom' {...props}>
      <Box sx={{ height: '100vh', mx: 5, mb: 20 }}>
        {children}
        <Box>
          <List disablePadding>
            {filteredProducts.map((product) => {
              const cartItem = cart.find(cartItem => cartItem.product_id === product.id);

              return (
                <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
                  <ListItemText sx={{ mr: 2 }} primary={product.name} />
                  <Box sx={{ mr: 2 }}>
                    <ButtonGroup orientation="vertical" aria-label="Vertical button group">
                      <Button onClick={() => addQuantity(product.id)}><AddIcon /></Button>
                      <Button onClick={() => removeQuantity(product.id)}><RemoveIcon /></Button>
                    </ButtonGroup>
                  </Box>
                  {cartItem && (
                    <>
                      <Typography variant="body1" fontWeight="medium" sx={{ mr: 1 }}>
                        {cartItem.quantity}
                      </Typography>
                      <Typography variant="body1" fontWeight="medium" sx={{ mr: 1 }}>
                        x
                      </Typography>
                    </>
                  )}
                  <Typography variant="body1" fontWeight="medium">
                    {product.sell_price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                  </Typography>
                </ListItem>
              );
            })}
          </List>
        </Box>
        {cart.length < 1 ? (
          <Box sx={{ textAlign: 'center', mx: 60, my: 5 }}>
            <Alert severity="warning"><Typography>Cart list is empty.</Typography></Alert>
          </Box>
        ) : (
          <>
            <Grid container spacing={2}>
              {filteredProducts.map((data) => (
                <Grid key={data.id} item xs={12} md={3} sx={{ display: 'flex' }}>
                  <Product
                    id={data.id}
                    name={data.name}
                    image={data.images_url || Images.noImage}
                    price={data.sell_price}
                    shortDescription={data.short_description}
                  />
                </Grid>
              ))}
            </Grid>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <Box sx={{ width: '100%', display: 'grid', placeContent: 'center' }}>
                <Button
                  sx={{
                    mt: 10,
                    cursor: 'pointer',
                    display: 'inline-block',
                    padding: '0.9rem 1.8rem',
                    fontSize: '16px',
                    fontWeight: 700,
                    color: 'white',
                    border: '1px solid black',
                    backgroundColor: 'black',
                    overflow: 'hidden',
                    zIndex: 1,
                    "::before": {
                      content: '""',
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      width: '100%',
                      height: '100%',
                      backgroundColor: 'grey',
                      transform: 'translateX(-100%)',
                      transition: 'all .3s',
                      zIndex: -1
                    },
                    ":hover::before": { transform: 'translateX(0)' }
                  }}
                  onClick={handlePay}
                >
                  <Typography sx={{ color: 'white', width: '300px', textAlign: 'center' }}>
                    Pay immediately
                  </Typography>
                </Button>
              </Box>
            </Box>
            <Loading open={loading} />
          </>
        )}
      </Box>
    </Drawer>
  );
}

export default DrawerCart;
