
import { useEffect, useState } from "react";
import { Alert, Box, Drawer, Grid, Link, Typography } from "@mui/material";

import Product from "../../Product";
import DATA_PRODUCT from "~/utils/content/Product";

function DrawerLike({openDrawer, children, ...props}) {

    const [loginUser, setLoginUser] = useState(false);

    const [wishlist, setWishlist] = useState([]);

    // Hàm lấy mảng từ localStorage
    const loadFromLocalStorage = (key) => {
        const savedWishlist = localStorage.getItem(key);
        if (savedWishlist) {
            return JSON.parse(savedWishlist);
        }
        return [];
    };

    useEffect(() => {
        const logged = JSON.parse(localStorage.getItem('logged'));
        if (logged) {
            setLoginUser(true);
        }else {
            setLoginUser(false);
        }
        const storedWishlist = loadFromLocalStorage('wishlist');
        setWishlist(storedWishlist);
    }, [openDrawer]);

    return ( 
        <Drawer
            anchor='bottom'
            {...props}
        >
            <Box sx={{height: '100vh', mx: 5, mb: 20}}>
                {children}
                {loginUser ? (
                    <Grid container spacing={2}>
                        {DATA_PRODUCT.filter(data => wishlist.includes(data.id)).map((data) => (
                            <Grid key={data.id} item xs={12} md={3} sx={{ display: 'flex' }}>
                                <Product
                                    id={data.id}
                                    name={data.name}
                                    image={data.img_src}
                                    price={data.price}
                                    shortDescription={data.short_description}
                                />
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Box sx={{height: '100vh', mx: 5, mb: 20, display: 'flex', justifyContent: 'center'}}>
                        <Box sx={{textAlign: 'center'}}>
                            <Alert severity="warning" sx={{mb: 5}}>
                                <Typography>Please log in to your account to view the products in your Wishlist!</Typography>
                            </Alert>
                            <Link href="/login" sx={{cursor: 'pointer'}}>Login Now</Link>
                        </Box>
                    </Box>
                )}
                
            </Box>
        </Drawer>
     );
}

export default DrawerLike;