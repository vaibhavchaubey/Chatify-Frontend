import { Dialog, DialogTitle, Stack } from '@mui/material';
import React from 'react';
import { sampleUsers } from '../../constants/sampleData';
import UserItem from '../shared/UserItem';

const AddMemberDialog = ({ addMember, isLoadingAddMember, chadId }) => {
  const addFriendHandler = (id)=>{
    console.log(id, chadId)
  }
  return (
    <Dialog open>
      <Stack>
        <DialogTitle>Add Member</DialogTitle>
        <Stack>
          {sampleUsers.map((i) => (
            <UserItem
              user={i}
              handler={addFriendHandler}
              isLoadingAddMember={isLoadingAddMember}
              chadId={chadId}
            />
          ))}
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default AddMemberDialog;
