export const loginService = async (email: string, password: string) => {
  const response = await fetch('http://localhost:3000/api/users/auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  if (response.ok) {
    const data = await response.json();
    if (data.success === true) {
      sessionStorage.setItem('user', JSON.stringify(data));
      window.location.replace("/profile");
      return true;
    } else {
      return false;
    }
  } else {
    console.error('Login failed:', response.statusText);
  }
};
