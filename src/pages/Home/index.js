
import { useState } from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";

import Loading from "~/components/containers/Loading";
import Images from "~/utils/Images";
import Category from "~/components/containers/Category";

// data
import DATA_CATEGORY from "~/utils/content/Category";

function Home() {

    const [openBackdrop, setOpenBackdrop] = useState(false);

    const handleClickToLogin = () => {
        setOpenBackdrop(true); 
 
        setTimeout( () => {
         setOpenBackdrop(false);
         // chuyển hướng trang web sang /login
         window.location.href = ('/login');
        }, 2000);   
     }

    return ( 
        <Box sx={{}}>
            <Box
                sx={{
                        width: '100%',
                        height: '90vh',
                        mt: 5,
                        position: 'relative',
                        display: 'flex',
                        justifyContent: 'center',
                        //alignContent: 'center',
                        //alignItems: 'center',
                        backgroundImage: `url(${Images.marketing})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover'
                }}
            >
                <Button 
                        onClick={handleClickToLogin}
                        underline="none"
                        sx={{
                            width: '300px',
                            height: '110px',
                            cursor: 'pointer',
                            top: 265,
                            mr: 4,
                            //display: 'inline-block',
                            //padding: '0.9rem 1.8rem',
                            //fontSize: '16px',
                            fontSize: '35px',
                            fontWeight: 700,
                            color: 'white',
                            //border: '1px solid black',
                            position: 'absolute',
                            backgroundColor: 'transparent',
                            overflow: 'hidden',
                            zIndex: 1,
                            fontFamily: 'inherit',
                            //"::before": {content: '""', position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', backgroundColor: 'grey', transform: 'translateX(-100%)', transition: 'all .3s', zIndex: -1},
                            //":hover": {"::before": {transform: 'translateX(0)'}}
                        }}
                    >
                        <Typography variant="h4" sx={{color: 'while', width: '300px', textAlign: 'center'}}>Start Now</Typography>
                </Button>
            </Box>
            
            {/* Category */}
            <Container sx={{ my: 5, display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
                <Typography variant="h3" sx={{alignItems: 'center'}}>Our product classification</Typography>
            </Container>
            
            <Box sx={{backgroundColor: 'white', mx: 2}}>
                <Grid container spacing={2}>
                    {DATA_CATEGORY.map( (data, i) => {
                      
                      return <Grid item xs={12} md={3} key={i}>
                            <Category title={data.name} image={data.ctg_img_src} catID={data.id}/>
                        </Grid>
                    } )}
                </Grid>
            </Box>
            {/* end Category */}

            {/* loading */}
            <Loading open={openBackdrop} />
            {/* end loading */}
        </Box>
     );
}

export default Home;