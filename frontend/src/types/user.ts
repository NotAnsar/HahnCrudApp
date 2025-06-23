export type User = {
	id: number;
	username: string;
	email: string;
	password?: string;
	firstName: string;
	lastName: string;
	role: 'USER' | 'ADMIN';
	createdAt?: string;
	updatedAt?: string;
};

export type Response<T> = { data: T; message?: string; success?: boolean };

export type UserResponse = Response<User>;

export type CreateUserRequest = {
	username: string;
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	role?: 'USER' | 'ADMIN';
};

export type UpdateUserRequest = {
	username?: string;
	email?: string;
	password?: string;
	firstName?: string;
	lastName?: string;
	role?: 'USER' | 'ADMIN';
};
