import axios from 'axios';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Box, Button, Grid, IconButton, Input, InputAdornment, Link, Modal, TextField, Typography } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { UserAPI } from '~/apis';
import Loading from '~/components/containers/Loading';
import Address from './Address';
import Orders from './Orders';

function Profile() {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState([]);
    const jwt = JSON.parse(localStorage.getItem('jwt'));
    const role = JSON.parse(localStorage.getItem('role'));
    const logged = JSON.parse(localStorage.getItem('logged'));
    const [editor, setEditor] = useState(false);
    const [error, setError] = useState('');

    const [openModel, setOpenModel] = useState(false);
    const handleOpenModel = () => {
        setOpenModel(!openModel);
    };

    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    };
    const handleClickShowPassword2 = () => setShowPassword2((show) => !show);
    const handleMouseDownPassword2 = (e) => {
        e.preventDefault();
    };

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const getUser = async () => {
        setLoading(true);
        try {
            const response = await axios.get(UserAPI.getUser, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwt}`
                }
            });
            setUser(response.data);
            setFirstName(response.data.first_name);
            setLastName(response.data.last_name);
            setPhone(response.data.phone);
        } catch (err) {
            console.log("loading user: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    const editUser = async () => {
        if (checkValidValue()) {
            const data = {
                phone: phone,
                first_name: firstName,
                last_name: lastName
            };
            setLoading(true);
            try {
                const response = await axios.put(UserAPI.editUser, data, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${jwt}`
                    }
                });
                alert("Edit User Success!");
                getUser(); // Fetch updated user data
            } catch (err) {
                console.log("update user: " + err.message);
                setError("Failed to update user information. Please try again.");
            } finally {
                setLoading(false);
            }
        }
    };

    const changePassword = async () => {
        if (checkPassword()) {
            const data = {
                old_password: oldPassword,
                new_password: newPassword
            };
            setLoading(true);
            try {
                const response = await axios.post(UserAPI.changePassword, data, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${jwt}`
                    }
                });
                alert("Change Password Success!");
                setOpenModel(false); // Close modal after successful password change
                setOldPassword('');
                setNewPassword('');
            } catch (err) {
                console.log("Change Password: " + err.message);
                setError("Failed to change password. Please try again.");
            } finally {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        if(logged) {

        } else {
            window.location.href = ('/loginn');
        }
        getUser();
    }, []);

    const checkValidValue = () => {
        if (firstName === '' || firstName === null) {
            setError("First Name is required!");
            return false;
        }
        setError('');
        if (lastName === '' || lastName === null) {
            setError("Last Name is required!");
            return false;
        }
        setError('');
        if (phone === '' || phone === null) {
            setError("Phone is required!");
            return false;
        }
        setError('');
        const phoneRegex = /^(\+\d{2})?(\s?\d{3}|\(\+\d{2}\)\s?\d{3})(\s?\d{3}){2}$/;
        if (!phoneRegex.test(phone)) {
            setError('Invalid phone format');
            return false;
        }
        setError('');
        return true;
    };

    const checkPassword = () => {
        if (newPassword === '' || newPassword === null) {
            setError('Password is null or empty');
            return false;
        }
        setError('');
        if (newPassword.length < 6) {
            setError('Password must be at least 6 characters long');
            return false;
        }
        setError('');
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
        if (!passwordRegex.test(newPassword)) {
            setError('Password must contain at least one uppercase letter, one digit, and one special character');
            return false;
        }
        setError('');
        return true;
    };

    // Hàm xóa mảng vào localStorage 2
    const removeAccountFromLocalStorage = (key) => {
        localStorage.removeItem(key);
    };    

    const handleLogout = () => {
        setLoading(true);

        setTimeout( () => {

            removeAccountFromLocalStorage("logged");
            removeAccountFromLocalStorage("user");
            removeAccountFromLocalStorage("jwt");
            removeAccountFromLocalStorage("role");
            //setLoginUser(false);

            setLoading(false);
        }, 2000);
    }

    return (
        <Box>
            <Box sx={{ display: 'flex', mx: 40, mt: 10, justifyContent: 'center', border: '1px solid gray', borderRadius: '10px' }}>
                <Box sx={{ width: '100%' }}>
                    <Typography variant='h5' sx={{ color: 'gray', fontWeight: 'bold' }}>Your Profile</Typography>
                    <Grid container spacing={2} sx={{ width: '100%' }}>
                        <Grid item md={12}>
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant='h4'>{user.first_name + " " + user.last_name}</Typography>
                                <label style={{ color: 'red', fontStyle: 'italic' }}>{error}</label>
                            </Box>
                        </Grid>
                        <Grid item md={6}>
                            <Box sx={{ mx: 1 }}>
                                <TextField
                                    label="First Name" variant="standard" sx={{ width: '100%' }}
                                    disabled={!editor}
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </Box>
                        </Grid>
                        <Grid item md={6}>
                            <Box sx={{ mx: 1 }}>
                                <TextField
                                    label="Last Name" variant="standard" sx={{ width: '100%' }}
                                    disabled={!editor}
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </Box>
                        </Grid>
                        <Grid item md={6}>
                            <Box sx={{ mx: 1 }}>
                                <TextField
                                    label=" " variant="standard" sx={{ width: '100%' }}
                                    disabled={true}
                                    value={user.email}
                                />
                            </Box>
                        </Grid>
                        <Grid item md={6}>
                            <Box sx={{ mx: 1 }}>
                                <TextField
                                    label="Phone" variant="standard" sx={{ width: '100%' }}
                                    disabled={!editor}
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </Box>
                        </Grid>
                        <Grid item md={6}>
                            <Box sx={{ mx: 1 }}>
                                <TextField
                                    label="Role" variant="standard" sx={{ width: '100%' }}
                                    disabled={true}
                                    value={role}
                                />
                            </Box>
                        </Grid>
                        <Grid item md={6}>
                            <Box sx={{ mx: 1 }}>
                            </Box>
                        </Grid>
                        <Grid item md={6}>
                        </Grid>
                        <Grid item md={6}>
                            <Box sx={{ mx: 1, textAlign: 'right' }}>
                                <Button sx={{color: 'red'}} onClick={handleLogout}>Logout</Button>
                                <Button><Link href="/profile">Reload</Link></Button>
                                <Button onClick={() => setEditor(!editor)}>{editor ? "Cancel" : "Edit"}</Button>
                                <Button disabled={!editor} onClick={editUser}>Save</Button>
                                <Button onClick={handleOpenModel}>Change Password</Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Box>

            <Address />
            <Orders />
            <Loading open={loading} />
            <Modal
                open={openModel}
                onClose={handleOpenModel}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 3,
                    }}>
                    <Box>
                        <Typography variant="h6" component="h2">
                            Enter old password *
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
                                sx={{ width: '100%', pt: 2 }}
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                            />
                        </Typography>
                        <Typography sx={{ mt: 2 }} variant="h6" component="h2">
                            Enter new password *
                            <Input
                                id="standard-adornment-password"
                                type={showPassword2 ? 'text' : 'password'}
                                placeholder="*********"
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword2}
                                            onMouseDown={handleMouseDownPassword2}
                                        >
                                            {showPassword2 ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                sx={{ width: '100%', pt: 2 }}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </Typography>
                        <Typography sx={{ mt: 2 }} variant="h6" component="h2">
                            <label style={{ color: 'red', fontStyle: 'italic' }}>{error}</label>
                        </Typography>
                        <Box sx={{ textAlign: 'right', mt: 5 }}>
                            <Button onClick={changePassword}>Save Password</Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
}

export default Profile;
