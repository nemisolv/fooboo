package com.facebook.config;

import com.cloudinary.Cloudinary;
import com.facebook.security.CustomUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashMap;
import java.util.Map;

@Configuration
@RequiredArgsConstructor
public class AppConfig {

    private final CustomUserDetailsService userDetailsService;



    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setPasswordEncoder(passwordEncoder());
        authProvider.setUserDetailsService(userDetailsService);
        return authProvider;

    }

    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();
//        TypeMap<PostDTO, Post> converterPostDTO2Post = modelMapper.createTypeMap(PostDTO.class, Post.class);
//        converterPostDTO2Post.addMappings(mapper -> mapper.using(ctx -> PostStatus.fromValue((String) ctx.getSource())).map(PostDTO::getStatus, Post::setStatus));
//        converterPostDTO2Post.addMappings(mapper -> mapper.using(ctx -> PostScope.fromValue((String) ctx.getSource())).map(PostDTO::getScope, Post::setScope));
//        TypeMap<Post, PostDTO> converterPost2DTO = modelMapper.createTypeMap(Post.class, PostDTO.class);
//        converterPost2DTO.addMappings(mapper -> mapper.using(ctx -> ctx.getSource() != null ? ((PostStatus) ctx.getSource()).getValue() : null).map(Post::getStatus, PostDTO::setStatus));
//        converterPost2DTO.addMappings(mapper -> mapper.using(ctx -> ctx.getSource() != null ? ((PostScope) ctx.getSource()).getValue() : null).map(Post::getScope, PostDTO::setScope));
////        converterPost2DTO.addMappings(mapper -> mapper.map(Post::getUser, PostDTO::setUser));

        return modelMapper;
    }

    @Bean
    public AuditorAware<Long> auditorAware() {
        return new AuditorAwareImpl();
    }


    // config cloudinary upload images
    @Bean
    public Cloudinary getCloudinary() {
        Map config = new HashMap();
        config.put("cloud_name", "dasoc53qg");
        config.put("api_key", "774511591273118");
        config.put("api_secret", "UW7BYNU7d46aGSJ32Q0hdTsrDlU");
        config.put("secure", true);
        return new Cloudinary(config);
    }



}
