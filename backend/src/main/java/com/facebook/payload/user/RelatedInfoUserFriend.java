package com.facebook.payload.user;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RelatedInfoUserFriend {
    private Long id;
    private String accountName;

    private String firstName;
    private String lastName;
    private String email;
    private String picture;
    private String coverPicture;
    private String status;

}