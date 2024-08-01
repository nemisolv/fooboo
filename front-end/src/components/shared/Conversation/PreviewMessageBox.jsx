import useOtherUser from '@/hooks/useOtherUser';
import { getCurrentConversation, openCurrentConversation } from '@/stores/slices/conversationSlice';
import { formatLastMessageTime, formatRelativeTime } from '@/utils/dateFormat';
import { formatDistance, formatRelative } from 'date-fns';
import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function PreviewMessageBox({ conversation }) {
  const { currentUser } = useSelector((state) => state.auth);
  const { open, currentConversation } = useSelector((state) => state.conversation);
  const dispatch = useDispatch();
  const otherUser = useOtherUser(conversation);
  const handleClick = useCallback(() => {
    if (!open && conversation.id === currentConversation?.id) {
      dispatch(openCurrentConversation());
      return;
    }
    if (open && conversation.id === currentConversation?.id) {
      return;
    }
    dispatch(
      getCurrentConversation({
        senderId: currentUser.id,
        recipientId: otherUser.id,
      }),
    );
  }, [dispatch, conversation.id, currentConversation?.id]);
  const lastMessage = useMemo(() => {
    // Kiểm tra nếu messages có tồn tại và có metadata, nếu không sử dụng lastMessage từ conversation
    const messages = conversation.messages?.metadata || [];
    const lastMessage = messages.length === 0 ? conversation.lastMessage : messages[messages.length - 1];
    return lastMessage;
  }, [conversation.messages, conversation.lastMessage]);
  

  const lastMessageText = lastMessage?.content || 'Started a conversation';
  const lastMessageTime = lastMessage?.createdAt || conversation.createdAt;
  return (
    <div
      onClick={handleClick}
      className="bg-white hover:bg-neutral-100 text-[#333] flex items-center gap-3 cursor-pointer w-full px-4 py-2 rounded-lg "
    >
      <div className="relative">
        <img
          src={otherUser?.picture}
          className="size-[50px] rounded-full object-cover  border-gray-200 inset-1"
          alt=""
        />
        {otherUser?.status === 'ONLINE' && <p className="bg-green rounded-full size-3 right-0 bottom-1 absolute"></p>}
      </div>
      <div className="w-full">
        <h4 className="font-semibold text-black leading-5 ">{otherUser.firstName + ' ' + otherUser?.lastName}</h4>
        <div className="flex  items-center justify-between ">
          <p className="text-gray-500 text-sm line-clamp-1 space-x-4 max-w-[100px]">{lastMessageText}</p>

          <p className="text-gray-500 text-sm line-clamp-1 space-x-4">
            {' '}
            {lastMessageTime && (
              <div className="flex items-center gap-1">
                <p className="rounded-full size-1 bg-neutral-400"></p>{' '}
                <p>{formatLastMessageTime(new Date(lastMessageTime))}</p>
              </div>
            )}{' '}
          </p>
        </div>
      </div>
    </div>
  );
}
