import { useDispatch, useSelector } from 'react-redux';
import {
  acceptFriendRequest,
  addFriendRequest,
  declineAddFriendReceived,
  removeSentFriendRequest,
} from '@/stores/slices/friendSlice';
import {  useMemo } from 'react';
import { Button } from '../ui/button';
import { IoMdCheckmark } from 'react-icons/io';
export default function FriendAction({id, data}) {
  const {currentUser} = useSelector((state) => state.auth);
    id = Number(id)
    const { myFriends, sentRequests, friendRequests } = useSelector((state) => state.friend);
    console.log("🚀 ~ FriendAction ~ sentRequests:", sentRequests)
    const isAdded = useMemo(() => myFriends.some((friend) => friend.id === id), [myFriends, id]) ;
    const isSent = useMemo(() => sentRequests.some((friend) => friend.id === id), [sentRequests, id]);
    const isRequested = useMemo(() => friendRequests.some((friend) => friend.id === id), [friendRequests, id]);
    console.log('isAdded', isAdded, 'isSent', isSent, 'isRequested', isRequested);
    const dispatch = useDispatch();

    const handleAddFriend = (e) => {
        e.stopPropagation();
        dispatch(addFriendRequest(data));
      };
    
      const handleAccept = (e) => {
        e.stopPropagation();
        dispatch(acceptFriendRequest());
      };
      const handleDecline = (e) => {
        e.stopPropagation();
        dispatch(declineAddFriendReceived(id));
      };
    
      const handleRemoveSentRequest = (e) => {
        e.stopPropagation();
        dispatch(removeSentFriendRequest(id));
      };
      if(currentUser?.id === id) return null;

    return  <div>
    {!isAdded && !isSent && !isRequested && (
      <Button className=" bg-[#ebf5ff] text-primary hover:bg-[#ebf5ff] " onClick={(e) => handleAddFriend(e)}>
        Add friend
      </Button>
    )}
    {isSent && (
      <Button
        className=" bg-[#ebf5ff] text-primary hover:bg-[#ebf5ff] "
        onClick={(e) => handleRemoveSentRequest(e)}
      >
        Remove sent request
      </Button>
    )}
    {isRequested && (
      <div className="flex items-center gap-3">
        <Button className=" text-white " onClick={(e) => handleAccept(e)}>
          <IoMdCheckmark />
          Accept request
        </Button>

        <Button variant="secondary" onClick={(e) => handleDecline(e)}>
          Decline
        </Button>
      </div>
    )}
  </div>
}