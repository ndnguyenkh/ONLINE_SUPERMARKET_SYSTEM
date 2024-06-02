
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, styled, tableCellClasses } from "@mui/material";  
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { ProviderAPI } from '~/apis';

function ListProvider({ valueTab, valueSearch }) {

    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 

    const getAllProviders = async () => {
        try {
            const response = await axios.get(ProviderAPI.getAll);
            setSuppliers(response.data);
            setLoading(false);
            //console.log(response.data);
        } catch (err) {
            setError(err);
            setLoading(false);
        }
    }

    useEffect(() => {
        // Hàm gọi API
        getAllProviders();
    }, []);

    if (loading) return <Box hidden={valueTab !== "list"}>Loading...</Box>;
    if (error) return <Box hidden={valueTab !== "list"}>Error: {error.message}</Box>;

    const filteredSuppliers = suppliers.filter((item) => {
        return valueSearch.toLowerCase() === "" 
            ? item 
            : item.supplier_name.toLowerCase().includes(valueSearch);
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
                                    <TableCell align="left"><Typography variant='h7' sx={{fontWeight: 'bold', color: 'gray'}}>Email</Typography></TableCell>
                                    <TableCell align="left"><Typography variant='h7' sx={{fontWeight: 'bold', color: 'gray'}}>Address</Typography></TableCell>
                                    <TableCell align="left"><Typography variant='h7' sx={{fontWeight: 'bold', color: 'gray'}}>Supplier Name</Typography></TableCell>
                                    <TableCell align="left"><Typography variant='h7' sx={{fontWeight: 'bold', color: 'gray'}}>Contact Person</Typography></TableCell>
                                    <TableCell align="left"><Typography variant='h7' sx={{fontWeight: 'bold', color: 'gray'}}>Contact Number</Typography></TableCell>
                                    <TableCell align="left"><Typography variant='h7' sx={{fontWeight: 'bold', color: 'gray'}}></Typography></TableCell>
                                    <TableCell align="left"><Typography variant='h7' sx={{fontWeight: 'bold', color: 'gray'}}></Typography></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            
                            {filteredSuppliers.length === 0 ? (
                                <Box sx={{textAlign: 'center', color: 'gray'}}>There are no results based on "{valueSearch}"</Box>
                            ) : (
                                filteredSuppliers.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell align="center">{row.id}</TableCell>
                                        <TableCell align="left">{row.email}</TableCell>
                                        {/* <TableCell align="left">{row.address.specific_address}</TableCell> */}
                                        <TableCell align="left">{""}</TableCell>
                                        <TableCell align="left">{row.supplier_name}</TableCell>
                                        <TableCell align="left">{row.contact_person}</TableCell>
                                        <TableCell align="left">{row.contact_number}</TableCell>
                                        {/* <TableCell align="right">
                                            <Button sx={{ color: 'red' }} >
                                                <DeleteForeverIcon />
                                            </Button>
                                        </TableCell>
                                        <TableCell align="left">
                                            <Button sx={{ color: 'orange' }} >
                                                <EditIcon />
                                            </Button>
                                        </TableCell> */}
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