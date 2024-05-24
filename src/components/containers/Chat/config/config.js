
//import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { createChatBotMessage, createCustomMessage } from 'react-chatbot-kit';

import Options from '../resource/Option';
import DogPicture from '../resource/DogPicture';
import CategoryPicture from '../resource/CategoryPicture';

const botName = "OnMart AI";
const customMessage = createCustomMessage('value to input', 'custom');

const config = {
  botName: botName,
  lang: 'no',
  initialMessages: [
    createChatBotMessage(`Hi I'm ${botName}`),
    createChatBotMessage(
      "Please send me a question you want!",
      // {
      //   widget: "options",
      //   delay: 1000,
      // }
    ),
    //messageWithProperties,
    customMessage,
    //createCustomMessage('Test', 'custom'),
  ],
  
  
  // change avatar ...
  customComponents: {
    header: () => <div 
                    style={{ 
                      backgroundColor: 'black', 
                      padding: "5px", 
                      borderRadius: "3px" 
                    }}>Chat OnMart AI</div>,
    botAvatar: (props) => <Box 
                            sx={{
                              width: '35px', 
                              height: '35px', 
                              mr: 1,
                              borderRadius: '50%', 
                              backgroundImage: "url('https://i.pinimg.com/originals/fd/46/50/fd465046f6b45397c626136635ca8691.jpg')",
                              backgroundRepeat: 'no-repeat',
                              backgroundPosition: 'center',
                              backgroundSize: 'cover',
                            }} {...props}></Box>,
    //botChatMessage: (props) => <label {...props}>2tr</label>,
    userAvatar: (props) => <Box 
                              sx={{
                                width: '35px', 
                                height: '35px', 
                                ml: 1,
                                borderRadius: '50%', 
                                backgroundImage: "url('https://png.pngtree.com/png-clipart/20231115/original/pngtree-bearded-gentleman-portrait-hand-drawn-retro-illustration-png-image_13545255.png')",
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                              }} {...props}></Box>,
  },
   
  // change styles
  customStyles: {
    botMessageBox: {
      backgroundColor: '#a0ebde',
    },
    chatButton: {
      backgroundColor: '#a1919d',
    },
  },

  state: {
    // gist: '',
    // infoBox: '',
  },
  widgets: [
    {
      widgetName: 'dogPicture',
      widgetFunc: (props) => <DogPicture {...props} />,
    },
    {
      widgetName: 'categoryPicture',
      widgetFunc: (props) => <CategoryPicture {...props} />,
    },
    {
      widgetName: 'options',
      widgetFunc: (props) => <Options {...props} />,
    },
  ],
};

export default config;