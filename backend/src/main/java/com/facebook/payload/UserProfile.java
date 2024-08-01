package com.facebook.payload;

import com.facebook.payload.user.UserOwnerDetail;
import com.fasterxml.jackson.annotation.JsonProperty;

public class UserProfile {
    private String id;
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private String picture;
    private String coverPicture;
    private UserOwnerDetail details;


}
