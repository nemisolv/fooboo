/* eslint-disable react-hooks/rules-of-hooks */
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

export default function useOtherUser(conversation) {
  if(!conversation) return null;

  const { participants } = conversation;
  const { currentUser } = useSelector((state) => state.auth);
  const otherUser = useMemo(() => {
    return participants.filter((participant) => participant.id !== currentUser.id);
  }, [participants, currentUser.id]);
  return otherUser[0];
}
