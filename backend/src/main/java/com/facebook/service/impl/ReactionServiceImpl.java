package com.facebook.service.impl;

import com.facebook.Constants;
import com.facebook.entity.Post;
import com.facebook.entity.Reaction;
import com.facebook.entity.type.ReactionType;
import com.facebook.payload.reaction.ReactionPostRequestDTO;
import com.facebook.payload.reaction.ReactionPostResponseDTO;
import com.facebook.repository.PostRepository;
import com.facebook.repository.ReactionRepository;
import com.facebook.repository.UserRepository;
import com.facebook.security.UserPrincipal;
import com.facebook.service.ReactionService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReactionServiceImpl implements ReactionService {
    private final PostRepository postRepo;
    private final ModelMapper modelMapper;
    private final UserRepository userRepo;
    private final ReactionRepository reactionRepo;

    @Override
    public ReactionPostResponseDTO reactToPost(ReactionPostRequestDTO reactionReqDTO) {
        Optional<Post> postOptional = postRepo.findById(reactionReqDTO.getPostId());
        if(postOptional.isEmpty()) {
            throw new IllegalArgumentException("Post not found");
        }
        var post = postOptional.get();
        UserPrincipal principal = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

            Reaction existingReaction = reactionRepo.findByUserIdAndPostId(principal.getId(), post.getId());
            // If the user has already reacted to the post, update the reaction type
            if (existingReaction != null) {
                existingReaction.setType(ReactionType.fromValue(reactionReqDTO.getReactionType()));
                Reaction savedReaction = reactionRepo.save(existingReaction);
                ReactionPostResponseDTO response = modelMapper.map(savedReaction, ReactionPostResponseDTO.class);
                return response;
            }

            // If the user has not reacted to the post, create a new reaction

            try {
                ReactionType reactionTypeEnum = ReactionType.fromValue(reactionReqDTO.getReactionType());

                Reaction reaction = Reaction.builder()
                        .user(userRepo.findByAccountName(principal.getAccountName()).get())
                        .post(post)
                        .type(reactionTypeEnum)
                        .build();
                Reaction saved = reactionRepo.save(reaction);
                post.incrementReactionsCount();
                postRepo.save(post);
                return modelMapper.map(saved, ReactionPostResponseDTO.class);

            } catch (IllegalArgumentException e) {
                throw new IllegalArgumentException("Invalid reaction type");
            }
        }


    @Override
    public void unReactToPost(ReactionPostRequestDTO reactionReqDTO) {
        Optional<Reaction> removeReaction = reactionRepo.findById(reactionReqDTO.getReactionId());

        if (removeReaction.isPresent()) {
            removeReaction.get().getPost().decrementReactionsCount();
            postRepo.save(removeReaction.get().getPost());
            reactionRepo.deleteById(reactionReqDTO.getReactionId());

        } else {
            throw new IllegalArgumentException("Post not found");
        }

    }
}
