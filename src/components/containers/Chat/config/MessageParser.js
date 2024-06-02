
import axios from 'axios';
import React from 'react';

  const MessageParser = ({ children, actions }) => {

    const parse = async (message) => {

      const lowercase = message.toLowerCase();

      if (lowercase.includes('music') || lowercase.includes('musics') || lowercase.includes('nhạc') || lowercase.includes('nhac')) {
        actions.handleMusic();
      }else if(lowercase.includes('onmart')){
        actions.handleOnMart();
      }else {
        try {
          const response = await axios.post(
            'https://api-inference.huggingface.co/models/EleutherAI/gpt-neo-2.7B',
            { inputs: lowercase },
            {
              headers: {
                'Authorization': `Bearer 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`,
              },
            }
          );
          const text = response.data[0].generated_text;
          actions.handleResponse(text);
        } catch (error) {
          actions.handleResponseError(lowercase);
          console.error('Error fetching response from Hugging Face:', error);
        }
      }

      // if(lowercase.includes('category' || 'categories')){
      //   actions.handleCategoryPicture();
      // }

      // if(lowercase.includes('product' || 'product')){
      //   actions.handleCategoryPicture();
      // }

      // if (lowercase.includes('dog')) {
      //   actions.handleDog();
      // }
    };

    return (
      <div>
        {React.Children.map(children, (child) => {
          return React.cloneElement(child, {
            parse: parse,
            actions: {},
          });
        })}
      </div>
    );
};

export default MessageParser;