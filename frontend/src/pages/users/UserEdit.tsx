import { useLoaderData } from 'react-router-dom';
import UserForm from '@/components/users/UserForm';
import type { User } from '@/types/user';

export default function UserEdit() {
	const user = useLoaderData() as User;

	return <UserForm user={user} />;
}
