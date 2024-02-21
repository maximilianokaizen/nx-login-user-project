export const loginService = async (email : string, password : string) => {
    const response = await fetch('http://localhost:3000/api/users/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    if (response.ok) {
      const data = await response.json();
      console.log('data', data);
      console.log('Login successful:', data);
    } else {
      console.error('Login failed:', response.statusText);
    }
  };