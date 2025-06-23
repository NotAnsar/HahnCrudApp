import { useLoaderData } from 'react-router-dom';
import { DataTable } from '@/components/users/user-list/data-table';
import { columns } from '@/components/users/user-list/columns';
import { type User } from '@/types/user';

export default function UserList() {
	const users = useLoaderData() as User[];

	return (
		<div className='container mx-auto py-6'>
			<div className='mb-6'>
				<h1 className='text-3xl font-bold tracking-tight'>Users</h1>
				<p className='text-muted-foreground'>
					View all users and their information.
				</p>
			</div>
			<DataTable columns={columns} data={users} />
		</div>
	);
}
