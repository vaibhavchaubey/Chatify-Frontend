import { useFileHandler, useInputValidation, useStrongPassword } from '6pp';
import { CameraAlt as CameraAltIcon } from '@mui/icons-material';
import {
  Avatar,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
  InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { VisuallyHiddenInput } from '../components/styles/StyledComponents';
import { bgGradient } from '../constants/color';
import { server } from '../constants/config';
import { userExists } from '../redux/reducers/authSlice';
import { usernameValidator } from '../utils/validators';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const toggleLogin = () => setIsLogin((prev) => !prev);

  const name = useInputValidation('');
  const bio = useInputValidation('');
  const username = useInputValidation('', usernameValidator);
  const password = useStrongPassword();

  const avatar = useFileHandler('single');

  const dispatch = useDispatch();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const toastId = toast.loading('Logging In...');
    setIsLoading(true);
    const config = {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/login`,
        {
          username: username.value,
          password: password.value,
        },
        config
      );

      dispatch(userExists(data.user));
      toast.success(data.message, {
        id: toastId,
      });
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || 'Something Went Wrong', {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    const toastId = toast.loading('Signing Up...');
    setIsLoading(true);
    const formData = new FormData();

    formData.append('avatar', avatar.file);
    formData.append('name', name.value);
    formData.append('bio', bio.value);
    formData.append('username', username.value);
    formData.append('password', password.value);

    const config = {
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    try {
      console.log('12');

      const { data } = await axios.post(
        `${server}/api/v1/user/new`,
        formData,
        config
      );
      console.log('terst');

      dispatch(userExists(data.user));
      toast.success(data.message, {
        id: toastId,
      });
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || 'Something Went Wrong', {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div
      style={{
        // backgroundImage:
        //   'linear-gradient(rgba(200, 200, 200, 0.5), rgba(120, 110, 220, 0.5))',

        backgroundImage: bgGradient,
      }}
    >
      <Container
        component={'main'}
        maxWidth="xs"
        sx={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {isLogin ? (
            <>
              <Typography variant="h5">Login</Typography>
              <form
                style={{
                  width: '100%',
                  marginTop: '1rem',
                }}
                onSubmit={handleLogin}
              >
                <TextField
                  required
                  fullWidth
                  label="Username"
                  margin="normal"
                  variant="outlined"
                  value={username.value}
                  onChange={username.changeHandler}
                />
                <TextField
                  required
                  fullWidth
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  margin="normal"
                  variant="outlined"
                  value={password.value}
                  onChange={password.changeHandler}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  sx={{
                    marginTop: '1rem',
                  }}
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  disabled={isLoading}
                >
                  Login
                </Button>
                <Typography textAlign={'center'} m={'1rem'}>
                  OR
                </Typography>
                <Button
                  fullWidth
                  variant="text"
                  color="secondary"
                  onClick={toggleLogin}
                  disabled={isLoading}
                >
                  Sign Up Instead
                </Button>
              </form>
            </>
          ) : (
            <>
              <Typography variant="h5">Sign Up</Typography>
              <form
                style={{
                  width: '100%',
                  marginTop: '1rem',
                }}
                onSubmit={handleSignup}
              >
                <Stack position={'relative'} width={'10rem'} margin={'auto'}>
                  <Avatar
                    sx={{
                      width: '10rem',
                      height: '10rem',
                      objectFit: 'contain',
                    }}
                    src={avatar.preview}
                  />

                  <IconButton
                    sx={{
                      position: 'absolute',
                      bottom: '0',
                      right: '0',
                      color: 'white',
                      bgcolor: 'rgb(0,0,0,0.5)',
                      ':hover': {
                        bgcolor: 'rgb(0,0,0,0.7)',
                      },
                    }}
                    component="label"
                  >
                    <>
                      <CameraAltIcon />
                      <VisuallyHiddenInput
                        type="file"
                        onChange={avatar.changeHandler}
                      />
                    </>
                  </IconButton>
                </Stack>
                {avatar.error && (
                  <Typography
                    m={'1rem'}
                    width={'fit-content'}
                    display={'block'}
                    color="error"
                    variant="caption"
                  >
                    {avatar.error}
                  </Typography>
                )}

                <TextField
                  required
                  fullWidth
                  label="Name"
                  margin="normal"
                  variant="outlined"
                  value={name.value}
                  onChange={name.changeHandler}
                />
                <TextField
                  required
                  fullWidth
                  label="Bio"
                  margin="normal"
                  variant="outlined"
                  value={bio.value}
                  onChange={bio.changeHandler}
                />
                <TextField
                  required
                  fullWidth
                  label="Username"
                  margin="normal"
                  variant="outlined"
                  value={username.value}
                  onChange={username.changeHandler}
                />
                {username.error && (
                  <Typography color="error" variant="caption">
                    {username.error}
                  </Typography>
                )}
                <TextField
                  required
                  fullWidth
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  margin="normal"
                  variant="outlined"
                  value={password.value}
                  onChange={password.changeHandler}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {password.error && (
                  <Typography color="error" variant="caption">
                    {password.error}
                  </Typography>
                )}
                <Button
                  sx={{
                    marginTop: '1rem',
                  }}
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  disabled={isLoading}
                >
                  Sign Up
                </Button>
                <Typography textAlign={'center'} m={'1rem'}>
                  OR
                </Typography>
                <Button
                  fullWidth
                  variant="text"
                  color="secondary"
                  onClick={toggleLogin}
                  disabled={isLoading}
                >
                  Login Instead
                </Button>
              </form>
            </>
          )}
        </Paper>
      </Container>
    </div>
  );
};

export default Login;
