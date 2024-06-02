
import axios from 'axios';
import { useState } from "react";
import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material";

import { ProviderAPI } from '~/apis';
import Loading from '~/components/containers/Loading';

function EditProvider({valueTab}) {

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

    const DATA_INPUT = [
        {title: 'EMAIL', placeholder: 'Enter email', value: email, onChange: (e) => setEmail(e.target.value), error: errorEmail},
        {title: 'ADDRESS', placeholder: 'Enter address', value: address.specific_address, onChange: (e) => setAddress({ ...address, specific_address: e.target.value}), error: errorAddress},
        {title: 'SUPPLIER NAME', placeholder: 'Enter Supplier name', value: supplierName, onChange: (e) => setSupplierName(e.target.value), error: errorSupplierName},
        {title: 'CONTACT PERSON', placeholder: 'Enter contact person', value: contactPerson, onChange: (e) => setContactPerson(e.target.value), error: errorContactPerson},
        {title: 'CONTACT NUMBER', placeholder: 'Enter contact number', value: contactNumber, onChange: (e) => setContactNumber(e.target.value), error: errorContactNumber},
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
            findById();
        }   
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
          throw error;
        }
    };

    const handleSubmit = async () => {
        // e.preventDefault();
        if (checkValidValue()) {
            const data = {
                email: email,
                address: address,
                supplier_name: supplierName,
                contact_person: contactPerson,
                contact_number: contactNumber
            };
    
            try {
                const response = await axios.put(`${ProviderAPI.update}${id}`, data, {
                    headers: {
                      Authorization: `Bearer ${jwt}`,
                      'Content-Type': 'application/json'
                    }
                  });
                //alert("Data submitted successfully!");
                console.log(response.data);
                alert("Data updated successfully!");
            } catch (error) {
                alert(`Failed to update data ${error.message}`);
                console.error(error);
            }
        }else {
            alert("Invalid input data.");
        }
    };

    const handleEditSupplier = () => {
        setLoading(true);
        setTimeout(() => {
            if(checkValidValue()){
                handleSubmit();
            }
            setLoading(false);
        }, 2000);
        
    }

    return ( 
        <Box hidden={valueTab !== "edit"} sx={{width: '1100px'}}>
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
                                        onClick={handleEditSupplier}
                                    >
                                        <Typography sx={{color: 'white', width: '300px', textAlign: 'center'}}>SAVE SUPPLIER</Typography>
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

export default EditProvider;