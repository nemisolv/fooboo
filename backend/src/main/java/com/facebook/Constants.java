package com.facebook;

import java.time.LocalDateTime;

public class Constants {
    public static final  int TOKEN_EXPIRE = 15;
//    public static final String BASE_URL_FRONTEND = "https://my-blog-psi-gilt.vercel.app";
    public static final String CLIENT_BASE_URL = "https://fooboo-afmp9z9w6-nemisolvs-projects.vercel.app";
    public static final LocalDateTime EXP_TIME_REGISTRATION_EMAIL= LocalDateTime.now().plusMinutes(15);
    public static final LocalDateTime EXP_TIME_RESET_PASSWORD_EMAIL= LocalDateTime.now().plusMinutes(15);


    public static final String UPLOAD_DIR_PREFIX = "facebook";

}
