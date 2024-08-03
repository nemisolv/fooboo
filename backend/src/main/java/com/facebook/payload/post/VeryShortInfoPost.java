package com.facebook.payload.post;

import com.facebook.payload.user.VeryShortUserInfo;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class VeryShortInfoPost {
    private Long id;
    private String text;
    private VeryShortUserInfo author;

}
