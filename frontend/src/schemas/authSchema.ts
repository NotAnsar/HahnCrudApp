import { z } from 'zod';

export const loginSchema = z.object({
	email: z
		.string()
		.min(1, 'Email is required')
		.email('Please provide a valid email address')
		.max(120, 'Email must not exceed 120 characters'),
	password: z
		.string()
		.min(6, 'Password must be at least 6 characters')
		.max(50, 'Password must not exceed 50 characters'),
});

export const registerSchema = z.object({
	username: z
		.string()
		.min(3, 'Username must be at least 3 characters')
		.max(30, 'Username must not exceed 30 characters')
		.regex(
			/^[a-zA-Z0-9._-]+$/,
			'Username can only contain letters, numbers, dots, underscores, and hyphens'
		),
	email: z
		.string()
		.min(1, 'Email is required')
		.email('Please provide a valid email address')
		.max(120, 'Email must not exceed 120 characters'),
	password: z
		.string()
		.min(6, 'Password must be at least 6 characters')
		.max(50, 'Password must not exceed 50 characters'),
	firstName: z
		.string()
		.min(3, 'Last name must be at least 3 characters')
		.max(30, 'Last name must not exceed 30 characters'),
	lastName: z
		.string()
		.min(3, 'Last name must be at least 3 characters')
		.max(30, 'Last name must not exceed 30 characters'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
