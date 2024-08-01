import Header from './shared/Header';
import { Outlet } from 'react-router-dom';
import LeftSidebar from '../components/shared/sidebar/LeftSidebar';
import { sidebarLeft } from '@/data/home';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import RightSidebar from '@/components/shared/sidebar/RightSidebar';
import ConversationBox from '@/components/shared/Conversation/ConversationBox';
import { registerUser } from '@/socket/initializer';


function MainLayout() {
  const [showLess, setShowLess] = useState(true);
  const {currentUser} = useSelector(state => state.auth)

  useEffect(() => {
      if(currentUser){
        registerUser(currentUser)
      }
  },[currentUser?.id])


  return (
    <div className="">
      <Header />
      <main className="flex justify-between mx-auto mt-[56px] pt-4 h-auto bg-[#f0f2f5] max-w-[1420px] relative ">
        <div className="w-[360px]  ">
          <LeftSidebar
            sidebarLinks={sidebarLeft}
            currentUser={currentUser}
            showLess={showLess}
            setShowLess={setShowLess}
            toggleShow={true}
          />
        </div>
        <div className="w-[630px] ">
          <Outlet />
        </div>
        <div className="w-[360px]">
          {' '}
          <RightSidebar />
        </div>
      </main>
       <ConversationBox/>
      {/* <Footer /> */}
    </div>
  );
}

export default MainLayout;
