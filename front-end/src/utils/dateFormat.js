
import { formatDistanceToNow, isToday, isYesterday, format } from 'date-fns';

import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInWeeks,
} from 'date-fns';

export function formatRelativeTime(date) {
  const now = new Date();
  const distance = formatDistanceToNow(date, { addSuffix: true });
  const secondsAgo = Math.floor((now - date) / 1000);
  if (secondsAgo < 60) {
    return "just now";
  }

  
  if (isToday(date)) {
    return   distance; // e.g., "5 minutes ago"
  } else if (isYesterday(date)) {
    return `yesterday ${format(date, 'h:mm a')}`; // e.g., "yesterday 3:00 PM"
  } else {
    const daysAgo = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    if (daysAgo < 7) {
      return `${daysAgo}d `; // e.g., "2d ago"
    } else if (daysAgo < 30) {
      const weeksAgo = Math.floor(daysAgo / 7);
      return `${weeksAgo}w `; // e.g., "3w ago"
    } else {
      return format(date, 'MMM d, yyyy'); // e.g., "Jul 23, 2024"
    }
  }
}

export const formatLastMessageTime = (timestamp) => {
  const now = new Date();
  const lastMessageDate = new Date(timestamp);

  if (isToday(lastMessageDate)) {
    const minutesAgo = differenceInMinutes(now, lastMessageDate);
    if (minutesAgo < 1) {
      return 'Just now';
    } else if (minutesAgo < 60) {
      return `${minutesAgo}m ago`;
    } else {
      return `${differenceInHours(now, lastMessageDate)}h ago`;
    }
  } else if (isYesterday(lastMessageDate)) {
    return 'Yesterday';
  } else if (differenceInDays(now, lastMessageDate) < 7) {
    return `${differenceInDays(now, lastMessageDate)}d ago`;
  } else if (differenceInWeeks(now, lastMessageDate) < 4) {
    return `${differenceInWeeks(now, lastMessageDate)}w ago`;
  } else {
    return `${Math.floor(differenceInDays(now, lastMessageDate) / 30)} mths ago`;
  }
};


