import { Drawer, Grid, Skeleton } from '@mui/material';
import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  NEW_MESSAGE_ALERT,
  NEW_REQUEST,
  REFETCH_CHATS,
} from '../../constants/event';
import { useErrors, useSocketsEvents } from '../../hooks/hook';
import { getOrSaveFromStorage } from '../../lib/features';
import { useMyChatsQuery } from '../../redux/api/api';
import {
  incrementNotification,
  setNewMessagesAlert,
} from '../../redux/reducers/chatSlice';
import {
  setIsDeleteMenu,
  setIsMobile,
  setSelectedDeleteChat,
} from '../../redux/reducers/miscSlice';
import { getSocket } from '../../socket';
import DeleteChatMenu from '../dialogs/DeleteChatMenu';
import Title from '../shared/Title';
import ChatList from '../specific/ChatList';
import Profile from '../specific/Profile';
import Header from './Header';

/* AppLayout is not a typical component. It's a higher-order component (HOC). */
/* A higher-order component (HOC) is a function that takes a component and returns a new component with enhanced functionality.  */

/* The AppLayout component returns another function that takes a component (WrappedComponent) as an argument.

Inside this function, it returns another function (a component) that renders a layout structure. This structure includes a header, the WrappedComponent, and a footer.

The WrappedComponent is rendered with spread props ({...props}), which allows passing props from the higher-order component down to the wrapped component.

AppLayout is exported as the default export. */

const AppLayout = () => (WrappedComponent) => {
  const LayoutComponent = (props) => {
    const params = useParams();
    const navigate = useNavigate();
    const chatId = params.chatId;
    const deleteMenuAnchor = useRef(null);
    const dispatch = useDispatch();

    const socket = getSocket();

    const { isMobile } = useSelector((state) => state.misc);
    const { user } = useSelector((state) => state.auth);
    const { newMessagesAlert } = useSelector((state) => state.chat);

    const { isLoading, data, isError, error, refetch } = useMyChatsQuery('');

    console.log({ data });

    useErrors([{ isError, error }]);

    useEffect(() => {
      getOrSaveFromStorage({ key: NEW_MESSAGE_ALERT, value: newMessagesAlert });
    }, [newMessagesAlert]);

    const handleDeleteChat = (e, chatId, groupChat) => {
      dispatch(setIsDeleteMenu(true));
      dispatch(setSelectedDeleteChat({ chatId, groupChat }));
      deleteMenuAnchor.current = e.currentTarget;
    };

    const handleMobileCLose = () => {
      dispatch(setIsMobile(false));
    };

    const newMessageAlertListner = useCallback((data) => {
      if (data.chatId === chatId) {
        return;
      }

      dispatch(setNewMessagesAlert(data));
    }, []);

    const newRequestListener = useCallback(() => {
      dispatch(incrementNotification());
    }, [dispatch]);

    const refetchListner = useCallback(() => {
      refetch();
      navigate('/');
    }, [refetch, navigate]);

    const eventHandlers = {
      [NEW_MESSAGE_ALERT]: newMessageAlertListner,
      [NEW_REQUEST]: newRequestListener,
      [REFETCH_CHATS]: refetchListner,
    };

    useSocketsEvents(socket, eventHandlers);

    return (
      <>
        <Title />
        <Header />
        <DeleteChatMenu
          dispatch={dispatch}
          deleteMenuAnchor={deleteMenuAnchor}
        />
        {isLoading ? (
          <Skeleton />
        ) : (
          <Drawer open={isMobile} onClose={handleMobileCLose}>
            <ChatList
              w="70vw"
              chats={data?.chats}
              chatId={chatId}
              handleDeleteChat={handleDeleteChat}
              newMessagesAlert={newMessagesAlert}
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
                newMessagesAlert={newMessagesAlert}
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
