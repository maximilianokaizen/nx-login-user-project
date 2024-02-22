import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './home';
import Profile from './components/profile/profile';
import Login
 from './components/login/login';
const routes = [
  { path: '/', element: <Home /> },
  { path: '/login', element: <Login /> },
  { path: '/profile', element: <Profile /> },
];
const AppRoutes = () => {
  return (
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};

export default AppRoutes;