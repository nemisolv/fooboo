import { reactions } from '@/data/post';
import { reactOnPost } from '@/stores/slices/postSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
function Reaction({ setVisible, setCurrentReaction ,isReactOnPost, data,isReacted }) {
  const dispatch = useDispatch();
  const {currentUser} = useSelector(state => state.auth)
  const navigate = useNavigate();


  const handleChooseReaction = (e,index) => {
    e.stopPropagation();
    setVisible(false); 
    if(!currentUser) {
      toast.warning('Please login to react on post');
      setTimeout(() => {
        navigate('/auth/login')
      }, 2000);
    }
    if(isReactOnPost){
      console.log('React on post',data.id,reactions[index].desc);
      dispatch(reactOnPost({postId:data.id,reactionType:reactions[index].desc, userId: currentUser.id, isReacted}))
      
      }
    setCurrentReaction(reactions[index]);
    // else if(isReactOnComment){
    //   console.log('React on comment',data.id,reactions[index].desc);
    // }else {
    //   console.error('please pass isReactOnPost or isReactOnComment props to Reaction component')
    // }
  }

  return (
    <>
        <div
          className=" flex items-center gap-1 bg-white py-3 px-4 rounded-full top-[-70px] left-0  visible-reactions shadow-md "
        >
          {reactions.map((reaction, index) => (
            <img
            onClick={(e) => handleChooseReaction(e,index)}
              key={index}
              src={reaction.path}
              alt="reaction"
              className="w-8 h-8 object-cover hover:scale-125 cursor-pointer transition-all duration-100 ease-in-out"
            />
          ))}
        </div>
    </>
  );
}

export default React.memo(Reaction);
