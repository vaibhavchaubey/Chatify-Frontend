import {
  Dialog,
  Stack,
  DialogTitle,
  TextField,
  InputAdornment,
  List,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useInputValidation } from '6pp';
import UserItem from '../shared/UserItem';
import { useEffect, useState } from 'react';
import { sampleUsers } from '../../constants/sampleData';
import { useDispatch, useSelector } from 'react-redux';
import { setIsSearch } from '../../redux/reducers/miscSlice';
import { useLazySearchUserQuery } from '../../redux/api/api';

const Search = () => {
  const dispatch = useDispatch();
  const { isSearch } = useSelector((state) => state.misc);

  const [searchUser, { data, error, isLoading }] = useLazySearchUserQuery();

  const search = useInputValidation('');
  const [users, setUsers] = useState(sampleUsers);
  let isLoadingSendFriendRequest = false;
  const addFriendHandler = (id) => {
    console.log(id);
  };

  const searchCloseHandler = () => {
    dispatch(setIsSearch(false));
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      console.log(search.value);
      // searchUser(search.value);
    }, 1000);

    return () => clearTimeout(timeOutId);
  }, [search.value]);

  return (
    <Dialog open={isSearch} onClose={searchCloseHandler}>
      <Stack p={'2rem'} direction={'column'} width={'25rem'}>
        <DialogTitle textAlign={'center'}>Find People</DialogTitle>
        <TextField
          label=""
          value={search.value}
          onChange={search.changeHandler}
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <List>
          {users.map((i) => (
            <UserItem
              user={i}
              key={i._id}
              handler={addFriendHandler}
              handlerIsLoading={isLoadingSendFriendRequest}
            />
          ))}
        </List>
      </Stack>
    </Dialog>
  );
};

export default Search;
