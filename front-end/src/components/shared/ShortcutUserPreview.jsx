import { getCurrentConversation, getMessagesByConversationId, openCurrentConversation } from '@/stores/slices/conversationSlice';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
function ShortcutUserPreview({ data }) {
  const { id, firstName, lastName, picture, status } = data;
  const { currentUser } = useSelector((state) => state.auth);
  const {currentConversation,open} = useSelector(state => state.conversation);
  
  const dispatch = useDispatch();
  const handleEstablishConversation = () => {
    if(currentConversation?.participants?.some(participant => participant.id === id)) {
      if(open === false) {
        dispatch(openCurrentConversation());
        return;
      }
      return;
    }
 
    dispatch(
      getCurrentConversation({
        senderId: currentUser.id,
        recipientId: id,
      }),
    );


  };
  return (
    <div
      className="shortcut-item flex items-center gap-x-4 py-2 mx-2 px-2 rounded-lg hover:bg-[#e3e2e2] w-full cursor-pointer select-none"
      onClick={handleEstablishConversation}
    >
      <div className="relative">
        <img src={picture} className="w-[36px] h-[36px] rounded-full  border border-gray-200  " />
        {status === 'ONLINE' && <p className="bg-green rounded-full size-2 right-0 bottom-1 absolute"></p>}
      </div>
      <div>
        <h4 className="text-[#050505] font-medium ">{firstName + ' ' + lastName}</h4>
        {/* {desc && <span className="text-[#656767] text-xs">{desc}</span>} */}
      </div>
    </div>
  );
}

ShortcutUserPreview.propTypes = {
  imgLink: PropTypes.string,
  title: PropTypes.string,
  desc: PropTypes.string,
  onClick: PropTypes.func,
};

export default ShortcutUserPreview;
