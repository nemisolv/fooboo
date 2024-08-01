import clsx from 'clsx';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import { formatRelativeTime } from '@/utils/dateFormat';
import { IoIosMore } from 'react-icons/io';
import { Button } from '@/components/ui/button';
import NotificationAction from './NotificationAction';

export default function NotificationItem({ notification }) {
  const { id, content, seen, type, link, actor, recipient, createdAt } = notification;

  return (
    <div className="bg-white hover:bg-gray-200 rounded-md p-3 relative group">
      <div className="flex gap-2 items-center justify-between">
        <div className="relative">
          <div className="w-12 h-12">
            <img
              src={actor.picture}
              className="w-full h-full rounded-full object-contain border border-slate-200"
              alt="Actor"
            />
          </div>
          <span>
            {type && (
              <img
                src={type === 'NEW_POST' ? '/left/groups.png' : type === 'ADD_FRIEND' || type === 'ACCEPT_FRIEND' ? '/left/friends.png' : ''}
                className="w-4 h-4 absolute right-0 bottom-0"
                alt="notification type"
              />
            )}
          </span>
        </div>
        <div className="">
          <div >
            <Link
              to={link}
              className={clsx('text-sm flex-1 line-clamp-2', seen ? 'text-gray-500' : 'text-black font-medium')}
            >
              {parse(content)}
            </Link>
          </div>
            <NotificationAction id={id} seen={seen} />

          <span className="text-xs text-primary">{formatRelativeTime(new Date(createdAt))}</span>
        </div>
        <div></div>
      </div>
    </div>
  );
}
