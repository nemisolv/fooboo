import { Friends, Gaming, HomeActive, Market, Watch } from '@/assets/svg';
import { FaUserCheck, FaUserClock, FaUserFriends } from 'react-icons/fa';

export const headerLinks = [
  {
    title: 'Home',
    href: '/',
    Icon: HomeActive,
  },
  {
    title: 'Friends',
    href: '/friends',
    Icon: Friends,
  },
  {
    title: 'Watch',
    href: '/live-video',
    Icon: Watch,
  },
  {
    title: 'Market',
    href: '/market',
    Icon: Market,
  },
  {
    title: 'Gaming',
    href: '/gaming',
    Icon: Gaming,
  },
];

export const friendSidebarLinks = [
  {
    isTitle: true,
    title: 'Friends',
  },
  {
    title: 'Home',
    href: '/friends',
    Icon: FaUserFriends,
  },
  {
    title: 'Friend Requests',
    href: '/friends/requests',
    Icon: FaUserClock,
  },
  {
    title: 'All Friends',
    href: '/friends/all',
    Icon: FaUserCheck,
  },
];
