
import React, { useState, useEffect } from 'react';
import { Box, SpeedDial, Tooltip } from "@mui/material";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
// import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
// import Chat from '../Chat';

function ToTop() {

    const [isSpeedDialOpen, setIsSpeedDialOpen] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
    };

    useEffect(() => {
        function handleScroll() {
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const windowHeight = window.innerHeight;
          const documentHeight = document.documentElement.scrollHeight;
    
          // Kiểm tra nếu người dùng đã cuộn đủ cao để hiển thị SpeedDial
          if (scrollTop > documentHeight - windowHeight * 2) {
            setIsSpeedDialOpen(true);
          } else {
            setIsSpeedDialOpen(false);
          }
        }
    
        // Thêm sự kiện cuộn trang
        window.addEventListener('scroll', handleScroll);
    
        // Cleanup
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return ( 
        <Box sx={{position: 'relative'}}>
            {/* <Tooltip title={'Chat With AI'}>
                <SpeedDial
                    ariaLabel="SpeedDial basic example"
                    sx={{
                        position: 'fixed',
                        bottom: 88,
                        right: 16,
                        color: 'white',
                        transition: 'transform 0.2s ease-out',
                        transform: isSpeedDialOpen ? 'translateY(0)' : 'translateY(100%)',
                    }}
                    icon={
                        // <ChatOutlinedIcon 
                        //     sx={{
                        //         width: '70%', 
                        //         height: '70%',                       
                        //         borderRadius: '10%', 
                        //     }}
                        // />
                        // <Chat />
                    }
                    onClick={() => {

                    }}
                    direction="up"
                    >
                </SpeedDial>
            </Tooltip>  */}
            <Tooltip title={'Click To Top'}>
                <SpeedDial
                    ariaLabel="SpeedDial basic example"
                    sx={{
                        position: 'fixed',
                        bottom: 16,
                        right: 16,
                        color: 'white',
                        transition: 'transform 0.2s ease-out',
                        transform: isSpeedDialOpen ? 'translateY(0)' : 'translateY(100%)',
                    }}
                    icon={<ArrowUpwardIcon sx={{width: '100%', height: '100%', borderRadius: '10%', backgroundColor: 'black'}}/>}
                    open={isSpeedDialOpen}
                    onClick={() => {
                        setIsSpeedDialOpen(!isSpeedDialOpen)
                        scrollToTop();
                    }}
                    direction="up"
                    >
                </SpeedDial>
            </Tooltip> 
        </Box>
     );
}

export default ToTop;