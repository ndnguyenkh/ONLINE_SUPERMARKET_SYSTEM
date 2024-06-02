

import React from 'react';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {

  // const handleWhatAI = () => {
  //   const message = createChatBotMessage("AI is new temchology in 2024");
  //   //setChatBotMessage(message);
  //   setState((prev) => ({ ...prev, messages: [...prev.messages, message], })); 
  // }

  //
  const handleDog = () => {
    const botMessage = createChatBotMessage(
      "Here's a nice dog picture for you!",
      {
        widget: 'dogPicture',
      }
    );
    setState((prev) => ({ ...prev, messages: [...prev.messages, botMessage], }));
  };
  //
  
  const handleCategoryPicture = () => {
    const botMessage = createChatBotMessage("This is a Category",
      {
        widget: 'categoryPicture',
      }
    )
    updateState(botMessage);
  }

  // const handleJavascriptQuiz = () => {
  //   const message = createChatBotMessage(
  //     "Fantastic. Here is your quiz. Good luck!",
  //     {
  //       widget: "javascriptQuiz",
  //     }
  //   );

  //   updateState(message);
  // };

  const handleOnMart = () => {
    const message = createChatBotMessage(
      'OnMart is an e-commerce site that supports users to shop for domestic and foreign items with extremely attractive and diverse incentives.'
    );
    updateState(message);
  };

  // 
  const handleResponse = (response) => {
    const message = createChatBotMessage(response);
    updateState(message);
  }

  //
  const handleResponseError = (error) => {
    const message = createChatBotMessage(`sorry your ${error} question is beyond my understanding!.`);
    updateState(message);
  }

  //
  const handleMusic = () => {
    const message = createChatBotMessage("Here's your music player!", {
      widget: 'musicPlayer',
    });
    updateState(message);
  }

  // update state
  const updateState = (message) => {
    setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleDog,
            handleOnMart,
            handleCategoryPicture,
            handleResponse,
            handleMusic,
            handleResponseError
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;