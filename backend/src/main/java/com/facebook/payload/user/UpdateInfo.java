package com.facebook.payload.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UpdateInfo {
    private String firstName;
    private String lastName;
    private String work;
    private String education;
    private String bio;
    private String location;
    private String gender;
    private int birthYear;
    private int birthMonth;
    private int birthDay;
}
