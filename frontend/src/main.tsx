import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom';
import './index.css';
import { ThemeProvider } from './components/theme-provider.tsx';
import { ProtectedRoute } from './components/auth/ProtectedRoute.tsx';
import { PublicRoute } from './components/auth/PublicRoute.tsx';
import UserList from './pages/users/UserList.tsx';
import UserAdd from './pages/users/UserAdd.tsx';
import UserEdit from './pages/users/UserEdit.tsx';
import LoginPage from './pages/auth/LoginPage.tsx';
import RegisterPage from './pages/auth/RegisterPage.tsx';
import NotFoundPage from './pages/NotFoundPage.tsx';
import HomePage from './pages/HomePage.tsx';
import { Layout } from './pages/Layout.tsx';
import { userLoader, usersLoader } from './loaders/usersLoaders.ts';
import { AuthProvider } from './contexts/AuthContext.tsx';
import { Toaster } from 'sonner';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [{ index: true, element: <HomePage /> }],
	},
	{
		path: '/auth',
		element: (
			<PublicRoute>
				<Layout />
			</PublicRoute>
		),
		children: [
			{ path: 'login', element: <LoginPage /> },
			{ path: 'register', element: <RegisterPage /> },
		],
	},
	{
		path: '/users',
		element: (
			<ProtectedRoute>
				<Layout />
			</ProtectedRoute>
		),
		children: [
			{
				index: true,
				element: <UserList />,
				loader: usersLoader,
				errorElement: (
					<div className='text-center p-8'>
						<h1 className='text-2xl font-bold mb-4'>Failed to load users</h1>
						<p className='text-muted-foreground'>Please try again later.</p>
					</div>
				),
			},
			{ path: 'add', element: <UserAdd /> },
			{
				path: 'edit/:id',
				element: <UserEdit />,
				loader: userLoader,
				errorElement: (
					<div className='text-center p-8'>
						<h1 className='text-2xl font-bold mb-4'>User not found</h1>
						<p className='text-muted-foreground mb-4'>
							The user you're looking for doesn't exist.
						</p>
						<Link to='/users' className='text-primary underline'>
							Back to Users
						</Link>
					</div>
				),
			},
		],
	},
	{ path: '*', element: <NotFoundPage /> },
]);

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
			<AuthProvider>
				<RouterProvider router={router} />
				<Toaster />
			</AuthProvider>
		</ThemeProvider>
	</StrictMode>
);
