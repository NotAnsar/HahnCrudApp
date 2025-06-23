import { getAllUsers, getUserById } from '@/api/users';
import type { LoaderFunctionArgs } from 'react-router-dom';

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

export async function userLoader({ params }: LoaderFunctionArgs) {
	const id = params.id;

	if (!id) {
		throw new Response('User ID is required', { status: 400 });
	}

	if (isNaN(Number(id))) {
		throw new Response('Invalid user ID', { status: 400 });
	}

	try {
		const user = await getUserById(Number(id));
		return user;
	} catch (error) {
		console.error('Error loading user:', error);
		throw new Response('User not found', { status: 404 });
	}
}
