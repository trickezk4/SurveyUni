import { Navigate, useRoutes } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';

import { Header } from '../layouts/Header';
import { DashboardPage } from '../pages/DashboardPage';
import { LoginPage } from '../pages/LoginPage';
import { ForgotPassword } from '../pages/ForgotPassword';
import UserManagementPage from '../pages/UserManagementPage';

export const routes: RouteObject[] = [
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/login/forgot',
    element: <ForgotPassword />
  },
  {
    path: '/',
    element: <Header />,
    children: [
      {
        index: true,
        element: <DashboardPage />
      },
      {
        path: 'users',
        element: <UserManagementPage />
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to="/" replace />
  }
];

export function AppRoutes() {
  return useRoutes(routes);
}
