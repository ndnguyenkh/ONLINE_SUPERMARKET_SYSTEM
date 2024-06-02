
import axios from 'axios';
import { useState } from "react";
import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material";

import { ProviderAPI } from '~/apis';
import Loading from '~/components/containers/Loading';

function CreateProvider({valueTab}) {

    const [loading, setLoading] = useState(false);

    const jwt = JSON.parse(localStorage.getItem('jwt'));

    //const [id, setId] = useState(0);
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

    const DATA_INPUT = [
        {title: 'EMAIL', placeholder: 'Enter email', onChange: (e) => setEmail(e.target.value), error: errorEmail},
        {title: 'ADDRESS', placeholder: 'Enter address', onChange: (e) => setAddress({ ...address, specific_address: e.target.value}), error: errorAddress},
        {title: 'SUPPLIER NAME', placeholder: 'Enter Supplier name', onChange: (e) => setSupplierName(e.target.value), error: errorSupplierName},
        {title: 'CONTACT PERSON', placeholder: 'Enter contact person', onChange: (e) => setContactPerson(e.target.value), error: errorContactPerson},
        {title: 'CONTACT NUMBER', placeholder: 'Enter contact number', onChange: (e) => setContactNumber(e.target.value), error: errorContactNumber},
    ];

    const checkValidValue = () => {
        // check email
        // Kiểm tra null hoặc chuỗi rỗng
        if (email === '' || email === null) {
            setErrorEmail('Email is null or empty');
            console.log('Email is null or empty');
            return false;
        }
        // Kiểm tra email hợp lệ
        //const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        if (!emailRegex.test(email)) {
            setErrorEmail('Invalid email format');
            console.log('Invalid email format');
            return false;
        }
        setErrorEmail('');

        // check address
        if(address.specific_address === '' || address.specific_address === null) {
            setErrorAddress('Address is null or empty');
            return false;
        }

        setErrorAddress('');

        // check name
        if(supplierName === '' || address === null) {
            setErrorSupplierName('Supplier name is null or empty');
            return false;
        }

        setErrorSupplierName('');

        // check phone
        if (contactPerson === '' || contactPerson === null) {
            setErrorContactPerson('Contact Person is null or empty');
            console.log('Contact Person is null or empty');
            // Thực hiện các hành động khác tùy thuộc vào trường hợp của bạn, ví dụ: hiển thị thông báo lỗi
            return false;
        }
        
          // Kiểm tra đúng định dạng của phone
        const phoneRegex1 = /^(\+\d{2})?(\s?\d{3}|\(\+\d{2}\)\s?\d{3})(\s?\d{3}){2}$/;
        if (!phoneRegex1.test(contactPerson)) {
            setErrorContactPerson('Invalid contact person format');
            console.log('Invalid contact person format');
            // Thực hiện các hành động khác tùy thuộc vào trường hợp của bạn, ví dụ: hiển thị thông báo lỗi
            return false;
        }
       
        setErrorContactPerson('');

        // check phone
        if (contactNumber === '' || contactNumber === null) {
            setErrorContactNumber('Contact Number is null or empty');
            console.log('Contact Number is null or empty');
            // Thực hiện các hành động khác tùy thuộc vào trường hợp của bạn, ví dụ: hiển thị thông báo lỗi
            return false;
        }
        
          // Kiểm tra đúng định dạng của phone
        const phoneRegex2 = /^(\+\d{2})?(\s?\d{3}|\(\+\d{2}\)\s?\d{3})(\s?\d{3}){2}$/;
        if (!phoneRegex2.test(contactNumber)) {
            setErrorContactNumber('Invalid Contact Number format');
            console.log('Invalid Contact Number format');
            // Thực hiện các hành động khác tùy thuộc vào trường hợp của bạn, ví dụ: hiển thị thông báo lỗi
            return false;
        }
       
        setErrorContactNumber('');

        // Nếu tất cả điều kiện đều thỏa mãn
        console.log('Validation successful');
        return true;
    }

    const handleSubmit = async () => {
        // e.preventDefault();
        if (checkValidValue()) {
          const data = {
            email,
            address,
            supplier_name: supplierName,
            contact_person: contactPerson,
            contact_number: contactNumber
          };
    
          try {
            const response = await axios.post(ProviderAPI.create, data, {
                headers: {
                  Authorization: `Bearer ${jwt}`
                }
            });
            //alert("Data submitted successfully!");
            console.log(response.data);
            alert("Data submitted successfully!");
          } catch (error) {
            //alert("Failed to submit data");
            console.error(error);
          }
        }
    };

    const handleAddSupplier = () => {
        setLoading(true);
        setTimeout(() => {
            if(checkValidValue()){
                handleSubmit();
            }
            setLoading(false);
        }, 2000);
        
    }

    return ( 
        <Box hidden={valueTab !== "create"} sx={{width: '1100px'}}>
            <Box sx={{m: 2}}>
                <Grid container spacing={2}>
                    <Grid item md={6}>
                        <Box>
                            <Container sx={{height: '50px', color: 'orange', fontWeight: 'bold'}}>
                                Fill in the information of a supplier you want to create
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
                                            onChange={data.onChange}
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
                                        onClick={handleAddSupplier}
                                    >
                                        <Typography sx={{color: 'white', width: '300px', textAlign: 'center'}}>ADD SUPPLIER</Typography>
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