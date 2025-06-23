import type { User } from './user';

export type LoginRequest = {
	email: string;
	password: string;
};

export type RegisterRequest = {
	username: string;
	email: string;
	password: string;
	firstName: string;
	lastName: string;
};

export type AuthResponse = {
	message: string;
	user: Omit<User, 'password' | 'createdAt' | 'updatedAt'>;
	token: string;
	success: boolean;
};

export type AuthResult<T> =
	| {
			success: true;
			data: T;
			message: string;
	  }
	| {
			success: false;
			error: string;
			data: null;
	  };
