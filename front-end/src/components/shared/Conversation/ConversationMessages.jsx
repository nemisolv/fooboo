import { useDispatch, useSelector } from 'react-redux';
import MessageItem from './MessageItem';
import { useEffect, useRef } from 'react';
import useOtherUser from '@/hooks/useOtherUser';
import { getMessagesByConversationId } from '@/stores/slices/conversationSlice';

export default function ConversationMessages() {
  const { currentConversation } = useSelector(state => state.conversation);
  const dispatch = useDispatch();

  // if (!currentConversation) return <p>No messages</p>;
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentConversation?.messages?.metadata]);
  
  useEffect(() => {
    if(currentConversation.id && !currentConversation.messages) {
    dispatch(getMessagesByConversationId(currentConversation?.id));
    }
  }, [currentConversation?.id]);
  const otherUser = useOtherUser(currentConversation);
  const {currentUser} = useSelector(state => state.auth);

  const { messages} = currentConversation;

  return (
    <div className="p-4">
      {messages?.metadata?.map((message, index) => {
        const previousMessage = messages?.metadata[index - 1];
        const isConsecutive = previousMessage && previousMessage.senderId === message.senderId;

        return (
          <MessageItem
            key={message.id}
            message={message}
            sender={currentUser}
            recipient={otherUser}
            isConsecutive={isConsecutive}
          />
        );
      })}
      <div ref={endOfMessagesRef} />
    </div>
  );
}
