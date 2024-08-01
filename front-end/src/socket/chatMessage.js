import { addMessageToCurrentConversation } from "@/stores/slices/conversationSlice";
import { store } from "@/stores/store";
import { stompClient } from "./initializer";

export function onPrivateMessageReceived(payload) {
    console.log('🚀 ~ onPrivateMessageReceived ~ payload:', payload);
    let payloadData = JSON.parse(payload.body);
    console.log("🚀 ~ onPrivateMessageReceived ~ payloadData:", payloadData)
  //   switch (payloadData.status) {
  //     case 'JOIN':
  //       break;
  //     case 'LEAVE':
  //       break;
  //     case 'MESSAGE':
        //   yield put(addMessageToCurrentConversation(payloadData));
        store.dispatch(addMessageToCurrentConversation(payloadData));
        // get state of currentConversation
         
      //   break;
      // default:
      //   console.warn('Unknown status:', payloadData.status);
  //   }
  }

  export const sendPrivateMessage = (message) => {
    stompClient.send('/app/sendMessage', {}, JSON.stringify(message));
  };

  export const bidirectionalEstablish = (data) => {
    stompClient.send('/app/bidirectionalEstablish', {}, JSON.stringify(data));
  }
  
  