import axios from "axios";
import { useState, useEffect } from "react";
import {
    FormControl, Box, Button, Container, Divider, Grid, IconButton, InputBase, MenuItem, Modal, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Toolbar, Typography
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import PromotionAPI from "~/apis/Promotion";
import { ProductAPI } from "~/apis";

function ManagePromotion() {
    const [loading, setLoading] = useState(false);
    const [valueSearch, setValueSearch] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [error, setError] = useState('');
    const jwt = JSON.parse(localStorage.getItem('jwt'));

    const [promotion, setPromotion] = useState([]);
    const [products, setProducts] = useState([]);
    const [dataProduct, setDataProduct] = useState([]);
    const [id, setId] = useState();
    const [dataPromotion, setDataPromotion] = useState({
        name: '',
        discount_percent: 0,
        start_date: '',
        end_date: '',
        is_active: true,
        product_ids: []
    });

    const [formData, setFormData] = useState({
        product_id: ''
    });

    const handleEnterChange = (event) => {
        const { name, value } = event.target;
        setDataPromotion({
            ...dataPromotion,
            [name]: value
        });
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
          ...formData,
          [name]: value
        });
    };

    const addProductToPromotion = () => {
        if (formData.product_id) {
            setDataProduct([...dataProduct, { product_id: formData.product_id }]);
            setFormData({ product_id: '' });
        }
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const [promotionRes, productRes] = await Promise.all([
                axios.get(PromotionAPI.getAll, { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${jwt}` } }),
                axios.get(ProductAPI.getAll, { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${jwt}` } }),
            ]);
            setPromotion(promotionRes.data.content);
            setProducts(productRes.data.content);
        } catch (err) {
            console.error("Error fetching data:", err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = async () => {
        const data = {
            name: dataPromotion.name,
            discount_percent: parseFloat(dataPromotion.discount_percent),
            start_date: new Date(dataPromotion.start_date).toISOString(),
            end_date: new Date(dataPromotion.end_date).toISOString(),
            is_active: dataPromotion.is_active,
            product_ids: dataProduct.map(item => parseInt(item.product_id))
        };

        console.log("Data to be sent:", data);

        try {
            const response = await axios.post(PromotionAPI.create, data, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwt}`
                }
            });
            console.log("API Response:", response);
            alert("Promotion added successfully!");
            setOpenModal(false);
            setDataPromotion({
                name: '',
                discount_percent: 0,
                start_date: '',
                end_date: '',
                is_active: true,
                product_ids: []
            });
            setDataProduct([]);
            fetchData();
        } catch (err) {
            console.error("Error adding promotion:", err.response ? err.response.data : err.message);
            if (err.response && err.response.data) {
                alert("Change Password Success!");
            } else {
                alert("Change Password Success!");
            }
        }
    };

    const handleEdit = async () => {
        const data = {
            name: dataPromotion.name,
            discount_percent: parseFloat(dataPromotion.discount_percent),
            start_date: new Date(dataPromotion.start_date).toISOString(),
            end_date: new Date(dataPromotion.end_date).toISOString(),
            is_active: dataPromotion.is_active,
            product_ids: dataProduct.map(item => parseInt(item.product_id))
        };
        try {
            const response = await axios.put(`${PromotionAPI.update}${id}`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwt}`
                }
            });
            console.log("API Response:", response);
            alert("Promotion updated successfully!");
            setId(null);
            setOpenModal(false);
            setDataPromotion({
                name: '',
                discount_percent: 0,
                start_date: '',
                end_date: '',
                is_active: true,
                product_ids: []
            });
            setDataProduct([]);
            fetchData();
        } catch (err) {
            console.error("Error updated promotion:", err.response ? err.response.data : err.message);
            if (err.response && err.response.data) {
                alert("Change Password Success!");
            } else {
                alert("Change Password Success!");
            }
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`${PromotionAPI.delete}${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwt}`
                }
            });
            console.log("API Response:", response);
            alert("Promotion deleted successfully!");
            setId(null);
            setOpenModal(false);
            setDataPromotion({
                name: '',
                discount_percent: 0,
                start_date: '',
                end_date: '',
                is_active: true,
                product_ids: []
            });
            setDataProduct([]);
            fetchData();
        } catch (err) {
            console.error("Error deleted promotion:", err.response ? err.response.data : err.message);
            if (err.response && err.response.data) {
                alert("Change Password Success!");
            } else {
                alert("Change Password Success!");
            }
        }
    }

    const handleSearch = () => {
        console.log(valueSearch);
    };

    const handleReset = () => {
        setValueSearch('');
        fetchData();
    };

    const filteredPromotion = promotion.filter(stock =>
        valueSearch === "" || stock.name.toLowerCase().includes(valueSearch.toLowerCase())
    );

    useEffect(() => {
        fetchData();
    }, []);

    return ( 
        <Box>
            <Toolbar />
            <Container sx={{ width: '100%', mt: 5, mb: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'gray' }}>Manage Promotion</Typography>
            </Container>

            <Container sx={{ my: 2 }}>
                <Typography sx={{ color: 'gray', fontWeight: '400', fontStyle: 'italic' }}>Manage Promotion • Tools</Typography>
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
                            placeholder="Search promotion by name..."
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
                        <Button onClick={() => {
                            setId(null);
                            setOpenModal(true);
                        }} variant="outlined" startIcon={<AddIcon />}>Create</Button>
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
                                <TableCell align="left">Name</TableCell>
                                <TableCell align="center">Discount</TableCell>
                                <TableCell align="center">Start Date</TableCell>
                                <TableCell align="center">End Date</TableCell>
                                <TableCell align="center">Active</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>    
                            {filteredPromotion.map(row => (
                                <TableRow key={row.id}>
                                    <TableCell align="center">{row.id}</TableCell>
                                    <TableCell align="left">{row.name}</TableCell>
                                    <TableCell align="center">{row.discount_percent}%</TableCell>
                                    <TableCell align="center">{row.start_date}</TableCell>
                                    <TableCell align="center">{row.end_date}</TableCell>
                                    <TableCell align="center">{row.is_active ? "Yes" : "No"}</TableCell>
                                    <TableCell align="center">
                                        <Button
                                            onClick={() => {
                                                setId(row.id);
                                                setDataPromotion({
                                                    name: row.name,
                                                    discount_percent: row.discount_percent,
                                                    start_date: row.start_date,
                                                    end_date: row.end_date,
                                                    is_active: row.is_active,
                                                    product_ids: row.product_ids
                                                });
                                                setOpenModal(true);
                                            }}
                                        ><EditIcon sx={{color: 'orange'}} /></Button>
                                        <Button
                                            onClick={() => handleDelete(row.id)}
                                        ><DeleteIcon sx={{color: 'red'}} /></Button>
                                    </TableCell>
                                </TableRow>
                            ))}                            
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <Box component="form" sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 800, border: '2px solid #000', boxShadow: 24, p: 4, borderRadius: 3, backgroundColor: 'white' }}>
                    <FormControl>
                        <Grid container spacing={2}>
                            <Grid item md={12} >
                                <Typography sx={{textAlign: 'center', color: 'gray', fontWeight: 'bold'}} variant="h4">{id ? "Edit" : "Create"}</Typography>
                            </Grid>
                            <Grid item md={12}>
                                {dataProduct.map((data, i) => (
                                    <Typography key={i}>
                                        {i + 1} - Product ID: {data.product_id}
                                    </Typography>
                                ))}
                            </Grid>
                            <Grid item md={6}>
                                <label style={{color: 'gray', fontWeight: 'bold'}}>Enter name</label>
                                <TextField
                                    required
                                    label="Name" variant="standard" sx={{ width: '100%', height: '100%' }}
                                    name="name"
                                    value={dataPromotion.name}
                                    onChange={handleEnterChange}
                                />
                            </Grid>
                            <Grid item md={6}>
                                <label style={{color: 'gray', fontWeight: 'bold'}}>Enter discount</label>
                                <TextField
                                    required
                                    label="Discount" variant="standard" sx={{ width: '100%', height: '100%' }}
                                    name="discount_percent"
                                    type="number"
                                    value={dataPromotion.discount_percent}
                                    onChange={handleEnterChange}
                                />
                            </Grid>
                            <Grid item md={6}>
                                <label style={{color: 'gray', fontWeight: 'bold'}}>Enter start date</label>
                                <TextField
                                    required
                                    variant="standard" sx={{ width: '100%', height: '100%' }}
                                    name="start_date"
                                    type="datetime-local"
                                    value={dataPromotion.start_date}
                                    onChange={handleEnterChange}
                                />
                            </Grid>
                            <Grid item md={6}>
                                <label style={{color: 'gray', fontWeight: 'bold'}}>Enter end date</label>
                                <TextField
                                    required
                                    variant="standard" sx={{ width: '100%', height: '100%' }}
                                    name="end_date"
                                    type="datetime-local"
                                    value={dataPromotion.end_date}
                                    onChange={handleEnterChange}
                                />
                            </Grid>
                            <Grid item md={6}>
                                <label style={{color: 'gray', fontWeight: 'bold'}}>Choose product</label>
                                <Select
                                    required
                                    sx={{ width: '100%', height: '100%' }}
                                    variant="standard"
                                    name="product_id"
                                    value={formData.product_id}
                                    onChange={handleInputChange}
                                >
                                    {products.map((product, i) => (
                                        <MenuItem key={i} value={product.id}>{product.id} - {product.name}</MenuItem>
                                    ))}
                                </Select>
                            </Grid>
                            <Grid item md={6}>
                                <label style={{color: 'gray', fontWeight: 'bold'}}>Active</label>
                                <Select
                                    required
                                    sx={{ width: '100%', height: '100%' }}
                                    variant="standard"
                                    name="is_active"
                                    value={formData.is_active}
                                    onChange={handleInputChange}
                                >                                   
                                    <MenuItem value={true}>Yes</MenuItem>
                                    <MenuItem value={false}>No</MenuItem>                                   
                                </Select>
                            </Grid>
                            <Grid item md={12}>
                                <Button variant="outlined" sx={{width: '100%', color: 'green', mt: 5}} onClick={addProductToPromotion}><AddIcon /></Button>
                            </Grid>
                            <Grid item md={12}>
                                <Button variant="outlined" sx={{width: '100%', color: 'green', borderColor: 'orange', ":hover": {borderColor: 'orange'} }} onClick={handleAdd}><AddCircleOutlineIcon /></Button>
                            </Grid>
                            <Grid item md={12}>
                                <Button variant="outlined" sx={{width: '100%', color: 'orange', borderColor: 'orange', ":hover": {borderColor: 'orange'} }} onClick={handleEdit}><SaveAsIcon /></Button>
                            </Grid>
                        </Grid>
                    </FormControl>
                </Box>
            </Modal>
        </Box>
    );
}

export default ManagePromotion;
