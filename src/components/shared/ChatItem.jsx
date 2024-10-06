import React, { memo } from 'react';
import { Link } from '../styles/StyledComponents';
import { Stack, Typography, Box } from '@mui/material';
import AvatarCard from './AvatarCard';
import { motion } from 'framer-motion';

const ChatItem = ({
  avatar = [],
  name,
  _id,
  groupChat = false,
  sameSender,
  isOnline,
  newMessageAlert,
  index = 0,
  handleDeleteChat,
}) => {
  return (
    <Link
      sx={{
        padding: '0',
      }}
      to={`/chat/${_id}`}
      onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}
    >
      <motion.div
        initial={{ opacity: 0, y: '-50%' }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        style={{
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
          padding: '1rem',
          backgroundColor: sameSender ? 'black' : 'unset',
          color: sameSender ? 'white' : 'unset',
          position: 'relative',
        }}
      >
        <AvatarCard avatar={avatar} />
        <Stack>
          <Typography>{name}</Typography>
          {newMessageAlert && (
            <Typography>{newMessageAlert.count} New Message</Typography>
          )}
        </Stack>

        {isOnline && (
          <Box
            sx={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: 'green',
              position: 'absolute',
              top: '50%',
              right: '1rem',
              transform: 'translateY(-50%)',
            }}
          />
        )}
      </motion.div>
    </Link>
  );
};

/* The memo function in React is a higher-order component (HOC) that you can use to optimize functional components by memoizing the result.

memo prevents unnecessary re-renders of functional components by memoizing the result. It memorizes the rendered output for the given set of props, and if the component is re-rendered with the same props, it returns the memorized result instead of re-rendering the component.
*/
export default memo(ChatItem);
