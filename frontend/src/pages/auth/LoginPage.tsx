import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';
import { login as performLogin } from '@/api/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { loginSchema, type LoginFormData } from '@/schemas/authSchema';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
	const navigate = useNavigate();
	const { login } = useAuth();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		setError,
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
	});

	const onSubmit = async (data: LoginFormData) => {
		const result = await performLogin(data);

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
					<h1 className='text-3xl font-bold'>Sign In</h1>
					<p className='text-muted-foreground'>
						Enter your credentials to access your account
					</p>
				</div>

				<form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
					<div className='space-y-2'>
						<Label htmlFor='email'>Email</Label>
						<Input
							id='email'
							type='email'
							{...register('email')}
							placeholder='Enter your email'
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
							placeholder='Enter your password'
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
						{isSubmitting ? 'Signing in...' : 'Sign In'}
					</Button>
				</form>

				<div className='text-center'>
					<p className='text-sm text-muted-foreground'>
						Don't have an account?{' '}
						<Link
							to='/auth/register'
							className='font-medium text-primary underline underline-offset-4 hover:text-primary/80'
						>
							Sign up
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
