import { FriendRenderList } from '@/components/Friend/FriendLRenderList';
import { fetchFriendRequests, fetchMyFriends, fetchSuggestedFriends } from '@/stores/slices/friendSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


function Friend() {
  const {friendRequests, suggestedFriends} = useSelector(state => state.friend);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFriendRequests());
    dispatch(fetchMyFriends());
    dispatch(fetchSuggestedFriends());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return <div>
    {friendRequests?.length >0 && <FriendRenderList list={friendRequests} title="Friend Requests" type="friendRequests" />}
    <FriendRenderList list={suggestedFriends} title="People May You know" type="suggetions" />
  </div>
}

export default Friend;
