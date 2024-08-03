import Loader from '@/components/shared/LoadingPage';
import NotificationHeader from '@/components/shared/Notification/NotificationHeader';
import NotificationItem from '@/components/shared/Notification/NotificationItem';
import { getAllNotifications } from '@/stores/slices/notificationSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Notification() {
  const dispatch = useDispatch();
  const { notifications, loading } = useSelector((state) => state.notification);
  console.log('🚀 ~ Notification ~ notifications:', notifications);
  useEffect(() => {
    dispatch(getAllNotifications());
  }, []);

  return (
    <div className="max-w-[600px] mx-auto max-h-[800px] overflow-auto">
      <NotificationHeader />
      {loading ? (
        <Loader />
      ) : notifications.length === 0 ? (
        <p className="flex-center mt-[50px]">No notifications yet</p>
      ) : (
        notifications.map((noti) => <NotificationItem key={noti.id} notification={noti} />)
      )}
    </div>
  );
}
