package com.facebook.entity.type;

public enum PostType {

    POST_NORMAL("normal"), POST_PROFILE("profile");
    private String value;

    PostType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public static PostType fromValue(String value) {
        for (PostType type : PostType.values()) {
            if (type.getValue().equals(value)) {
                return type;
            }
        }
        throw new IllegalArgumentException("Unknown PostType with value: " + value);
    }
}