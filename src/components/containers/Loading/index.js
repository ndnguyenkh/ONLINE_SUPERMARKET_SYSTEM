import { Backdrop, CircularProgress } from "@mui/material";


function Loading({open = false}) {
    return ( 
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={false || open}
            //onClick={handleClose}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
     );
}

export default Loading;