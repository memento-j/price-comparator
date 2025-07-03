import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import HomePage from './pages/HomePage'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotFoundPage from './pages/NotFoundPage'
import LoginPage from './pages/LoginPage'
import SettingsPage from './pages/SettingsPage'
import FavoritesPage from './pages/FavoritesPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <NotFoundPage />
  },
  {
    path: '/login',
    element: <LoginPage/>
  },
  {
    path: '/account/settings',
    element: <SettingsPage />
  },
  {
    path: '/account/favorites',
    element: <FavoritesPage />
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
