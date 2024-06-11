import axios from "axios";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { BarChart } from "@mui/x-charts";

const URL = "http://localhost:9090/api/v1";
const StockAPI = URL + "/dashboard/warehouse";

function DashboardStock() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const jwt = JSON.parse(localStorage.getItem('jwt'));
    const [stocks, setStocks] = useState({
        warehouse_data: [],
        product_may_be_out_of_stock: []
    });

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(StockAPI, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwt}`
                }
            });
            setStocks(response.data);
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

    // Process stock data to extract series and xAxis values
    const processStockData = (data) => {
        const days = (data.warehouse_data || []).map(item => item.day);
        const imports = (data.warehouse_data || []).map(item => item.number_of_imports);
        const exports = (data.warehouse_data || []).map(item => item.number_of_exports);
        const inStock = (data.product_may_be_out_of_stock || []).map(item => item.in_stock_quantity);
        const inSell = (data.product_may_be_out_of_stock || []).map(item => item.in_sell_quantity);

        return {
            xAxisData: days.length > 0 ? days : ['No data'],
            seriesData: [
                { name: 'Imports', data: imports.length > 0 ? imports : [0] },
                { name: 'Exports', data: exports.length > 0 ? exports : [0] },
                // { name: 'In Stock', data: inStock.length > 0 ? inStock : [0] },
                // { name: 'In Sell', data: inSell.length > 0 ? inSell : [0] }
            ]
        };
    };

    const chartData = processStockData(stocks);

    return (
        <Box>
            <Box >Date: {stocks.month}/{stocks.year}</Box>
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
                    <Box sx={{width: '80px', height: '50px', backgroundColor: '#20b9e3', ml: 5, textAlign: 'center', color: 'white'}}> Imports</Box>
                    <Box sx={{width: '80px', height: '50px', backgroundColor: '#109e8d', ml: 5, textAlign: 'center', color: 'white'}}> Exports</Box>
                </Box>
                <Box sx={{ml: 6}}>
                    <Box>Type: {stocks.type}</Box>
                    <Box >Most import day: {stocks.most_import_day}</Box>
                    <Box >Number of most import in day: {stocks.number_of_most_import_in_day}</Box>
                    <Box >Most_export_day: {stocks.most_export_day}</Box>
                    <Box >Number of most export in day: {stocks.number_of_most_export_in_day} </Box>
                    <Box >Limit for out of stock: {stocks.limit_for_out_of_stock}</Box>
                    <Box >Number of exports in month: {stocks.number_of_exports_in_month}</Box>
                    <Box >Number of products export in month: {stocks.number_of_products_export_in_month}</Box>
                    <Box >Number of imports in month: {stocks.number_of_imports_in_month}</Box>
                    <Box >Number of products import in month: {stocks.number_of_products_import_in_month}</Box>
                    <Box >Total in stock: {stocks.total_in_stock}</Box>
                    <Box >Total in sell: {stocks.total_in_sell}</Box>
                </Box>   
            </Box>
            <Box sx={{ml: 5, mt: 5}}><span style={{color: 'orange'}}>Product may be out of stock</span>
                    {stocks.product_may_be_out_of_stock.map((item) => {
                        return <Box>{item.product_id} - {item.product_name}: quantity sell: {item.in_sell_quantity}, quantity stock: {item.in_stock_quantity}</Box>
                    })}
            </Box>
        </Box>
    );
}

export default DashboardStock;