import { Logo, Menu } from '@/assets/svg';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import MenuSearch from '@/components/Popper/Menu/GlobalSearch';
import { useSelector } from 'react-redux';
import { headerLinks } from '@/data';
import Tippy from '@tippyjs/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import DropdownConversations from '@/components/shared/Conversation/DropdownConversations';
import DropdownNotification from '@/components/shared/Notification/DropdownNotificaiton';
import { Button } from '@/components/ui/button';
import { logOut } from '@/utils/authUtils';
import { disconnectUser } from '@/socket/common';

function Header() {
  const { currentUser } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const color = '#666';

  const handleLogout = () => {
    disconnectUser(currentUser?.id);
    logOut(navigate);

  }
  return (
    <header className="fixed top-0 left-0  right-0 z-50   px-4  flex items-center   h-[56px] shadow bg-white ">
      <div className="flex items-center gap-2 w-[320px] ">
        <Logo />
        <MenuSearch />
      </div>

      <nav className=" h-full flex items-center justify-between mx-auto space-x-4">
        {headerLinks.map((link) => (
          <Tippy content={link.title} key={link.title} arrow={false}>
            <NavLink
              className={({ isActive }) =>
                ` px-12  flex items-center  hover:bg-gray-100 h-[56px]  rounded-lg border-b-2  transition-all duration-600 ${!isActive ? 'border-transparent' : '   rounded-none border-primary '}`
              }
              to={link.href}
            >
              <link.Icon color={color} />
            </NavLink>
          </Tippy>
        ))}
      </nav>

   {currentUser &&    <div className="flex items-center   gap-x-2 relative ">
        <span className=" w-10 h-10  bg-gray-200 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-300 ">
          <Menu />
        </span>
        {/* messenger */}
        <DropdownConversations />
        <DropdownNotification />
        {currentUser && (
          <DropdownMenu>
            <DropdownMenuTrigger>
              {' '}
              <span className=" w-10 h-10  bg-gray-200 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-300 ">
                <img
                  src={currentUser?.picture || ''}
                  alt=""
                  className="w-10 h-10 rounded-full border border-slate-400 object-cover"
                />
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate(`/profile/${currentUser?.id}`)}>Profile</DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>}

      {!currentUser && <Button variant='link'>
          <Link to="/auth/login">Login</Link>

      </Button>}
    </header>
  );
}

export default Header;
