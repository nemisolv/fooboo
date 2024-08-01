import { getBidiredtionalCurrentConversationSuccess } from '@/stores/slices/conversationSlice';
import { removeFriendOnline, updateFriendOnline } from '@/stores/slices/friendSlice';
import { addNotificationSuccess } from '@/stores/slices/notificationSlice';
import { store } from '@/stores/store';

export const onNotificationReceived = (payload) => {
  console.log('🚀 ~ onNotificationReceived ~ payload:', payload);
  let payloadData = JSON.parse(payload.body);

  switch (payloadData.type) {
    case 'BIDIRECTIONAL_ESTABLISH':
      store.dispatch(getBidiredtionalCurrentConversationSuccess(payloadData));
      break;
    case 'USER_DISCONNECTED':
      setTimeout(() => {
        store.dispatch(removeFriendOnline({ id: payloadData.senderId }));
      }, 5000);
      break;
    case 'USER_CONNECTED':
      store.dispatch(updateFriendOnline({ id: payloadData.senderId }));
      break;
    case 'NEW_POST':
      store.dispatch(addNotificationSuccess(payloadData));
      break;
    case 'ADD_FRIEND':
      store.dispatch(addNotificationSuccess(payloadData));
      break;
      case 'ACCEPT_FRIEND':
        store.dispatch(addNotificationSuccess(payloadData));
        break;
    default:
      console.warn('Unknown type:', payloadData.type);
  }
};
