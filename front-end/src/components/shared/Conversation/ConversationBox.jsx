import { useDispatch, useSelector } from 'react-redux';
import ConversationHeader from './ConversationHeader';
import ConversationInput from './ConversationInput';
import ConversationMessages from './ConversationMessages';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { useEffect } from 'react';
import { getMessagesByConversationId } from '@/stores/slices/conversationSlice';

export default function ConversationBox() {
  const { open, currentConversation } = useSelector((state) => state.conversation);
  const dispatch = useDispatch();
  useEffect(() => {
    if (currentConversation?.id) {
      dispatch(getMessagesByConversationId(currentConversation.id));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentConversation?.id]);

  if (!open) return null;
  return (
    <Card className="fixed right-[120px] bottom-0 bg-white w-[400px] min-h-[500px] border border-gray-300 shadow-lg rounded-t-lg flex flex-col">
      <CardHeader>
        <ConversationHeader />
      </CardHeader>
      <CardContent className="flex-1  p-2 max-h-[400px] overflow-y-auto hide-scrollbar">
        <ConversationMessages />
      </CardContent>
      <CardFooter className="p-2 sticky bottom-0 bg-white">
        <ConversationInput />
      </CardFooter>
    </Card>
  );
}
