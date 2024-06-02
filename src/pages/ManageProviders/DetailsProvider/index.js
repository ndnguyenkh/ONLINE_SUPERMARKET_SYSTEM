
import axios from 'axios';
import { useState } from "react";
import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField, Typography } from "@mui/material";

import { ProviderAPI } from '~/apis';
import Loading from '~/components/containers/Loading';

function DetailsProvider({valueTab}) {

    const [loading, setLoading] = useState(false);

    const jwt = JSON.parse(localStorage.getItem('jwt'));

    const [id, setId] = useState();
    const [errorID, setErrorID] = useState('');
    const [email, setEmail] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [address, setAddress] = useState({
        id: 0,
        ward: 'not yet initialized',
        province: 'not yet initialized',
        city: 'not yet initialized',
        specific_address: ''
    });
    const [errorAddress, setErrorAddress] = useState('');
    const [supplierName, setSupplierName] = useState('');
    const [errorSupplierName, setErrorSupplierName] = useState('');
    const [contactPerson, setContactPerson] = useState('');
    const [errorContactPerson, setErrorContactPerson] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [errorContactNumber, setErrorContactNumber] = useState('');

    // model dialog
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const DATA_INPUT = [
        {title: 'EMAIL', placeholder: 'Enter email', value: email, onChange: (e) => setEmail(e.target.value), error: errorEmail},
        {title: 'ADDRESS', placeholder: 'Enter address', value: address.specific_address, onChange: (e) => setAddress({ ...address, specific_address: e.target.value}), error: errorAddress},
        {title: 'SUPPLIER NAME', placeholder: 'Enter Supplier name', value: supplierName, onChange: (e) => setSupplierName(e.target.value), error: errorSupplierName},
        {title: 'CONTACT PERSON', placeholder: 'Enter contact person', value: contactPerson, onChange: (e) => setContactPerson(e.target.value), error: errorContactPerson},
        {title: 'CONTACT NUMBER', placeholder: 'Enter contact number', value: contactNumber, onChange: (e) => setContactNumber(e.target.value), error: errorContactNumber},
    ];

    const isValidNumber = (value) => {
        // Kiểm tra nếu giá trị là số và không phải là NaN
        return !isNaN(value) && typeof value === 'number';
    };

    const checkNumber = () => {
        setLoading(true);
        setTimeout(() => {
            if (!isValidNumber(Number(id))) {
                //console.log(`ID "${id}" là một số hợp lệ.`);
                setErrorID("ID must be numeric and not NaN");
                // return false;
            }else {
                setErrorID("✅");
                findById();
            } 
            setLoading(false); 
        }, 2000); 
    };

    const findById = async () => {
        try {
            const response = await axios.get(`${ProviderAPI.findById}${id}`, {
                headers: {
                  Authorization: `Bearer ${jwt}`,
                  'Content-Type': 'application/json'
                }
              });
            setEmail(response.data.email);
            setSupplierName(response.data.supplier_name);
            setAddress({ ...address, specific_address: response.data.address.specific_address});
            setContactNumber(response.data.contact_number);
            setContactPerson(response.data.contact_person);
            alert("The supplier ID has been found and its data uploaded!");
            return response.data;
        } catch (error) {
            alert("No supplier found with this ID!");
          console.error('Error updating supplier:', error);
        //   throw error;
        }
    };

    // const handleSubmit = async () => {
    //         try {
    //             const response = await axios.delete(`${ProviderAPI.update}${id}`, {
    //                 headers: {
    //                   Authorization: `Bearer ${jwt}`,
    //                   'Content-Type': 'application/json'
    //                 }
    //               });
    //             //alert("Data submitted successfully!");
    //             console.log(response.data);
    //             alert("Data deleted successfully!");
    //         } catch (error) {
    //             alert(`Failed to deleted data ${error.message}`);
    //             console.error(error);
    //         }
        
    // };

    // const handleEditSupplier = () => {
    //     setOpen(false);
    //     setLoading(true);
    //     setTimeout(() => {
            
    //         handleSubmit();
            
    //         setLoading(false);
    //     }, 2000);
        
    // }

    return ( 
        <Box hidden={valueTab !== "details"} sx={{width: '1100px'}}>
            <Box sx={{m: 2}}>
                <Grid container spacing={2}>
                    <Grid item md={6}>
                        <Box>
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
                            <Container sx={{height: '50px', color: 'orange', fontWeight: 'bold'}}>
                                Fill in the information of a supplier you want to update
                            </Container>
                            <Box>
                                <form style={{marginLeft: '25px'}}>
                                    {DATA_INPUT.map( (data, index) => {
                                        return <Box key={index} sx={{width: '100%', mb: 2}}>
                                        <label style={{fontWeight: 350}}>{data.title}<span style={{marginLeft: 5, color: 'red'}}>*</span></label>
                                        <TextField
                                            placeholder={data.placeholder}
                                            multiline
                                            maxRows={4}
                                            variant="standard"
                                            sx={{width: '100%', pt: 2}}
                                            value={data.value}
                                            //onChange={data.onChange}
                                        />
                                        <label style={{fontStyle: 'italic', color: 'red'}}>{data.error}</label>
                                    </Box>                                        
                                    })}
                                </form>
                            </Box>                           
                        </Box>
                    </Grid>
                    <Grid item md={6}>
                        <Container sx={{height: '50px', color: 'orange', fontWeight: 'bold'}}>
                            Review supplier information
                        </Container>
                        {/* review code */}
                        <Box sx={{ml: 4, color: 'gray', fontStyle: 'italic  '}}>
                                <span style={{display: 'flex'}}>

                                    ID: {id !== null ? <Typography sx={{ml: 2}}>{id}</Typography> : <Typography  sx={{ml: 2}}>empty</Typography>}
                                </span>
                                <span style={{display: 'flex'}}>

                                    Email: {email !== '' ? <Typography sx={{ml: 2}}>{email}</Typography> : <Typography  sx={{ml: 2}}>empty</Typography>}
                                </span>
                                <span style={{display: 'flex', marginTop: '15px', marginBottom: '15px'}}>

                                    Address: {address.specific_address !== '' ? <Typography sx={{ml: 2}}>{address.specific_address}</Typography> : <Typography  sx={{ml: 2}}>empty</Typography>}
                                </span>
                                <span style={{display: 'flex'}}>

                                    Supplier Name: {supplierName !== '' ? <Typography sx={{ml: 2}}>{supplierName}</Typography> : <Typography  sx={{ml: 2}}>empty</Typography>}
                                </span>
                                <span style={{display: 'flex', marginTop: '15px', marginBottom: '15px'}}>

                                    Contact person: {contactPerson !== '' ? <Typography sx={{ml: 2}}>{contactPerson}</Typography> : <Typography  sx={{ml: 2}}>empty</Typography>}
                                </span>
                                <span style={{display: 'flex'}}>

                                    Contact number: {contactNumber !== '' ? <Typography sx={{ml: 2}}>{contactNumber}</Typography> : <Typography  sx={{ml: 2}}>empty</Typography>}
                                </span>
                        </Box>
                        {/* <Box sx={{width: '100%', display: 'flex', justifyContent: 'center'}}>
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
                                        onClick={handleClickOpen}
                                    >
                                        <Typography sx={{color: 'white', width: '300px', textAlign: 'center'}}>DELETE SUPPLIER</Typography>
                                    </Button>
                                </Box>
                            </Box> */}
                    </Grid>
                </Grid>
            </Box>

            {/* other */}
            <Loading open={loading} />
            {/* <Dialog
                open={open}
                onClose={handleClose}
                //aria-labelledby="alert-dialog-title"
                //aria-describedby="alert-dialog-description"
            >
                <DialogTitle >
                    {"Notification"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText >
                        Are you sure you will delete the provider?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleEditSupplier} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog> */}
        </Box>
     );
}

export default DetailsProvider;