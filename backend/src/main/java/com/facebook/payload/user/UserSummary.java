package com.facebook.payload.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserSummary {
    private Long id;
    private String accountName;

    private String firstName;
    private String lastName;
    private String email;
    private String picture;
    private String coverPicture;

}
