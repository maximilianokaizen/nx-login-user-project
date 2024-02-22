import React, { useState } from 'react';
import { Button, TextField, Typography, Container } from '@mui/material';
import { loginService } from '../../services/login/login';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event:any) => {
    event.preventDefault();
    try {
      const response = await loginService(email, password);
      if (response) {
      
      } else {
        setError('Login failed');
      }
    } catch (error) {
      setError('Error: ' + error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" component="h1" gutterBottom>
        Login
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" fullWidth>
          Sign In
        </Button>
      </form>
    </Container>
  );
};

export default Login;
