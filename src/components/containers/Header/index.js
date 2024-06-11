
import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { AppBar, Box, Link, Button, Toolbar, Typography, Divider, Badge} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

import Image from "~/components/Image";
import Images from "~/utils/Images";
import { ContentHeader } from "~/utils/content";
import XSMenu from "./XSMenu";
import DrawerLike from "./DrawerLike";
import DrawerSearch from "./DrawerSearch";
import DrawerCart from "./DrawerCart";


function Header() {

    //const [logged, setLogged] = useState(false);
    const logged = JSON.parse(localStorage.getItem('logged'));

    const [wishlist, setWishlist] = useState(() => {
        const savedWishlist = localStorage.getItem('wishlist');
        return savedWishlist ? JSON.parse(savedWishlist) : [];
    });

    // your card
    const [yourCart, setYourCart] = useState([]);

    const [numberBadgeWishlist, setNumberBadgeWishlist] = useState(wishlist.length);
    // const [numberBadgeYourCart, setNumberBadgeYourCart] = useState(yourCart.length);

    const [openCart, setOpenCart] = useState(false);
    const [openListLike, setOpenListLike] = useState(false); // ds likes
    const [openMenu, setOpenMenu] = useState(false); // draw search

    function  handleOpenCart() {
        setOpenCart(!openCart);
    }

    function handleOpenMenu() {
        setOpenMenu(!openMenu); 
    }

    function handleOpenListLike() {
        setOpenListLike(!openListLike);
    }

    const ButtonAction = ({ index, children, ...props }) => {

        var onClick = null;
        if (index === 0) {
            onClick = handleOpenListLike;
        }
        if(index === 1) {
            onClick = handleOpenMenu;
        }
        if(index === 2) {
            onClick = handleOpenCart;
        }
        
        return  <Button
            //onClick={index === 1 ? handleOpenMenu : null }
            onClick={onClick}
            variant="text"
            sx={{ width: "80px", height: "100%", color: 'black', display: {xs: 'none', md: 'flex'}, alignItems: 'center' }}
            {...props}
        >
            {index === 1 ? (
                <>{children}</>
            ) : (
                <Fragment />
            )}
            <Badge color="error" badgeContent={index === 2 ? 0 : numberBadgeWishlist} sx={{display: index == 1 ? "none" : "block"}}>
                {children}
            </Badge>
        </Button> 
            
    }

    useEffect(() => {
        const savedWishlist = localStorage.getItem('wishlist');
        setWishlist(savedWishlist ? JSON.parse(savedWishlist) : []);
        setNumberBadgeWishlist(savedWishlist ? JSON.parse(savedWishlist).length : 0);
    }, []);

    return ( 
        <Box>
            <AppBar sx={{ backgroundColor: '#fff' }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between',  }}>

                    {/* xsmenu */}
                    <XSMenu />

                    {/* logo */}
                    <Box sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
                        <Divider orientation="vertical" flexItem sx={{display: {xs: 'none', md: 'flex'}}} />
                        <Image src={Images.logo} alt="logo" style={{ height: '80px', borderRadius: '50%', cursor: 'pointer' }} onClick={() => window.location.href = ('/')}/>
                        <Typography variant="h6" sx={{ color: 'black', fontWeight: 'bold', cursor: 'pointer' }}><Link href="/" underline="none" color={'black'}>{ContentHeader.contentLogo}</Link></Typography>
                    </Box>

                    {/* navigation */}
                    <Box sx={{ height: '100%', display: {xs: 'none', md: 'flex'}, alignItems: 'center' }}>
                        {ContentHeader.navbar.map(
                            (data, index) => {
                                return <Link 
                                    key={index}
                                    href={data.link} 
                                    underline="none" 
                                    sx={{color: 'black',
                                    mx: '45px',
                                    fontWeight: 'bold',
                                    // textDecoration: 'underline 2px red',
                                    textDecoration: 'none',
                                    position: 'relative',

                                    '&:hover': {
                                        backgroundImage: 'linear-gradient(to right, black 0%, black 100%)',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundSize: '100% 1px', // Độ dày của gạch chân
                                        backgroundPosition: '0 100%', // Vị trí bắt đầu của gạch chân
                                        transition: '0.2s',
                                    },
                                }}   
                                >{data.title}</Link>
                            }
                        )}                    
                    </Box>

                    {/* actions */}
                    <Box sx={{ height: '80px', display: 'flex', alignItems: 'center' }}>
                        {ContentHeader.actions.map(
                            (data, index) => {
                                return <React.Fragment key={index}>
                                    <Divider orientation="vertical" flexItem sx={{display: {xs: 'none', md: 'flex'}}} />
                                    <ButtonAction index={index}><Link sx={{display: 'flex', alignItems: 'center', color: 'black'}}>{data.icon}</Link></ButtonAction>
                                </React.Fragment>
                            }
                        )}
                        <Divider orientation="vertical" flexItem />
                        <Button sx={{ width: {xs: '80px', md: 'auto'}, height: "100%", color: 'black', fontWeight: 'bold' }}>
                            <Link href='/login' underline="none" sx={{display: 'flex', alignItems: 'center', color: 'black'}}>
                                <Typography variant="h7" sx={{display: {xs: 'none', md: 'flex'}}}>
                                    {logged ? ContentHeader.contentButtonAccount : <>Login</>}
                                </Typography>
                                {ContentHeader.contentButtonAccountIcon}
                            </Link>
                        </Button>

                        <Divider orientation="vertical" flexItem />
                    </Box>
                </Toolbar>
            </AppBar>

            {/* draw menu search */}
            <DrawerSearch open={openMenu} onClose={handleOpenMenu}>
                <Box color={'white'} sx={{my: 13, display: 'flex'}}>
                    <Button 
                        sx={{width: '80px', height: '80px', borderRadius: '50%', border: '2px solid white', mr: 0, ml: 'auto'}}
                        onClick={handleOpenMenu}
                    >
                        <CloseIcon sx={{fontSize: '40px', color: 'red'}} />
                    </Button>
                </Box>
            </DrawerSearch>

            {/* draw ds like */}
            <DrawerLike open={openListLike} onClose={handleOpenListLike} openDrawer={openListLike}>
                <Box sx={{my: 5, display: 'flex', justifyContent: 'center'}}>
                    <Typography variant="h2" sx={{color: 'black', fontWeight: 'bold', my: 2}}>Wishlist</Typography>
                    <Button 
                        sx={{position: 'absolute', width: '80px', height: '80px', borderRadius: '50%', border: '1px solid black', right: 100}}
                        onClick={handleOpenListLike}
                    >
                        <CloseIcon sx={{fontSize: '40px', color: 'red', fontWeight: 'bold'}} />
                    </Button>
                </Box>
            </DrawerLike>

            {/* draw cart */}
            <DrawerCart open={openCart} onClose={handleOpenCart} openDrawer={openCart}>
                <Box sx={{my: 5, display: 'flex', justifyContent: 'center'}}>
                    <Typography variant="h2" sx={{color: 'black', fontWeight: 'bold', my: 2}}>Your Cart</Typography>
                    <Button 
                        sx={{position: 'absolute', width: '80px', height: '80px', borderRadius: '50%', border: '1px solid black', right: 100}}
                        onClick={handleOpenCart}
                    >
                        <CloseIcon sx={{fontSize: '40px', color: 'red', fontWeight: 'bold'}} />
                    </Button>
                </Box>
            </DrawerCart>
        </Box>
     );
}

export default Header;