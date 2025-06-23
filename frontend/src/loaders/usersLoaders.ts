import { getAllUsers } from '@/api/users';

// Loader for users list page
export async function usersLoader() {
	try {
		const users = await getAllUsers();
		return users;
	} catch (error) {
		console.error('Error loading users:', error);
		throw new Response('Failed to load users', { status: 500 });
	}
}
