
import axios from "axios";
import * as React from 'react';
import { useState, useEffect } from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';


import Title from '../Title';
import { Button } from "@mui/material";
import Loading from "~/components/containers/Loading";
import { OrdersAPI } from "~/apis";

export default function Orders() {

  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const jwt = JSON.parse(localStorage.getItem('jwt'));

  // get all orders
  const getAllOrders = async () => {
    // setLoading(true);
    try {
        const response = await axios.get('http://localhost:9090/api/v1/public/orders', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`
            }
        });
        setOrders(response.data.content);
        console.log('Cart:', response.data);
    } catch (err) {
        console.log("Error getall:", err.message);
    } finally {
        // setLoading(false);
    }
  };

  // change state
  const handleChangeState = async (state, id) => {
    setLoading(true);
    try {
      const response = await axios.post(`${OrdersAPI.updateState}?state=${state}&id=${id}`, {}, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`
        }
      });
      alert("Changed state Success!");
    } catch (err) {
      console.log("Error update state", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
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
          {orders.map((row) => (
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
                <Button onClick={() => handleChangeState("CONFIRMED", row.id)}>Change State</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="/manage-orders" sx={{ mt: 3 }}>
        See more orders
      </Link>
      <Link color="primary" href="/dashboard" sx={{}}>
        Reload
      </Link>
      <Loading open={loading} />
    </React.Fragment>
  );
}