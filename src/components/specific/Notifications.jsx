import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  ListItem,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import React, { memo } from 'react';
import { useErrors } from '../../hooks/hook';
import {
  useAcceptFriendRequestMutation,
  useGetNotificationsQuery,
} from '../../redux/api/api';
import { useDispatch, useSelector } from 'react-redux';
import { setIsNotification } from '../../redux/reducers/miscSlice';
import toast from 'react-hot-toast';

const Notifications = () => {
  const dispatch = useDispatch();

  const { isNotification } = useSelector((state) => state.misc);

  const { data, error, isError, isLoading } = useGetNotificationsQuery();

  const [acceptRequest] = useAcceptFriendRequestMutation();

  const friendRequestHandler = async ({ _id, accept }) => {
    dispatch(setIsNotification(false));
    try {
      const res = await acceptRequest({ requestId: _id, accept });

      if (res?.data?.success) {
        console.log('Use Socket here');
        toast.success(res?.data?.message);
      } else {
        toast.error(res?.error?.data?.message || 'Something Went Wrong');
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };
  const notificationCloseHandler = () => {
    dispatch(setIsNotification(false));
  };

  useErrors([{ isError, error }]);

  return (
    <Dialog open={isNotification} onClose={notificationCloseHandler}>
      <Stack p={{ xs: '1rem', sm: '2rem' }} maxWidth={'25rem'}>
        <DialogTitle textAlign={'center'}>Notifications</DialogTitle>
        {isLoading ? (
          <Skeleton />
        ) : (
          <>
            {data?.allRequests.length > 0 ? (
              data?.allRequests?.map(({ sender, _id }) => (
                <NotificationItem
                  key={_id}
                  sender={sender}
                  _id={_id}
                  handler={friendRequestHandler}
                />
              ))
            ) : (
              <Typography textAlign={'center'}>0 notifications</Typography>
            )}
          </>
        )}
      </Stack>
    </Dialog>
  );
};

const NotificationItem = memo(({ sender, _id, handler }) => {
  const { name, avatar } = sender;
  return (
    <ListItem>
      <Stack
        direction={'row'}
        alignItems={'center'}
        spacing={'1rem'}
        width={'100%'}
      >
        <Avatar />
        <Typography
          variant="body1"
          sx={{
            flexGlow: 1,
            display: '-webkit-box',
            WebkitLineClamp: 1,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: '100%',
          }}
        >
          {`${name} sent you a friend request.`}
        </Typography>
        <Stack
          direction={{
            xs: 'column',
            sm: 'row',
          }}
        >
          <Button onClick={() => handler({ _id, accept: true })}>Accept</Button>
          <Button color="error" onClick={() => handler({ _id, accept: false })}>
            Reject
          </Button>
        </Stack>
      </Stack>
    </ListItem>
  );
});

export default Notifications;
