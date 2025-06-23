import { Outlet } from 'react-router-dom';
import { NavHeader } from '@/components/nav/nav-header';

export function Layout() {
	return (
		<div className='min-h-screen bg-background'>
			<NavHeader />
			<main className='container mx-auto p-6'>
				<Outlet />
			</main>
		</div>
	);
}
