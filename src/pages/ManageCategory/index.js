
import axios from "axios";
import { useState, useEffect } from "react";
import {
    Box, Button, ButtonGroup, Container, Divider, Grid, IconButton, InputBase, MenuItem, Modal, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Toolbar, Typography
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search'; // search icon
import AddIcon from '@mui/icons-material/Add';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import SaveAsIcon from '@mui/icons-material/SaveAs';

import { CategoryAPI } from "~/apis";
import Image from "~/components/Image";
import Images from "~/utils/Images";
import ChildrenCategory from "./Children";

function ManageCategory() {

    const [loading, setLoading] = useState(false);
    const [valueSearch, setValueSearch] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [error, setError] = useState('');
    const jwt = JSON.parse(localStorage.getItem('jwt'));

    const [parentCategories, setParentCategories] = useState([]);
    
    const [view, setView] = useState(false);

    const [id, setId] = useState();
    const [dataCategory, setDataCategory] = useState({ 
        name: "",
        image: ""  
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDataCategory(prevFormData => ({ ...prevFormData, [name]: value }));
    };

    const handleImageChange = (e) => {
        const imageFile = e.target.files[0];
        setDataCategory(prevFormData => ({ ...prevFormData, image: imageFile }));
        console.log("Image changed", imageFile);
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const [parentCategoryRes, childCategoryRes] = await Promise.all([
                axios.get(CategoryAPI.getAll, { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${jwt}` } }),
            ]);
            setParentCategories(parentCategoryRes.data);
        } catch (err) {
            console.error("Error fetching data:", err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async () => {
        const formData = new FormData();
        formData.append("name", dataCategory.name);
        formData.append("image", dataCategory.image);
        setLoading(true);
        try {
            await axios.post(CategoryAPI.create, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${jwt}`
                }
            });
            alert("Created successfully!");
            setDataCategory({ 
                name: "",
                image: ""  
            });
            fetchData();
            setOpenModal(false);
        } catch (err) {
            alert("Change Password Success!");
            console.log("Err add: " + err);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async () => {
        const formData = new FormData();
        formData.append("name", dataCategory.name);
        formData.append("image", dataCategory.image);
        setLoading(true);
        try {
            await axios.put(`${CategoryAPI.update}${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${jwt}`
                }
            });
            alert("Updated successfully!");
            setDataCategory({ 
                name: "",
                image: ""  
            });
            setId(null);
            fetchData();
            setOpenModal(false);
        } catch (err) {
            alert("Change Password Success!");
            console.log("Err update: " + err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${CategoryAPI.delete}${id}`, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${jwt}`
                }
            });
            alert("Deleted successfully!");
            setDataCategory({ 
                name: "",
                image: ""  
            });
            setId(null);
            fetchData();
            setOpenModal(false);
        } catch (err) {
            alert("Change Password Success!");
            console.log("Err update: " + err);
        } finally {
            setLoading(false);
        }
    };

    const filteredParent = parentCategories.filter(cat =>
        valueSearch === "" || cat.name.toLowerCase().includes(valueSearch.toLowerCase())
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
                <Typography variant="h5" sx={{fontWeight: 'bold', color: 'gray'}}>Manage Categories</Typography>
            </Container>

            {/* list tab */}
            <Container sx={{my: 2}}>
                <Typography sx={{color: 'gray', fontWeight: '400', fontStyle: 'italic'}}>Manage Categories • Tools</Typography>
                <Box sx={{width: '100%', my: 2, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    {/* button search */}
                    {view ? (
                        <></>
                    ) : (
                        <Paper
                        component="form"
                        sx={{
                            width: '100%',
                            height: "50px",
                            //mx: 2,
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
                            placeholder="Search Categories by name..."
                            value={valueSearch}
                            onChange={(e) => setValueSearch(e.target.value)}
                        />
                        <Divider
                            sx={{ height: 28, m: 0.5 }}
                            orientation="vertical"
                        />
                        <IconButton
                            type="button"
                            sx={{ p: "10px" }}
                            aria-label="search"
                            //onClick={handlePushValueSearch}
                        >
                        <SearchIcon sx={{fontSize: '35px', color: 'gray'}} />
                        </IconButton>
                    </Paper>
                    )}
                    {/* actions */}
                    <Box sx={{mx: 2, display: 'flex', alignItems: 'center'}}>
                        {/* button add */}
                        {view ? (
                            <></>
                        ) : (
                            <Button 
                                sx={{width: '150px', height: '50px'}}
                                onClick={() => {
                                    setId(null);
                                    setOpenModal(true);
                                }} variant="outlined" startIcon={<AddIcon />}>
                                Create
                            </Button>
                        )}
                        <Button 
                            onClick={() => setView(!view)}
                            sx={{mx: 1, color: 'black', borderColor: 'orange', height: '50px'}} variant="outlined">
                            {view ? "Children" : "Parent"}
                        </Button>
                        {/* button reset */}
                        {view ? (
                            <></>
                        ) : (
                            <Button onClick={handleReset} sx={{textAlign: 'center', ':hover': {background: 'transparent'}}}
                                variant="text" startIcon={<RotateLeftIcon sx={{width: '100%', ml: 1, color: 'green'}}/>}>
                            </Button>
                        )}
                    </Box>
                </Box>
            </Container>
            
            {view ? (
                <ChildrenCategory>
                </ChildrenCategory>
            ) : (
            <Box>
                <TableContainer component={Paper}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">#ID</TableCell>
                                <TableCell align="left">Name Category</TableCell>
                                <TableCell align="center">Image</TableCell>
                                <TableCell align="center">Children</TableCell>
                                <TableCell align="center">Actions</TableCell>
                                <TableCell align="center"><RemoveIcon /></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredParent.map(row => (
                                <TableRow key={row.id}>
                                    <TableCell align="center">{row.id}</TableCell>
                                    <TableCell align="left">{row.name}</TableCell>
                                    <TableCell align="center"><Image src={row.image_url || Images.noImage} alt="" style={{width: '80px', height: '80px'}} /></TableCell>
                                    <TableCell align="left">
                                        <ul>
                                            {row.child_category.map((item, i) => {
                                                return <li key={i}>{item.name}</li>
                                            })}
                                        </ul>
                                    </TableCell> 
                                    <TableCell align="center">
                                        <Button
                                            onClick={(e) => {
                                                setOpenModal(true);
                                                setDataCategory({
                                                    name: row.name,
                                                    image: row.image
                                                });
                                                setId(row.id);
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
            )}
            <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <Box component={"form"} sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 800, border: '2px solid #000', boxShadow: 24, p: 4, borderRadius: 3, backgroundColor: 'white' }}>
                    <Grid container spacing={2}>
                        <Grid item md={12} >
                            <Typography sx={{textAlign: 'center', color: 'gray', fontWeight: 'bold'}} variant="h4">{id ? "Edit" : "Create"}</Typography>
                        </Grid>
                        <Grid item md={6}>
                            <TextField
                            required
                                label="Name" variant="standard" sx={{ width: '100%' }}
                                name="name"
                                value={dataCategory.name}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item md={6}>
                            
                        </Grid>
                        {/* <Grid item md={6}>
                            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                                <Image src={dataCategory.image || Images.noImage} alt="" style={{width: '80px', height: '80px'}} />
                            </Box>
                        </Grid> */}
                        <Grid item md={6}>
                            <TextField
                            required
                                label="Image" variant="standard" sx={{ width: '100%' }}
                                name="image"
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
            
        </Box>
     );
}

export default ManageCategory;