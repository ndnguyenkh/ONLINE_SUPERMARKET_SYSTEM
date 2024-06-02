
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { Box, Button, Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';

import DATA_MUSICS from '~/utils/Musics';

function MusicPlayer({ url }) {

    const [open, setOpen] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);

    const playMusic = () => {
        const currentSong = DATA_MUSICS[currentSongIndex];
        console.log(`Phát nhạc: ${currentSong.name} - ${currentSong.author}`);
    };

    const handlePlayPause = () => {
        setPlaying(!playing);
    };

    const nextSong = () => {
        setCurrentSongIndex((prevIndex) => (prevIndex + 1) % DATA_MUSICS.length);
        setPlaying(true);
    };

    const prevSong = () => {
        setCurrentSongIndex((prevIndex) => (prevIndex - 1 + DATA_MUSICS.length) % DATA_MUSICS.length);
        setPlaying(true);
    };

    useEffect(() => {
        setOpen(true);
        setPlaying(true);
    }, []);

    return ( 
        <Box
            className="music-player"
            sx={{
                position: 'fixed',
                bottom: -70,
                left: '50%',
                //right: 'auto',
                //top: '50%',
                transform: 'translate(-50%, -50%)',
                //width: '100%',
                background: 'transparent',
                color: 'white',
                display: open ? 'flex' : 'none',
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                p: '10px',
                boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.3)',
                zIndex: 1000
            }}
        >
            <ReactPlayer url={DATA_MUSICS[currentSongIndex].link} playing={playing} controls={true} style={{display: 'none'}} />

            <Card sx={{ display: 'flex' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography component="div" variant="h5">
                            {DATA_MUSICS[currentSongIndex].name}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                            {DATA_MUSICS[currentSongIndex].author}
                        </Typography>
                    </CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', pl: 5, pb: 1 }}>
                        <IconButton aria-label="previous">
                            <SkipPreviousIcon onClick={prevSong} />
                        </IconButton>
                        <IconButton aria-label="play/pause">
                            {playing ? (
                                <PauseIcon sx={{ height: 38, width: 38 }} onClick={handlePlayPause} />
                            ) : (
                                <PlayArrowIcon sx={{ height: 38, width: 38 }} onClick={handlePlayPause} />
                            )}
                            
                        </IconButton>
                        <IconButton aria-label="next">
                            <SkipNextIcon  onClick={nextSong} />
                        </IconButton>
                    </Box>
                </Box>
                <CardMedia
                    component="img"
                    sx={{ width: 151, height: 151 }}
                    image={DATA_MUSICS[currentSongIndex].image}
                    alt="Live from space album cover"
                />
                <CardActions>
                    <CloseFullscreenIcon sx={{ height: 38, width: 38, cursor: 'pointer' }} onClick={() => {
                        setPlaying(false);
                        setOpen(false);
                    }} />
                </CardActions>
            </Card>
        </Box>
     );
}

export default MusicPlayer;