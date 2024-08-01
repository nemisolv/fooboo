package com.facebook.payload.user;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class VeryShortUserInfo {
    private Long id;
    private String firstName;
    private String lastName;
    private String picture;
}
