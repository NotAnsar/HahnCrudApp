import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { ThemeProvider } from './components/theme-provider.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage.tsx';
import UserList from './pages/users/UserList.tsx';
import { usersLoader } from './loaders/usersLoaders.ts';
import { Layout } from './pages/Layout.tsx';
import NotFoundPage from './pages/NotFoundPage.tsx';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{ index: true, element: <HomePage /> },
			{
				path: '/users',
				element: <UserList />,
				loader: usersLoader,
				errorElement: (
					<div className='text-center p-8'>
						<h1 className='text-2xl font-bold mb-4'>Failed to load users</h1>
						<p className='text-muted-foreground'>Please try again later.</p>
					</div>
				),
			},
			{ path: '*', element: <NotFoundPage /> },
		],
	},
]);

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
			<RouterProvider router={router} />
		</ThemeProvider>
	</StrictMode>
);
