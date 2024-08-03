import Header from './shared/Header';
import { Outlet } from 'react-router-dom';
import ConversationBox from '@/components/shared/Conversation/ConversationBox';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchFriendRequests, fetchMyFriends, fetchSentRequests } from '@/stores/slices/friendSlice';


function OnlyHeaderLayout() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  useEffect(() => {
    if (currentUser) {
      dispatch(fetchFriendRequests());
      dispatch(fetchMyFriends());
      dispatch(fetchSentRequests());
    }
  }, [currentUser?.id]);


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
