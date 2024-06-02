
import axios from "axios";
import { useState, useEffect } from "react";
import { Box, Button, Divider, IconButton, InputBase, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';

import Loading from "~/components/containers/Loading";
import { UserAPI } from "~/apis";


function ManageUser() {

    const [loading, setLoading] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [error, setError] = useState('');
    const jwt = JSON.parse(localStorage.getItem('jwt'));
    const [users, setUsers] = useState([]);

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
                                <TableCell align="center">first name</TableCell>
                                <TableCell align="center">Last name</TableCell>
                                <TableCell align="center">Is Enabled</TableCell>
                                <TableCell align="center">Is Trashed</TableCell>
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
                                        <Button onClick={() => handleLock(user.id)}>Lock</Button>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button onClick={() => handleUnLock(user.id)}>Un Lock</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            <Loading open={loading} />
        </Box>
     );
}

export default ManageUser;