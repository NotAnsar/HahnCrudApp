import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';
import { register as registerUser } from '@/api/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { registerSchema, type RegisterFormData } from '@/schemas/authSchema';
import { useAuth } from '@/contexts/AuthContext';

export default function RegisterPage() {
	const navigate = useNavigate();
	const { login } = useAuth();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		setError,
	} = useForm<RegisterFormData>({
		resolver: zodResolver(registerSchema),
	});

	const onSubmit = async (data: RegisterFormData) => {
		const result = await registerUser(data);

		if (result.success) {
			login();
			navigate('/users');
		} else {
			setError('root', {
				type: 'manual',
				message: result.error,
			});
		}
	};

	return (
		<div className='container mx-auto py-12'>
			<div className='mx-auto max-w-md space-y-6'>
				<div className='space-y-2 text-center'>
					<h1 className='text-3xl font-bold'>Sign Up</h1>
					<p className='text-muted-foreground'>
						Create a new account to get started
					</p>
				</div>

				<form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
					<div className='grid grid-cols-2 gap-4'>
						<div className='space-y-2'>
							<Label htmlFor='firstName'>First Name</Label>
							<Input
								id='firstName'
								{...register('firstName')}
								placeholder='John'
								aria-invalid={errors.firstName ? 'true' : 'false'}
							/>
							{errors.firstName && (
								<p className='text-sm text-destructive'>
									{errors.firstName.message}
								</p>
							)}
						</div>

						<div className='space-y-2'>
							<Label htmlFor='lastName'>Last Name</Label>
							<Input
								id='lastName'
								{...register('lastName')}
								placeholder='Doe'
								aria-invalid={errors.lastName ? 'true' : 'false'}
							/>
							{errors.lastName && (
								<p className='text-sm text-destructive'>
									{errors.lastName.message}
								</p>
							)}
						</div>
					</div>

					<div className='space-y-2'>
						<Label htmlFor='username'>Username</Label>
						<Input
							id='username'
							{...register('username')}
							placeholder='johndoe'
							aria-invalid={errors.username ? 'true' : 'false'}
						/>
						{errors.username && (
							<p className='text-sm text-destructive'>
								{errors.username.message}
							</p>
						)}
					</div>

					<div className='space-y-2'>
						<Label htmlFor='email'>Email</Label>
						<Input
							id='email'
							type='email'
							{...register('email')}
							placeholder='john@example.com'
							aria-invalid={errors.email ? 'true' : 'false'}
						/>
						{errors.email && (
							<p className='text-sm text-destructive'>{errors.email.message}</p>
						)}
					</div>

					<div className='space-y-2'>
						<Label htmlFor='password'>Password</Label>
						<Input
							id='password'
							type='password'
							{...register('password')}
							placeholder='Enter password (min 6 characters)'
							aria-invalid={errors.password ? 'true' : 'false'}
						/>
						{errors.password && (
							<p className='text-sm text-destructive'>
								{errors.password.message}
							</p>
						)}
					</div>

					{errors.root && (
						<div className='rounded-md bg-destructive/15 p-3'>
							<p className='text-sm text-destructive'>{errors.root.message}</p>
						</div>
					)}

					<Button type='submit' disabled={isSubmitting} className='w-full'>
						{isSubmitting ? 'Creating account...' : 'Create Account'}
					</Button>
				</form>

				<div className='text-center'>
					<p className='text-sm text-muted-foreground'>
						Already have an account?{' '}
						<Link
							to='/auth/login'
							className='font-medium text-primary underline underline-offset-4 hover:text-primary/80'
						>
							Sign in
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
