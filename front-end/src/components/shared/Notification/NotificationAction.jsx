import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IoIosMore, IoMdCheckmark } from 'react-icons/io';
import DropdownNotificaitonOption from './DropdownNotificationOption';
import { HiOutlineDesktopComputer } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { markAsSeen } from '@/stores/slices/notificationSlice';

export default function NotificationAction({ id , seen}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleMarkAsRead = () => {
    dispatch(markAsSeen(id));
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {' '}
        <Button
          variant="ghost"
          size="icon"
          className="absolute -translate-y-2/4 top-2/4 right-0 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <IoIosMore />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="!right-0">
       {!seen &&  <DropdownNotificaitonOption icon={<IoMdCheckmark />} text="Mark as read" onClick={handleMarkAsRead} />}
        <DropdownNotificaitonOption
          icon={<HiOutlineDesktopComputer />}
          text="Open Notifications"
          onClick={() => navigate('/notifications')}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
