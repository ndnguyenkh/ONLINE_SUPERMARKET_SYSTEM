import axios from "axios";
import { useState, useEffect } from "react";
import {
    Box, Button, ButtonGroup, Container, Divider, Grid, IconButton, InputBase, MenuItem, Modal, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Toolbar, Typography
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import SaveAsIcon from '@mui/icons-material/SaveAs';

import { CategoryAPI, ProductAPI, ProviderAPI } from "~/apis";
import Image from "~/components/Image";
import Images from "~/utils/Images";
import Loading from "~/components/containers/Loading";

function ManageProduct() {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [providers, setProviders] = useState([]);
    const [categories, setCategories] = useState([]);
    const [valueSearch, setValueSearch] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [error, setError] = useState('');
    const [id, setId] = useState();
    const [formData, setFormData] = useState({
        name: '',
        import_price: '',
        sell_price: '',
        description: '',
        supplier_id: '',
        category_id: '',
        images: ''
    });

    useEffect(() => {
        fetchData();
    }, []);

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

        setLoading(true);
        try {
            const [productsRes, providersRes, categoriesRes] = await Promise.all([
                axios.get(ProductAPI.getAll, { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${parsedJwt}` } }),
                axios.get(ProviderAPI.getAll, { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${parsedJwt}` } }),
                axios.get(CategoryAPI.getAll, { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${parsedJwt}` } })
            ]);

            setProducts(productsRes.data.content);
            setProviders(providersRes.data);
            setCategories(categoriesRes.data);
        } catch (err) {
            console.error("Error fetching data:", err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
    };

    const handleImageChange = (e) => {
        const imageFile = e.target.files[0];
        setFormData(prevFormData => ({ ...prevFormData, images: imageFile }));
        console.log("Image changed", imageFile);
    };

    useEffect(() => {
        console.log("formData.images has changed", formData.images);
    }, [formData.images]);

    const handleSearch = () => {
        console.log(valueSearch);
    };

    const handleReset = () => {
        window.location.href = ('/manage-products');
    };

    const handleCreate = async () => {
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

        const data = new FormData();
        Object.keys(formData).forEach(key => {
            data.append(key, formData[key]);
        });
        data.append('is_featured', true);
        data.append('is_published', false);
        data.append('product_attribute_ids', []);

        setLoading(true);
        try {
            await axios.post(ProductAPI.create, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${parsedJwt}`
                }
            });
            alert("Created Success!");
            fetchData(); // Refresh product list after creation
            setFormData({
                name: '',
                import_price: null,
                sell_price: null,
                description: '',
                supplier_id: null,
                category_id: null,
                images: null
            });
        } catch (err) {
            alert("Change Password Success!");
            console.error("Error creating product:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async () => {
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

        const data = new FormData();
        Object.keys(formData).forEach(key => {
            data.append(key, formData[key]);
        });
        data.append('is_featured', true);
        data.append('is_published', false);
        data.append('product_attribute_ids', []);

        setLoading(true);
        try {
            await axios.put(`${ProductAPI.update}${id}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${parsedJwt}`
                }
            });
            alert("Updated Success!");
            fetchData(); // Refresh product list after creation
            setId(null);
            console.log("id: " + id);
        } catch (err) {
            alert("Change Password Success!");
            console.error("Error update product:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
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
        setLoading(true);
        try {
            await axios.delete(`${ProductAPI.delete}${id}`, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${parsedJwt}`
                }
            });
            alert("Deleted Success!");
            fetchData(); // Refresh product list after creation
            setId(null);
            console.log("id: " + id);
        } catch (err) {
            alert("Change Password Success!");
            console.error("Error Delete product:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const filteredProducts = products.filter(product =>
        valueSearch === "" || product.name.toLowerCase().includes(valueSearch.toLowerCase())
    );

    return (
        <Box>
            <Toolbar />
            <Container sx={{ width: '100%', mt: 5, mb: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'gray' }}>Manage Products</Typography>
            </Container>

            <Container sx={{ my: 2 }}>
                <Typography sx={{ color: 'gray', fontWeight: '400', fontStyle: 'italic' }}>Manage Products • Tools</Typography>
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
                            placeholder="Search for Products..."
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
                                <TableCell align="center">Category</TableCell>
                                <TableCell align="center">Old Price</TableCell>
                                <TableCell align="center">New Price</TableCell>
                                <TableCell align="center">Stock quantity</TableCell>
                                <TableCell align="center">Image</TableCell>
                                <TableCell align="center"><RemoveIcon /></TableCell>
                                <TableCell align="center"><RemoveIcon /></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredProducts.map(row => (
                                <TableRow key={row.id}>
                                    <TableCell align="center">{row.id}</TableCell>
                                    <TableCell align="left">{row.name}</TableCell>
                                    <TableCell align="center">{row.category.name}</TableCell>
                                    <TableCell align="center">{row.sell_price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</TableCell>
                                    <TableCell align="center">{row.promotion ? row.sell_price + (row.sell_price * (row.promotion.discount_percent / 100)) : row.sell_price}</TableCell>
                                    <TableCell align="center">{row.in_stock_quantity}</TableCell>
                                    <TableCell align="center">
                                        <Image alt="" src={row.images_url || Images.noImage} style={{ width: '80px', height: '80px' }} />
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button
                                            onClick={() => {
                                                setOpenModal(true);
                                                setId(row.id);
                                                setFormData({
                                                    name: row.name,
                                                    import_price: row.import_price,
                                                    sell_price: row.sell_price,
                                                    description: row.description,
                                                    supplier_id: row.supplier_id,
                                                    category_id: row.category.id,
                                                    images: row.images
                                                });
                                            }}
                                        ><EditIcon sx={{ color: 'orange' }} /></Button>
                                    </TableCell>
                                    <TableCell align="center">
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
                    <Grid container spacing={2}>
                        <Grid item md={12} >
                            <Typography sx={{textAlign: 'center', color: 'gray', fontWeight: 'bold'}} variant="h4">{id ? "Edit" : "Create"}</Typography>
                        </Grid>
                        <Grid item md={6}>
                            <TextField
                                label="Name" variant="standard" sx={{ width: '100%' }}
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item md={6}>
                            <Select
                                sx={{ width: '100%', height: '100%' }}
                                variant="standard"
                                name="supplier_id"
                                value={formData.supplier_id}
                                onChange={handleInputChange}
                            >
                                {providers.map((provider, i) => (
                                    <MenuItem key={i} value={provider.id}>{provider.supplier_name}</MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item md={6}>
                            <TextField
                                label="Import Price" variant="standard" sx={{ width: '100%' }}
                                name="import_price"
                                value={formData.import_price}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item md={6}>
                            <TextField
                                label="Sell Price" variant="standard" sx={{ width: '100%' }}
                                name="sell_price"
                                value={formData.sell_price}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item md={6}>
                            <TextField
                                label="Description" variant="standard" sx={{ width: '100%' }}
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item md={6}>
                            <Select
                                sx={{ width: '100%', height: '100%' }}
                                variant="standard"
                                name="category_id"
                                value={formData.category_id}
                                onChange={handleInputChange}
                            >
                                {categories.map((category, i) => (
                                    <MenuItem key={i} value={category.id}>{category.name}</MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item md={6}>
                            <TextField
                                label="Image" variant="standard" sx={{ width: '100%' }}
                                type="file"
                                onChange={handleImageChange}
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

            <Loading open={loading} />
        </Box>
    );
}

export default ManageProduct;
