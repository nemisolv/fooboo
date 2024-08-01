import { Logo } from '@/assets/svg';
import { Link } from 'react-router-dom';
function HeaderPreLaYout() {
  return (
    <header className="fixed top-0 left-0 right-0 z-20 h-[56px] bg-white flex justify-between items-center px-4">
      <Logo />
      <div>
        <Link to='/auth/login' className="text-blue-500">Sign In</Link>
      </div>
    </header>
  );
}

export default HeaderPreLaYout;
