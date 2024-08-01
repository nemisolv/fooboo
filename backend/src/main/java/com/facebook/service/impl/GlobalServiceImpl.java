package com.facebook.service.impl;

import com.facebook.entity.Post;
import com.facebook.entity.user.User;
import com.facebook.payload.GlobalSearchParams;
import com.facebook.payload.GlobalSearchResponse;
import com.facebook.payload.PagedResponse;
import com.facebook.payload.post.PostDTO;
import com.facebook.payload.user.UserSummary;
import com.facebook.payload.user.VeryShortUserInfo;
import com.facebook.repository.PostRepository;
import com.facebook.repository.UserRepository;
import com.facebook.service.GlobalService;
import com.facebook.service.PostService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GlobalServiceImpl implements GlobalService {
    private final UserRepository userRepo;
    private final PostRepository postRepo;
    private final ModelMapper modelMapper;
    private final PostServiceImpl postService;

    private final List<String> searchableTypes = List.of("user", "post", "all");

    @Override
    public PagedResponse<GlobalSearchResponse> globalSearch(GlobalSearchParams params) {
        String type = params.getType();
        String keyword = params.getKeySearch();
        int pageNo = params.getPageNo();
        int pageSize = params.getPageSize();
        String sortOrder = params.getSortOrder();
        String sortBy = params.getSortBy();


        long totalElements = 0;
        int totalPages = 0;

        List<GlobalSearchResponse> listContent = new ArrayList<>();

        if (type == null || type.isEmpty() || !searchableTypes.contains(type)) {
            Pageable pageable = PageRequest.of(0, 4);
            Page<User> userPage = userRepo.searchUserByUser(keyword, pageable);
            List<User> userList = userPage.getContent();
            userList.forEach(user -> {
                GlobalSearchResponse item = GlobalSearchResponse.builder().id(user.getId()).title(user.getFirstName() + " " + user.getLastName())
                        .type("user").build();
                listContent.add(item);
            });

            return PagedResponse.<GlobalSearchResponse>builder().metadata(listContent)
                    .totalElements(userPage.getTotalElements())
                    .totalPages(userPage.getTotalPages())
                    .last(userPage.isLast())
                    .pageNo(pageNo)
                    .pageSize(pageSize).build();
        } else {


            Sort sort = Sort.by(sortBy);
            sort = sortOrder.equals("asc") ? sort.ascending() : sort.descending();
            Pageable pageable = PageRequest.of(pageNo - 1, pageSize, sort);
            switch (type) {
                case "all": {
                    // search all
                    Page<User> userPage = userRepo.searchUserByUser(keyword, pageable);
                    List<User> userList = userPage.getContent();
                    userList.forEach(user -> {
                        UserSummary userSummary = modelMapper.map(user, UserSummary.class);
                        GlobalSearchResponse item = GlobalSearchResponse.builder().data(userSummary)
                                .type("user").build();
                        listContent.add(item);
                    });

                    Page<Post> postPage = postRepo.searchPostByUser(pageable, keyword);

                    PagedResponse<PostDTO> postResponse = postService.getPostResponse(pageNo, pageSize, postPage);
                    postResponse.getMetadata().forEach(post -> {
                        GlobalSearchResponse item = GlobalSearchResponse.builder().data(post).type("post").build();
                        listContent.add(item);
                    });
                    totalElements = postPage.getTotalElements() + userPage.getTotalElements();
                    totalPages = postPage.getTotalPages() + userPage.getTotalPages();
                }


                break;
                case "user":
                    // search user
                    Page<User> userPage = userRepo.searchUserByUser(keyword, pageable);
                    List<User> userList = userPage.getContent();
                    userList.forEach(user -> {
                        UserSummary userSummary = modelMapper.map(user, UserSummary.class);
                        GlobalSearchResponse item = GlobalSearchResponse.builder().data(userSummary)
                                .type("user").build();
                        listContent.add(item);
                    });
                    totalElements = userPage.getTotalElements();
                    totalPages = userPage.getTotalPages();
                    break;
                case "post":
                    // search post
                    Page<Post> postPage = postRepo.searchPostByUser(pageable, keyword);

                    PagedResponse<PostDTO> postResponse = postService.getPostResponse(pageNo, pageSize, postPage);
                    postResponse.getMetadata().forEach(post -> {
                        GlobalSearchResponse item = GlobalSearchResponse.builder().data(post).type("post").build();
                        listContent.add(item);
                    });
                    totalElements = postPage.getTotalElements();
                    totalPages = postPage.getTotalPages();
                    break;

            }

            return PagedResponse.<GlobalSearchResponse>builder()
                    .metadata(listContent).pageNo(pageNo).
                    pageSize(pageSize).totalPages(totalPages)
                    .totalElements(totalElements).build();

        }


    }
}
