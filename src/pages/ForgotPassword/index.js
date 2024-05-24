
import { useState } from "react";
import { Backdrop, Box, Button, CircularProgress, Container, TextField, Typography } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';


function ForgotPassword() {

    // ui template
    const [openBackdrop, setOpenBackdrop] = useState(false);

    // variable actors
    const [email, setEmail] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);

    const checkValidEmail = () => {
        // check email
        // Kiểm tra null hoặc chuỗi rỗng
        if (email === '' || email === null) {
            setErrorEmail('Email is null or empty');
            console.log('Email is null or empty');
            return;
        }
        // Kiểm tra email hợp lệ
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setErrorEmail('Invalid email format');
            console.log('Invalid email format');
            return;
        }
        setErrorEmail('');
        setValidEmail(true);
    }

    const handleClickForgotPassword = () => {
        setOpenBackdrop(true);

        setTimeout( () => {
            setOpenBackdrop(false);

            //
            checkValidEmail();
        }, 2000);
    }

    const handleClickToLogin = () => {
        setOpenBackdrop(true);
        
        setTimeout( () => {
            setOpenBackdrop(false);

            //
            window.location.href = ('/login');
        }, 2000);
    }

    return ( 
        <Box sx={{ my: 25, display: 'flex', justifyContent: 'center' }}>
            <Box sx={{width: '600px', display: 'block', justifyContent: 'center'}}>
                <Container sx={{textAlign: 'center'}}>
                    <Typography variant="h3" sx={{fontWeight: 'bold'}}>FORGOT YOUR PASSWORD?</Typography>
                    <Typography variant="h6" sx={{my: 2}}>Please enter your email address to reset your password.</Typography>
                    <Typography sx={{color: 'red', mt: 3}}>__</Typography>
                </Container>
                <Box sx={{mt: 10, display: 'flex', justifyContent: 'center'}}>
                    <form>
                        <Box sx={{width: '500px'}}>
                            <Box sx={{width: '100%', mb: 10}}>
                                <label style={{fontWeight: 'bold'}}>YOUR EMAIL ADDRESS
                                    <span><CheckIcon sx={{fontSize: '18px', ml: 2, color: 'green', display: validEmail ? 'inline' : 'none' }} /></span>
                                </label>
                                <TextField
                                    //id="standard-multiline-flexible"
                                    //label="Multiline"
                                    placeholder="Email address"
                                    multiline
                                    maxRows={4}
                                    variant="standard"
                                    sx={{width: '100%', pt: 2}}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <label style={{fontStyle: 'italic', color: 'red'}}>{errorEmail}</label>
                            </Box>

                            <Box sx={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                                <Box sx={{width: '100%', display: 'grid', placeContent: 'center'}}>
                                    <Button 
                                        onClick={handleClickForgotPassword}
                                        underline="none"
                                        sx={{
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
                                    >
                                        <Typography sx={{color: 'while', width: '300px', textAlign: 'center'}}>SEND</Typography>
                                    </Button>
                                    <Button
                                        onClick={handleClickToLogin}
                                        underline="none"
                                        sx={{
                                            mt: 2,
                                            cursor: 'pointer',
                                            display: 'inline-block',
                                            padding: '0.9rem 1.8rem',
                                            fontSize: '16px',
                                            fontWeight: 700,
                                            color: 'white',
                                            border: '1px solid black',
                                            position: 'relative',
                                            backgroundColor: 'transparent',
                                            overflow: 'hidden',
                                            zIndex: 1,
                                            fontFamily: 'inherit',
                                            "::before": {content: '""', position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', backgroundColor: 'rgba(22, 24, 35, 0.09)', transform: 'translateX(-100%)', transition: 'all .3s', zIndex: -1},
                                            ":hover": {"::before": {transform: 'translateX(0)'}}
                                        }}                                        
                                    >
                                        <Typography sx={{color: 'black', width: '300px', textAlign: 'center'}}>LOGIN</Typography>
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </form>
                </Box>
            </Box>

            {/* backdrop */}
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openBackdrop}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Box>
     );
}

export default ForgotPassword;