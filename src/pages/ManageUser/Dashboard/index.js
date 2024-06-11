import axios from "axios";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { BarChart } from "@mui/x-charts";

const URL = "http://localhost:9090/api/v1";
const UserAPI = URL + "/dashboard/users";

function DashboardUser() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const jwt = JSON.parse(localStorage.getItem('jwt'));
    const [users, setUsers] = useState({
        registered_data: [],
        disable_data: []
    });

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(UserAPI, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwt}`
                }
            });
            setUsers(response.data);
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

    // Process user data to extract series and xAxis values
    const processUserData = (data) => {
        const registeredDays = (data.registered_data || []).map(item => item.day);
        const registeredCounts = (data.registered_data || []).map(item => item.numbers_of_regis);
        const disabledDays = (data.disable_data || []).map(item => item.day);
        const disabledCounts = (data.disable_data || []).map(item => item.numbers_of_regis);

        return {
            xAxisData: registeredDays.length > 0 ? registeredDays : ['No data'],
            seriesData: [
                { name: 'Registered', data: registeredCounts.length > 0 ? registeredCounts : [0] },
                { name: 'Disabled', data: disabledCounts.length > 0 ? disabledCounts : [0] }
            ]
        };
    };

    const chartData = processUserData(users);

    return (
        <Box>
            <Box >Date: {users.month}/{users.year}</Box>
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
                    <Box sx={{width: '80px', height: '50px', backgroundColor: '#20b9e3', ml: 5, textAlign: 'center', color: 'white'}}> Registered</Box>
                    <Box sx={{width: '80px', height: '50px', backgroundColor: '#109e8d', ml: 5, textAlign: 'center', color: 'white'}}> Disable</Box>
                </Box>
                <Box sx={{ml: 6}}>
                    <Box >Type: {users.type}</Box>
                    <Box >most registered day: {users.most_registered_day}</Box>
                    <Box >number of most regis: {users.number_of_most_regis}</Box>
                    <Box >number of regis: {users.number_of_regis   }</Box>
                    <Box >most disabled day: {users.most_disabled_day || 0}</Box>
                    <Box >number of most disable: {users.number_of_most_disable} </Box>
                    <Box >number of disable: {users.number_of_disable}</Box>
                    <Box >number of accounts: {users.number_of_accounts}</Box>
                    <Box >number of admin: {users.number_of_admin}</Box>
                    <Box >number of sellers: {users.number_of_sellers}</Box>
                    <Box >number of warehouce_staffs: {users.number_of_warehouce_staffs}</Box>
                    <Box >number of customers: {users.number_of_customers}</Box>
                </Box>
            </Box>
            
        </Box>
    );
}

export default DashboardUser;
