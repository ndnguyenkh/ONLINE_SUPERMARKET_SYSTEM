
import { useState } from "react";
import { Box, Container, Divider, Drawer, IconButton, InputBase, Paper, Zoom } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search'; // search icon

function DrawerSearch({openDrawer, children, ...props}) {

    // zoom
    const [checked, setChecked] = useState(!false);

    return ( 
        <Drawer
            anchor='top'
            {...props}
        >  
            <Box sx={{ width: '100%', height: '100vh', backgroundColor: 'black', display: 'flex', justifyContent: 'center' }}>
                    <Container sx={{mx: 10, display: 'block'}}>
                        {children}
                        <Box sx={{}}>
                            <Zoom
                                in={checked}
                                style={{ transitionDelay: checked ? "400ms" : "0ms" }}
                            >
                                <Paper
                                    component="form"
                                    sx={{
                                        height: "60px",
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
                                    fontSize: '50px',
                                    fontStyle: 'italic'
                                    }}
                                    placeholder="Search for Products..."
                                    // value={value}
                                    // onChange={(e) => setValue(e.target.value)}
                                />
                                <Divider
                                    sx={{ height: 28, m: 0.5 }}
                                    orientation="vertical"
                                />
                                <IconButton
                                    type="button"
                                    sx={{ p: "10px" }}
                                    aria-label="search"
                                    // onClick={handlePushValue}
                                >
                                    <SearchIcon sx={{fontSize: '55px', color: 'white'}} />
                                </IconButton>
                                </Paper>
                            </Zoom>
                        </Box>
                    </Container>
                </Box>
        </Drawer>
     );
}

export default DrawerSearch;