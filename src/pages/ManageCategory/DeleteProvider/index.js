
import axios from 'axios';
import { useEffect, useState } from "react";
import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material";

import { CategoryAPI } from '~/apis';
import Loading from '~/components/containers/Loading';

function DeleteProvider({valueTab}) {

    const [child, setChild] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const jwt = JSON.parse(localStorage.getItem('jwt'));

    const [id, setId] = useState();
    const [errorID, setErrorID] = useState('');
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    
    // const [category, setCategory] = useState([]);
    const [parentId, setParentId] = useState();
    const [parentName, setParentName] = useState('');

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const isValidNumber = (value) => {
        // Kiểm tra nếu giá trị là số và không phải là NaN
        return !isNaN(value) && typeof value === 'number';
    };

    const checkNumber = () => {
        if (!isValidNumber(Number(id))) {
            //console.log(`ID "${id}" là một số hợp lệ.`);
            setErrorID("ID must be numeric and not NaN");
            // return false;
        }else {
            setErrorID("✅");
            if(child){
                findByIdChild();
            }else {
                findById();
            }
            
        }   
    };

    const findById = async () => {
        try {
            const response = await axios.get(`${CategoryAPI.findById}${id}`, {
                headers: {
                  Authorization: `Bearer ${jwt}`,
                  'Content-Type': 'application/json'
                }
              });
            setName('');
            setName(response.data.name);
            setImage(null);
            setImage(response.data.image_url);
            alert("The supplier ID has been found and its data uploaded!");
            return response.data;
        } catch (error) {
            alert("No supplier found with this ID!");
          console.error('Error updating supplier:', error);
          throw error;
        }
    };
    const findByIdChild = async () => {
        try {
            const response = await axios.get(`${CategoryAPI.findByIdChild}${id}`, {
                headers: {
                  Authorization: `Bearer ${jwt}`,
                  'Content-Type': 'application/json'
                }
              });
            setName(response.data.name);
            setParentId(response.data.parent_id);
            setParentName(response.data.parent_name);
            //setImage(response.data.image_url);
            alert("The Category ID has been found and its data uploaded!");
            return response.data;
        } catch (error) {
            alert("No Category found with this ID!");
            console.error('Error updating supplier:', error);
          throw error;
        }
    };

    const handleSubmitUpdate = async () => {
        setLoading(true);
        try {
            let response;
            if (child) {
                response = await axios.delete(`${CategoryAPI.deleteChild}${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${jwt}`
                    }
                });
                alert("The Child Category deleted!");
            } else {
                response = await axios.delete(`${CategoryAPI.delete}${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${jwt}`
                    }
                });
                alert("The Category deleted!");
            }
        } catch (error) {
            if (error.response) {
                console.error('Error response:', error.response);
                alert(`Error: ${error.response.data.message || 'Cannot delete category.'}`);
            } else if (error.request) {
                console.error('Error request:', error.request);
                alert('Error: No response from server.');
            } else {
                console.error('Error:', error.message);
                alert(`Error: ${error.message}`);
            }
        } finally {
            setLoading(false);
        }
    };
    

    return ( 
        <Box hidden={valueTab !== "delete"} sx={{width: '1100px'}}>
            <Box sx={{m: 2}}>
                <Typography sx={{color: 'gray', mb: 2}}>{child ? "Child Categories" : "Parent Categories"}<Button sx={{mx: 5}} variant='outlined' onClick={() => setChild(!child)}>Change</Button></Typography>
                <Grid container spacing={2}>
                    <Grid item md={6}>
                        <Box>
                            {child ? (
                                <Box sx={{ml: "25px", mb: 5}}>
                                    <label style={{width: '100%', fontWeight: 350, display: 'flex', justifyContent: 'space-between'}}><span style={{color: 'red'}}>Find ID: *</span><span><Button variant='outlined' onClick={checkNumber}>Find</Button></span></label>
                                        <TextField
                                            placeholder={"Enter ID"}
                                            multiline
                                            maxRows={4}
                                            variant="standard"
                                            sx={{width: '100%', pt: 2}}
                                            value={id}
                                            onChange={(e) => {
                                                const newId = e.target.value;
                                                setId(newId);
                                            }}
                                        />
                                    <label style={{fontStyle: 'italic', color: 'red'}}>{errorID}</label>
                                </Box>
                            ) : (
                                <Box sx={{ml: "25px", mb: 5}}>
                                    <label style={{width: '100%', fontWeight: 350, display: 'flex', justifyContent: 'space-between'}}><span style={{color: 'red'}}>Find ID: *</span><span><Button variant='outlined' onClick={checkNumber}>Find</Button></span></label>
                                        <TextField
                                            placeholder={"Enter ID"}
                                            multiline
                                            maxRows={4}
                                            variant="standard"
                                            sx={{width: '100%', pt: 2}}
                                            value={id}
                                            onChange={(e) => {
                                                const newId = e.target.value;
                                                setId(newId);
                                            }}
                                        />
                                    <label style={{fontStyle: 'italic', color: 'red'}}>{errorID}</label>
                                </Box>
                            )}
                             
                            <Container sx={{height: '50px', color: 'orange', fontWeight: 'bold'}}>
                                Fill in the information of a supplier you want to update
                            </Container>
                            <Box>
                                {child ? (
                                    <form style={{marginLeft: '25px'}}>     
                                        <Box sx={{width: '100%', mb: 2}}>
                                            <label style={{fontWeight: 350}}>Name: <span style={{marginLeft: 5, color: 'red'}}>*</span></label>
                                            <TextField
                                                placeholder={"Enter name"}
                                                value={name}
                                                multiline
                                                maxRows={4}
                                                variant="standard"
                                                sx={{width: '100%', pt: 2}}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                            <label style={{fontStyle: 'italic', color: 'red'}}></label>
                                        </Box> 
                                        <Box sx={{width: '100%', mb: 2}}>
                                            <label style={{fontWeight: 350}}>Parent ID: <span style={{marginLeft: 5, color: 'red'}}>*</span></label>
                                            <TextField
                                                placeholder={"Enter ID"}
                                                value={parentId}
                                                multiline
                                                maxRows={4}
                                                variant="standard"
                                                sx={{width: '100%', pt: 2}}
                                                onChange={(e) => {
                                                    const newId = e.target.value;
                                                    setParentId(newId);
                                                }}
                                            />
                                            <label style={{fontStyle: 'italic', color: 'red'}}></label>
                                        </Box> 
                                        <Box sx={{width: '100%', mb: 2}}>
                                            <label style={{fontWeight: 350}}>Parent Name: <span style={{marginLeft: 5, color: 'red'}}>*</span></label>
                                            <TextField
                                                placeholder={"Enter name"}
                                                value={parentName}
                                                multiline
                                                maxRows={4}
                                                variant="standard"
                                                sx={{width: '100%', pt: 2}}
                                                //onChange={(e) => setName(e.target.value)}
                                            />
                                            <label style={{fontStyle: 'italic', color: 'red'}}></label>
                                        </Box> 
                                    </form>
                                ) : (
                                    <form style={{marginLeft: '25px'}}>     
                                        <Box sx={{width: '100%', mb: 2}}>
                                            <label style={{fontWeight: 350}}>Name: <span style={{marginLeft: 5, color: 'red'}}>*</span></label>
                                            <TextField
                                                placeholder={"Enter name"}
                                                value={name}
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
                                                //value={image}
                                                onChange={handleImageChange}
                                            />
                                            <label style={{fontStyle: 'italic', color: 'red'}}></label>
                                        </Box> 
                                    </form>
                                )}
                                
                            </Box>                           
                        </Box>
                    </Grid>
                    <Grid item md={6}>
                        <Container sx={{height: '50px', color: 'orange', fontWeight: 'bold'}}>
                            Review Category information
                        </Container>
                        {/* review code */}
                        <Box sx={{ml: 4, color: 'gray', fontStyle: 'italic  '}}>
                            {child ? (
                                <>
                                <span style={{display: 'flex'}}>
                                    Name: {name !== '' ? <Typography sx={{ml: 2}}>{name}</Typography> : <Typography  sx={{ml: 2}}>empty</Typography>}
                                </span>
                                <span style={{display: 'flex'}}>
                                    Parent ID: {parentId !== '' ? <Typography sx={{ml: 2}}>{parentId}</Typography> : <Typography  sx={{ml: 2}}>empty</Typography>}
                                </span>
                                <span style={{display: 'flex'}}>
                                    Parent Name: {parentName !== '' ? <Typography sx={{ml: 2}}>{parentName}</Typography> : <Typography  sx={{ml: 2}}>empty</Typography>}
                                </span>
                                </>
                            ) : (
                                <span style={{display: 'flex'}}>
                                    Name: {name !== '' ? <Typography sx={{ml: 2}}>{name}</Typography> : <Typography  sx={{ml: 2}}>empty</Typography>}
                                </span>
                            )}
                            
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
                                        onClick={handleSubmitUpdate}
                                    >
                                        <Typography sx={{color: 'white', width: '300px', textAlign: 'center'}}>DELETE CATEGORY</Typography>
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

export default DeleteProvider;