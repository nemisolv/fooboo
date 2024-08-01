import { useRef, useState } from 'react';
import Reaction from './Reaction';
import { reactions } from '@/data/post';
import { SlLike } from 'react-icons/sl';
import { useDispatch, useSelector } from 'react-redux';
import emotionToPath from '@/utils/emotionToPath'
import { reactOnPost, unReactOnPost } from '@/stores/slices/postSlice';
function Like({ post}) {
    const {currentUser} = useSelector(state => state.auth)
    const [visibleReactions, setVisibleReactions] = useState(false);
    const isReacted = post.reactions?.find(reaction => reaction.user.id === currentUser?.id)
    const [currentReaction, setCurrentReaction] = useState(() => emotionToPath(isReacted?.type));
    const dispatch = useDispatch();

    const lastClickTimeRef = useRef(0);
    const mouseOverTimeoutRef = useRef(null);
    const mouseLeaveTimeoutRef = useRef(null);

    const handleReactPost = () => {
      setVisibleReactions(false)
        // if user click on the reaction button before 1s time, it will not show the reaction, prevent onMouseOver and onMouseLeave
        const currentTime = Date.now();
    if (currentTime - lastClickTimeRef.current < 1000) {
      // If the last click was less than 1 second ago, do nothing
      return;
    }
    lastClickTimeRef.current = currentTime;
       

      
      if (currentReaction) {
        // meaning that user want to unlike the post

        // first step: get the reaction id
        const reactionId = post.reactions.find((reaction) => reaction.user.id === currentUser.id).id;
        dispatch(unReactOnPost({
          postId: post.id,
          reactionId,
          userId: currentUser.id,
        }))
        setCurrentReaction(null);
      } else {
        dispatch(reactOnPost({postId:post.id,reactionType:reactions[0].desc, userId: currentUser.id, isReacted}))
        setCurrentReaction(reactions[0]);
      }
    };




    return    <div
  onMouseOver={() => {
        mouseOverTimeoutRef.current = setTimeout(() => {
          setVisibleReactions(true);
        }, 1000);
      }}
      onMouseLeave={() => {
        clearTimeout(mouseOverTimeoutRef.current);
        mouseLeaveTimeoutRef.current = setTimeout(() => {
          setVisibleReactions(false);
        }, 1000);
      }}
      onClick={handleReactPost}
    className="text-center flex-center gap-x-2 hover:bg-gray-100 cursor-pointer w-full py-2 px-2  rounded-lg  parent-reaction "
  >
  { visibleReactions &&  <Reaction
    setVisible={setVisibleReactions}
    // visible={visibleReacions}
    currentReaction={currentReaction}
    setCurrentReaction={setCurrentReaction}
    isReactOnPost
    isReacted={isReacted}
    data={post}
  />}
    {
      
      (currentReaction && <img src={currentReaction.path} className="w-6 h-6 object-cover" alt="" />) || (
      <SlLike />
    )}
    <span
      className={'first-letter:uppercase ' + 
        (currentReaction && currentReaction.desc === 'like'
          ? 'text-blue-500'
          : (currentReaction && currentReaction.desc === 'love'
            ? 'text-red-500'
            : (currentReaction && currentReaction.desc === 'haha'
              ? 'text-yellow-500'
              : (currentReaction && currentReaction.desc === 'wow'
                ? 'text-yellow-500'
                : (currentReaction && currentReaction.desc === 'sad'
                  ? 'text-yellow-500'
                  : (currentReaction && currentReaction.desc === 'angry'
                    ? 'text-orange-500'
                    : 'text-slate-500'
                  )
                )
              )
            )
          )
        )
      }
    >
      {(currentReaction && `${currentReaction.desc}`) || 'Like'}
    </span>
  </div>
}

export default Like;