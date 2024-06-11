
import { useEffect, useState } from "react";
import axios from "axios";
import { Alert, Box, Button, Checkbox, Container, FormControlLabel, Grid, IconButton, Input, InputAdornment, Link, Modal, TextField, Typography } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// file
import Loading from "~/components/containers/Loading";
// api
import { UserAPI } from "~/apis";


function Register() {

    // ui
    const [showPassword, setShowPassword] = useState(false);
    const [openBackdrop, setOpenBackdrop] = useState(false);
    const [verifyAccount, setVerifyAccount] = useState(false);

    //
    const [checked, setChecked] = useState(false);
    //

    // variable 
    const [first_name, setfirst_name] = useState('');
    const [errorfirst_name, setErrorfirst_name] = useState(''); 

    const [last_name, setlast_name] = useState('');
    const [errorlast_name, setErrorlast_name] = useState('');

    const [phone, setPhone] = useState('');
    const [errorPhone, setErrorPhone] = useState('');

    const [email, setEmail] = useState('');
    const [errorEmail, setErrorEmail] = useState('');

    const [password, setPassword] = useState('');
    const [errorPassword, setErrorPassword] = useState('');

    // error
    const [generalError, setGeneralError] = useState('');

    const DATA_INPUT = [
        {title: 'FIRST NAME', placeholder: 'Enter First Name', onChange: (e) => setfirst_name(e.target.value), error: errorfirst_name},
        {title: 'LAST NAME', placeholder: 'Enter Last Name', onChange: (e) => setlast_name(e.target.value), error: errorlast_name},
        {title: 'EMAIL ADDRESS', placeholder: 'Email address', onChange: (e) => setEmail(e.target.value), error: errorEmail},
        {title: 'PHONE', placeholder: '(+84) 123 345 789', onChange: (e) => setPhone(e.target.value), error: errorPhone},
    ];

    const checkValidValue = () => {

        // check name
        if (first_name === '' || first_name === null) {
            setErrorfirst_name('First Name is null or empty');
            console.log('First Name is null or empty');
            return false;
        }

        setErrorfirst_name('');

        if (last_name === '' || last_name === null) {
            setErrorlast_name('Last Name is null or empty');
            console.log('Last Name is null or empty');
            return false;
        }

        setErrorlast_name('');

        // check email
        // Kiểm tra null hoặc chuỗi rỗng
        if (email === '' || email === null) {
            setErrorEmail('Email is null or empty');
            console.log('Email is null or empty');
            return false;
        }
        // Kiểm tra email hợp lệ
        //const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        if (!emailRegex.test(email)) {
            setErrorEmail('Invalid email format');
            console.log('Invalid email format');
            return false;
        }
        setErrorEmail('');

        // check phone
        if (phone === '' || phone === null) {
            setErrorPhone('Phone is null or empty');
            console.log('Phone is null or empty');
            // Thực hiện các hành động khác tùy thuộc vào trường hợp của bạn, ví dụ: hiển thị thông báo lỗi
            return false;
        }
        
          // Kiểm tra đúng định dạng của phone
        const phoneRegex = /^(\+\d{2})?(\s?\d{3}|\(\+\d{2}\)\s?\d{3})(\s?\d{3}){2}$/;
        if (!phoneRegex.test(phone)) {
            setErrorPhone('Invalid phone format');
            console.log('Invalid phone format');
            // Thực hiện các hành động khác tùy thuộc vào trường hợp của bạn, ví dụ: hiển thị thông báo lỗi
            return false;
        }
       
        setErrorPhone('');

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
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&+#])[A-Za-z\d@$!%*?&+#]{6,}$/;
        if (!passwordRegex.test(password)) {
            setErrorPassword('Password must contain at least one uppercase letter, one digit, and one special character');
            console.log('Password must contain at least one uppercase letter, one digit, and one special character');
            return false;
        }

        setErrorPassword('');

        // Nếu tất cả điều kiện đều thỏa mãn
        console.log('Validation successful');
        return true;
    }

    const handleSubmit = async () => {
        //e.preventDefault();
        try {
            const response = await axios.post('http://localhost:9090/api/v1/register', {
                first_name,
                last_name,
                phone,
                email,
                password,
            }, {
                headers: {
                'Content-Type': 'application/json',
                }
            });
            // Xử lý phản hồi thành công từ server
            console.log("Response: ", response.data);
            // Cập nhật trạng thái người dùng nếu cần
            //setUser(response.data);
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
            }
        }
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     const user = {first_name, last_name, email, phone, password};
    //     fetch(UserAPI.register, {
    //         method: "POST",
    //         headers: {"Content-Type":"application/json"},
    //         body: JSON.stringify(user),
    //     }).then( (e) => {
    //         console.log("Response: ", e.status);
    //     })
    // }

    const handleCreateAccount = (e) => {
        setOpenBackdrop(true);
        setTimeout( () => {  
            
            if(!checkValidValue()){
                setOpenBackdrop(false);
                return;
            }
            
            handleSubmit(e);
            setVerifyAccount(!verifyAccount);
            //
            setOpenBackdrop(false);
            //
        }, 2000);
    }

    // ui template
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    };

    const handleChangeChecked = () => {   
        setChecked(!checked);
    };

    const handleCloseModel = () => {
        setVerifyAccount(!verifyAccount);
    }

    return ( 
        <Box sx={{ my: 25, display: 'flex', justifyContent: 'center' }}>
            <Box sx={{display: 'block', justifyContent: 'center'}}>
                <Container sx={{textAlign: 'center'}}>
                    <Typography variant="h3" sx={{fontWeight: 'bold'}}>CREATE A ONMART ACCOUNT</Typography>
                    <Typography variant="h6" sx={{my: 2, px: 28}}>
                        Create your account to manage your profile, track your orders and more. 
                        Once it is set up, 
                        you will also be able to register your product and join OnMartista - The Shoppers Club.
                    </Typography>
                    <Typography sx={{color: 'red', mt: 3}}>__</Typography>
                </Container>
                <Box sx={{width: '800px', mx: 'auto', mt: 10, mb: 3}}>
                    <label style={{fontWeight: 'bold'}}>GENERAL INFORMATION</label>
                </Box>
                {/* form input */}
                <Box sx={{display: 'flex', justifyContent: 'center'}}>
                    <Grid container spacing={2} sx={{width: '800px',}}>
                        {DATA_INPUT.map( (data, index) => {
                            return <Grid item xs={6} key={index}>
                                <Box sx={{width: '100%', mb: 2}}>
                                    <label style={{fontWeight: 350}}>{data.title}<span style={{marginLeft: 5, color: 'red'}}>*</span></label>
                                    <TextField
                                        placeholder={data.placeholder}
                                        multiline
                                        maxRows={4}
                                        variant="standard"
                                        sx={{width: '100%', pt: 2}}
                                        onChange={data.onChange}
                                    />
                                    <label style={{fontStyle: 'italic', color: 'red'}}>{data.error}</label>
                                </Box>
                            </Grid>
                        })}
                        <Grid item xs={6}>
                            <Box>
                                <label style={{fontWeight: '350'}}>PASSWORD
                                    <span style={{marginLeft: 5, color: 'red'}}>*</span>    
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
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{width: '800px', mx: 'auto', mt: 10, mb: 2}}>
                    <label style={{fontWeight: 'bold'}}>COMMUNICATION PREFERENCES</label>                
                </Box>
                {/* check box */}
                <Box sx={{width: '800px', mx: 'auto', mt: 3, mb: 2}}>
                    <FormControlLabel 
                        control={
                            <Checkbox checked={checked} onClick={handleChangeChecked} sx={{'& .MuiSvgIcon-root': { fontSize: 38 }, color: 'red', '&.Mui-checked': {color: 'red'} }} />
                        } 
                        sx={{color: 'gray'}}
                        label="I would like to receive marketing communications from ONMART or ONMART'S relevant local entity, 
                        including information about products, offers, events, activities or services." 
                    />
                </Box>
                <Box sx={{width: '800px', mx: 'auto', mt: 3, mb: 2, color: 'gray'}}>
                    <label>
                        Please read our OnMart Privacy Policy to find all information about the processing of your personal data and how to exercise your rights. 
                        You can revoke any of your consent at any time by sending an email at mydata@onmart.com.
                    </label>
                </Box>
                {/* đọc thêm */}
                <Box sx={{width: '800px',  mx: 'auto', mt: 2, mb: 5}}>
                    <Link sx={{textAlign: 'right', cursor: 'pointer'}}>
                        <Typography sx={{fontStyle: 'italic'}}>Read Privacy Policy.</Typography>
                    </Link>
                </Box>
                {/* button */}
                <Box sx={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                    <Box sx={{width: '100%', display: 'grid', placeContent: 'center'}}>
                        <Button
                            disabled={!checked}
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
                            onClick={handleCreateAccount}
                        >
                            <Typography sx={{color: 'white', width: '300px', textAlign: 'center'}}>CREATE MY ACCOUNT</Typography>
                        </Button>
                    </Box>
                </Box>
            </Box>

            {/* backdrop */}
            <Loading open={openBackdrop} />

            {/* model account  */}
            <Modal
                open={verifyAccount}
                //onClose={}
                //sx={{borderRadius: '100px'}}
            >
                <Box sx={{width: '600px', height: '600px', mx: 'auto', my: 25}}>
                    <Container sx={{display: 'flex', justifyContent: 'center', backgroundColor: 'white', px: 20}}>
                        <Box sx={{}}>
                            <Typography variant="h6" component="h2" sx={{my: 5}}>
                                <Alert severity="success">Your account has been created successfully!</Alert>
                                Please check your Email again to activate your account.
                            </Typography>
                            <Box>
                                <Typography sx={{ my: 5 }}>
                                    You didn't receive the code?, please try again in at least a minute!
                                </Typography>
                                <Box sx={{display: 'flex', justifyContent: 'flex-end', my: 2}}>
                                    <Button variant="outlined">Resend the code</Button>
                                    <Button variant="outlined" sx={{mx: 1}} onClick={handleCloseModel}>OK</Button>
                                </Box>
                            </Box>
                        </Box>
                    </Container>
                </Box>
            </Modal>
        </Box>
     );
}

export default Register;