
import axios from 'axios';
import { useEffect, useState } from "react";
import { Box, Button, Container, Grid, MenuItem, Select, TextField, Typography } from "@mui/material";

import { CategoryAPI } from '~/apis';
import Loading from '~/components/containers/Loading';

function CreateProvider({valueTab}) {

    const [child, setChild] = useState(false);
    const [loading, setLoading] = useState(false);

    const jwt = JSON.parse(localStorage.getItem('jwt'));

    const [name, setName] = useState('');
    const [image, setImage] = useState('');

    const [category, setCategory] = useState([]);
    const [parentId, setParentId] = useState('');

    const [message, setMessage] = useState('');

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
      };

    const addCategory = async () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('image', image);
        setLoading(true);
        try {
            const response = await axios.post(CategoryAPI.create, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${jwt}`
              }
            });
            //setMessage(response.data.message);
            alert("Created category!");
        } catch (error) {
            setMessage('Error uploading data.');
            console.error('There was an error uploading the data!', error);
        } finally {
            setLoading(false);
        }
    }

    const addCHildCategory = async () => {
        const data = {
            name,
            parent_id: parentId
        };
        setLoading(true);
        try{
            const response = await axios.post(CategoryAPI.createChild, data, {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${jwt}`
                }
            });
            //setMessage(response.data.message);
            alert("Created child category!");
        }catch (error) {
            setMessage('Error uploading data.');
            console.error('There was an error uploading the data!', error);
        }finally {
            setLoading(false);
        }
    }

    const handleSubmit = () => {
        if(child){
            addCHildCategory();
        }else {
            addCategory();
        }
    }

    const getAllCategory = async () => {
        try {
            const response = await axios.get(CategoryAPI.getAll);
            // setCategories(response.data.child_category);
            // console.log(categories);
            setCategory(response.data);
            setLoading(false);
            //console.log(response.data);
        } catch (err) {
            //setError(err);
            setLoading(false);
        }
    }

    useEffect(() => {
        getAllCategory();
    }, []);

    return ( 
        <Box hidden={valueTab !== "create"} sx={{width: '1100px'}}>
            <Box sx={{m: 2}}>
                <Typography sx={{color: 'gray', mb: 2}}>{child ? "Child Categories" : "Parent Categories"}<Button sx={{mx: 5}} variant='outlined' onClick={() => setChild(!child)}>Change</Button></Typography>
                <Grid container spacing={2}>
                    <Grid item md={6}>
                        <Box>
                            <Container sx={{height: '50px', color: 'orange', fontWeight: 'bold'}}>
                                Fill in the information of a Category you want to create
                            </Container>
                            {child ? (
                                <Box>
                                    <form style={{marginLeft: '25px'}}>
                                        <Box sx={{width: '100%', mb: 2}}>
                                            <label style={{fontWeight: 350}}>Name: <span style={{marginLeft: 5, color: 'red'}}>*</span></label>
                                            <TextField
                                                placeholder={"Enter name"}
                                                multiline
                                                maxRows={4}
                                                variant="standard"
                                                sx={{width: '100%', pt: 2}}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                            <label style={{fontStyle: 'italic', color: 'red'}}></label>
                                        </Box> 
                                        <Box sx={{width: '100%', mb: 2}}>
                                            <label style={{fontWeight: 350}}>Parent Category: <span style={{marginLeft: 5, color: 'red'}}>*</span></label>
                                            <Select
                                                //placeholder={"Parent Category"}
                                                multiline
                                                maxRows={4}
                                                variant="standard"
                                                value={parentId}
                                                sx={{width: '100%', pt: 2}}
                                                onChange={(e) => setParentId(e.target.value)}
                                            >
                                                {/* <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem> */}
                                                {category.map((data, i) => {
                                                    
                                                    return <MenuItem key={i} value={data.id}>{i+1} - {data.name}</MenuItem>                                             
                                                })}
                                                
                                            </Select>
                                            <label style={{fontStyle: 'italic', color: 'red'}}></label>
                                        </Box>                                        
                                    </form>
                                </Box> 
                            ) : (
                                <Box>
                                    <form style={{marginLeft: '25px'}}>
                                        <Box sx={{width: '100%', mb: 2}}>
                                            <label style={{fontWeight: 350}}>Name: <span style={{marginLeft: 5, color: 'red'}}>*</span></label>
                                            <TextField
                                                placeholder={"Enter name"}
                                                multiline
                                                maxRows={4}
                                                variant="standard"
                                                sx={{width: '100%', pt: 2}}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                            <label style={{fontStyle: 'italic', color: 'red'}}></label>
                                        </Box> 
                                        <Box sx={{width: '100%', mb: 2}}>
                                            <label style={{fontWeight: 350}}>Image: <span style={{marginLeft: 5, color: 'red'}}>*</span></label>
                                            <TextField
                                                // placeholder={data.placeholder}
                                                //multiline
                                                maxRows={4}
                                                variant="standard"
                                                type='file'
                                                sx={{width: '100%', pt: 2}}
                                                onChange={handleImageChange}
                                            />
                                            <label style={{fontStyle: 'italic', color: 'red'}}></label>
                                        </Box>                                        
                                    </form>
                                </Box> 
                            )}
                                                      
                        </Box>
                    </Grid>
                    <Grid item md={6}>
                        <Container sx={{height: '50px', color: 'orange', fontWeight: 'bold'}}>
                            Review Category information
                        </Container>
                        {/* review code */}
                        <Box sx={{ml: 4, color: 'gray', fontStyle: 'italic  '}}>
                                <span style={{display: 'flex'}}>

                                    Name: {name !== '' ? <Typography sx={{ml: 2}}>{name}</Typography> : <Typography  sx={{ml: 2}}>empty</Typography>}
                                </span>
                        </Box>
                        <label style={{fontStyle: 'italic', color: 'red'}}>{message && <p>{message}</p>}</label>
                        <Box sx={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                                <Box sx={{width: '100%', display: 'grid', placeContent: 'center'}}>
                                    <Button
                                        //disabled={!checked}
                                        underline="none"
                                        sx={{
                                            mt: 10,
                                            ml: 10,
                                            cursor: 'pointer',
                                            display: 'inline-block',
                                            padding: '0.9rem 1.8rem',
                                            fontSize: '16px',
                                            fontWeight: 700,
                                            color: 'white',
                                            border: '1px solid black',
                                            position: 'relative',
                                            backgroundColor: 'black',
                                            overflow: 'hidden',
                                            zIndex: 1,
                                            fontFamily: 'inherit',
                                            "::before": {content: '""', position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', backgroundColor: 'grey', transform: 'translateX(-100%)', transition: 'all .3s', zIndex: -1},
                                            ":hover": {"::before": {transform: 'translateX(0)'}}
                                        }}
                                        onClick={handleSubmit}
                                    >
                                        <Typography sx={{color: 'white', width: '300px', textAlign: 'center'}}>ADD Parent Category</Typography>
                                    </Button>
                                </Box>
                            </Box>
                    </Grid>
                </Grid>
            </Box>

            {/* other */}
            <Loading open={loading} />
        </Box>
     );
}

export default CreateProvider;