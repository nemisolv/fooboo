package com.facebook.entity.type;

public enum PostScope {
        PUBLIC("public"), FRIENDS("friends"), PRIVATE("private"),ONLY_ME("only me");
        private String value;
         PostScope(String value) {
            this.value = value;
        }


        public String getValue() {
            return value;
        }

        public static PostScope fromValue(String value) {
            for (PostScope postScope : PostScope.values()) {
                if (postScope.getValue().equals(value)) {
                    return postScope;
                }
            }
            return null;
        }
    }