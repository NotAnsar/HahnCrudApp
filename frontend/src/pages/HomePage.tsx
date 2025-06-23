import { buttonVariants } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function HomePage() {
	return (
		<div className='w-full p-6'>
			<div className='w-fit mx-auto'>
				<h1 className='text-3xl font-bold mb-6'>User Management System</h1>

				<Link to='/users' className={buttonVariants()}>
					View All Users
				</Link>
			</div>
		</div>
	);
}
