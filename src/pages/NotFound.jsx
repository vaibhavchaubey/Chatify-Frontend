import { Error as ErrorIcon } from '@mui/icons-material';
import { Container, Stack, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <Stack
        alignItems="center"
        spacing={4}
        justifyContent="center"
        height="100%"
        sx={{
          color: '#333',
        }}
      >
        <ErrorIcon
          sx={{
            fontSize: '10rem',
            color: '#000',
            backgroundColor: '#fff',
            borderRadius: '50%',
            padding: '1rem',
          }}
        />
        <Typography
          variant="h1"
          sx={{
            fontWeight: 'bold',
            fontSize: '6rem',
            color: '#000',
          }}
        >
          404
        </Typography>
        <Typography
          variant="h4"
          sx={{
            color: '#666',
            fontWeight: 500,
          }}
        >
          Oops! Page Not Found
        </Typography>
        <Button
          variant="contained"
          component={Link}
          to="/"
          sx={{
            textTransform: 'none',
            fontSize: '1.1rem',
            padding: '0.8rem 2.5rem',
            backgroundColor: '#000',
            color: '#fff',
            borderRadius: '30px',
            boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              backgroundColor: '#333',
              boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.3)',
              transform: 'translateY(-2px)',
              transition: 'all 0.3s ease',
            },
          }}
        >
          Go Back to Home
        </Button>
      </Stack>
    </Container>
  );
};

export default NotFound;
