
import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Breadcrumbs, Container, Grid, Link, Stack, Typography } from "@mui/material";

import Product from "~/components/containers/Product";

// import DATA_PRODUCT from "~/utils/content/Product";
// import DATA_CATEGORY from '~/utils/content/Category';
import { CategoryAPI, ProductAPI } from '~/apis';
import Images from '~/utils/Images';

function Category() {

    const { name } = useParams(); // Lấy tham số id từ URL
    
    const [products, setProducts] = useState([]);
    const count = products.length;

    const getAllProducts = async () => {
        try{
            const response = await axios.get(`http://localhost:9090/api/v1/public/products/parent-categories?query=${name}`);
            setProducts(response.data.content);
            // return response.data;
        }catch(error){
            alert(`Error fetching products: ${error}`);
        }
    }

    useEffect(() => {
        getAllProducts();
    }, [name]);

    return ( 
        <Box>
            <Box sx={{mt: 12, mb: 2, mx: 10}}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/">
                        Category
                    </Link>
                    {/* {DATA_CATEGORY.map( (data, i) => {
                        const ctgId = parseInt(id, 10);
                        if(data.id == ctgId){
                            return <Typography key={i} color="text.primary">{data.name}</Typography>;
                        }
                        return null;
                    })} */}
                    <Typography color="text.primary">{name}</Typography>
                </Breadcrumbs>
            </Box>
            <Box>
                <Container sx={{display: 'flex', justifyContent: 'center', my: 5}}>
                    <Stack>
                        {/* {DATA_CATEGORY.map( (data, i) => {
                            const ctgId = parseInt(id, 10);
                            if(data.id == ctgId){
                                return <Typography key={i} variant="h2" sx={{fontWeight: 'bold', textAlign: 'center'}}>{data.name}</Typography>;
                            }
                            return null;
                        })} */}
                        <Typography variant="h2" sx={{fontWeight: 'bold', textAlign: 'center'}}>{name}</Typography>
                        <Typography variant="h5" sx={{textAlign: 'center', fontStyle: 'italic'}}>
                            "{count} products"
                        </Typography>
                    </Stack>
                </Container>

                {/* card product */}
                <Box sx={{backgroundColor: 'white', mx: 5}}>
                    <Grid container spacing={2}>
                        {/* {DATA_PRODUCT.map( (data, i) => {
                            //const ctgId = parseInt(id, 10);
                            //if(data.ctg_id == ctgId) {
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
                            //}
                            //return null; // Trả về null nếu không khớp với id
                        })}    */}
                        {products.map( (data, i) => {

                                return (
                                    <Grid item xs={12} md={3} key={i}>
                                        <Product
                                            id={data.id}
                                            name={data.name}
                                            image={data.images_url || Images.noImage}
                                            shortDescription={data.short_description}
                                            price={data.sell_price}
                                        />
                                    </Grid>
                                ); 
                        })}   
                    </Grid>
                </Box>
            </Box>
        </Box>
     );
}

export default Category;
