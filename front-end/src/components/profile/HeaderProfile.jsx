import {  useSelector } from 'react-redux';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '../ui/button';
import { FaCamera } from 'react-icons/fa';
import EditProfile from './EditProfile';
import FriendAction from '../shared/FriendAction';

export default function HeaderProfile({id}) {
  const { userProfile } = useSelector((state) => state.user);
  const {currentUser} = useSelector((state) => state.auth);

 

  return (
    <div className=" border-b border-gray-300 pb-8 mt-6 flex-between">
      <div className="flex items-center gap-3  ">
        <div className="relative">
          <Avatar className="size-[168px] rounded-full overflow-hidden shadow border-8  border-gray-200  ">
            <AvatarImage src={userProfile?.picture} className="object-cover" />
            <AvatarFallback>{userProfile?.firstName}</AvatarFallback>
          </Avatar>
          <div>
            <label htmlFor="profile" className="absolute bottom-2 right-2">
              <input type="file" name="profile" id="profile" hidden />
              <Button className=' rounded-full border border-gray-200 overflow-hidden bg-neutral-300 ' variant='ghost'>
                <FaCamera />
              </Button>
            </label>
          </div>
        </div>

        <div className="">
          <h2 className='font-medium text-black text-2xl'>{userProfile?.firstName + ' ' + userProfile?.lastName}</h2>
          <p>{userProfile?.FriendsCount}</p>
          {/* list friends */}
        </div>
      </div>

      <div>
        {currentUser?.id === id && <EditProfile/>}
        {currentUser?.id !== id &&  <FriendAction id={id} data={userProfile}/>}
      </div>
    </div>
  );
}
