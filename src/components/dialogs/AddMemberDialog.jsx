import {
  Button,
  Dialog,
  DialogTitle,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAsyncMutation, useErrors } from '../../hooks/hook';
import {
  useAddGroupMembersMutation,
  useAvailableFriendsQuery,
} from '../../redux/api/api';
import { setIsAddMember } from '../../redux/reducers/miscSlice';
import UserItem from '../shared/UserItem';

const AddMemberDialog = ({ chatId }) => {
  const dispatch = useDispatch();
  const { isAddMember } = useSelector((state) => state.misc);

  /* Here we are passing the chatId in the useAvailableFriendsQuery in order to get only those friends who are not in the group */

  const { isError, isLoading, error, data } = useAvailableFriendsQuery(chatId);

  const [addMembers, isLoadingAddMembers] = useAsyncMutation(
    useAddGroupMembersMutation
  );

  const [selectedMembers, setSelectedMembers] = useState([]);

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currElement) => currElement !== id)
        : [...prev, id]
    );
  };

  const closeHandler = () => {
    dispatch(setIsAddMember(false));
  };

  const addMemberSubmitHandler = () => {
    addMembers('Adding Members...', { chatId, members: selectedMembers });
    closeHandler();
  };

  const errors = [
    {
      isError,
      error,
    },
  ];

  useErrors(errors);

  return (
    <Dialog open={isAddMember} onClose={closeHandler}>
      <Stack p={'2rem'} width={'20rem'} spacing={'2rem'}>
        <DialogTitle textAlign={'center'}>Add Member</DialogTitle>
        <Stack spacing={'1rem'}>
          {isLoading ? (
            <Skeleton />
          ) : data?.friends?.length > 0 ? (
            data?.friends?.map((i) => (
              <UserItem
                user={i}
                key={i._id}
                handler={selectMemberHandler}
                isAdded={selectedMembers.includes(i._id)}
              />
            ))
          ) : (
            <Typography textAlign={'center'}>No Friends</Typography>
          )}
        </Stack>
        <Stack
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-evenly'}
        >
          <Button onClick={closeHandler} color="error">
            Cancel
          </Button>
          <Button
            onClick={addMemberSubmitHandler}
            variant="contained"
            disabled={isLoadingAddMembers}
          >
            Sumbit Changes
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default AddMemberDialog;
