package com.facebook.entity.type;

import com.fasterxml.jackson.annotation.JsonValue;

public enum PostStatus {
        ACTIVE("active"), APPROVED("approved"), REJECTED("rejected");
        private String value;
        PostStatus(String value) {
            this.value = value;
        }


        @JsonValue
        public String getValue() {
            return value;
        }

        public static PostStatus fromValue(String value) {
            for (PostStatus postStatus : PostStatus.values()) {
                if (postStatus.getValue().equals(value)) {
                    return postStatus;
                }
            }
            return null;
        }
    }