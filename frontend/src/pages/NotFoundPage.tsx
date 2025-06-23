import { Link } from 'react-router-dom';

export default function NotFoundPage() {
	return (
		<div className='text-center p-8'>
			<h1 className='text-4xl font-bold mb-4'>404 - Page Not Found</h1>
			<p className='text-muted-foreground mb-6'>
				The page you're looking for doesn't exist.
			</p>
			<Link
				to='/'
				className='text-primary underline hover:text-primary/foreground'
			>
				Go back to Home
			</Link>
		</div>
	);
}
