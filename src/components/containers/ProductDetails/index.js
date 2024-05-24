
import { useEffect, useState } from "react";
import { Box, Breadcrumbs, Button, Card, CardActions, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogTitle, Link, Tooltip, Typography } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartOutlinedIcon from '@mui/icons-material/RemoveShoppingCartOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

import DATA_PRODUCT from "~/utils/content/Product";
import Loading from "../Loading";

function ProductDetails({ children, id, name, ...props }) {

    // ui
    const [loading, setLoading] = useState(false);
    const [loginUser, setLoginUser] = useState(false);

    // Sử dụng state để lưu wishlist và lấy dữ liệu từ localStorage khi khởi tạo 1
    const [wishlist, setWishlist] = useState(() => {
        const savedWishlist = localStorage.getItem('wishlist');
        return savedWishlist ? JSON.parse(savedWishlist) : [];
    });

    // your card
    const [yourCart, setYourCart] = useState(() => {
        const savedYourCart = localStorage.getItem('yourCart');
        return savedYourCart ? JSON.parse(savedYourCart) : [];
    });

    const [isInWishlist, setIsInWishlist] = useState(wishlist.includes(id));
    const [isYourCart, setIsYourCart] = useState(yourCart.includes(id));


    // Hàm lưu mảng vào localStorage 2
    const saveToLocalStorage = (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    };

    // useEffect để lưu wishlist vào localStorage khi nó thay đổi
    useEffect(() => {
        CheckLoginUser();
        saveToLocalStorage('wishlist', wishlist);
        saveToLocalStorage('yourCart', yourCart);
    }, [wishlist, yourCart]);

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
        setYourCart((prevYourCart) => {
            // Kiểm tra xem sản phẩm đã tồn tại trong wishlist chưa
            if (prevYourCart.includes(productID)) {
                // Nếu đã tồn tại, xóa sản phẩm khỏi wishlist
                const newYourCart = prevYourCart.filter(item => item !== productID);
                setIsYourCart(false);
                return newYourCart;
            }
            // Nếu chưa tồn tại, thêm sản phẩm vào wishlist
            setIsYourCart(true);
            return [...prevYourCart, productID];
        });

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            window.location.reload();
        }, 1000);
    };

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
        <Dialog
        {...props}
        >
            <DialogTitle>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit">
                        Category
                    </Link>
                    <Link
                        underline="hover"
                        color="inherit"
                    >
                        Product
                    </Link>
                    <Typography color="text.primary">Product Details</Typography>
                </Breadcrumbs>
                {children}
            </DialogTitle>
            <DialogContent>
                {DATA_PRODUCT.map( (data, i) => {
                    if(data.id === id){
                        return <Card sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <CardMedia
                            sx={{ height: '200px', objectFit: 'cover' }}
                            image={data.img_src}
                            title={`image ${data.name}`}
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
                                {data.name}
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
                                {data.short_description}
                            </Typography>
                            
                            <Typography variant="h5" sx={{ textAlign: 'center', mt: 2 }}>
                                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', color: 'red', fontWeight: 'bold', my: 2 }}>
                                    __
                                </Typography>
                                {data.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
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
                        </CardActions>
                    </Card>
                    }
                    return null;
                })}

                <Box>
                    new update commingsoon
                </Box>
            </DialogContent>
            <DialogActions>
                {/* <Button 
                    //onClick={handleClose}
                >Disagree</Button> */}
                {/* <Button 
                    //onClick={handleClose}
                    autoFocus
                >
                    OK
                </Button> */}
            </DialogActions>

            {/* other */}
            <Loading open={loading} />
        </Dialog>
     );
}

export default ProductDetails;