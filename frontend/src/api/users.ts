import { axiosInstance } from '@/lib/axios';
import type {
	User,
	Response,
	CreateUserRequest,
	UpdateUserRequest,
} from '@/types/user';

export async function getAllUsers() {
	const response = await axiosInstance.get<Response<User[]>>('/api/users');
	return response.data.data;
}

export async function getUserById(id: number) {
	const response = await axiosInstance.get<Response<User>>(`/api/users/${id}`);
	return response.data.data;
}

export async function createUser(userData: CreateUserRequest) {
	const response = await axiosInstance.post<Response<User>>(
		'/api/users',
		userData
	);
	return response.data.data;
}

export async function updateUser(id: number, userData: UpdateUserRequest) {
	const response = await axiosInstance.put<Response<User>>(
		`/api/users/${id}`,
		userData
	);
	return response.data.data;
}

export async function deleteUser(id: number) {
	await axiosInstance.delete(`/api/users/${id}`);
}
