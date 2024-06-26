import axios from "axios";
import { useEffect, useState } from "react";
import { Box, Button, Card, CardActions, CardContent, CardMedia, Tooltip, Typography } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartOutlinedIcon from '@mui/icons-material/RemoveShoppingCartOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';

import Loading from "../Loading";
import ProductDetails from "../ProductDetails";
import { CartAPI } from "~/apis";

function Product({ id, name, image, shortDescription, price }) {

    const [loading, setLoading] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [loginUser, setLoginUser] = useState(false);

    const [cart, setCart] = useState([]);
    const jwt = JSON.parse(localStorage.getItem('jwt'));

    // create cart
    const createCart = async (product_id) => {
        const data = {
            product_id: product_id
        };
        setLoading(true);
        try {
            const response = await axios.post(CartAPI.create, data, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwt}`
                }
            });
            alert("Cart created!: " + response.data.id);
            window.location.reload();
        } catch (err) {
            console.log("Error creating: " + err.message);
            alert("Cart un created!");
        } finally {
            setLoading(false);
        }
    }

    // remove cart
    const removeCart = async (product_id) => {
        setLoading(true);
        try {
            const response = await axios.delete(`${CartAPI.remove}${product_id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwt}`
                }
            });
            alert("Cart removed!" + response.data.id);
        } catch (err) {
            console.log("Error removing: " + err.message);
            alert("Cart un removed!");
        } finally {
            setLoading(false);
        }
    }

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
            console.log('Cart:', response.data);
        } catch (err) {
            console.log("Error getall:", err.message);
        } finally {
            setLoading(false);
        }
    };

    // Sử dụng state để lưu wishlist và lấy dữ liệu từ localStorage khi khởi tạo 1
    const [wishlist, setWishlist] = useState(() => {
        const savedWishlist = localStorage.getItem('wishlist');
        return savedWishlist ? JSON.parse(savedWishlist) : [];
    });

    const [isInWishlist, setIsInWishlist] = useState(wishlist.includes(id));
    const [isYourCart, setIsYourCart] = useState(false);

    // Hàm lưu mảng vào localStorage 2
    const saveToLocalStorage = (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    };

    // useEffect để lưu wishlist vào localStorage khi nó thay đổi
    useEffect(() => {
        CheckLoginUser();
        saveToLocalStorage('wishlist', wishlist);
        
    }, [wishlist]);

    useEffect(() => {
        const productInCart = cart.some(cartItem => cartItem.product_id === id);
        setIsYourCart(productInCart);
    }, [cart, id]);

    useEffect(() => {
        getAllCarts();
    }, []);

    // Hàm thêm sản phẩm vào wishlist 3
    const handleAddWishlist = (productID) => {
        if(loginUser){
            setWishlist((prevWishlist) => {
                // Kiểm tra xem sản phẩm đã tồn tại trong wishlist chưa
                if (prevWishlist.includes(productID)) {
                    // Nếu đã tồn tại, xóa sản phẩm khỏi wishlist
                    const newWishlist = prevWishlist.filter(item => item !== productID);
                    setIsInWishlist(false);
                    return newWishlist;
                }
                // Nếu chưa tồn tại, thêm sản phẩm vào wishlist
                setIsInWishlist(true);
                return [...prevWishlist, productID];
            });
        }else {
            window.location.href = ('/login');
        }
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            window.location.reload();
        }, 1000);
    };
    

    // Hàm thêm sản phẩm vào your cart 3
    const handleAddYourCart = (productID) => {
        const cartItem = cart.find(cartItem => cartItem.product_id === productID);
        if (isYourCart) {
            removeCart(cartItem.id);
        } else {
            createCart(productID);
        }             
    };

    // show product details
    const handleShowProductDetails = () => {
        setOpenDialog(!openDialog);
    }

    // check loginuser
    const CheckLoginUser = () => {
        const logged = JSON.parse(localStorage.getItem('logged'));
        if (logged) {
            setLoginUser(true);
            return true;
        }else {
            setLoginUser(false);
            return false;
        }   
    }


    return (
        <Card sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <CardMedia
                sx={{ height: '200px', objectFit: 'cover' }}
                image={image}
                title={`image ${name}`}
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography 
                    gutterBottom 
                    variant="h5" 
                    component="div" 
                    sx={{ 
                        textAlign: 'center', 
                        overflow: 'hidden', 
                        textOverflow: 'ellipsis', 
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        whiteSpace: 'normal',
                        maxHeight: '100px', // Thêm maxHeight thay vì height
                    }}
                >
                    {name}
                </Typography>
                <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ 
                        textAlign: 'center', 
                        overflow: 'hidden', 
                        textOverflow: 'ellipsis', 
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        whiteSpace: 'normal',
                        maxHeight: '100px', // Thêm maxHeight thay vì height
                    }}
                >
                    {shortDescription}
                </Typography>
                
                <Typography variant="h5" sx={{ textAlign: 'center', mt: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', color: 'red', fontWeight: 'bold', my: 2 }}>
                        __
                    </Typography>
                    {price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                </Typography>
            </CardContent>

            <CardActions sx={{ display: 'flex', justifyContent: 'space-between', px: 2 }}>
                <Tooltip title={isInWishlist ? "Remove to favorite collections" : "Add to favorite collections"} >
                    <Button size="small" sx={{ width: '50%', ":hover": { color: 'red' } }}
                        onClick={() => handleAddWishlist(id)}
                    >
                        {isInWishlist ? (
                            <FavoriteIcon sx={{ fontSize: '35px', height: '100%', color: 'red', ":hover": { color: 'red' }} } />
                        ) : (
                            <FavoriteBorderIcon sx={{ fontSize: '35px', height: '100%', color: 'black', ":hover": { color: 'red' }} } />
                        )}
                        {/* <FavoriteBorderIcon sx={{ fontSize: '35px', height: '100%', color: 'black', ":hover": { color: 'red' } }} /> */}
                    </Button>
                </Tooltip>
                <Tooltip title={isYourCart ? "Remove to cart" : "Add to cart"}>
                    <Button size="small" sx={{ width: '50%', ":hover": { color: 'red' } }}
                        onClick={() => handleAddYourCart(id)}
                    >
                        {isYourCart ? (
                            <RemoveShoppingCartOutlinedIcon sx={{ fontSize: '35px', height: '100%', color: 'black', ":hover": { color: 'red' } }} />
                        ) : (
                            <AddShoppingCartIcon sx={{ fontSize: '35px', height: '100%', color: 'black', ":hover": { color: 'red' } }} />
                        )}
                    </Button>
                </Tooltip>
                <Tooltip title="Show product details">
                    <Button size="small" sx={{ width: '50%', ":hover": { color: 'red' } }}
                        onClick={() => handleShowProductDetails()}
                    >
                        <VisibilityIcon sx={{ fontSize: '35px', height: '100%', color: 'black', ":hover": { color: 'red' } }} />
                    </Button>
                </Tooltip>
            </CardActions>

            {/* other */}
            <Loading open={loading} />
            <ProductDetails open={openDialog} onClose={() => setOpenDialog(!openDialog)} id={id} name={name}>
                <Box sx={{my: 5, display: 'flex', justifyContent: 'center'}}>
                    <Typography variant="h4" sx={{color: 'black', fontWeight: 'bold', mt: 2}}>{name}</Typography>
                    <Button 
                        sx={{position: 'absolute', width: '60px', height: '63px', borderRadius: '50%', border: '1px solid black', right: {md: 40, xs: 12}, top: {md: 30, xs: 10}}}
                        onClick={() => setOpenDialog(!openDialog)}
                    >
                        <CloseIcon sx={{fontSize: '40px', color: 'red', fontWeight: 'bold'}} />
                    </Button>
                </Box>
            </ProductDetails>
        </Card>
    );
}

export default Product;
