import { Outlet, useLocation } from 'react-router-dom';
import Header from './shared/Header';
import OtherSidebar from './OtherSidebar';
import { friendSidebarLinks } from '@/data/index';

export default function HeaderSidebarLayout() {
  const sidebarLinks = friendSidebarLinks;
  const location = useLocation();
  const {pathname} = location;
  const align = pathname === '/friends' ? ' justify-start' : 'justify-center';
  return (
    <div className="">
      <Header />
      <main className={`flex ${align}  pt-[56px] h-screen   bg-[#f0f2f5] `} 
      style={{height: 'calc(100vh - 56px)'}}
      >
        <div className="w-[360px] ">
          <OtherSidebar sidebarLinks={sidebarLinks}  />
        </div>
        <div className={`overflow-auto h-screen ${pathname==='/friends' ?'': 'w-[630px]'}`}>
          <Outlet />
        </div>
      </main>
      {/* <Footer /> */}
    </div>
  );
}
