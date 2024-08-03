  import SockJS from 'sockjs-client';
  import { BASE_URL_BACKEND } from '@/constants';
  import { over } from 'stompjs';
  let stompClient = null;
  import { onPrivateMessageReceived } from './chatMessage';
  import { onNotificationReceived } from './notification';
  export const registerUser = (dataRegister) => {
    console.log('🚀 ~ registerUser ~ dataRegister:', dataRegister);
    // not that in production, can't use /ws, must be use /wss
    const socket = new SockJS(BASE_URL_BACKEND + '/ws');
    stompClient = over(socket);
    stompClient.connect({userId: dataRegister.id }, () => onConnected(dataRegister), onError);
  };

  const onConnected = (dataRegister) => {
    console.log('connected');
    stompClient.subscribe(`/user/${dataRegister.id}/queue/messages`, onPrivateMessageReceived);
    stompClient.subscribe(`/user/${dataRegister.id}/queue/notifications`, onNotificationReceived);
    stompClient.subscribe(`/topic/public`, onNotificationReceived);

    // add users
    stompClient.send('/app/user/addUser', {}, JSON.stringify( dataRegister.id ));
  };

  const onError = (error) => {
    console.log(error);
  };

  export {stompClient}