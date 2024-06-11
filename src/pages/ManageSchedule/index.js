import axios from "axios";
import { useState, useEffect } from "react";
import {
    Box, Button, Container, Divider, Grid, IconButton, InputBase, MenuItem, Modal, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Toolbar, Typography
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import ScheduleAPI from "~/apis/Schedule";
import DashboardSchedule from "./Dashboard";

function ManageSchedule() {

    const [loading, setLoading] = useState(false);
    const [valueSearch, setValueSearch] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [error, setError] = useState('');
    const jwt = JSON.parse(localStorage.getItem('jwt'));

    const [id, setId] = useState();
    const [schedules, setSchedules] = useState([]);
    const [scheduleDetails, setScheduleDetails] = useState([]);
    const [dataSchedule, setDataSchedule] = useState({
        date: "",
        schedule_details: []
    });
    const handleEnterChange = (event) => {
        const { name, value } = event.target;
        setDataSchedule({
            ...dataSchedule,
            [name]: value
        });
    };
    const [dataScheduleDetails, setDataScheduleDetails] = useState({
        shift: "",
        employee_id: 0
    });
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setDataScheduleDetails({
            ...dataScheduleDetails,
            [name]: value
        });
    };

    const add = () => {
        if (dataScheduleDetails.shift && dataScheduleDetails.employee_id) {
            setScheduleDetails([...scheduleDetails, { shift: dataScheduleDetails.shift, employee_id: parseInt(dataScheduleDetails.employee_id) }]);
            setDataScheduleDetails({ shift: '', employee_id: '' });
        }
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const [schedulesRes] = await Promise.all([
                axios.get(ScheduleAPI.getAll, { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${jwt}` } }),
            ]);
            setSchedules(schedulesRes.data.content);
        } catch (err) {
            console.error("Error fetching data:", err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = async () => {
        const data = {
            date: new Date(dataSchedule.date).toISOString(),
            schedule_details: scheduleDetails.map(item => ({
                shift: item.shift,
                employee_id: parseInt(item.employee_id)
            }))
        };
        try {
            const response = await axios.post(ScheduleAPI.create, data, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwt}`
                }
            });
            console.log("API Response:", response);
            alert("added successfully!");
            setOpenModal(false);
            setDataSchedule({
                date: "",
                schedule_details: []
            });
            setScheduleDetails([]);
            fetchData();
        } catch (err) {
            console.error("Error adding schedule:", err.response ? err.response.data : err.message);
            if (err.response && err.response.data) {
                alert("Change Password Success!");
            } else {
                alert("Change Password Success!");
            }
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`${ScheduleAPI.delete}${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwt}`
                }
            });
            console.log("API Response:", response);
            alert("deleted successfully!");
            setOpenModal(false);
            setDataSchedule({
                date: "",
                schedule_details: []
            });
            setScheduleDetails([]);
            fetchData();
        } catch (err) {
            console.error("Error deleted schedule:", err.response ? err.response.data : err.message);
            if (err.response && err.response.data) {
                alert("Change Password Success!");
            } else {
                alert("Change Password Success!");
            }
        }
    };

    const handleSearch = () => {
        console.log(valueSearch);
    };

    const handleReset = () => {
        setValueSearch('');
        fetchData();
    };

    const filteredSchedule = schedules.filter(schedule =>
        valueSearch === "" || schedule.date.toLowerCase().includes(valueSearch.toLowerCase())
    );

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Box>
            <Toolbar />
            <Container sx={{ width: '100%', mt: 5, mb: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'gray' }}>Manage Schedule</Typography>
            </Container>

            <DashboardSchedule />

            <Container sx={{ my: 2 }}>
                <Typography sx={{ color: 'gray', fontWeight: '400', fontStyle: 'italic' }}>Manage Schedule • Tools</Typography>
                <Box sx={{ width: '100%', my: 2, display: "flex", alignItems: 'center', justifyContent: 'center' }}>
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
                            placeholder="Search schedules by date..."
                            value={valueSearch}
                            onChange={(e) => setValueSearch(e.target.value)}
                        />
                        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                        <IconButton
                            type="button"
                            sx={{ p: "10px" }}
                            aria-label="search"
                            onClick={handleSearch}
                        >
                            <SearchIcon sx={{ fontSize: '35px', color: 'gray' }} />
                        </IconButton>
                    </Paper>
                    <Box sx={{ mx: 2, display: 'flex' }}>
                        <Button onClick={() => setOpenModal(true)} variant="outlined" startIcon={<AddIcon />}>Create</Button>
                        <Button onClick={handleReset} variant="text" sx={{ textAlign: 'center', ':hover': { background: 'transparent' } }}>
                            <RotateLeftIcon sx={{ width: '100%', ml: 1, color: 'green' }} />
                        </Button>
                    </Box>
                </Box>
            </Container>

            <Box>
                <TableContainer component={Paper}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">#ID</TableCell>
                                <TableCell align="left">Date</TableCell>
                                <TableCell align="center">Admin Name</TableCell>
                                <TableCell align="center">Schedule Details</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredSchedule.map(row => (
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
                                    <TableCell align="center">
                                        {/* <Button
                                        ><EditIcon sx={{ color: 'orange' }} /></Button> */}
                                        <Button
                                            onClick={() => handleDelete(row.id)}
                                        ><DeleteIcon sx={{ color: 'red' }} /></Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 800, border: '2px solid #000', boxShadow: 24, p: 4, borderRadius: 3, backgroundColor: 'white' }}>
                    <form>
                        <Grid container spacing={2}>
                            <Grid item md={12} >
                                <Typography sx={{textAlign: 'center', color: 'gray', fontWeight: 'bold'}} variant="h4">Create</Typography>
                            </Grid>
                            <Grid item md={12}>
                                {scheduleDetails.map((data, i) => (
                                    <Typography key={i}>
                                        {i + 1} - Employee ID: {data.employee_id} - {data.shift}
                                    </Typography>
                                ))}
                            </Grid>
                            <Grid item md={6}>
                                <label style={{ color: 'gray', fontWeight: 'bold' }}>Enter date</label>
                                <TextField
                                    variant="standard" sx={{ width: '100%', height: '100%' }}
                                    name="date"
                                    type="date"
                                    value={dataSchedule.date}
                                    onChange={handleEnterChange}
                                />
                            </Grid>
                            <Grid item md={6}>
                                <label style={{ color: 'gray', fontWeight: 'bold' }}>Enter employee id</label>
                                <TextField
                                    variant="standard" sx={{ width: '100%', height: '100%' }}
                                    name="employee_id"
                                    type="number"
                                    value={dataScheduleDetails.employee_id}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item md={6}>
                                <label style={{ color: 'gray', fontWeight: 'bold' }}>Active</label>
                                <Select
                                    sx={{ width: '100%', height: '100%' }}
                                    variant="standard"
                                    name="shift"
                                    value={dataScheduleDetails.shift}
                                    onChange={handleInputChange}
                                >
                                    <MenuItem value={"MORNING"}>MORNING</MenuItem>
                                    <MenuItem value={"NOON"}>NOON</MenuItem>
                                    <MenuItem value={"EVENING"}>EVENING</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item md={12}>
                                <Button variant="outlined" sx={{ width: '100%', color: 'green', mt: 5 }} onClick={add}><AddIcon /></Button>
                            </Grid>
                            <Grid item md={12}>
                                <Button variant="outlined" sx={{ width: '100%', color: 'green', borderColor: 'orange', ":hover": { borderColor: 'orange' } }} onClick={handleAdd}><AddCircleOutlineIcon /></Button>
                            </Grid>
                            {/* <Grid item md={12}>
                                <Button variant="outlined" sx={{ width: '100%', color: 'orange', borderColor: 'orange', ":hover": { borderColor: 'orange' } }} onClick={handleEdit}><SaveAsIcon /></Button>
                            </Grid> */}
                        </Grid>
                    </form>
                </Box>
            </Modal>
        </Box>
    );
}

export default ManageSchedule;
