import { FriendRenderList } from '@/components/Friend/FriendLRenderList';
import { fetchFriendRequests, fetchMyFriends } from '@/stores/slices/friendSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const dummyFriendRequests = [
  {
    id: 1,
    picture: 'https://i.pinimg.com/474x/2f/8a/86/2f8a86f2cd2588639370bb9ede3daf02.jpg',
    firstName: 'Kaoru',
    lastName: 'Miyazono',
  },
  {
    id: 2,
    picture: 'https://i.pinimg.com/474x/2f/8a/86/2f8a86f2cd2588639370bb9ede3daf02.jpg',
    firstName: '薫子♡凛太郎',
    lastName: '',
  },
  {
    id: 3,
    picture: 'https://i.pinimg.com/736x/db/61/d3/db61d31ae9e9c7cfe08e4d886ece9f04.jpg',
    firstName: 'Lam',
    lastName: 'Thanh',
  },
  {
    id: 4,
    picture: 'https://i.pinimg.com/736x/2b/f1/7a/2bf17ac527f5718fa8c6d56465de3968.jpg',
    firstName: 'Yoona',
    lastName: 'Im',
  },
  {
    id: 4,
    picture: 'https://i.pinimg.com/736x/2b/f1/7a/2bf17ac527f5718fa8c6d56465de3968.jpg',
    firstName: 'Yoona',
    lastName: 'Im',
  },
  {
    id: 4,
    picture: 'https://i.pinimg.com/736x/2b/f1/7a/2bf17ac527f5718fa8c6d56465de3968.jpg',
    firstName: 'Yoona',
    lastName: 'Im',
  },
  {
    id: 4,
    picture: 'https://i.pinimg.com/736x/2b/f1/7a/2bf17ac527f5718fa8c6d56465de3968.jpg',
    firstName: 'Yoona',
    lastName: 'Im',
  },
  {
    id: 4,
    picture: 'https://i.pinimg.com/736x/2b/f1/7a/2bf17ac527f5718fa8c6d56465de3968.jpg',
    firstName: 'Yoona',
    lastName: 'Im',
  },
  {
    id: 4,
    picture: 'https://i.pinimg.com/736x/2b/f1/7a/2bf17ac527f5718fa8c6d56465de3968.jpg',
    firstName: 'Yoona',
    lastName: 'Im',
  },
  {
    id: 4,
    picture: 'https://i.pinimg.com/736x/2b/f1/7a/2bf17ac527f5718fa8c6d56465de3968.jpg',
    firstName: 'Yoona',
    lastName: 'Im',
  },
  {
    id: 4,
    picture: 'https://i.pinimg.com/736x/2b/f1/7a/2bf17ac527f5718fa8c6d56465de3968.jpg',
    firstName: 'Yoona',
    lastName: 'Im',
  },
];

function Friend() {
  const {friendRequests} = useSelector(state => state.friend);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFriendRequests());
    dispatch(fetchMyFriends());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return <div>
    {friendRequests?.length >0 && <FriendRenderList list={friendRequests} title="Friend Requests" type="friendRequests" />}
    <FriendRenderList list={dummyFriendRequests} title="People May You know" type="suggetions" />
  </div>
}

export default Friend;
