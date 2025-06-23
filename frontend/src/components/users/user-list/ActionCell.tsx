import { useNavigate, useRevalidator } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import { deleteUser } from '@/api/users';
import type { User } from '@/types/user';
import { isAxiosError } from 'axios';
import { toast } from 'sonner';

export function ActionCell({ user }: { user: User }) {
	const navigate = useNavigate();
	const revalidator = useRevalidator();

	const handleDelete = async () => {
		if (confirm('Are you sure you want to delete this user?')) {
			try {
				await deleteUser(user.id);
				toast.success('User deleted successfully');
				revalidator.revalidate(); // Revalidate the route to refresh the user list
			} catch (error) {
				console.error('Delete error:', error);
				if (isAxiosError(error)) {
					toast.error(error.response?.data?.message || 'Failed to delete user');
				} else {
					toast.error('Failed to delete user');
				}
			}
		}
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' className='h-8 w-8 p-0'>
					<span className='sr-only'>Open menu</span>
					<MoreHorizontal className='h-4 w-4' />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuItem
					onClick={() => navigator.clipboard.writeText(user.email)}
				>
					Copy email
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={() => navigate(`/users/edit/${user.id}`)}>
					<Edit className='mr-1 h-4 w-4' />
					Edit user
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={handleDelete}
					className='text-destructive focus:text-destructive'
				>
					<Trash2 className='mr-1 h-4 w-4' />
					Delete user
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
