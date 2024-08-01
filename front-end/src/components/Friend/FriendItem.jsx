import { useDispatch } from 'react-redux';
import { Button } from '../ui/button';
import { acceptFriendRequest, addFriendRequest } from '@/stores/slices/friendSlice';

export default function FriendItem({ data, type = 'friendRequests' }) {
  const dispatch =useDispatch();
  const { id,firstName, lastName, picture } = data;
  const titleButton1 = type === 'friendRequests' ? 'Confirm' : 'Add friend';
  const titleButton2 = type === 'friendRequests' ? 'Delete' : 'Remove';

  const handleAcceptOrAddFriend = () => {
    if(type === 'friendRequests'){
      dispatch(acceptFriendRequest(id))
      }else if(type === 'suggetions'){
        dispatch(addFriendRequest(id))

      }

  }
  return (
    <div className="rounded-lg  w-full  bg-white shadow overflow-hidden">
      <div>
        <img src={picture} alt={`${firstName}'s picture`} className="size-[220px] object-cover" />
        <div className="my-3  p-2">
          <h4 className="font-medium text-lg">
            {firstName} {lastName}
          </h4>
        </div>
        <div className="flex flex-col gap-2 p-2">
          <Button
            className={` font-medium w-full ${type === 'friendRequests' ? 'bg-primary text-white' : 'bg-[#ebf5ff] text-primary hover:bg-[#ebf5ff]'}`}
            onClick={handleAcceptOrAddFriend}
          >
            {titleButton1}
          </Button>
          <Button className="bg-gray-200 w-full  font-medium hover:bg-gray-300"> {titleButton2}</Button>
        </div>
      </div>
    </div>
  );
}
