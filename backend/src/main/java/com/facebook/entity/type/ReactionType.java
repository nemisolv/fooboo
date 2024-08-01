package com.facebook.entity.type;

public enum ReactionType {
    LIKE("like"),
    LOVE("love"),
    HAHA("haha"),
    WOW("wow"),
    SAD("sad"),
    ANGRY("angry");

    private String value;

    ReactionType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public static ReactionType fromValue(String value) {
        for (ReactionType reactionType : ReactionType.values()) {
            if (reactionType.getValue().compareToIgnoreCase(value) == 0) {
                return reactionType;
            }
        }
        throw new IllegalArgumentException("Unknown reaction type: " + value);
    }


}