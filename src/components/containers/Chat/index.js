
// library
import { useEffect, useState } from "react";
import { Box, SpeedDial, Tooltip } from "@mui/material";
import Chatbot from 'react-chatbot-kit'
import 'react-chatbot-kit/build/main.css'
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';

// module
import config from "./config/config";
import MessageParser from "./config/MessageParser";
import ActionProvider from "./config/ActionProvider";


function Chat() {

    const [showBot, toggleBot] = useState(false);

    const [isSpeedDialOpen, setIsSpeedDialOpen] = useState(false);

    // const scrollToTop = () => {
    //     window.scrollTo({
    //       top: 0,
    //       behavior: 'smooth'
    //     });
    // };

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
        <div>
            {showBot && (
                <Box sx={{
                    position: 'fixed',
                    bottom: 16,
                    right: 84,
                    color: 'white',
                }}>
                    <Chatbot
                        config={config}
                        messageParser={MessageParser}
                        actionProvider={ActionProvider}
                    />
                </Box>
            )}
            {/* button show chat */}
            <Tooltip title={'Chat With AI OnMart'}>
                <SpeedDial
                    ariaLabel="SpeedDial basic example"
                    sx={{
                        position: 'fixed',
                        bottom: 84,
                        right: 16,
                        color: 'white',
                        transition: 'transform 0.2s ease-out',
                        transform: isSpeedDialOpen ? 'translateY(0)' : 'translateY(100%)',
                    }}
                    icon={<ChatOutlinedIcon sx={{width: '100%', height: '100%', borderRadius: '10%', backgroundColor: 'transparent'}}/>}
                    open={isSpeedDialOpen}
                    onClick={() => toggleBot((prev) => !prev)}
                    direction="up"
                    >
                </SpeedDial>
            </Tooltip> 
        </div>
        
     );
}

export default Chat;