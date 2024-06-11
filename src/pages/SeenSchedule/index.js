
import axios from "axios";
import { useEffect, useState } from "react";
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';



function SeenSchedule() {

    const jwt = JSON.parse(localStorage.getItem('jwt'));
    const [schedule, setSchedule] = useState([
        {
            schedule_details: []
        }
    ]);

    const fetchData = async () => {
        try {
            const [schedulesRes] = await Promise.all([
                axios.get('http://localhost:9090/api/v1/private/schedules/account', { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${jwt}` } }),
            ]);
            setSchedule(schedulesRes.data.content);
        } catch (err) {
            console.log("Err: " + err);
        } finally {

        }
    };

    useEffect(() => {
        fetchData();
    });

    return ( 
        <Box>
            <Box sx={{mt: 20}}>
                <TableContainer component={Paper}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">#ID</TableCell>
                                <TableCell align="left">Date</TableCell>
                                <TableCell align="center">Creator Name</TableCell>
                                <TableCell align="center">Schedule Details</TableCell>
                                {/* <TableCell align="center">Actions</TableCell> */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {schedule.map(row => (
                                <TableRow key={row.id}>
                                    <TableCell align="center">{row.id}</TableCell>
                                    <TableCell align="left">{row.date}</TableCell>
                                    <TableCell align="center">{row.admin_name}</TableCell>
                                    <TableCell align="center">
                                        <ul>
                                            {row.schedule_details.map(item => {
                                                return <li key={item.id}>{item.employee_name} - {item.shift}</li>
                                            })}
                                        </ul>
                                    </TableCell>
                                    {/* <TableCell align="center">
                                        <Button
                                        ><EditIcon sx={{ color: 'orange' }} /></Button>
                                        <Button
                                            onClick={() => handleDelete(row.id)}
                                        ><DeleteIcon sx={{ color: 'red' }} /></Button>
                                    </TableCell> */}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
     );
}

export default SeenSchedule;