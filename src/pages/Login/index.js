
import axios from "axios";
//import jwt_decode from 'jsonwebtoken';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from "react";
import { Box, Container, InputAdornment, TextField, Typography, IconButton, Input, Link, Button, Backdrop, CircularProgress } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CheckIcon from '@mui/icons-material/Check';
import Loading from "~/components/containers/Loading";

function Login() {

    // @ localhost:9090/api/v1/swagger-ui
    const [loginUser, setLoginUser] = useState(false);

    // error
    const [generalError, setGeneralError] = useState('');

    // ui template
    const [showPassword, setShowPassword] = useState(false);
    const [openBackdrop, setOpenBackdrop] = useState(false);

    // variable actors
    const [email, setEmail] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);

    const [password, setPassword] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);

    const checkNullValue = () => {
        // check email
        // Kiểm tra null hoặc chuỗi rỗng
        if (email === '' || email === null) {
            setErrorEmail('Email is null or empty');
            console.log('Email is null or empty');
            return false;
        }
        // Kiểm tra email hợp lệ
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setErrorEmail('Invalid email format');
            console.log('Invalid email format');
            return false;
        }
        setErrorEmail('');
        setValidEmail(true);

        // check password
        if (password === '' || password === null) {
            setErrorPassword('Password is null or empty');
            console.log('Password is null or empty');
            return false;
        }
        // Kiểm tra độ dài password
        if (password.length < 6) {
            setErrorPassword('Password must be at least 6 characters long');
            console.log('Password must be at least 6 characters long');
            return false;
        }
        // Kiểm tra password có ít nhất một chữ hoa, một con số, một kí tự đặc biệt
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
        if (!passwordRegex.test(password)) {
            setErrorPassword('Password must contain at least one uppercase letter, one digit, and one special character');
            console.log('Password must contain at least one uppercase letter, one digit, and one special character');
            return false;
        }

        setErrorPassword('');
        setValidPassword(true);

        // Nếu tất cả điều kiện đều thỏa mãn
        console.log('Validation successful');
        return true;
    }

    // Hàm lưu mảng vào localStorage 2
    const addAccountToLocalStorage = (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    };
    // Hàm xóa mảng vào localStorage 2
    const removeAccountFromLocalStorage = (key) => {
        localStorage.removeItem(key);
    };    

    // mã hóa 
    const decodedJwt = (jwt) => {
        const token = jwt;
        // Giải mã JWT
        //const decodedToken = jwt_decode.decode(token, { complete: true, json: true });
        const decodedToken = jwtDecode(token);
        return decodedToken;
    }
    // check roles
    const checkRoles = (jwt) => {
        let authority = null;
        try {
            // Giải mã JWT
            const decodedToken = jwtDecode(jwt);
            authority = decodedToken.roles[0].authority;
            // save jwt to local storage
            addAccountToLocalStorage("jwt", jwt);
            addAccountToLocalStorage("role", authority);
            // save information user to local storage
            addAccountToLocalStorage("user", decodedToken);
            getRedirectPath(authority);
        } catch (e) {
            console.error('Token không hợp lệ', e);
        }
    }
    // chuyển hướng page theo roles
    const getRedirectPath = (authority) => {
        switch (authority) {
          case 'CUSTOMER': {
            addAccountToLocalStorage("logged", true);
            return window.location.href = ('/profile');
          }
            
          case 'ADMIN':
          case 'WAREHOUSE_STAFFS':
          case 'SELLER':
            return window.location.href = ('/dashboard');
          default:
            return '/login'; // Hoặc trang khác nếu không xác định được vai trò
        }
    };

    // api login
    const handleSubmit = async () => {
        //e.preventDefault();
        try {
            const response = await axios.post('http://localhost:9090/api/v1/login', {
                email,
                password,
            }, {
                headers: {
                'Content-Type': 'application/json',
                }
            });
            // Xử lý phản hồi thành công từ server
            console.log("Response: ", response.data.access_token);
            // Cập nhật trạng thái người dùng nếu cần
            //setUser(response.data);
            //decodedJwt(response.data.access_token);
            console.log(decodedJwt(response.data.access_token));
            checkRoles(response.data.access_token);
        } catch (error) {
            // Xử lý lỗi
            if (error.response) {
                if (error.response.status === 406) {
                    setErrorEmail(error.response.data.errors);
                  console.error('Error 406:', error.response.data.errors);
                } else {
                  console.error('Error response:', error.response.data);
                }
                const errors = error.response.data.errors;
                // Cập nhật trạng thái lỗi
                if (errors) {
                  setGeneralError(errors.join(', '));
                } else {
                  setGeneralError('An unknown error occurred.');
                }
            } else {
                console.error('Error message:', error.message);
                setGeneralError('An unknown error occurred.');
                window.location.href = ('/error');
            }
        }
    };

    const handleClickLogin = () => {
        setOpenBackdrop(true);

        setTimeout( () => {
            setOpenBackdrop(false);
            //
            if(checkNullValue()){
                handleSubmit();
            }
            //addAccountToLocalStorage("logged", true);
        }, 2000);
        // console.log(email);
        // console.log(password);
    }

    const handleClickRegister = () => {
       setOpenBackdrop(true); 

       setTimeout( () => {
        setOpenBackdrop(false);
        // chuyển hướng trang web sang /register
        window.location.href = ('/register');
       }, 2000);   
    }

    const handleClickForgotPassword = () => {
        setOpenBackdrop(true); 
 
        setTimeout( () => {
         setOpenBackdrop(false);
         // chuyển hướng trang web sang /register
         window.location.href = ('/forgot-password');
        }, 2000);   
     }


    // ui template
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    };

    // const handleLogout = () => {
    //     setOpenBackdrop(true);

    //     setTimeout( () => {

    //         removeAccountFromLocalStorage("logged");
    //         removeAccountFromLocalStorage("user");
    //         removeAccountFromLocalStorage("jwt");
    //         removeAccountFromLocalStorage("role");
    //         setLoginUser(false);

    //         setOpenBackdrop(false);
    //     }, 2000);
    // }

    useEffect(() => {
        const logged = JSON.parse(localStorage.getItem('logged'));
        if (logged) {
            setLoginUser(true);
        }else {
            setLoginUser(false);
        }
        if(loginUser){
            return window.location.href = ('/profile');
        }
    }, []);


    return ( 
        <Box sx={{ my: 25, display: 'flex', justifyContent: 'center' }}>
            <Box sx={{width: '520px', display: 'block', justifyContent: 'center'}}>
                    <Container sx={{textAlign: 'center'}}>
                        <Typography variant="h4" sx={{fontWeight: 'bold'}}>LOGIN TO ONMART THE SUPER MARKET</Typography>
                        <Typography variant="h6" sx={{my: 2}}>Access your Super Market account.</Typography>
                        <Typography sx={{color: 'red', mt: 3}}>__</Typography>
                    </Container>
                    <Box sx={{mt: 10, display: 'flex', justifyContent: 'center'}}>
                        <form>
                            <Box sx={{width: '500px'}}>
                                <Box sx={{width: '100%', mb: 2}}>
                                    <label style={{fontWeight: 'bold'}}>EMAIL ADDRESS
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
                                    <label style={{fontStyle: 'italic', color: 'red'}}>{errorEmail}{generalError}</label>
                                </Box>
                                <Box>
                                    <label style={{fontWeight: 'bold'}}>PASSWORD
                                        <span><CheckIcon sx={{fontSize: '18px', ml: 2, color: 'green', display: validPassword ? 'inline' : 'none' }} /></span>    
                                    </label>
                                    <Input
                                        id="standard-adornment-password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="*********"
                                        endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                        }
                                        sx={{width: '100%', pt: 2}}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <label style={{fontStyle: 'italic', color: 'red'}}>{errorPassword}</label>
                                </Box>
                                <Box sx={{width: '100%', mt: 3, mb: 5}}>
                                    <Link onClick={handleClickForgotPassword} sx={{textAlign: 'right', cursor: 'pointer'}}>
                                        <Typography sx={{fontStyle: 'italic'}}>I FORGOT MY PASSWORD</Typography>
                                    </Link>
                                </Box>
                                <Box sx={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                                    <Box sx={{width: '100%', display: 'grid', placeContent: 'center'}}>
                                        <Button 
                                            onClick={handleClickLogin}
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
                                            <Typography sx={{color: 'while', width: '300px', textAlign: 'center'}}>LOGIN</Typography>
                                        </Button>
                                        <Button
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
                                            onClick={handleClickRegister}
                                        >
                                            <Typography sx={{color: 'black', width: '300px', textAlign: 'center'}}>CREATE ACCOUNT</Typography>
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
                        </form>
                    </Box>
                </Box>
            {/* backdrop */}
            <Loading open={openBackdrop} />
        </Box>
     );
}

export default Login;