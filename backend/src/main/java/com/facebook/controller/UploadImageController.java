package com.facebook.controller;

import com.facebook.Constants;
import com.facebook.entity.user.User;
import com.facebook.repository.UserRepository;
import com.facebook.security.UserPrincipal;
import com.facebook.service.UploadFileService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("${app.api_prefix}/upload")
@RequiredArgsConstructor
public class UploadImageController {

    private final UploadFileService uploadFileService;
    private final UserRepository userRepo;

    @PostMapping(value = "/images/user-avatar")
    public List<String> uploadUserAvatar(@RequestParam("files") List<MultipartFile> files,
                                    @RequestParam(value = "uploadDir", defaultValue = "/users") String uploadDir) {
        UserPrincipal principal = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        uploadDir = uploadDir + "/" + principal.getId() + "/avatar";


        // before uploading new image, delete the old one
        if (principal.getPicture() != null) {
            String publicId = Constants.UPLOAD_DIR_PREFIX + uploadDir + "/" + principal.getPicture().substring(principal.getPicture().lastIndexOf("/") + 1, principal.getPicture().lastIndexOf("."));
            uploadFileService.deleteImage(publicId);
        }
        List<CompletableFuture<String>> futures = uploadFileService.uploadImages(files, Constants.UPLOAD_DIR_PREFIX + uploadDir);

        List<String> imageUrls = futures.stream().map(CompletableFuture::join).toList();
//        principal.setPicture(imageUrls.get(0));
        User user = userRepo.findById(principal.getId()).get();
        user.setPicture(imageUrls.get(0));
        userRepo.save(user);
        return imageUrls;


    }
    @PostMapping(value = "/images/posts")
    public List<String> uploadImagesPost(@RequestParam("files") List<MultipartFile> files,
                                    @RequestParam(value = "uploadDir", defaultValue = "/posts") String uploadDir) {
    // check files is too large
        if (files.size() > 5) {
            throw new RuntimeException("You can upload maximum 5 files at a time");
        }
        List<CompletableFuture<String>> futures = uploadFileService.uploadImages(files, Constants.UPLOAD_DIR_PREFIX + uploadDir);

        List<String> imageUrls = futures.stream().map(CompletableFuture::join).toList();
        return imageUrls;
    }
}
