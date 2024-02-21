import React, { useEffect } from 'react';
import { Button, Typography, Container } from '@mui/material';

const Profile = () => {
  useEffect(() => {
    const userData = sessionStorage.getItem('user');
    if (!userData) {
      window.location.replace('/'); // Redirigir a la página de inicio
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    window.location.replace('/');
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" component="h1" gutterBottom>
        Profile
      </Typography>
      <Button onClick={handleLogout} variant="contained" color="primary">
        Logout
      </Button>
    </Container>
  );
};

export default Profile;
