import { axiosInstance } from '@/lib/axios';
import type {
	LoginRequest,
	RegisterRequest,
	AuthResponse,
	AuthResult,
} from '@/types/auth';
import type { Response } from '@/types/user';
import { AxiosError } from 'axios';

export async function login(
	credentials: LoginRequest
): Promise<AuthResult<AuthResponse>> {
	try {
		const response = await axiosInstance.post<Response<AuthResponse>>(
			'/api/auth/signin',
			credentials
		);

		// Store token in localStorage
		if (response.data.data?.token) {
			localStorage.setItem('token', response.data.data.token);
		}

		return {
			success: true,
			data: response.data.data,
			message: response.data.message || 'Login successful',
		};
	} catch (error) {
		if (error instanceof AxiosError) {
			if (error.response?.status === 401) {
				return {
					success: false,
					error: 'Invalid email or password',
					data: null,
				};
			}

			return {
				success: false,
				error: error.response?.data?.message || 'Login failed',
				data: null,
			};
		}

		return {
			success: false,
			error: 'Network error. Please check your connection.',
			data: null,
		};
	}
}

export async function register(
	userData: RegisterRequest
): Promise<AuthResult<AuthResponse>> {
	try {
		const response = await axiosInstance.post<Response<AuthResponse>>(
			'/api/auth/signup',
			userData
		);

		// Store token in localStorage
		if (response.data.data?.token) {
			localStorage.setItem('token', response.data.data.token);
		}

		return {
			success: true,
			data: response.data.data,
			message: response.data.message || 'Registration successful',
		};
	} catch (error) {
		if (error instanceof AxiosError) {
			if (error.response?.status === 400) {
				return {
					success: false,
					error: error.response?.data?.message || 'Invalid registration data',
					data: null,
				};
			}

			return {
				success: false,
				error: error.response?.data?.message || 'Registration failed',
				data: null,
			};
		}

		return {
			success: false,
			error: 'Network error. Please check your connection.',
			data: null,
		};
	}
}

export function logout() {
	localStorage.removeItem('token');
}

export function isAuthenticated(): boolean {
	return !!localStorage.getItem('token');
}
