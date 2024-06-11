
import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { useParams } from 'react-router-dom';
import axios from "axios";

// function useQuery() {
//     return new URLSearchParams(useLocation().search);
// }

function ResetPassword() {

    const { token } = useParams();
    const [password, setPassword] = useState('');

    const handleOK = async () => {
        console.log(token);
        handleSubmit();
    };

    const handleSubmit = async () => {
        const data = {
            new_password: password
        };
        try {
            await axios.post(`http://localhost:9090/api/v1/login/valid-reset-password-request?token=${token}`, data, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            alert("Success!");
            window.location.href = ('/login');
        } catch (err) {
            alert("Un Success!");
            window.location.href = ('/error');
        } finally {

        }
    };

    return ( 
        <Box sx={{display: 'flex', justifyContent: 'center'}}>
            {/* <form> */}
                <Box sx={{mt: 20}}>
                    <Typography variant="h4" sx={{color: 'gray', fontWeight: 'bold'}}>Reset Password</Typography>
                    <Box>
                        <label>Enter new password</label><br />
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
                    </Box>
                    <Box>
                        <button onClick={handleOK}>OK</button>
                    </Box>
                </Box>
            {/* </form> */}
        </Box>
     );
}

export default ResetPassword;