import EmojiPicker from 'emoji-picker-react';
import { Input } from '@/components/ui/input';
import { useRef, useState } from 'react';
import { IoSend } from 'react-icons/io5';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useSelector } from 'react-redux';
import { sendPrivateMessage } from '@/socket/chatMessage';
import useOtherUser from '@/hooks/useOtherUser';

export default function ConversationInput() {
  const [content, setContent] = useState('');
  const { currentConversation } = useSelector((state) => state.conversation);
  const otherUser = useOtherUser(currentConversation);
  const {currentUser} = useSelector(state => state.auth);
  const inputRef = useRef(null);

  const handleClickEmoji = (event) => {
    const ref = inputRef.current;

    const cursorPosition = ref.selectionStart;

    setContent((prev) => prev.slice(0, cursorPosition) + event.emoji + prev.slice(cursorPosition));
  };

  const handleSendMessage = () => {
    if(!content || !content.trim()) return;
    sendPrivateMessage({
      senderId: currentUser.id,
      recipientId: otherUser.id,
      content,
      chatRoomId: currentConversation.id,
      // roomIdentifier: currentConversation.roomIdentifier,
      status: 'MESSAGE',
    });

    setContent('');
    inputRef.current.focus();
  };

  return (
    <div className="flex items-center justify-between gap-2 w-full pt-2 border-t border-gray-300">
      <div className="flex items-center flex-1 px-2 py-1 rounded-md border border-gray-300 ">
        <Input
          type="text"
          ref={inputRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          className=" border-none"
          placeholder="Aa"
          maxLength={500}
          // ref={inputRef}
          autoFocus
        />
        <Popover className="">
          <PopoverTrigger>
            {' '}
            <img
              className="cursor-pointer"
              src="/Post/create/smile.svg"
              alt=""
            />
          </PopoverTrigger>
          <PopoverContent className="w-[310px]">
            {' '}
            <EmojiPicker emojiStyle="facebook" width={280} className="overflow-auto" onEmojiClick={handleClickEmoji} />
          </PopoverContent>
        </Popover>
      </div>
      <button onClick={handleSendMessage} className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
        <IoSend />
      </button>
    </div>
  );
}
