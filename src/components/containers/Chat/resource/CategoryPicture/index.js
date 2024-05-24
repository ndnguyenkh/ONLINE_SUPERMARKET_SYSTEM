
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid, Card, CardMedia, Typography, AppBar, Toolbar, TextField, Button } from '@mui/material';

const CategoryPicture = () => {

  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('product');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('https://api.unsplash.com/search/photos', {
          params: { query },
          headers: {
            Authorization: `Client-ID Iy1zpiGwkLNmjzMs6g-mX1zaM2Arh20qqQZ_2SdOZwc`
          }
        });
        setImages(response.data.results);
      } catch (error) {
        console.error('Error fetching data from Unsplash API', error);
      }
    };

    fetchImages();
  }, [query]);

  const handleSearch = () => {
    setQuery(search);
  };

  return (
    <div>
        {images.map((image) => (         
            <img src={image.urls.small} alt='a dog' style={{width: '100%', height: '100%'}} />
        ))}
    </div>
        
      
    
  );
};

export default CategoryPicture;
