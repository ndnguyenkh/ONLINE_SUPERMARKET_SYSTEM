
import { Box, Button, Typography } from "@mui/material";

function Options(props) {

    const handleClick = () => {
        props.actions.testAction();
    }
    
    return <div>
        <button onClick={() => handleClick()}>
            Hi~~
      </button>
    </div>
}

export default Options;