import axios from "axios";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { BarChart } from "@mui/x-charts";

const URL = "http://localhost:9090/api/v1";
const OrderAPI = URL + "/dashboard/orders"; // Updated the API endpoint

function DashboardOrder() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const jwt = JSON.parse(localStorage.getItem('jwt'));
    const [orders, setOrders] = useState({
        order_data: [],
    });

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(OrderAPI, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwt}`
                }
            });
            setOrders(response.data);
        } catch (err) {
            console.error("Error fetching data:", err.message);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Process order data to extract series and xAxis values
    const processOrderData = (data) => {
        const days = (data.order_data || []).map(item => item.day);
        const placedOrders = (data.order_data || []).map(item => item.number_of_placed_orders);
        const preparingOrders = (data.order_data || []).map(item => item.number_of_preparing_orders);
        const deliveringOrders = (data.order_data || []).map(item => item.number_of_delivering_orders);
        const deliveredOrders = (data.order_data || []).map(item => item.number_of_delivered_orders);
        const deliveryFailedOrders = (data.order_data || []).map(item => item.number_of_delivery_failed_orders);
        const receivedOrders = (data.order_data || []).map(item => item.number_of_received_orders);
        const canceledOrders = (data.order_data || []).map(item => item.number_of_canceled_orders);

        return {
            xAxisData: days.length > 0 ? days : ['No data'],
            seriesData: [
                { name: 'Placed Orders', data: placedOrders.length > 0 ? placedOrders : [0] },
                // { name: 'Preparing Orders', data: preparingOrders.length > 0 ? preparingOrders : [0] },
                // { name: 'Delivering Orders', data: deliveringOrders.length > 0 ? deliveringOrders : [0] },
                // { name: 'Delivered Orders', data: deliveredOrders.length > 0 ? deliveredOrders : [0] },
                // { name: 'Delivery Failed Orders', data: deliveryFailedOrders.length > 0 ? deliveryFailedOrders : [0] },
                { name: 'Received Orders', data: receivedOrders.length > 0 ? receivedOrders : [0] },
                { name: 'Canceled Orders', data: canceledOrders.length > 0 ? canceledOrders : [0] }
            ]
        };
    };

    const chartData = processOrderData(orders);

    return (
        <Box>
            <Box >Date: {orders.month}/{orders.year}</Box>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {!loading && !error && (
                <BarChart
                    series={chartData.seriesData}
                    height={290}
                    xAxis={[{ data: chartData.xAxisData, scaleType: 'band' }]}
                    margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
                />
            )}
            <Box sx={{display: 'flex'}}>
                <Box>
                    <Box sx={{width: '80px', height: '50px', backgroundColor: '#b455cf', ml: 5, mt: 4, textAlign: 'center', color: 'white'}}> Canceled</Box>
                    <Box sx={{width: '80px', height: '50px', backgroundColor: '#109e8d', ml: 5, my: 3, textAlign: 'center', color: 'white'}}> Placed</Box>
                    <Box sx={{width: '80px', height: '50px', backgroundColor: '#1aa1d6', ml: 5, textAlign: 'center', color: 'white'}}> Received</Box>
                </Box>
                <Box sx={{ml: 6}}>
                    <Box >Most orders in day: {orders.most_order_day}</Box>
                    <Box >Loyaty points callback: {orders.loyaty_points_callback}</Box>
                    {/* <Box >Total: {orders.true_revenue.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Box> */}
                    <Box >Number of orders in month: {orders.number_of_orders_in_month} </Box>
                    <Box >number of placed orders in month: {orders.number_of_placed_orders_in_month}</Box>
                    <Box >number of preparing orders in month: {orders.number_of_preparing_orders_in_month}</Box>
                    <Box >number of delivering orders in month: {orders.number_of_delivering_orders_in_month}</Box>
                    <Box >number of delivered orders in month: {orders.number_of_delivered_orders_in_month}</Box>
                    <Box >number of delivery failed orders in month: {orders.number_of_delivery_failed_orders_in_month}</Box>
                    <Box >number of received orders in month: {orders.number_of_received_orders_in_month}</Box>
                    <Box >number of canceled orders in month: {orders.number_of_canceled_orders_in_month}</Box>
                </Box>
            </Box>
            
        </Box>
    );
}

export default DashboardOrder;
