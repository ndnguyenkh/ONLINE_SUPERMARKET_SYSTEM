

import React from 'react';

  const MessageParser = ({ children, actions }) => {

    const parse = (message) => {
      //console.log(message);

      const lowercase = message.toLowerCase();

      if(lowercase.includes('category' || 'categories')){
        actions.handleCategoryPicture();
      }

      if(lowercase.includes('product' || 'product')){
        actions.handleCategoryPicture();
      }

      if(lowercase.includes('onmart' || 'introduction')){
        actions.handleOnMart();
      }

      if(lowercase.includes('what ai')){
        console.log("dungs ruif");
        actions.handleWhatAI();
      }

      if (lowercase.includes('dog')) {
        actions.handleDog();
      }

      if (lowercase.includes("javascript") || lowercase.includes("js")) {
        actions.handleJavascriptQuiz();
      }

      //actions.testAction();

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