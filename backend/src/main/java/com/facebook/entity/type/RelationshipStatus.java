package com.facebook.entity.type;

public enum RelationshipStatus {
    SINGLE("single"),
    IN_RELATIONSHIP("in_relationship"),
    ENGAGED("engaged"),
    MARRIED("married"),
    COMPLICATED("complicated"),
    DIVORCED("divorced"),
    WIDOWED("widowed");

    private String value;

    RelationshipStatus(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public static RelationshipStatus fromValue(String value) {
        for (RelationshipStatus relationshipStatus : RelationshipStatus.values()) {
            if (relationshipStatus.getValue().compareToIgnoreCase(value) == 0) {
                return relationshipStatus;
            }
        }
        throw new IllegalArgumentException("Unknown relationship status: " + value);
    }
}