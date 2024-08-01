const MessageItem = ({ message, sender, recipient, isConsecutive }) => {
  const isSender = message.senderId === sender.id;

  return (
    <div className={`flex ${isSender ? 'justify-end' : 'justify-start'} mb-4`}>
      {!isSender && !isConsecutive && (
        <div className="flex-shrink-0 mr-2">
          <img
            src={recipient.picture || 'default-avatar.png'}
            alt={`${recipient.firstName} ${recipient.lastName}`}
            className="w-8 h-8 rounded-full object-cover"
          />
        </div>
      )}
      <div className={`flex flex-col max-w-xs ${isSender ? 'items-end' : 'items-start'}`}>
        {!isSender && !isConsecutive && (
          <span className="text-sm font-semibold text-gray-700">
            {`${recipient.firstName} ${recipient.lastName}`}
          </span>
        )}
        <div
          className={`p-3 ${isConsecutive ? 'ml-8' : ''}  rounded-lg max-w-xs ${isSender ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'} shadow-md`}
        >
          <p className={`text-sm  break-words `}>{message.content}</p>
        </div>
      </div>
      {/* {isSender && !isConsecutive && (
        <div className="flex-shrink-0 ml-2">
          <img
            src={sender.picture || 'default-avatar.png'}
            alt={`${sender.firstName} ${sender.lastName}`}
            className="w-8 h-8 rounded-full object-cover"
          />
        </div>
      )} */}
    </div>
  );
};

export default MessageItem;
