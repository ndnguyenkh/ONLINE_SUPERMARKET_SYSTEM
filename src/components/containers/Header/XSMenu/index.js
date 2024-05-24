
import { Box, Divider, Button } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

function XSMenu() {
    return ( 
        <Box sx={{ height: '80px', display: {xs: 'flex', md: 'none'}, alignItems: 'center' }}>
            <Divider orientation="vertical" flexItem />
            <Button sx={{ width: '80px', height: '100%'}}>
                <MenuIcon sx={{color: 'black', }} />
            </Button>
            <Divider orientation="vertical" flexItem />
        </Box>
     );
}

export default XSMenu;