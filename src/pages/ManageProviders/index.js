import axios from "axios";
import { useEffect, useState } from "react";
import {
    Box, Button, ButtonGroup, Container, Divider, Grid, IconButton, InputBase, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Toolbar, Typography
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import SaveAsIcon from '@mui/icons-material/SaveAs';

import { ProviderAPI } from "~/apis";

function ManageProviders() {
    const [loading, setLoading] = useState(false);
    const [valueSearch, setValueSearch] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [error, setError] = useState('');
    const jwt = JSON.parse(localStorage.getItem('jwt'));

    const [id, setId] = useState();
    const [suppliers, setSuppliers] = useState([]);
    const [dataSupplier, setDataSupplier] = useState({
        email: "",
        address: {
          ward: "",
          province: "",
          city: "",
          specific_address: ""
        },
        supplier_name: "",
        contact_person: "",
        contact_number: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDataSupplier(prevFormData => ({ ...prevFormData, [name]: value }));
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setDataSupplier(prevDataSupplier => ({
            ...prevDataSupplier,
            address: {
                ...prevDataSupplier.address,
                [name]: value
            }
        }));
    };

    const handleCreate = async () => {
        try {
            await axios.post(ProviderAPI.create, dataSupplier, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwt}`
                }
            });
            alert("Created Successfully!");
            fetchData(); 
            setDataSupplier({
                email: "",
                address: {
                    ward: "",
                    province: "",
                    city: "",
                    specific_address: ""
                },
                supplier_name: "",
                contact_person: "",
                contact_number: ""
            });
            setOpenModal(false);
        } catch (err) {
            alert("Change Password Success!");
            console.error("Error creating:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`${ProviderAPI.update}${id}`, dataSupplier, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwt}`
                }
            });
            alert("Updated Successfully!");
            fetchData(); 
            setId(null);
            setDataSupplier({
                email: "",
                address: {
                    ward: "",
                    province: "",
                    city: "",
                    specific_address: ""
                },
                supplier_name: "",
                contact_person: "",
                contact_number: ""
            });
            setOpenModal(false);
        } catch (err) {
            alert("Change Password Success!");
            console.error("Error update:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${ProviderAPI.delete}${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwt}`
                }
            });
            alert("Deleted Successfully!");
            fetchData(); 
            setId(null);
            setDataSupplier({
                email: "",
                address: {
                    ward: "",
                    province: "",
                    city: "",
                    specific_address: ""
                },
                supplier_name: "",
                contact_person: "",
                contact_number: ""
            });
            setOpenModal(false);
        } catch (err) {
            alert("Change Password Success!");
            console.error("Error delete:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(ProviderAPI.getAll, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwt}`
                }
            });
            setSuppliers(response.data);
        } catch (err) {
            console.error("Error fetching data:", err.message);
        } finally {
            setLoading(false);
        }
    };

    const filteredSuppliers = suppliers.filter((item) =>
        valueSearch.toLowerCase() === "" || item.supplier_name.toLowerCase().includes(valueSearch.toLowerCase())
    );

    const handleReset = () => {
        setValueSearch('');
        fetchData();
    };

    useEffect(() => {
        fetchData();
    }, []);

    return ( 
        <Box>
            <Toolbar />
            <Container sx={{width: '100%', mt: 5, mb: 2}}>
                <Typography variant="h5" sx={{fontWeight: 'bold', color: 'gray'}}>Manage Suppliers</Typography>
            </Container>

            <Container sx={{my: 2}}>
                <Typography sx={{color: 'gray', fontWeight: '400', fontStyle: 'italic'}}>Manage Suppliers • Tools</Typography>
                <Box sx={{width: '100%', my: 2, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
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
                            placeholder="Search suppliers by name..."
                            value={valueSearch}
                            onChange={(e) => setValueSearch(e.target.value)}
                        />
                        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                            <SearchIcon sx={{fontSize: '35px', color: 'gray'}} />
                        </IconButton>
                    </Paper>
                    <Box sx={{mx: 2, display: 'flex'}}>
                        <Button 
                            onClick={() => {
                                setId(null);
                                setOpenModal(true);
                            }} 
                            variant="outlined" startIcon={<AddIcon />}>
                            Create
                        </Button>
                        <Button 
                            onClick={handleReset} 
                            sx={{textAlign: 'center', ':hover': {background: 'transparent'}}}
                            variant="text" startIcon={<RotateLeftIcon sx={{width: '100%', ml: 1, color: 'green'}}/>}>
                        </Button>
                    </Box>
                </Box>
            </Container>
            
            <Container>
                <Box>
                    <TableContainer component={Paper}>
                        <Table aria-label="customized table">
                            <TableHead>
                                <TableRow sx={{backgroundColor: 'rgba(22, 24, 35, 0.09)'}}>
                                    <TableCell align="center"><Typography variant='h7' sx={{fontWeight: 'bold', color: 'gray'}}>#ID</Typography></TableCell>
                                    <TableCell align="left"><Typography variant='h7' sx={{fontWeight: 'bold', color: 'gray'}}>Email</Typography></TableCell>
                                    <TableCell align="left"><Typography variant='h7' sx={{fontWeight: 'bold', color: 'gray'}}>Address</Typography></TableCell>
                                    <TableCell align="left"><Typography variant='h7' sx={{fontWeight: 'bold', color: 'gray'}}>Supplier Name</Typography></TableCell>
                                    <TableCell align="left"><Typography variant='h7' sx={{fontWeight: 'bold', color: 'gray'}}>Contact Person</Typography></TableCell>
                                    <TableCell align="left"><Typography variant='h7' sx={{fontWeight: 'bold', color: 'gray'}}>Contact Number</Typography></TableCell>
                                    <TableCell align="left"><Typography variant='h7' sx={{fontWeight: 'bold', color: 'gray'}}>Actions</Typography></TableCell>
                                    <TableCell align="left"><Typography variant='h7' sx={{fontWeight: 'bold', color: 'gray'}}></Typography></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredSuppliers.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={8} align="center" sx={{color: 'gray'}}>There are no results based on "{valueSearch}"</TableCell>
                                    </TableRow>
                                ) : (
                                    filteredSuppliers.map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell align="center">{row.id}</TableCell>
                                            <TableCell align="left">{row.email}</TableCell>
                                            <TableCell align="left">{row.address ? `${row.address.specific_address}, ${row.address.ward}, ${row.address.province}, ${row.address.city}` : "not yet updated"}</TableCell>
                                            <TableCell align="left">{row.supplier_name}</TableCell>
                                            <TableCell align="left">{row.contact_person}</TableCell>
                                            <TableCell align="left">{row.contact_number}</TableCell>
                                            <TableCell align="left">
                                                <Button
                                                    onClick={() => {
                                                        setOpenModal(true);
                                                        setId(row.id);
                                                        setDataSupplier({
                                                            email: row.email,
                                                            address: {
                                                                ward: row.address.ward,
                                                                province: row.address.province,
                                                                city: row.address.city,
                                                                specific_address: row.address.specific_address
                                                            },
                                                            supplier_name: row.supplier_name,
                                                            contact_person: row.contact_person,
                                                            contact_number: row.contact_number
                                                        });
                                                    }}
                                                    sx={{ color: 'orange' }}>
                                                    <EditIcon />
                                                </Button>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Button
                                                    onClick={() => handleDelete(row.id)}
                                                    sx={{ color: 'red' }}>
                                                    <DeleteIcon />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Container>

            <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 800, border: '2px solid #000', boxShadow: 24, p: 4, borderRadius: 3, backgroundColor: 'white' }}>
                    <Grid container spacing={2}>
                        <Grid item md={12} >
                            <Typography sx={{textAlign: 'center', color: 'gray', fontWeight: 'bold'}} variant="h4">{id ? "Edit" : "Create"}</Typography>
                        </Grid>
                        <Grid item md={6}>
                            <TextField
                                label="Email" variant="standard" sx={{ width: '100%' }}
                                name="email"
                                value={dataSupplier.email}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        
                        <Grid item md={6}>
                            <TextField
                                label="Ward" variant="standard" sx={{ width: '100%' }}
                                name="ward"
                                value={dataSupplier.address.ward}
                                onChange={handleAddressChange}
                            />
                        </Grid>

                        <Grid item md={6}>
                            <TextField
                                label="Province" variant="standard" sx={{ width: '100%' }}
                                name="province"
                                value={dataSupplier.address.province}
                                onChange={handleAddressChange}
                            />
                        </Grid>

                        <Grid item md={6}>
                            <TextField
                                label="City" variant="standard" sx={{ width: '100%' }}
                                name="city"
                                value={dataSupplier.address.city}
                                onChange={handleAddressChange}
                            />
                        </Grid>
                        
                        <Grid item md={6}>
                            <TextField
                                label="Specific Address" variant="standard" sx={{ width: '100%' }}
                                name="specific_address"
                                value={dataSupplier.address.specific_address}
                                onChange={handleAddressChange}
                            />
                        </Grid>
                        
                        <Grid item md={6}>
                            <TextField
                                label="Supplier name" variant="standard" sx={{ width: '100%' }}
                                name="supplier_name"
                                value={dataSupplier.supplier_name}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        
                        <Grid item md={6}>
                            <TextField
                                label="Contact person" variant="standard" sx={{ width: '100%' }}
                                name="contact_person"
                                value={dataSupplier.contact_person}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item md={6}>
                            <TextField
                                label="Contact number" variant="standard" sx={{ width: '100%' }}
                                name="contact_number"
                                value={dataSupplier.contact_number}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item md={6}></Grid>
                        <Grid item md={6}>
                            <label style={{ fontStyle: 'italic', color: 'red' }}>{error}</label>
                        </Grid>
                        <Grid item md={6}>
                            <ButtonGroup sx={{ height: '50px', alignItems: 'center' }} orientation="horizontal" aria-label="Vertical button group">
                                <Button onClick={handleCreate}><AddIcon sx={{ color: 'green' }} /></Button>
                                <Button onClick={handleUpdate}><SaveAsIcon sx={{ color: 'orange' }} /></Button>
                                <Button onClick={() => setOpenModal(false)}><CloseIcon sx={{ color: 'red' }} /></Button>
                            </ButtonGroup>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </Box>
     );
}

export default ManageProviders;
