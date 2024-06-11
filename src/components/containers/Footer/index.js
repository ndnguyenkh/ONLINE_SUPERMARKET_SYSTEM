
import { Box, Container, Typography, Divider, Link } from "@mui/material";

import Image from "~/components/Image";
import Images from "~/utils/Images"
import Colors from "~/utils/Colors";
import contentFooter from "~/utils/content/Footer";


function Footer() {
    return ( 
        <Box sx={{background: Colors.backgroundFooter}}>
            <Container sx={{py: 5}}>
                <Box sx={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                    <Image src={Images.logoNoBackground} alt={"logo footer"} style={{width: '200px', height: '200px'}} />
                </Box>
                <Box sx={{width: '100%', textAlign: 'center'}}>
                    <Container sx={{display: {md: 'flex', xs: 'block'}, justifyContent: 'center'}}>
                        {contentFooter.action.map( (data, index) => {
                        
                            return <Box key={index}>
                                <Link                                
                                    href="#" 
                                    underline="hover"  
                                    sx={{
                                        color: 'black',
                                        mx: '45px',
                                        fontWeight: 'bold',
                                        '&:hover': {
                                           color: 'white',
                                        },
                                    }}
                                > 
                                    <Typography sx={{mx: 2}}>{data.title}</Typography>
                                    <Divider orientation="vertical" flexItem sx={{color: 'black'}} />
                                </Link>
                            </Box>
                        })}
                    </Container>
                </Box>
                <Box sx={{width: '100%', textAlign: 'center', display: 'flex', justifyContent: 'center'}}>
                    <Container sx={{display: 'flex', justifyContent: 'center'}}>
                        {contentFooter.icon.map( (data, index) => {
                        
                            return <Box sx={{flexGrow: 1}} key={index}>
                                <Link                                    
                                    underline="none"
                                    sx={{color: 'black', cursor: 'pointer', ":hover": {color: 'blue'}}}
                                > 
                                    {data.icon}
                                </Link>
                            </Box>
                        })}
                    </Container>
                </Box>
                <Typography sx={{textAlign: 'center', mt: 3}}>© {new Date().getFullYear()} <br />OnMart Team Productions<br /> All Rights Reserved <br />© Copyright by OnMart </Typography>
            </Container>
        </Box>
     );
}

export default Footer;