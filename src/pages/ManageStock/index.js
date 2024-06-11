
import axios from "axios";
import { useState, useEffect } from "react";
import {
    Box, Button, Container, Divider, Grid, IconButton, InputBase, MenuItem, Modal, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Toolbar, Typography
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import SaveAsIcon from '@mui/icons-material/SaveAs';

import StockAPI from "~/apis/Stock";
import { ProductAPI } from "~/apis";
import Loading from "~/components/containers/Loading";
import DashboardStock from "./Dashboard";

function ManageStock() {

    const [loading, setLoading] = useState(false);
    const [valueSearch, setValueSearch] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [error, setError] = useState('');
    const jwt = JSON.parse(localStorage.getItem('jwt'));

    const [exStocks, setExStocks] = useState([]);
    const [inStocks, setInStocks] = useState([]);
    const [products, setProducts] = useState([]);

    const [dataStocks, setDataStocks] = useState([
        // {
        //     quantity: null,
        //     product_id: null
        // }
    ]);

    const [formData, setFormData] = useState({
        quantity: '',
        product_id: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
          ...formData,
          [name]: value
        });
    };

    const add = () => {
        if(checkValid()){
            setDataStocks([...dataStocks, {
                quantity: formData.quantity,
                product_id: formData.product_id
            }]);
        }
    };

    const saved = () => {
        if(view){
            if(checkValid()){
                handleInStock();
            }
        }else {
            if(checkValid()){
                handleExStock();
            }
        }
    };

    const [view, setView] = useState(false);

    const checkValid = () => {
        if(formData.product_id === '' || formData.product_id === null){
            alert('Please select a product_id!');
            return false;
        }
        if(formData.quantity === '' || formData.quantity === null){
            alert('Please select a quantity!');
            return false;
        }
        // if(formData.product_id !== '' && formData.product_id !== null){
        //     for(let i = 0; i < dataStocks.length; i++){
        //         if(dataStocks[i].product_id === formData.product_id){
        //             alert("This product already exists!");
        //             break;     
        //         } 
        //     }
        //     return false;
        // }
        if(formData.quantity%2 != 0){
            alert("quantity must be a positive integer");
            return false;
        }
        if(formData.quantity < 1){
            alert("product cannot be less than 1!");
            return false;
        }
        return true;
    };

    const fetchData = async () => {
        const jwt = localStorage.getItem('jwt');
        if (!jwt) {
            console.error("JWT not found");
            return;
        }

        const parsedJwt = JSON.parse(jwt);
        if (!parsedJwt) {
            console.error("Failed to parse JWT");
            return;
        }

        try {
            const [stockExRes, stockIxRes, productRes] = await Promise.all([
                axios.get(StockAPI.getAllEx, { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${parsedJwt}` } }),
                axios.get(StockAPI.getAllIx, { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${parsedJwt}` } }),
                axios.get(ProductAPI.getAll, { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${parsedJwt}` } }),
            ]);
            setExStocks(stockExRes.data.content);
            setInStocks(stockIxRes.data.content);
            setProducts(productRes.data.content);
        } catch (err) {
            console.error("Error fetching data:", err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleExStock = async () => {
        setLoading(true);
        try {
            await axios.post(StockAPI.createEx, dataStocks, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwt}`
                }
            });
            alert("Added!");
            dataStocks = null;
            setOpenModal(false)
            fetchData();
        } catch (err) {
            alert("Change Password Success!");
            console.log("Err add Ex: " + err);
        } finally {
            setLoading(false);
        }
    };

    const handleInStock = async () => {
        setLoading(true);
        try {
            await axios.post(StockAPI.createIn, dataStocks, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwt}`
                }
            });
            alert("Added!");
            dataStocks = null;
            setOpenModal(false)
            fetchData();
        } catch (err) {
            alert("Change Password Success!");
            console.log("Err add In: " + err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSearch = () => {
        console.log(valueSearch);
    };

    const handleReset = () => {
        window.location.href = ('/manage-stock');
    };

    const filteredExStocks = exStocks.filter(stock =>
        valueSearch === "" || stock.creatorName.toLowerCase().includes(valueSearch.toLowerCase())
    );
    const filteredInStocks = inStocks.filter(stock =>
        valueSearch === "" || stock.creatorName.toLowerCase().includes(valueSearch.toLowerCase())
    );

    return ( 
        <Box>
            <Toolbar />
            <Container sx={{ width: '100%', mt: 5, mb: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'gray' }}>Manage Stock</Typography>
            </Container>

            <DashboardStock />

            <Container sx={{ my: 2 }}>
                <Typography sx={{ color: 'gray', fontWeight: '400', fontStyle: 'italic' }}>Manage Stock • Tools</Typography>
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
                            placeholder="Search stock by creator name..."
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
                        <Button onClick={() => setView(!view)}  variant="outlined" sx={{mx: 1}}>{view ? "Import" : "Export"}</Button>
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
                                <TableCell align="left">Creator Name</TableCell>
                                <TableCell align="center">Details</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* false is export, true is import */}
                            {view ? (
                                <>
                                {filteredInStocks.map(row => (
                                    <TableRow key={row.id}>
                                        <TableCell align="center">{row.id}</TableCell>
                                        <TableCell align="left">{row.creatorName}</TableCell>
                                        <TableCell align="left">
                                            <ol>
                                                {row.importStockInvoiceDetails ? (
                                                    <ul>
                                                        {row.importStockInvoiceDetails.map((item) => (
                                                            <li key={item.id}>{item.productName} x {item.quantity}</li>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    <span>No details available</span>
                                                )}
                                            </ol>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                </>
                            ) : (
                                <>
                                {filteredExStocks.map(row => (
                                    <TableRow key={row.id}>
                                        <TableCell align="center">{row.id}</TableCell>
                                        <TableCell align="left">{row.creatorName}</TableCell>
                                        <TableCell align="left">
                                            <ol>
                                                {row.exportStockInvoiceDetails ? (
                                                    <ul>
                                                        {row.exportStockInvoiceDetails.map((item) => (
                                                            <li key={item.id}>{item.productName} x {item.quantity}</li>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    <span>No details available</span>
                                                )}
                                            </ol>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                </>
                            )}
                            
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
                                {dataStocks !== null ? (
                                    <>
                                    {dataStocks.map( (data, i) => {
                                        return <Typography key={i}>
                                            {i+1} - Quantity: {data.quantity} & Products: {data.product_id}
                                            {/* <Button onClick={handleRemoveDataStock}>-</Button> */}
                                        </Typography>
                                    })}
                                    </> 
                                ) : (
                                    <></>
                                )}     
                            </Grid>                           
                            <Grid item md={6}>
                                <label style={{color: 'gray', fontWeight: 'bold'}}>Enter product quantity</label>
                                <TextField
                                    //required={true}
                                    label="Import quantity" variant="standard" sx={{ width: '100%', height: '100%'  }}
                                    name="quantity"
                                    value={formData.quantity}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item md={6}>
                                <label style={{color: 'gray', fontWeight: 'bold'}}>Choose product</label>
                                <Select
                                    sx={{ width: '100%', height: '100%' }}
                                    variant="standard"
                                    label="choose product"
                                    name="product_id"
                                    value={formData.product_id}
                                    onChange={handleInputChange}
                                >
                                    {products.map( (data, i) => {
                                        return <MenuItem key={i} value={data.id}>{data.id} - {data.name}</MenuItem>
                                    })}
                                </Select>
                            </Grid>
                            <Grid item md={12}>
                                <Button variant="outlined" sx={{width: '100%', color: 'green', mt: 5}} onClick={add}><AddIcon /></Button>
                            </Grid>
                            <Grid item md={12}>
                                <Button variant="outlined" sx={{width: '100%', color: 'orange', borderColor: 'orange', ":hover": {borderColor: 'orange'} }} onClick={saved}><SaveAsIcon /></Button>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Modal>
            <Loading open={loading}/>
        </Box>
     );
}

export default ManageStock;