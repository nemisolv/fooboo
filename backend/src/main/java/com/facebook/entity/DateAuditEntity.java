package com.facebook.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;

@MappedSuperclass
@Getter
@Setter
public class DateAuditEntity {
//    @CreatedBy
//    @Column(name = "created_by" )
//    private String createdBy;
//
//    @LastModifiedBy
//    @Column(name = "last_modified_by")
//    private String lastModifiedBy;

    @CreatedDate
    @JsonProperty("created_at")

    @Column(updatable = false, nullable = false,

           name = "created_at")
    private LocalDateTime createdAt;

    @LastModifiedDate

    @Column(
            name = "updated_at", insertable = false, updatable = true)
    @JsonProperty("updated_at")

    private LocalDateTime updatedAt;

}
