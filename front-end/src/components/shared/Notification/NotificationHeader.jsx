import { Button } from '@/components/ui/button';
import { IoIosMore } from 'react-icons/io';
import { IoMdCheckmark } from 'react-icons/io';
import { HiOutlineDesktopComputer } from 'react-icons/hi';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';
import DropdownNotificaitonOption from './DropdownNotificationOption';
import { useDispatch } from 'react-redux';
import { markAllAsSeen } from '@/stores/slices/notificationSlice';

export default function NotificationHeader() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleMarkAllAsRead = () => {
      dispatch(markAllAsSeen());
    }
  return (
    <div>
      <div className="flex-between">
        <h3 className="font-semibold text-xl">Notifications</h3>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="">
              <IoIosMore />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownNotificaitonOption
              icon={<IoMdCheckmark />}
              text="Mark all as read"
              onClick={handleMarkAllAsRead}
            />
            <DropdownNotificaitonOption
              icon={<HiOutlineDesktopComputer />}
              text="Open Notifications"
              onClick={() => navigate('/notifications')}
            />

          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}


