
import { useEffect, useState } from "react";
import { Alert, Box, Button, Drawer, Grid, Link, Typography } from "@mui/material";

import Product from "../../Product";
import DATA_PRODUCT from "~/utils/content/Product";
import Loading from "../../Loading";


function DrawerCart({openDrawer, children, ...props}) {
    // ui
    const [loading, setLoading] = useState(false);
    const [loginUser, setLoginUser] = useState(false);

    const [yourCart, setYourCart] = useState([]);

    // Hàm lấy mảng từ localStorage
    const loadFromLocalStorage = (key) => {
        const savedYourCart = localStorage.getItem(key);
        if (savedYourCart) {
            return JSON.parse(savedYourCart);
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
        const storedYourCart = loadFromLocalStorage('yourCart');
        setYourCart(storedYourCart);
    }, [openDrawer]);

    const handlePay = () => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);

            if(loginUser){
                // chuyển hướng trang web sang /checkout
                window.location.href = ('/checkout');
            }else {
                // chuyển hướng trang web sang /checkout
                window.location.href = ('/login');
            }
        }, 2000);
    }

    return ( 
        <Drawer
            anchor='bottom'
            {...props}
        >
            <Box sx={{height: '100vh', mx: 5, mb: 20}}>
                {children}
                    {yourCart.length < 1 ? (
                        <Box sx={{textAlign: 'center', mx: 60, my: 5}}>
                            <Alert severity="warning"><Typography>Cart list is empty.</Typography></Alert>
                        </Box>
                    ) : (
                        <>
                            <Grid container spacing={2}>
                                {DATA_PRODUCT.filter(data => yourCart.includes(data.id)).map((data) => (
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
                            
                            <Box sx={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                                <Box sx={{width: '100%', display: 'grid', placeContent: 'center'}}>
                                    <Button
                                        //disabled={!checked}
                                        underline="none"
                                        sx={{
                                            mt: 10,
                                            cursor: 'pointer',
                                            display: 'inline-block',
                                            padding: '0.9rem 1.8rem',
                                            fontSize: '16px',
                                            fontWeight: 700,
                                            color: 'white',
                                            border: '1px solid black',
                                            position: 'relative',
                                            backgroundColor: 'black',
                                            overflow: 'hidden',
                                            zIndex: 1,
                                            fontFamily: 'inherit',
                                            "::before": {content: '""', position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', backgroundColor: 'grey', transform: 'translateX(-100%)', transition: 'all .3s', zIndex: -1},
                                            ":hover": {"::before": {transform: 'translateX(0)'}}
                                        }}
                                        onClick={handlePay}
                                    >
                                        <Typography sx={{color: 'white', width: '300px', textAlign: 'center'}}>Pay immediately</Typography>
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