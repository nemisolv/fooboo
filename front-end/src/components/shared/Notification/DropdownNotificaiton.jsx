import { useState } from 'react';
import { FaBell } from 'react-icons/fa';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Loader';
import NotificationItem from './NotificationItem';
import { useEffect } from 'react';
import { getAllNotifications, getNumberUnread, toggleOpen } from '@/stores/slices/notificationSlice';
import NotificationHeader from './NotificationHeader';
import NumberNotification from '../NumberNotification';

export default function DropdownNotification() {
  
  const { notifications,open, loading ,unReadCount} = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllNotifications());
    dispatch(getNumberUnread());
    
  }, [dispatch,notifications?.length]);

  return (
    <Popover onOpenChange={(open) => dispatch(toggleOpen())}>
      <PopoverTrigger
        className={`w-10 h-10 relative rounded-full flex items-center  justify-center cursor-pointer ${
          open ? ' bg-[#1d85fc33]' : 'bg-gray-200'
        } `}
      >
       <span className={`${open ? 'text-primary':''}`}> <FaBell  /></span>
       <NumberNotification  number={unReadCount}/>
      </PopoverTrigger>
      <PopoverContent className="min-h-[200px] min-w-[360px] max-h-[600px] overflow-auto">
        <NotificationHeader />
        {loading ? (
          <Loader />
        ) : notifications.length === 0 ? (
          <p className="flex-center mt-[50px]">No notifications yet</p>
        ) : (
          notifications.map((noti) => <NotificationItem key={noti.id} notification={noti} />)
        )}
      </PopoverContent>
    </Popover>
  );
}
