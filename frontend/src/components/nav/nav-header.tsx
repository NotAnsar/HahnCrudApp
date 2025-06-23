import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, buttonVariants } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import { Home, Users, Plus, LogIn, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

const publicLinks = [
	{
		to: '/',
		label: 'Home',
		icon: <Home className='h-4 w-4' />,
	},
];

const authenticatedLinks = [
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
	const navigate = useNavigate();
	const { isAuthenticated, logout } = useAuth();

	const isActive = (path: string) => {
		return location.pathname === path;
	};

	const handleLogout = () => {
		logout();
		navigate('/');
	};

	const links = isAuthenticated ? authenticatedLinks : publicLinks;

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

				{/* Auth Actions & Theme Toggle */}
				<div className='flex items-center gap-2'>
					{isAuthenticated ? (
						<Button variant='outline' size='sm' onClick={handleLogout}>
							<LogOut className='h-4 w-4' />
							<span className='hidden sm:inline'>Logout</span>
						</Button>
					) : (
						<>
							<Link
								to='/auth/login'
								className={cn(
									buttonVariants({ variant: 'ghost', size: 'sm' }),
									'flex items-center gap-2'
								)}
							>
								<LogIn className='h-4 w-4' />
								<span className='hidden sm:inline'>Login</span>
							</Link>
							<Link
								to='/auth/register'
								className={cn(
									buttonVariants({ variant: 'default', size: 'sm' }),
									'flex items-center gap-2'
								)}
							>
								<span className='hidden sm:inline'>Sign Up</span>
							</Link>
						</>
					)}
					<ModeToggle />
				</div>
			</div>
		</header>
	);
}
