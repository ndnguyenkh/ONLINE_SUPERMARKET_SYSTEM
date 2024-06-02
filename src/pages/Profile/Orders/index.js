import axios from "axios";
import { useState, useEffect } from "react";
import { Box, Button, Divider, IconButton, InputBase, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import SearchIcon from '@mui/icons-material/Search';
import Loading from "~/components/containers/Loading";

import { OrdersAPI } from "~/apis";

const Orders = () => {
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [error, setError] = useState('');
    const jwt = JSON.parse(localStorage.getItem('jwt'));

    const getAllOrders = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:9090/api/v1/private/orders/account', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwt}`
                }
            });
            setOrders(response.data.content);
        } catch (err) {
            console.log("Error getting orders:", err.message);
            setError("Failed to load orders.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllOrders();
    }, []);

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleOpenModal = (order) => {
        setSelectedOrder(order);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setSelectedOrder(null);
        setOpenModal(false);
    };

    const handleChangeState = async (state, id) => {
        setLoading(true);
        try {
            await axios.post(`${OrdersAPI.updateState}?state=${state}&id=${id}`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwt}`
                }
            });
            alert("State changed successfully!");
            getAllOrders();
            handleCloseModal();
        } catch (err) {
            console.log("Error updating state:", err.message);
            setError("Failed to update order state.");
        } finally {
            setLoading(false);
        }
    };

    const filteredOrders = orders.filter(order => 
        searchValue === "" || order.state.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box>
                <Box sx={{ my: 5 }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'gray' }}>Orders</Typography>
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
                            placeholder="Search orders by state..."
                            value={searchValue}
                            onChange={handleSearchChange}
                        />
                        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                        <IconButton sx={{ p: "10px" }}>
                            <SearchIcon sx={{ fontSize: '35px', color: 'gray' }} />
                        </IconButton>
                    </Paper>
                </Box>
                {loading ? <Loading /> : (
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">#ID</TableCell>
                                    <TableCell align="center">State</TableCell>
                                    <TableCell align="center">Total Price</TableCell>
                                    <TableCell align="center">Address</TableCell>
                                    <TableCell align="center">Customer Name</TableCell>
                                    <TableCell align="center">Order Items</TableCell>
                                    <TableCell align="center"><PublishedWithChangesIcon /></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredOrders.map(order => (
                                    <TableRow key={order.id}>
                                        <TableCell align="center">{order.id}</TableCell>
                                        <TableCell align="center">{order.state}</TableCell>
                                        <TableCell align="center">{order.total_price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</TableCell>
                                        <TableCell align="center">{order.delivery_address}</TableCell>
                                        <TableCell align="center">{order.customer_name}</TableCell>
                                        <TableCell align="center">
                                            <ol>
                                                {order.order_items.map(item => (
                                                    <li key={item.id}>{item.product_name} x {item.quantity}</li>
                                                ))}
                                            </ol>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Button onClick={() => handleOpenModal(order)}>Customize orders</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
                <Modal open={openModal} onClose={handleCloseModal}>
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
                        }}
                    >
                        {selectedOrder && (
                            <Box>
                                <Typography variant="h5" sx={{ color: 'black' }}>
                                    Please click received if you have received the goods
                                </Typography>
                                {error && (
                                    <Typography sx={{ mt: 2, color: 'red', fontStyle: 'italic' }}>
                                        {error}
                                    </Typography>
                                )}
                                <Box sx={{ textAlign: 'center', mt: 5 }}>
                                    <Button onClick={() => handleChangeState("RECEIVED", selectedOrder.id)}>RECEIVED</Button>
                                </Box>
                                <Box sx={{ textAlign: 'center', mt: 5 }}>
                                    <Button onClick={() => handleChangeState("CANCELED", selectedOrder.id)}>CANCELED</Button>
                                </Box>
                            </Box>
                        )}
                    </Box>
                </Modal>
            </Box>
        </Box>
    );
};

export default Orders;
