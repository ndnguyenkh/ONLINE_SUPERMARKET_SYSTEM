
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, styled, tableCellClasses } from "@mui/material";  
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { ProviderAPI, CategoryAPI } from '~/apis';
import Image from '~/components/Image';

function ListProvider({ valueTab, valueSearch }) {
  
    const [category, setCategory] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [child, setChild] = useState(false);
    const [error, setError] = useState(null);

    // 

    const getAllCategory = async () => {
        try {
            const response = await axios.get(CategoryAPI.getAll);
            // setCategories(response.data.child_category);
            // console.log(categories);
            setCategory(response.data);
            setLoading(false);
            //console.log(response.data);
        } catch (err) {
            setError(err);
            setLoading(false);
        }
    }

    const getChildCategory = async () => {
        try {
            const response = await axios.get(CategoryAPI.getAllChild);
            // setCategories(response.data.child_category);
            // console.log(categories);
            setCategories(response.data);
            setLoading(false);
            //console.log(response.data);
        } catch (err) {
            setError(err);
            setLoading(false);
        }
    }

    useEffect(() => {
        // Hàm gọi API
        getAllCategory();
        getChildCategory();
    }, []);

    if (loading) return <Box hidden={valueTab !== "list"}>Loading...</Box>;
    if (error) return <Box hidden={valueTab !== "list"}>Error: {error.message}</Box>;

    const filteredCategory= category.filter((item) => {
        return valueSearch.toLowerCase() === "" 
            ? item 
            : item.name.toLowerCase().includes(valueSearch);
    });

    const filteredCategories= categories.filter((item) => {
        return valueSearch.toLowerCase() === "" 
            ? item 
            : item.name.toLowerCase().includes(valueSearch);
    });

    return ( 
        <Box
            hidden={valueTab !== "list"}
        >
            <Container sx={{width: '1100px'}}>
                <Box>
                    <Typography sx={{color: 'gray', mb: 2}}>{child ? "Child Categories" : "Parent Categories"}<Button sx={{mx: 5}} variant='outlined' onClick={() => setChild(!child)}>Change</Button></Typography>
                    {child ? (
                        <TableContainer component={Paper} >
                            <Table aria-label="customized table">
                                <TableHead>
                                    <TableRow sx={{backgroundColor: 'rgba(22, 24, 35, 0.09)'}}>
                                        <TableCell align="center"><Typography variant='h7' sx={{fontWeight: 'bold', color: 'gray'}}>#ID</Typography></TableCell>
                                        <TableCell align="left"><Typography variant='h7' sx={{fontWeight: 'bold', color: 'gray'}}>Name</Typography></TableCell>
                                        <TableCell align="left"><Typography variant='h7' sx={{fontWeight: 'bold', color: 'gray'}}>Parent ID</Typography></TableCell>
                                        <TableCell align="left"><Typography variant='h7' sx={{fontWeight: 'bold', color: 'gray'}}>Parent Name</Typography></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                
                                {filteredCategories.length === 0 ? (
                                    <Box sx={{textAlign: 'center', color: 'gray'}}>There are no results based on "{valueSearch}"</Box>
                                ) : (
                                    filteredCategories.map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell align="center">{row.id}</TableCell>
                                            <TableCell align="left">{row.name}</TableCell>
                                            <TableCell align="left">{row.parent_id}</TableCell>
                                            <TableCell align="left">{row.parent_name}</TableCell>
                                        </TableRow>
                                    ))
                                )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    ) : (
                        <TableContainer component={Paper} >
                            <Table aria-label="customized table">
                                <TableHead>
                                    <TableRow sx={{backgroundColor: 'rgba(22, 24, 35, 0.09)'}}>
                                        <TableCell align="center"><Typography variant='h7' sx={{fontWeight: 'bold', color: 'gray'}}>#ID</Typography></TableCell>
                                        <TableCell align="left"><Typography variant='h7' sx={{fontWeight: 'bold', color: 'gray'}}>Name</Typography></TableCell>
                                        <TableCell align="left"><Typography variant='h7' sx={{fontWeight: 'bold', color: 'gray'}}>Image</Typography></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                
                                {filteredCategory.length === 0 ? (
                                    <Box sx={{textAlign: 'center', color: 'gray'}}>There are no results based on "{valueSearch}"</Box>
                                ) : (
                                    filteredCategory.map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell align="center">{row.id}</TableCell>
                                            <TableCell align="left">{row.name}</TableCell>
                                            <TableCell align="left"><Image style={{width: '60px', height: '60px'}} src={row.image_url} /></TableCell>
                                        </TableRow>
                                    ))
                                )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                    
                </Box>
            </Container>
        </Box>
     );
}

export default ListProvider;