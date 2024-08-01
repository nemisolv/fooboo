package com.facebook.entity.user;


import com.facebook.entity.type.Gender;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "user_details")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder

public class Details {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;
        private String bio;
        private Integer birthYear;
        private Integer birthMonth;
        private Integer birthDay;
        private String work;
        private String education;
        private String location;
        private String hometown;
        @Enumerated(EnumType.STRING)
        private Gender gender;

        @Column(name = "other_name")
        private String otherName;
        private String instagram;

        @OneToOne(fetch = FetchType.LAZY)
        private User user;


        private String status;
        @OneToOne
        @JoinColumn(name = "relationship_with", referencedColumnName = "id")
        private User relationshipWith;
        private String startDateRelationship;
        private String description;
        @Column(name = "anniversary_date")
        private LocalDateTime anniversaryDate;


        // getters and setters
    }