import { Box, Link, Typography } from "@mui/material";

function ErrorPay() {
    return ( 
        <Box sx={{textAlign: 'center'}}>
            <Box sx={{mt: 5}}>
                <Typography sx={{color: 'gray', fontWeight: 'bold'}}>Payment failed</Typography>
                <Link href='/' sx={{color: 'red'}}>Go to home page</Link>
            </Box>
        </Box>
     );
}

export default ErrorPay;