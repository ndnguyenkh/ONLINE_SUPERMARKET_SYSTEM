
import { useState } from "react";
import {Card, CardActions, CardHeader, CardMedia, Link, Typography } from "@mui/material";

import Loading from "../Loading";

function Category({ catID, title, image}) {

    const [loading, setLoading] = useState(false);

    const handleClick = (name) => {
        //console.log(value);
        setLoading(true);
        setTimeout( () => {
            setLoading(false);
            // chuyển hướng trang web sang /category-details
            window.location.href = `/category-details/${name}`;
        }, 2000); 
    }

    return ( 
        <Card sx={{width: '100%'}}>
            <CardHeader
                title={<Typography variant="h5" sx={{fontWeight: '500'}}>{title}</Typography>}
            />

            <CardMedia
                sx={{width: '100%', height: '400px', mx: 'auto', cursor: 'pointer'}}
                image={image}
                alt={`image ${title}`}
                onClick={() => handleClick(title)}
            />
            <CardActions disableSpacing >
                <Link sx={{cursor: 'pointer', ":hover": {color: 'red'}}}>
                    <Typography variant="h6" onClick={() => handleClick(title)}>See more</Typography>
                </Link>
            </CardActions>
            <Loading open={loading} />
        </Card>
     );
}

export default Category;