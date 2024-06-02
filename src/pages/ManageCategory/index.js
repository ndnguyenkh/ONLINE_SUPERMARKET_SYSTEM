
import { useState } from "react";
import { Box, Button, Container, Divider, IconButton, InputBase, Paper, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search'; // search icon
import AddIcon from '@mui/icons-material/Add';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';

import ListProvider from "./ListProvider";
import CreateProvider from "./CreateProvider";
import EditProvider from "./EditProvider";
import DeleteProvider from "./DeleteProvider";
import DetailsProvider from "./DetailsProvider";

function ManageCategory() {

    const [valueTab, setValueTab] = useState('list');

    // search value
    const [valueSearch, setValueSearch] = useState('');

    // 
    const handlePushValueSearch = () => {
        console.log(valueSearch);
    }

    const handleChangeTab = (event, newValue) => {
        setValueTab(newValue);
    };

    //
    const handleResetValue = () => {
        window.location.href = ('/manage-Categories');
        setValueTab('create');
    };

    return ( 
        <Box>
            <Toolbar />
            <Container sx={{width: '100%', mt: 5, mb: 2}}>
                <Typography variant="h5" sx={{fontWeight: 'bold', color: 'gray'}}>Manage Categories</Typography>
            </Container>

            {/* list tab */}
            <Container sx={{my: 2}}>
                <Typography sx={{color: 'gray', fontWeight: '400', fontStyle: 'italic'}}>Manage Categories • Tools</Typography>
                <Box sx={{width: '100%', my: 2, display: valueTab == "list" ? 'flex' : 'none', alignItems: 'center', justifyContent: 'center'}}>
                    {/* button search */}
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
                            placeholder="Search for Categories..."
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
                            onClick={handlePushValueSearch}
                        >
                        <SearchIcon sx={{fontSize: '35px', color: 'gray'}} />
                        </IconButton>
                    </Paper>
                    {/* actions */}
                    <Box sx={{mx: 2, display: 'flex'}}>
                        {/* button add */}
                        <Button onClick={() => setValueTab('create')} variant="outlined" startIcon={<AddIcon />}>
                            Create
                        </Button>
                        {/* button reset */}
                        <Button onClick={handleResetValue} sx={{textAlign: 'center', ':hover': {background: 'transparent'}}}
                            variant="text" startIcon={<RotateLeftIcon sx={{width: '100%', ml: 1, color: 'green'}}/>}>
                        </Button>
                    </Box>
                </Box>
            </Container>
            <Box sx={{ width: '100%', flexGrow: 1, display: 'flex', height: 324}}>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={valueTab}
                    onChange={handleChangeTab}
                    //aria-label="Vertical tabs example"
                    sx={{ borderRight: 1, borderColor: 'divider' }}
                >
                    <Tab label="List" value="list" />
                    <Tab label="Create" value="create" />
                    <Tab label="Edit" value="edit"/>
                    <Tab label="Delete" value="delete" />
                    <Tab label="Details" value="details"/>
                </Tabs>

                <ListProvider valueTab={valueTab} valueSearch={valueSearch} />
                <CreateProvider valueTab={valueTab} />
                <EditProvider valueTab={valueTab} />
                <DeleteProvider valueTab={valueTab} />
                <DetailsProvider valueTab={valueTab} />
            </Box>
        </Box>
     );
}

export default ManageCategory;