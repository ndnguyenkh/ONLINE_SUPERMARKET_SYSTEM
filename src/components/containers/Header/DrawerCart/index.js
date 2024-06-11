import axios from "axios";
import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  Drawer,
  Grid,
  Link,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import Loading from "../../Loading";
import Images from "~/utils/Images";
import { CartAPI } from "~/apis";
import Image from "~/components/Image";

function DrawerCart({ openDrawer, children, ...props }) {
  // UI states
  const [loading, setLoading] = useState(false);
  const [loginUser, setLoginUser] = useState(false);
  const jwt = JSON.parse(localStorage.getItem("jwt"));
  const logged = JSON.parse(localStorage.getItem("logged"));

  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  const fetchData = async () => {
    //setLoading(true);
    try {
      const [cartRes, productRes] = await Promise.all([
        axios.get("http://localhost:9090/api/v1/private/carts", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        }),
        axios.get("http://localhost:9090/api/v1/public/products", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        }),
      ]);
      setCart(cartRes.data);
      setProducts(productRes.data.content);
      calculateTotal(cartRes.data, productRes.data.content);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  // Increase quantity of a product in the cart
  const addQuantity = async (productId) => {
    const cartItem = cart.find((item) => item.product_id === productId);
    if (!cartItem) {
      console.error("Cart item not found");
      return;
    }
    setLoading(true);
    try {
      await axios.put(
        `${CartAPI.addQuantity}${cartItem.id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      
    } catch (err) {
      console.error("Error adding quantity:", err);
    } finally {
      
      setLoading(false);
    }
  };

  // Decrease quantity of a product in the cart
  const removeQuantity = async (productId) => {
    const cartItem = cart.find((item) => item.product_id === productId);
    if (!cartItem) {
      console.error("Cart item not found");
      return;
    }
    setLoading(true);
    
    try {
      await axios.put(
        `${CartAPI.removeQuantity}${cartItem.id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      
    } catch (err) {
      console.error("Error removing quantity:", err.message);
    } finally {
      
      setLoading(false);
    }
  };

  const removeToCart = async (productId) => {
    const cartItem = cart.find((item) => item.product_id === productId);
    console.log(cartItem.id);
    if (!cartItem) {
      console.error("Cart item not found");
      return;
    }
    setLoading(true);
    
    try {
      await axios.delete(`${CartAPI.remove}${cartItem.id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      });
      alert("Removed Success!");
      
    } catch (err) {
      console.error("Error remove cart:", err);
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

  useEffect(() => {
    setLoginUser(logged ? true : false);
    
    fetchData();
  }, [openDrawer]);

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      window.location.href = loginUser ? "/checkout" : "/login";
    }, 2000);
  };

  const filteredProducts = products.filter((product) =>
    cart.some((cartItem) => cartItem.product_id === product.id)
  );

  return (
    <Drawer anchor="bottom" {...props}>
      <Box sx={{ height: "100vh", mx: 5, mb: 20 }}>
        {children}
        <Box>
          <List disablePadding >
            {filteredProducts.map((product, i) => {
              const cartItem = cart.find(
                (cartItem) => cartItem.product_id === product.id
              );

              return (
                <ListItem key={i} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Box sx={{display: 'flex'}}>

                    {/* <ListItemText primary={product.name} /> */}
                    <Box sx={{ display: "flex", height: '140px', borderBottom: '2px solid orange', borderRight: '1px solid orange', borderRadius: '20px' }}>

                      <Image
                        alt=""
                        src={product.images_url}
                        style={{ width: '140px', borderRadius: '20px' }}
                      />
                      <Box
                        sx={{ display: "block", mx: 2}}
                      >
                        <Box sx={{mt: 2}}>
                          <Typography sx={{color: 'gray', fontWeight: 'bold'}}>{product.name}</Typography>
                        </Box>
                        <Box>
                          {cartItem && (
                            <Box
                              sx={{
                                display: "flex",
                                mt: 1,
                                alignItems: "center",
                              }}
                            >
                              <Typography
                                variant="body1"
                                fontWeight="medium"
                                sx={{color: 'grey'}}
                              >
                                Quantity: {cartItem.quantity}
                              </Typography>
                            </Box>
                          )}

                        <Box sx={{ display: "flex", mt: 2, alignItems: 'center'}}>
                        <ButtonGroup
                            sx={{ height: "50px", alignItems: "center" }}
                            orientation="horizontal"
                            aria-label="Vertical button group"
                          >
                            <Button onClick={() => removeToCart(product.id)}>
                              <DeleteIcon sx={{ color: "red" }} />
                            </Button>
                            <Button onClick={() => addQuantity(product.id)}>
                              <AddIcon />
                            </Button>
                            <Button
                              onClick={() => removeQuantity(product.id)}
                              disabled={cartItem.quantity > 1 ? false : true}
                            >
                              <RemoveIcon />
                            </Button>
                          </ButtonGroup>

                          <Typography
                            variant="body1"
                            fontWeight="medium"
                            sx={{ ml: 20, alignItems: "center" }}
                          >
                            {product.sell_price.toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </Typography>
                          {/* <Typography variant="body1" fontWeight="medium">
                            {" "}
                            ={" "}
                            {(
                              product.sell_price * cartItem.quantity
                            ).toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </Typography> */}
                        </Box>
                        </Box>

                        
                      </Box>
                    </Box>
                  </Box>
                </ListItem>
              );
            })}
          </List>
        </Box>
        {cart.length < 1 ? (
          <Box sx={{ textAlign: "center", mx: 60, my: 5 }}>
            <Alert severity="warning">
              <Typography>Please login to use this function.</Typography>
            </Alert>
          </Box>
        ) : (
          <>
            <Box sx={{ height: '100px', mt: 5, px: 20, display: 'flex', backgroundColor: 'rgba(22, 24, 35, 0.2)', justifyContent: 'space-between', alignItems: 'center'}}>
              <Typography variant="h4" >Total</Typography>
              <Typography variant="h4" >{total.toLocaleString("vi-VN", { style: "currency",currency: "VND",})}</Typography>               
            </Box>
            <Box
              sx={{ width: "100%", display: "flex", justifyContent: "center" }}
            >
              <Box
                sx={{ width: "100%", display: "grid", placeContent: "center" }}
              >
                <Button
                  sx={{
                    mt: 5,
                    cursor: "pointer",
                    display: "inline-block",
                    padding: "0.9rem 1.8rem",
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "white",
                    border: "1px solid black",
                    backgroundColor: "black",
                    overflow: "hidden",
                    zIndex: 1,
                    "::before": {
                      content: '""',
                      position: "absolute",
                      left: 0,
                      top: 0,
                      width: "100%",
                      height: "100%",
                      backgroundColor: "grey",
                      transform: "translateX(-100%)",
                      transition: "all .3s",
                      zIndex: -1,
                    },
                    ":hover::before": { transform: "translateX(0)" },
                  }}
                  onClick={handlePay}
                >
                  <Typography
                    sx={{ color: "white", width: "300px", textAlign: "center" }}
                  >
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
