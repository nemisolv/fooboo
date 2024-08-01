import Header from './shared/Header';
import { Outlet } from 'react-router-dom';
import { sidebarLeft } from '@data/home';
import { useSelector } from 'react-redux';
import SidebarSearchFriend from '../components/shared/sidebar/SidebarSearchFriend';

function OtherLayout() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="">
      <Header />
      <main className="flex  mt-[56px] pt-4 h-auto bg-[#f0f2f5]  ">
        <div className="w-[360px] flex overflow-auto h-[100px]  ">
          {' '}
          <SidebarSearchFriend sidebarLinks={sidebarLeft} currentUser={currentUser?.user} />
        </div>
        <div className="">
          <Outlet />
        </div>
      </main>
      {/* <Footer /> */}
    </div>
  );
}

export default OtherLayout;
