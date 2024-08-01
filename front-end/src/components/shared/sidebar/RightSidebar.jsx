import Divider from '@/styles/Divider';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchMyFriends } from '@/stores/slices/friendSlice';
import ShortcutUserPreview from '../ShortcutUserPreview';
import { IoIosMore, IoMdSearch } from 'react-icons/io';

function RightSidebar() {
  const { myFriends } = useSelector((state) => state.friend);
  const {currentUser} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if(currentUser) {
      dispatch(fetchMyFriends());
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <aside className=" fixed   overflow-scroll h-screen hide-scrollbar ">
      <div className="w-[360px]  ">
        {/* {myFriends.map((sidebarLink, index) => ( */}
         
                <div className="flex gap-x-2">
                  <span  className="p-2 rounded-full hover:bg-gray-300 cursor-pointer">
                    <IoMdSearch size={20} />
                  </span>
                  <span  className="p-2 rounded-full hover:bg-gray-300 cursor-pointer">
                    <IoIosMore size={20} />
                  </span>
                </div>
               

              {/* </div>  */}
                {myFriends.length >0 ? myFriends.map((friend) => (
                  <ShortcutUserPreview key={friend.id} data={friend} />
                )) : <p className="text-center">No friends yet</p>}
            {/* </div> */}
            <Divider className="my-2" />
          {/* </div>   */}
         {/* ))} */}
      </div>
    </aside>
  );
}


export default RightSidebar;
