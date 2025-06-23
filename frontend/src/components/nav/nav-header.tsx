import { Link, useLocation } from 'react-router-dom';
import { buttonVariants } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import { Home, Users, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

const links = [
	{
		to: '/',
		label: 'Home',
		icon: <Home className='h-4 w-4' />,
	},
	{
		to: '/users',
		label: 'Users',
		icon: <Users className='h-4 w-4' />,
	},
	{
		to: '/users/add',
		label: 'Add User',
		icon: <Plus className='h-4 w-4' />,
	},
];

export function NavHeader() {
	const location = useLocation();

	const isActive = (path: string) => {
		return location.pathname === path;
	};

	return (
		<header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
			<div className='container mx-auto flex h-14 items-center justify-between px-2'>
				<div className='flex items-center space-x-2'>
					<Link to='/' className='flex items-center space-x-2'>
						<div className='h-8 w-8 rounded-lg bg-primary flex items-center justify-center'>
							<span className='text-primary-foreground font-bold text-sm'>
								H
							</span>
						</div>
						<span className='font-bold text-xl'>Hahn CRUD</span>
					</Link>
				</div>

				{/* Navigation Links */}
				<nav className='flex items-center gap-1.5'>
					{links.map((link) => (
						<Link
							key={link.to}
							to={link.to}
							className={cn(
								'flex items-center gap-2',
								buttonVariants({
									variant: isActive(link.to) ? 'default' : 'ghost',
									size: 'sm',
								})
							)}
						>
							{link.icon}
							<span className='hidden sm:inline'>{link.label}</span>
						</Link>
					))}
				</nav>

				{/* Theme Toggle */}
				<div className='flex items-center gap-2'>
					<ModeToggle />
				</div>
			</div>
		</header>
	);
}
