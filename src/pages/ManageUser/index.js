
import axios from "axios";
import { useState, useEffect } from "react";
import { Box, Button, ButtonGroup, Divider, Grid, IconButton, InputBase, MenuItem, Modal, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Toolbar, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import SaveAsIcon from '@mui/icons-material/SaveAs';

import Loading from "~/components/containers/Loading";
import { UserAPI } from "~/apis";
import DashboardUser from "./Dashboard";


function ManageUser() {

    const [loading, setLoading] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [error, setError] = useState('');
    const jwt = JSON.parse(localStorage.getItem('jwt'));
    const [users, setUsers] = useState([]);

    const [id, setId] = useState();
    const [dataUser, setDataUser] = useState({
        phone :"",
        role: "SELLER",
        first_name: "",
        last_name: "",
        is_enabled: true
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDataUser(prevFormData => ({ ...prevFormData, [name]: value }));
    };

    const handleUpdate = async () => {
        setLoading(true);
        try {
            await axios.put(`${UserAPI.updateByAdmin}${id}`, dataUser, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwt}`
                }
            });
            alert('Updated successfully!');
            setId(null);
            setDataUser({
                phone :"",
                role: "SELLER",
                first_name: "",
                last_name: "",
                is_enabled: true
            });
            getAllUsers();
        } catch (err) {
            alert("Change Password Success!");
            console.log("Err update: " + err);
        } finally {
            setLoading(false);
        }
    };

    const getAllUsers = async () => {
        setLoading(true);
        try {
            const response = await axios.get(UserAPI.getAllUsers, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwt}`
                }
            });
            setUsers(response.data.content);
        } catch (e) {
            console.log("Error get all users", e.message);
        } finally {
            setLoading(false);
        }
    };

    const handleLock = async (id) => {
        setLoading(true);
        try {
            await axios.put(`${UserAPI.lock}${id}`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwt}`
                }
            });
            alert("Lock user successfully!");
            getAllUsers();
            handleCloseModal();
        } catch (err) {
            alert("Change Password Success!");
            console.log("Error Lock user:", err.message);
            setError("Failed to Lock user.");
        } finally {
            setLoading(false);
        }
    };

    const handleUnLock = async (id) => {
        setLoading(true);
        try {
            await axios.put(`${UserAPI.unLock}${id}`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwt}`
                }
            });
            alert("Un Lock user successfully!");
            getAllUsers();
            handleCloseModal();
        } catch (err) {
            alert("Change Password Success!");
            console.log("Error Lock user:", err.message);
            setError("Failed to Lock user.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllUsers();
    }, []);

    const filteredOrders = users.filter(user => 
        searchValue === "" || user.email.toLowerCase().includes(searchValue.toLowerCase())
    );

    const handleOpenModal = (order) => {
        //setSelectedOrder(order);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        //setSelectedOrder(null);
        setOpenModal(false);
    };

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
    };

    return ( 
        <Box>
            <Toolbar sx={{mt: 10}}>
                <Typography variant="h4">Manage Users</Typography>
            </Toolbar>

            <DashboardUser />

            <Box>
                <Paper
                    component="form"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        borderBottom: '1px solid grey',
                        backgroundColor: 'transparent',
                        width: '100%',
                        height: "50px"
                    }}
                >
                    <InputBase
                        sx={{
                            width: "100%",
                            height: "100%",
                            px: 4,
                            flex: 1,
                            color: "grey",
                            fontSize: '20px',
                            fontStyle: 'italic'
                        }}
                        placeholder="Search users by email..."
                        value={searchValue}
                        onChange={handleSearchChange}
                    />
                        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                    <IconButton sx={{ p: "10px" }}>
                        <SearchIcon sx={{ fontSize: '35px', color: 'gray' }} />
                    </IconButton>
                </Paper>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">#ID</TableCell>
                                <TableCell align="center">Email</TableCell>
                                <TableCell align="center">Phone</TableCell>
                                <TableCell align="center">Role</TableCell>
                                <TableCell align="center">First name</TableCell>
                                <TableCell align="center">Last name</TableCell>
                                <TableCell align="center">Verified</TableCell>
                                <TableCell align="center">Lock</TableCell>
                                <TableCell align="center"><PublishedWithChangesIcon /></TableCell>
                                <TableCell align="center"><PublishedWithChangesIcon /></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredOrders.map(user => (
                                <TableRow key={user.id}>
                                    <TableCell align="center">{user.id}</TableCell>
                                    <TableCell align="center">{user.email}</TableCell>
                                    <TableCell align="center">{user.phone}</TableCell>
                                    <TableCell align="center">{user.role}</TableCell>
                                    <TableCell align="center">{user.first_name}</TableCell>
                                    <TableCell align="center">{user.last_name}</TableCell>
                                    <TableCell align="center">{user.is_enabled ? "Yes" : "No"}</TableCell>
                                    <TableCell align="center">{user.is_trashed ? "Yes" : "No"}</TableCell>
                                    <TableCell align="center">
                                        <Button 
                                            onClick={
                                                user.is_trashed ?  () => handleUnLock(user.id) : () => handleLock(user.id) 
                                            }
                                            >{user.is_trashed ? "Un Lock" : "Lock"}</Button>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button 
                                            onClick={() => {
                                                setOpenModal(true);
                                                setId(user.id);
                                                setDataUser(
                                                    prevFormData => ({ ...prevFormData,
                                                         phone: user.phone,
                                                         role: user.role,
                                                         first_name: user.first_name,
                                                         last_name: user.last_name,
                                                         is_enabled: user.is_enabled 
                                                    })
                                                )
                                            }}
                                        ><EditIcon sx={{ color: 'orange' }} /></Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 800, border: '2px solid #000', boxShadow: 24, p: 4, borderRadius: 3, backgroundColor: 'white' }}>
                    <Grid container spacing={2}>
                        <Grid item md={12} >
                            <Typography sx={{textAlign: 'center', color: 'gray', fontWeight: 'bold'}} variant="h4">Edit</Typography>
                        </Grid>
                        <Grid item md={6}>
                            <TextField 
                            required
                                label="Phone" variant="standard" sx={{ width: '100%' }}
                                name="phone"
                                type="number"
                                value={dataUser.phone}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item md={6}>
                            <Select
                            
                                sx={{ width: '100%', height: '100%' }}
                                variant="standard"
                                name="role"
                                value={dataUser.role}
                                onChange={handleInputChange}
                            >
                                <MenuItem value={"CUSTOMER"}>CUSTOMER</MenuItem>            
                                <MenuItem value={"ADMIN"}>ADMIN</MenuItem>            
                                <MenuItem value={"WAREHOUSE_STAFFS"}>WAREHOUSE STAFFS</MenuItem>            
                                <MenuItem value={"SELLER"}>SELLER</MenuItem>                       
                            </Select>
                        </Grid>
                        <Grid item md={6}>
                            <TextField
                            required
                                label="First name" variant="standard" sx={{ width: '100%' }}
                                name="first_name"
                                value={dataUser.first_name}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item md={6}>
                            <TextField
                            required
                                label="Last name" variant="standard" sx={{ width: '100%' }}
                                name="last_name"
                                value={dataUser.last_name}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item md={6}>
                            <Select
                            
                                sx={{ width: '100%', height: '100%' }}
                                variant="standard"
                                name="is_enabled"
                                value={dataUser.is_enabled}
                                onChange={handleInputChange}
                            >
                                <MenuItem value={true}>Yes</MenuItem>
                                <MenuItem value={false}>No</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item md={6}></Grid>
                        <Grid item md={6}>
                            <label style={{ fontStyle: 'italic', color: 'red' }}>{error}</label>
                        </Grid>
                        <Grid item md={6}>
                            <ButtonGroup sx={{ height: '50px', alignItems: 'center' }} orientation="horizontal" aria-label="Vertical button group">
                                <Button onClick={handleUpdate}><SaveAsIcon sx={{ color: 'orange' }} /></Button>
                                <Button onClick={() => setOpenModal(false)}><CloseIcon sx={{ color: 'red' }} /></Button>
                            </ButtonGroup>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
            <Loading open={loading} />
        </Box>
     );
}

export default ManageUser;