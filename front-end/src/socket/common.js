import { stompClient } from "./initializer";

export const disconnectUser =  (userId) => {
    stompClient.send('/app/disconnect', {}, JSON.stringify(userId));
  }
