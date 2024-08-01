package com.facebook.entity.type;

public enum Gender {
        FEMALE("Female"), MALE("Male"), OTHER("Other");
        private String value;
         Gender(String value) {
            this.value = value;
        }
        public String getValue() {
            return value;
        }
        public static Gender fromValue(String value) {
            for (var gender : Gender.values()) {
                if(gender.getValue().equals(value)) {
                    return gender;
                }
            }

            return null;
        }
    }