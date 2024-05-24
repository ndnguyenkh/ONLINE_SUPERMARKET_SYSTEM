
import { Box, Link, Typography } from "@mui/material";


function Profile() {
    return ( 
        <Box sx={{mx: 'auto', textAlign: 'center', my: 20}}>   
            <Typography variant="h5">Successful login!. Come back to the home page and enjoy OnMart</Typography>
            <Box sx={{my: 5}}>
                <Link href="/">Go to home page</Link>
            </Box>
        </Box>
     );
}

export default Profile;