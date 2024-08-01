package com.facebook.service;

import com.facebook.payload.reaction.ReactionPostRequestDTO;
import com.facebook.payload.reaction.ReactionPostResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
public interface ReactionService {
    ReactionPostResponseDTO reactToPost(ReactionPostRequestDTO reactionReqDTO);

    void unReactToPost(ReactionPostRequestDTO reactionReqDTO);
//    void unReactToPost(Long postId);
//    void reactToComment(Long commentId, String reactionType);
//    void unReactToComment(Long commentId);
}
