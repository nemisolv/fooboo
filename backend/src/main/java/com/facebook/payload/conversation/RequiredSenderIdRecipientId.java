package com.facebook.payload.conversation;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RequiredSenderIdRecipientId {
    private Long senderId;
    private Long recipientId;
//    private int pageNo;
//    private int pageSize;
}
