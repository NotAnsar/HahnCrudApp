import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export function PublicRoute({ children }: { children: React.ReactNode }) {
	const { isAuthenticated } = useAuth();

	if (isAuthenticated) {
		return <Navigate to='/users' replace />;
	}

	return <>{children}</>;
}
