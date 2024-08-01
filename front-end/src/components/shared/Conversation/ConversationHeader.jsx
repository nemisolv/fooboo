import { useDispatch, useSelector } from 'react-redux';
import { FaTimes } from 'react-icons/fa';
import { closeCurrentConversation } from '@/stores/slices/conversationSlice';
import useOtherUser from '@/hooks/useOtherUser';
import { formatRelativeTime } from '@/utils/dateFormat';

export default function ConversationHeader() {
  const { currentConversation } = useSelector((state) => state.conversation);
  const otherUser = useOtherUser(currentConversation);
  const dispatch = useDispatch();

  const  { firstName, lastName, picture, status, lastLogin } = otherUser;

  const handleCloseConversation = () => {
    // Close the current conversation
    // setOpen(false)
    dispatch(closeCurrentConversation());
  };

  return (
    <div className="flex items-center justify-between bg-white pb-2 text-[#333] border-b border-gray-300">
      <div className="flex items-center gap-2">
        <div className="relative">
          <img src={picture} alt="" className="size-10 border border-gray-200  rounded-full object-cover" />
          {status === 'ONLINE' && (
            <div>
              <p className="bg-green rounded-full size-2 right-0 bottom-1 absolute"></p>
            </div>
          )}
          
        </div>
        <div>
          <p className="font-semibold">
            {firstName} {lastName}
          </p>
          <p className='text-gray-500 text-xs'>
          {status === 'OFFLINE' && lastLogin && <p>
            Active {formatRelativeTime(new Date(lastLogin))} 
          </p>
          }
          {status === 'ONLINE' && <p>Active now</p>}
          </p>
        </div>
      </div>
      <div onClick={handleCloseConversation} className="cursor-pointer text-primary">
        <FaTimes />
      </div>
    </div>
  );
}
