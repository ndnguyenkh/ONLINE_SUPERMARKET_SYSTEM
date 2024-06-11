import axios from "axios";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { BarChart } from "@mui/x-charts";

const URL = "http://localhost:9090/api/v1";
const ScheduleAPI = URL + "/dashboard/schedule";

function DashboardSchedule() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const jwt = JSON.parse(localStorage.getItem('jwt'));
    const [schedule, setSchedule] = useState({
        shift_data: [],
        top_least_employee_works_in_month: []
    });

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(ScheduleAPI, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwt}`
                }
            });
            setSchedule(response.data);
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

    // Process schedule data to extract series and xAxis values
    const processScheduleData = (data) => {
        const days = (data.shift_data || []).map(item => item.day);
        const morningShifts = (data.shift_data || []).map(item => item.number_of_morning_shift);
        const afternoonShifts = (data.shift_data || []).map(item => item.number_of_afternoon_shift);

        return {
            xAxisData: days.length > 0 ? days : ['No data'],
            seriesData: [
                { name: 'Morning Shifts', data: morningShifts.length > 0 ? morningShifts : [0] },
                { name: 'Afternoon Shifts', data: afternoonShifts.length > 0 ? afternoonShifts : [0] }
            ]
        };
    };

    const chartData = processScheduleData(schedule);

    return (
        <Box>
            
            <Box >Date: {schedule.month}/{schedule.year}</Box>
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
                    <Box sx={{width: '80px', height: '50px', backgroundColor: '#20b9e3', ml: 5, mb: 2, textAlign: 'center', color: 'white'}}> Afternoon Shifts</Box>
                    <Box sx={{width: '80px', height: '50px', backgroundColor: '#109e8d', ml: 5, textAlign: 'center', color: 'white'}}> Morning Shifts</Box>
                </Box>
                <Box sx={{ml: 6}}>
                    <Box >Most schedule in month: {schedule.most_employee_works_in_day}</Box>
                    <Box >Number Of Most: {schedule.number_of_employee_works_most_in_day}</Box>
                    <Box >Total Schedule in month: {schedule.total_of_works_in_month}</Box>
                    <Box >Total Schedule at morning in month: {schedule.total_of_works_at_morning_in_month} </Box>
                    <Box >Total Schedule at afternoon in month: {schedule.total_of_works_at_afternoon_in_month}</Box>
                </Box>
            </Box>
            
            <Box sx={{ml: 5, mt: 5}}><span style={{color: 'orange'}}>Top least employee works in month:</span>
                {schedule.top_least_employee_works_in_month.map((item) => {
                    return <Box>{item.employee_id} - {item.employee_name}</Box>
                })}
            </Box>
        </Box>
    );
}

export default DashboardSchedule;
