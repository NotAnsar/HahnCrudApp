import { type ColumnDef } from '@tanstack/react-table';
import { type User } from '@/types/user';
import { ActionCell } from './ActionCell';

export const columns: ColumnDef<User>[] = [
	{
		accessorKey: 'id',
		header: 'ID',
		cell: ({ row }) => <div className='w-[80px]'>{row.getValue('id')}</div>,
	},
	{
		accessorKey: 'username',
		header: 'Username',
		cell: ({ row }) => (
			<div className='font-medium'>{row.getValue('username')}</div>
		),
	},
	{
		accessorKey: 'firstName',
		header: 'First Name',
		cell: ({ row }) => <div>{row.getValue('firstName')}</div>,
	},
	{
		accessorKey: 'lastName',
		header: 'Last Name',
		cell: ({ row }) => <div>{row.getValue('lastName')}</div>,
	},
	{
		accessorKey: 'email',
		header: 'Email',
		cell: ({ row }) => <div className='lowercase'>{row.getValue('email')}</div>,
	},
	{
		accessorKey: 'role',
		header: 'Role',
		cell: ({ row }) => {
			const role = row.getValue('role') as string;
			return (
				<div
					className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
						role === 'ADMIN'
							? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
							: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
					}`}
				>
					{role}
				</div>
			);
		},
	},
	{
		accessorKey: 'createdAt',
		header: 'Created At',
		cell: ({ row }) => {
			const date = row.getValue('createdAt') as string;
			return <div>{date ? new Date(date).toLocaleDateString() : 'N/A'}</div>;
		},
	},
	{
		id: 'actions',
		cell: ({ row }) => <ActionCell user={row.original} />,
	},
];
