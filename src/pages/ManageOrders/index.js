import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  InputBase,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
  Modal
} from "@mui/material";
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import SearchIcon from '@mui/icons-material/Search';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import Loading from "~/components/containers/Loading";
import { OrdersAPI } from "~/apis";
import DashboardOrder from "./Dashboard";

const ManageOrders = () => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [valueSearch, setValueSearch] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [error, setError] = useState('');
  const jwt = JSON.parse(localStorage.getItem('jwt'));

  // get all orders
  const getAllOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:9090/api/v1/public/orders', {
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

  // change state
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
      alert("Change Password Success!");
      console.log("Error updating state:", err.message);
      setError("Failed to update order state.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  const handleSearchChange = (e) => {
    setValueSearch(e.target.value);
  };

  const handleOpenModal = (order) => {
    setSelectedOrder(order);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
    setOpenModal(false);
  };

  const filteredOrders = orders.filter(order =>
    valueSearch === "" || order.state.toLowerCase().includes(valueSearch.toLowerCase())
  );

  return (
    <React.Fragment>
      <Box>
        <Toolbar />
        <Container sx={{ width: '100%', mt: 5, mb: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'gray' }}>Manage Orders</Typography>
          <Link href="/manage-orders"><ManageHistoryIcon sx={{ color: 'green' }} /></Link>
        </Container>

        <DashboardOrder />

        <Box>
          <Paper
            component="form"
            sx={{
              width: '100%',
              height: "50px",
              display: "flex",
              alignItems: "center",
              borderBottom: '1px solid grey',
              backgroundColor: 'transparent'
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
              placeholder="Search for orders..."
              value={valueSearch}
              onChange={handleSearchChange}
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton sx={{ p: "10px" }} aria-label="search">
              <SearchIcon sx={{ fontSize: '35px', color: 'gray' }} />
            </IconButton>
          </Paper>
        </Box>
        <TableContainer component={Paper}>
          <Table size="small">
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
              {filteredOrders.map((row) => (
                <TableRow key={row.id}>
                  <TableCell align="center">{row.id}</TableCell>
                  <TableCell align="center">{row.state}</TableCell>
                  <TableCell align="center">{row.total_price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</TableCell>
                  <TableCell align="center">{row.delivery_address}</TableCell>
                  <TableCell align="center">{row.customer_name}</TableCell>
                  <TableCell align="center">
                    <ol>
                      {row.order_items.map((item) => (
                        <li key={item.id}>{item.product_name} x {item.quantity}</li>
                      ))}
                    </ol>
                  </TableCell>
                  <TableCell align="center">
                    <Button sx={{display: row.state === "CANCELED" ? 'none' : 'flex'}} onClick={() => handleOpenModal(row)}>Change State</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
                  Change the current order status
                </Typography>
                {error && (
                  <Typography sx={{ mt: 2, color: 'red', fontStyle: 'italic' }}>
                    {error}
                  </Typography>
                )}
                <Box sx={{ textAlign: 'center', mt: 5 }}>
                  <Button onClick={() => handleChangeState("CONFIRMED", selectedOrder.id)}>CONFIRMED</Button>
                </Box>
                <Box sx={{ textAlign: 'center', mt: 5 }}>
                  <Button onClick={() => handleChangeState("DELIVERING", selectedOrder.id)}>DELIVERING</Button>
                </Box>
                <Box sx={{ textAlign: 'center', mt: 5 }}>
                  <Button onClick={() => handleChangeState("DELIVERY_FAILED", selectedOrder.id)}>DELIVERY FAILED</Button>
                </Box>
                <Box sx={{ textAlign: 'center', mt: 5 }}>
                  <Button onClick={() => handleChangeState("DELIVERED", selectedOrder.id)}>DELIVERED</Button>
                </Box>
                <Box sx={{ textAlign: 'center', mt: 5 }}>
                  <Button onClick={() => handleChangeState("CANCELED", selectedOrder.id)}>CANCELED</Button>
                </Box>
              </Box>
            )}
          </Box>
        </Modal>
      </Box>
      <Loading open={loading} />
    </React.Fragment>
  );
}

export default ManageOrders;
