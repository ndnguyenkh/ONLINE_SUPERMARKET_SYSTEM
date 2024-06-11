import { Box, Button, Grid, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import { UserAPI } from "~/apis";
import Loading from "~/components/containers/Loading";

function Address() {

    const [loading, setLoading] = useState(false);
    const jwt = JSON.parse(localStorage.getItem('jwt'));
    const [editor, setEditor] = useState(false);
    const [error, setError] = useState('');

    // address
    const [address, setAddress] = useState([]);
    const [id, setId] = useState();
    const [ward, setWard] = useState('');
    const [province, setProvince] = useState('');
    const [city, setCity] = useState('');
    const [specificAddress, setSpecificAddress] = useState('');

    // get address
    const getAddress = async () => {
        setLoading(true);
        try {
            const response = await axios.get(UserAPI.getAddress, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwt}`
                }
            });
            setAddress(response.data);
        } catch (err) {
            console.log("loading address: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    // edit address user
    const editAddressUser = async () => {
        if (checkValidValue()) {
            const data = {
                ward: ward,
                province: province,
                city: city,
                specific_address: specificAddress
            };
            setLoading(true);
            try {
                const response = await axios.put(`${UserAPI.editAddressUser}${id}`, data, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${jwt}`
                    }
                });
                alert("Edit Address Success!");
                getAddress(); // Fetch updated address list
            } catch (err) {
                alert("failed action! Please check and try again!");
                console.log("update Address: " + err.message);
            } finally {
                setLoading(false);
            }
        }
    };

    // create a new address
    const createAddressUser = async () => {
        if (checkValidValue()) {
            const data = {
                ward: ward,
                province: province,
                city: city,
                specific_address: specificAddress
            };
            setLoading(true);
            try {
                const response = await axios.post(UserAPI.createAddressUser, data, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${jwt}`
                    }
                });
                alert("Create Address Success!");
                getAddress(); // Fetch updated address list
            } catch (err) {
                alert("failed action! Please check and try again!");
                console.log("Create Address: " + err.message);
            } finally {
                setLoading(false);
            }
        }
    };

    // remove address user
    const removeAddressUser = async (id) => {
        setLoading(true);
        try {
            const response = await axios.delete(`${UserAPI.removeAddressUser}${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwt}`
                }
            });
            alert("Deleted Address Success!");
            setAddress(address.filter((addr) => addr.id !== id)); // Update address list
        } catch (err) {
            alert("failed action! Please check and try again!");
            console.log("Deleted Address: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    const setEdit = (addressData) => {
        setEditor(!editor); // Enable editor mode
        setId(addressData.id);
        setWard(addressData.ward);
        setProvince(addressData.province);
        setCity(addressData.city); // Nếu city có trong phản hồi
        setSpecificAddress(addressData.specific_address);    
    };

    // set default
    const setDefault = async (id) => {
        setLoading(true);
        try {
            await axios.put(`http://localhost:9090/api/v1/account/addresses/${id}/default`, {} ,{
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwt}`
                }
            })
            getAddress();
            alert("Success!");
        } catch (err) {
            alert("failed action! Please check and try again!");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAddress();
    }, []);

    const checkValidValue = () => {
        if (ward === '' || ward === null) {
            setError("Ward is required!");
            return false;
        }
        setError('');
        if (province === '' || province === null) {
            setError("province is required!");
            return false;
        }
        setError('');
        if (city === '' || city === null) {
            setError("city is required!");
            return false;
        }
        setError('');
        if (specificAddress === '' || specificAddress === null) {
            setError("specificAddress is required!");
            return false;
        }
        setError('');
        return true;
    }

    return (
        <Box>
            <Box sx={{ display: 'flex', mx: 40, mt: 10, justifyContent: 'center', border: '1px solid gray', borderRadius: '10px' }}>
                <Box sx={{ width: '100%' }}>
                    {/* <Typography variant='h5' sx={{ color: 'gray', fontWeight: 'bold' }}>Your Address</Typography> */}
                    <Grid container spacing={2} sx={{ width: '100%' }}>
                        <Grid item md={12}>
                            <Box sx={{ textAlign: 'center' }}>
                                
                                <Typography variant='h4'>Address</Typography>
                                <label style={{ color: 'red', fontStyle: 'italic' }}>{error}</label>
                            </Box>
                        </Grid>
                        <Grid item md={6}>
                            <Box sx={{ mx: 1 }}>
                                <TextField
                                    label="Ward" variant="standard" sx={{ width: '100%' }}
                                    disabled={!editor}
                                    value={ward}
                                    onChange={(e) => setWard(e.target.value)}
                                />
                            </Box>
                        </Grid>
                        <Grid item md={6}>
                            <Box sx={{ mx: 1 }}>
                                <TextField
                                    label="Province" variant="standard" sx={{ width: '100%' }}
                                    disabled={!editor}
                                    value={province}
                                    onChange={(e) => setProvince(e.target.value)}
                                />
                            </Box>
                        </Grid>
                        <Grid item md={6}>
                            <Box sx={{ mx: 1 }}>
                                <TextField
                                    label="City" variant="standard" sx={{ width: '100%' }}
                                    disabled={!editor}
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                />
                            </Box>
                        </Grid>
                        <Grid item md={6}>
                            <Box sx={{ mx: 1 }}>
                                <TextField
                                    label="Specific Address" variant="standard" sx={{ width: '100%' }}
                                    disabled={!editor}
                                    value={specificAddress}
                                    onChange={(e) => setSpecificAddress(e.target.value)}
                                />
                            </Box>
                        </Grid>
                        <Grid item md={6}>
                        </Grid>
                        <Grid item md={6}>
                            <Box sx={{ mx: 1, textAlign: 'right' }}>
                                <Button><Link href="/profile">Reload</Link></Button>
                                <Button onClick={() => setEditor(!editor)} disabled={editor ? false : true}>Cancel</Button>
                                <Button onClick={createAddressUser} >Create</Button>
                                {/* disabled={address.length === 0 ? false : true} */}
                                
                                <Button disabled={!editor} onClick={() => editAddressUser()}>Save</Button>
                            </Box>
                        </Grid>
                    </Grid>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow sx={{ fontWeight: 'bold' }}>
                                    <TableCell align="center">Ward</TableCell>
                                    <TableCell align="center">Province</TableCell>
                                    <TableCell align="center">City</TableCell>
                                    <TableCell align="center">Specific Address</TableCell>
                                    <TableCell align="center">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {address.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.ward}
                                        </TableCell>
                                        <TableCell align="center">{row.province}</TableCell>
                                        <TableCell align="center">{row.city}</TableCell>
                                        <TableCell align="center">{row.specific_address}</TableCell>
                                        <TableCell align="center" >
                                            <Box sx={{display: 'flex'}}>    
                                                <Button onClick={() => setEdit(row)}>Edit</Button>
                                                <Button onClick={() => removeAddressUser(row.id)}>Delete</Button>
                                                <Button sx={{display: row.is_default ? "none" : 'flex'}} onClick={() => setDefault(row.id)}>Set Default</Button>
                                            </Box>
                                            
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>

            <Loading open={loading} />
        </Box>
    );
}

export default Address;
