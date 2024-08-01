import { Messenger } from '@/assets/svg';
import PreviewMessageBox from './PreviewMessageBox';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getConversations } from '@/stores/slices/conversationSlice';


export default function DropdownConversations() {
  const { conversations } = useSelector((state) => state.conversation);
  console.log('🚀 ~ DropdownConversations ~ conversations:', conversations);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getConversations());
  }, []);
  return (
    <Popover>
      <PopoverTrigger className=" w-10 h-10   bg-gray-200 rounded-full flex-center cursor-pointer hover:bg-gray-300">
        <Messenger />
      </PopoverTrigger>
      <PopoverContent>
        {conversations?.length>0 ? conversations.map((conversation) => {
          return (
            <PreviewMessageBox
              key={conversation.id}
              conversation={conversation}
             
            />
          );
        }): <p className="text-center">No Conversations yet</p>}
      </PopoverContent>
    </Popover>
  );
}
