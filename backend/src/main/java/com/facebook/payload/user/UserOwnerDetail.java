package com.facebook.payload.user;

import com.facebook.entity.type.Gender;
import com.facebook.entity.user.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class UserOwnerDetail {
    private String bio;
    private Integer birthYear;
    private Integer birthMonth;
    private Integer birthDay;
    private String work;
    private String education;
    private String location;
    private String hometown;
    private String gender;
    private String otherName;
    private String instagram;
    private String status;
//    @OneToOne
//    @JoinColumn(name = "relationship_with", referencedColumnName = "id")
//    private User relationshipWith;
    private String startDateRelationship;
    private String description;
    private LocalDateTime anniversaryDate;

}
