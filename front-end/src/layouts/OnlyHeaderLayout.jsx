import Header from './shared/Header';
import { Outlet } from 'react-router-dom';
import ConversationBox from '@/components/shared/Conversation/ConversationBox';


function OnlyHeaderLayout() {


  return (
    <div className="">
      <Header />
      <main className="flex justify-between  mt-[56px] pt-4 h-auto bg-[#f0f2f5]  relative ">
        <div className="max-w-7xl mx-auto w-full ">
          <Outlet />
        </div>
        
      </main>
       <ConversationBox/>
      {/* <Footer /> */}
    </div>
  );
}

export default OnlyHeaderLayout;
