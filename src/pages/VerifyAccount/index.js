
import { Alert, Box, Button, Container, Link, Typography } from "@mui/material";


function VerifyAccount({...props}) {


    return ( 
        <Box sx={{width: '600px', mx: 'auto', my: 20}}>
            <Container sx={{display: 'flex', justifyContent: 'center', backgroundColor: 'white', px: 20}}>
                <Box sx={{}}>
                    <Typography variant="h6" component="h2" sx={{my: 5}}>
                        <Alert severity="success">Your account has been successfully activated!</Alert>
                        Please go to the login page to log in to your account again!
                    </Typography>
                    <Box>
                        <Box sx={{display: 'flex', justifyContent: 'flex-end', my: 2}}>
                            <Button variant="outlined"><Link href="/login">Go to the login page</Link></Button>
                            <Button variant="outlined" sx={{mx: 1}}><Link href="/register">Return to the registration page</Link></Button>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
     );
}

export default VerifyAccount;