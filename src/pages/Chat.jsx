import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import AppLayout from '../components/layout/AppLayout';
import { IconButton, Skeleton, Stack } from '@mui/material';
import { grayColor, orange } from '../constants/color';
import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from '@mui/icons-material';
import { InputBox } from '../components/styles/StyledComponents';
import FileMenu from '../components/dialogs/FileMenu';
import { sampleMessage } from '../constants/sampleData';
import MessageComponent from '../components/shared/MessageComponent';
import { getSocket } from '../socket';
import { NEW_MESSAGE } from '../constants/event';
import { useChatDetailsQuery } from '../redux/api/api';

const user = {
  _id: 'sdfsdfsdf',
  name: 'Abhishek Nahar Singh',
};

const Chat = ({ chatId }) => {
  const containerRef = useRef(null);
  const socket = getSocket();

  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId });

  const [message, setMessage] = useState('');
  const members = chatDetails?.data?.chat?.members;

  const submitHandler = (e) => {
    e.preventDefault();

    if (!message.trim()) {
      return;
    }

    // Emitting the message to the server
    socket.emit(NEW_MESSAGE, { chatId, members, message });
    setMessage('');
  };

  // useEffect(() => {
  //   socket.on('connect', () => {
  //     console.log('Connected to server with ID:', socket.id);
  //   });

  //   socket.on('connect_error', (error) => {
  //     console.error('Connection error:', error);
  //   });

  //   return () => {
  //     socket.off('connect');
  //     socket.off('connect_error');
  //   };
  // }, [socket]);

  return chatDetails.isLoading ? (
    <Skeleton />
  ) : (
    <Fragment>
      <Stack
        ref={containerRef}
        boxSizing={'border-box'}
        padding={'1rem'}
        spacing={'1rem'}
        bgcolor={grayColor}
        height={'90%'}
        sx={{
          overflowX: 'hidden',
          overflowY: 'auto',
        }}
      >
        {sampleMessage.map((i) => (
          <MessageComponent key={i._id} message={i} user={user} />
        ))}
      </Stack>

      <form
        style={{
          height: '10%',
        }}
        onSubmit={submitHandler}
      >
        <Stack
          direction={'row'}
          height={'100%'}
          padding={'0.5rem'}
          alignItems={'center'}
          position={'relative'}
        >
          <IconButton
            sx={{
              position: 'absolute',
              left: '0.5rem',
              rotate: '30deg',
            }}
          >
            <AttachFileIcon />
          </IconButton>

          <InputBox
            placeholder="Type Message Here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <IconButton
            type="submit"
            sx={{
              rotate: '-30deg',
              bgcolor: orange,
              color: 'white',
              marginLeft: '1rem',
              padding: '0.5rem',
              '&:hover': {
                bgcolor: 'error.dark',
              },
            }}
          >
            <SendIcon />
          </IconButton>
        </Stack>
      </form>

      <FileMenu />
    </Fragment>
  );
};

export default AppLayout()(Chat);
