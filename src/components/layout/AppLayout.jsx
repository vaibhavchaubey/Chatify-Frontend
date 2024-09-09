import React from 'react';
import Header from './Header';
import Title from '../shared/Title';
import { Drawer, Grid, Skeleton } from '@mui/material';
import ChatList from '../specific/ChatList';
import { sampleChats } from '../../constants/sampleData';
import { useParams } from 'react-router-dom';
import Profile from '../specific/Profile';
import { useMyChatsQuery } from '../../redux/api/api';
import { useDispatch, useSelector } from 'react-redux';
import { setIsMobile } from '../../redux/reducers/miscSlice';
import { useErrors } from '../../hooks/hook';
import { getSocket } from '../../socket';

/* AppLayout is not a typical component. It's a higher-order component (HOC). */
/* A higher-order component (HOC) is a function that takes a component and returns a new component with enhanced functionality.  */

/* The AppLayout component returns another function that takes a component (WrappedComponent) as an argument.

Inside this function, it returns another function (a component) that renders a layout structure. This structure includes a header, the WrappedComponent, and a footer.

The WrappedComponent is rendered with spread props ({...props}), which allows passing props from the higher-order component down to the wrapped component.

AppLayout is exported as the default export. */

const AppLayout = () => (WrappedComponent) => {
  const LayoutComponent = (props) => {
    const params = useParams();
    const chatId = params.chatId;
    const dispatch = useDispatch();

    const socket = getSocket();

    const { isMobile } = useSelector((state) => state.misc);
    const { user } = useSelector((state) => state.auth);

    const { isLoading, data, isError, error, refetch } = useMyChatsQuery('');

    console.log({ data });

    useErrors([{ isError, error }]);

    const handleDeleteChat = (e, _id, groupChat) => {
      e.preventDefault();
      console.log('Delete Chat', _id, groupChat);
    };

    const handleMobileCLose = () => {
      dispatch(setIsMobile(false));
    };
    return (
      <>
        <Title />
        <Header />
        {isLoading ? (
          <Skeleton />
        ) : (
          <Drawer open={isMobile} onClose={handleMobileCLose}>
            <ChatList
              w="70vw"
              chats={data?.chats}
              chatId={chatId}
              handleDeleteChat={handleDeleteChat}
            />
          </Drawer>
        )}

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
            {isLoading ? (
              <Skeleton />
            ) : (
              <ChatList
                chats={data?.chats}
                chatId={chatId}
                handleDeleteChat={handleDeleteChat}
              />
            )}
          </Grid>
          <Grid item xs={12} sm={8} md={5} lg={6} height={'100%'}>
            <WrappedComponent {...props} chatId={chatId} user={user} />
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
            <Profile user={user} />
          </Grid>
        </Grid>
      </>
    );
  };

  LayoutComponent.displayName = `AppLayout(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`;

  return LayoutComponent;
};

export default AppLayout;
