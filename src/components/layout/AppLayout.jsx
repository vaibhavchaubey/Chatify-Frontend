import React from 'react';
import Header from './Header';
import Title from '../shared/Title';
import { Grid } from '@mui/material';
import ChatList from '../specific/ChatList';
import { sampleChats } from '../../constants/sampleData';
import { useParams } from 'react-router-dom';
import Profile from '../specific/Profile';

/* AppLayout is not a typical component. It's a higher-order component (HOC). */
/* A higher-order component (HOC) is a function that takes a component and returns a new component with enhanced functionality.  */

/* The AppLayout component returns another function that takes a component (WrappedComponent) as an argument.

Inside this function, it returns another function (a component) that renders a layout structure. This structure includes a header, the WrappedComponent, and a footer.

The WrappedComponent is rendered with spread props ({...props}), which allows passing props from the higher-order component down to the wrapped component.

AppLayout is exported as the default export. */

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const params = useParams();
    const chatId = params.chatId;

    const handleDeleteChat = (e, _id, groupChat) => {
      e.preventDefault();
      console.log('Delete Chat', _id, groupChat);
    };
    return (
      <>
        <Title />
        <Header />
        <Grid container height={'calc(100vh - 4rem)'}>
          <Grid
            item
            sm={4}
            md={3}
            sx={{
              display: {
                xs: 'none',
                sm: 'block',
              },
            }}
            height={'100%'}
          >
            <ChatList
              chats={sampleChats}
              chatId={chatId}
              handleDeleteChat={handleDeleteChat}
            />
          </Grid>
          <Grid item xs={12} sm={8} md={5} lg={6} height={'100%'}>
            <WrappedComponent {...props} />
          </Grid>
          <Grid
            item
            md={4}
            lg={3}
            height={'100%'}
            sx={{
              display: {
                xs: 'none',
                md: 'block',
              },
              padding: '2rem',
              bgcolor: 'rgba(0,0,0,0.85)',
            }}
          >
            <Profile />
          </Grid>
        </Grid>
      </>
    );
  };
};

export default AppLayout;
