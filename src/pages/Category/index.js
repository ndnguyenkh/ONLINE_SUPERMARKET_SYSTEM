
import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Breadcrumbs, Container, Grid, Link, Stack, Typography } from "@mui/material";

import Product from "~/components/containers/Product";

import DATA_PRODUCT from "~/utils/content/Product";
import DATA_CATEGORY from '~/utils/content/Category';

function Category() {

    const { id } = useParams(); // Lấy tham số id từ URL

    useEffect(() => {
        // thực hiện hành động
        handleCount(id);
        //console.log(id);
    }, [id]);

    // 
    const [count, setCount] = useState(null);
    const handleCount = (categoryId) => {
        const ctgId = parseInt(categoryId, 10);
        const productCount = DATA_PRODUCT.filter(product => product.ctg_id === ctgId).length;
        setCount(productCount);
    };

    return ( 
        <Box>
            <Box sx={{mt: 12, mb: 2, mx: 10}}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/">
                        Category
                    </Link>
                    {DATA_CATEGORY.map( (data, i) => {
                        const ctgId = parseInt(id, 10);
                        if(data.id == ctgId){
                            return <Typography key={i} color="text.primary">{data.name}</Typography>;
                        }
                        return null;
                    })}
                </Breadcrumbs>
            </Box>
            <Box>
                <Container sx={{display: 'flex', justifyContent: 'center', my: 5}}>
                    <Stack>
                        {DATA_CATEGORY.map( (data, i) => {
                            const ctgId = parseInt(id, 10);
                            if(data.id == ctgId){
                                return <Typography key={i} variant="h2" sx={{fontWeight: 'bold', textAlign: 'center'}}>{data.name}</Typography>;
                            }
                            return null;
                        })}
                        <Typography variant="h5" sx={{textAlign: 'center', fontStyle: 'italic'}}>
                            "{count} products"
                        </Typography>
                    </Stack>
                </Container>

                {/* card product */}
                <Box sx={{backgroundColor: 'white', mx: 5}}>
                    <Grid container spacing={2}>
                        {DATA_PRODUCT.map( (data, i) => {
                            const ctgId = parseInt(id, 10);
                            if(data.ctg_id == ctgId) {
                                return (
                                    <Grid item xs={12} md={3} key={i}>
                                        <Product
                                            id={data.id}
                                            name={data.name}
                                            image={data.img_src}
                                            shortDescription={data.short_description}
                                            price={data.price}
                                        />
                                    </Grid>
                                );
                            }
                            return null; // Trả về null nếu không khớp với id
                        })}   
                    </Grid>
                </Box>
            </Box>
        </Box>
     );
}

export default Category;
