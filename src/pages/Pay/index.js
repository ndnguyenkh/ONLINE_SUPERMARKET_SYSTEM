import { Box, Button, Link, Typography } from "@mui/material";


function PaySuccess() {
    return ( 
        <Box sx={{display: 'flex', justifyContent: 'center', my: 20}}>
            <Box sx={{textAlign: 'center'}}>
                <Typography variant="h3">
                    Thank you for purchasing from us!.
                </Typography>
                <Link href="/">Back to home page</Link>
            </Box>
        </Box>
    );
}

export default PaySuccess;