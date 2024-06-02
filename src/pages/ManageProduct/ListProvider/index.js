
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, styled, tableCellClasses } from "@mui/material";  
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { ProductAPI } from '~/apis';
import Image from '~/components/Image';

function ListProvider({ valueTab, valueSearch }) {
  
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [child, setChild] = useState(false);
    const [error, setError] = useState(null);

    const getAllProducts = async () => {
        try {
            const response = await axios.get(ProductAPI.getAll);
            setProducts(response.data.content);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        } 
    }

    useEffect(() => {
        // Hàm gọi API
        getAllProducts();
        //getChildCategory();
    }, []);

    if (loading) return <Box hidden={valueTab !== "list"}>Loading...</Box>;
    if (error) return <Box hidden={valueTab !== "list"}>Error: {error.message}</Box>;

    const filteredCategory= products.filter((item) => {
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
                    <TableContainer component={Paper} >
                        <Table aria-label="customized table">
                            <TableHead>
                                <TableRow sx={{backgroundColor: 'rgba(22, 24, 35, 0.09)'}}>
                                    <TableCell align="center"><Typography variant='h7' sx={{fontWeight: 'bold', color: 'gray'}}>#ID</Typography></TableCell>
                                    <TableCell align="left"><Typography variant='h7' sx={{fontWeight: 'bold', color: 'gray'}}>Name</Typography></TableCell>
                                    <TableCell align="left"><Typography variant='h7' sx={{fontWeight: 'bold', color: 'gray'}}>Image</Typography></TableCell>
                                    <TableCell align="left"><Typography variant='h7' sx={{fontWeight: 'bold', color: 'gray'}}>Sell Price</Typography></TableCell>
                                    <TableCell align="left"><Typography variant='h7' sx={{fontWeight: 'bold', color: 'gray'}}>Category Name</Typography></TableCell>
                                    <TableCell align="left"><Typography variant='h7' sx={{fontWeight: 'bold', color: 'gray'}}>Supplier Name</Typography></TableCell>
                                    <TableCell align="left"><Typography variant='h7' sx={{fontWeight: 'bold', color: 'gray'}}>Stock Quantity</Typography></TableCell>
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
                </Box>
            </Container>
        </Box>
     );
}

export default ListProvider;