import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { createUser, updateUser } from '@/api/users';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	createUserSchema,
	updateUserSchema,
	type CreateUserFormData,
	type UpdateUserFormData,
} from '@/schemas/userSchema';
import type { User } from '@/types/user';
import { isAxiosError } from 'axios';

export default function UserForm({ user }: { user?: User }) {
	const navigate = useNavigate();
	const isEditing = !!user;

	// Use appropriate schema based on edit/create mode
	const schema = isEditing ? updateUserSchema : createUserSchema;

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors, isSubmitting },
		setError,
	} = useForm<CreateUserFormData | UpdateUserFormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			username: user?.username || '',
			email: user?.email || '',
			password: '',
			firstName: user?.firstName || '',
			lastName: user?.lastName || '',
			role: user?.role || 'USER',
		},
	});

	const roleValue = watch('role');

	const onSubmit = async (data: CreateUserFormData | UpdateUserFormData) => {
		try {
			if (isEditing && user) {
				const updateData = { ...data };
				// If password is empty, do not include it in the update
				if (!data.password || data.password.trim() === '') {
					delete updateData.password;
				}
				await updateUser(user.id, updateData);
			} else {
				await createUser(data as CreateUserFormData);
			}
			navigate('/users');
		} catch (error) {
			console.error(`${isEditing ? 'Update' : 'Create'} error:`, error);

			// Handle API validation errors
			if (isAxiosError(error)) {
				setError('root', {
					type: 'manual',
					message: error.response?.data?.message,
				});
			} else {
				setError('root', {
					type: 'manual',
					message: `Failed to ${
						isEditing ? 'update' : 'create'
					} user. Please try again.`,
				});
			}
		}
	};

	const handleRoleChange = (value: 'USER' | 'ADMIN') => {
		setValue('role', value);
	};

	return (
		<div className='container mx-auto py-6'>
			<div className='mb-6'>
				<h1 className='text-3xl font-bold tracking-tight'>
					{isEditing ? 'Edit User' : 'Add User'}
				</h1>
				<p className='text-muted-foreground'>
					{isEditing
						? `Update user information for ${user?.username}.`
						: 'Create a new user account.'}
				</p>
			</div>

			<form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
				<div className='grid gap-4'>
					{/* Username and Email Row */}
					<div className='grid md:grid-cols-2 gap-4'>
						<div className='grid gap-2'>
							<Label htmlFor='username'>Username</Label>
							<Input
								id='username'
								{...register('username')}
								placeholder='Enter username'
								aria-invalid={errors.username ? 'true' : 'false'}
							/>
							{errors.username && (
								<p className='text-sm text-destructive'>
									{errors.username.message}
								</p>
							)}
						</div>

						<div className='grid gap-2'>
							<Label htmlFor='email'>Email</Label>
							<Input
								id='email'
								type='email'
								{...register('email')}
								placeholder='Enter email address'
								aria-invalid={errors.email ? 'true' : 'false'}
							/>
							{errors.email && (
								<p className='text-sm text-destructive'>
									{errors.email.message}
								</p>
							)}
						</div>
					</div>

					{/* Password and Role Row */}
					<div className='grid md:grid-cols-2 gap-4'>
						<div className='grid gap-2'>
							<Label htmlFor='password'>
								Password
								{isEditing && (
									<span className='text-muted-foreground text-xs ml-2'>
										(leave empty to keep current password)
									</span>
								)}
							</Label>
							<Input
								id='password'
								type='password'
								{...register('password')}
								placeholder={
									isEditing
										? 'Enter new password (optional)'
										: 'Enter password (min 6 characters)'
								}
								aria-invalid={errors.password ? 'true' : 'false'}
							/>
							{errors.password && (
								<p className='text-sm text-destructive'>
									{errors.password.message}
								</p>
							)}
						</div>

						<div className='grid gap-2'>
							<Label htmlFor='role'>Role</Label>
							<Select value={roleValue} onValueChange={handleRoleChange}>
								<SelectTrigger className='w-full'>
									<SelectValue placeholder='Select role' />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='USER'>User</SelectItem>
									<SelectItem value='ADMIN'>Admin</SelectItem>
								</SelectContent>
							</Select>
							{errors.role && (
								<p className='text-sm text-destructive'>
									{errors.role.message}
								</p>
							)}
						</div>
					</div>

					{/* First Name and Last Name Row */}
					<div className='grid grid-cols-2 gap-4'>
						<div className='grid gap-2'>
							<Label htmlFor='firstName'>First Name</Label>
							<Input
								id='firstName'
								{...register('firstName')}
								placeholder='First name'
								aria-invalid={errors.firstName ? 'true' : 'false'}
							/>
							{errors.firstName && (
								<p className='text-sm text-destructive'>
									{errors.firstName.message}
								</p>
							)}
						</div>

						<div className='grid gap-2'>
							<Label htmlFor='lastName'>Last Name</Label>
							<Input
								id='lastName'
								{...register('lastName')}
								placeholder='Last name'
								aria-invalid={errors.lastName ? 'true' : 'false'}
							/>
							{errors.lastName && (
								<p className='text-sm text-destructive'>
									{errors.lastName.message}
								</p>
							)}
						</div>
					</div>

					{/* Read-only fields for editing */}
					{isEditing && user && (
						<>
							<div className='grid gap-2'>
								<Label>User ID</Label>
								<Input value={user.id} disabled className='bg-muted' />
								<p className='text-xs text-muted-foreground'>
									User ID cannot be changed
								</p>
							</div>

							{user.createdAt && (
								<div className='grid gap-2'>
									<Label>Created At</Label>
									<Input
										value={new Date(user.createdAt).toLocaleString()}
										disabled
										className='bg-muted'
									/>
								</div>
							)}
						</>
					)}
				</div>

				{/* Root error (API errors) */}
				{errors.root && (
					<div className='rounded-md bg-destructive/15 p-3'>
						<div className='text-sm text-destructive'>
							{errors.root.message}
						</div>
					</div>
				)}

				{/* Submit Buttons */}
				<div className='flex gap-3'>
					<Button type='submit' disabled={isSubmitting} className='flex-1'>
						{isSubmitting
							? `${isEditing ? 'Updating' : 'Creating'}...`
							: `${isEditing ? 'Update' : 'Create'} User`}
					</Button>
					<Button
						type='button'
						variant='outline'
						onClick={() => navigate('/users')}
					>
						Cancel
					</Button>
				</div>
			</form>
		</div>
	);
}
