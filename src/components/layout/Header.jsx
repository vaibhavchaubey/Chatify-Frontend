import React, { Suspense, lazy } from 'react';
import {
  Toolbar,
  AppBar,
  Box,
  Typography,
  IconButton,
  Tooltip,
  Backdrop,
} from '@mui/material';
import { orange } from '../../constants/color';
import {
  Add as AddIcon,
  Group as GroupIcon,
  Menu as MenuIcon,
  Search as SearchIcon,
  Logout as LogoutIcon,
  Notifications as NotificationsIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { server } from '../../constants/config';
import { useDispatch, useSelector } from 'react-redux';
import { userNotExists } from '../../redux/reducers/authSlice';
const SearchDialog = lazy(() => import('../specific/Search'));
const NotificationDialog = lazy(() => import('../specific/Notifications'));
const NewGroupDialog = lazy(() => import('../specific/NewGroup'));
import toast from 'react-hot-toast';
import { setIsMobile, setIsSearch } from '../../redux/reducers/miscSlice.js';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isSearch } = useSelector((state) => state.misc);

  const [isNewGroup, setIsNewGroup] = useState(false);
  const [isNotification, setIsNotification] = useState(false);

  const handleMobile = () => {
    dispatch(setIsMobile(true));
  };

  const openSearch = () => {
    dispatch(setIsSearch(true));
  };

  const openNewGroup = () => {
    setIsNewGroup((prev) => !prev);
  };

  const openNotification = () => {
    setIsNotification((prev) => !prev);
  };

  const navigateToGroup = () => navigate('/groups');

  const logoutHandler = async () => {
    try {
      const { data } = await axios.get(`${server}/user/logout`, {
        withCredentials: true,
      });
      dispatch(userNotExists());
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something Went Wrong');
    }
  };

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
        }}
        height={'4rem'}
      >
        <AppBar
          position="static"
          sx={{
            bgcolor: orange,
          }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              sx={{
                display: {
                  xs: 'none',
                  sm: 'block',
                },
              }}
            >
              Chatify
            </Typography>
            <Box
              sx={{
                display: {
                  xs: 'block',
                  sm: 'none',
                },
              }}
            >
              <IconButton color="inherit" onClick={handleMobile}>
                <MenuIcon />
              </IconButton>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
              }}
            />
            <Box>
              <IconBtn
                title={'Search'}
                icon={<SearchIcon />}
                onClick={openSearch}
              />

              <IconBtn
                title={'New Group'}
                icon={<AddIcon />}
                onClick={openNewGroup}
              />

              <IconBtn
                title={'Manage Groups'}
                icon={<GroupIcon />}
                onClick={navigateToGroup}
              />
              <IconBtn
                title={'Notifications'}
                icon={<NotificationsIcon />}
                onClick={openNotification}
              />
              <IconBtn
                title={'Logout'}
                icon={<LogoutIcon />}
                onClick={logoutHandler}
              />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      {isSearch && (
        <Suspense fallback={<Backdrop open />}>
          <SearchDialog />
        </Suspense>
      )}
      {isNotification && (
        <Suspense fallback={<Backdrop open />}>
          <NotificationDialog />
        </Suspense>
      )}
      {isNewGroup && (
        <Suspense fallback={<Backdrop open />}>
          <NewGroupDialog />
        </Suspense>
      )}
    </>
  );
};

const IconBtn = ({ title, icon, onClick }) => {
  return (
    <Tooltip title={title}>
      <IconButton color="inherit" size="large" onClick={onClick}>
        {icon}
      </IconButton>
    </Tooltip>
  );
};

export default Header;
