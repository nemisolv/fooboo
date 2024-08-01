package com.facebook.payload.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserOwnerProfile {
    private Long id;
    private String accountName;

    private String firstName;
    private String lastName;
    private String email;


    private String picture;
    private String coverPicture;
    private boolean verified;
    private String role;

    private UserOwnerDetail details;






}
