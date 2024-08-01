import Tippy from '@tippyjs/react';
import { LuReply } from 'react-icons/lu';
import { useDispatch, useSelector } from 'react-redux';

import { useState } from 'react';
import 'tippy.js/dist/tippy.css'; // optional
import CommentList from './CommentList';
import { deleteComment, fetchReplies } from '@/stores/slices/commentSlice';
import { MdMoreHoriz } from 'react-icons/md';

import CommentForm from './CommentForm';
import Reaction from '@/components/Post/Reaction';

const dateFormater = new Intl.DateTimeFormat('vi-VN', {
  dateStyle: 'medium',
  timeStyle: 'short',
});
function Comment({ comment }) {
  const { id,  user, createdAt, text, replied, repliesCount, postId, replies } = comment;
  // const replies = useSelector((state) => state.comment?.comments[id].replies); // const { replies } = comment;
  // const replies = comment.replies;
  const [showReplies, setShowReplies] = useState(false);
  const [visibleReactions, setVisibleReactions] = useState(false);
  const [currentReaction, setCurrentReaction] = useState(null);
  const [isReplying, setIsReplying] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const { currentUser } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleDeleteComment = (cmtId) => {
    dispatch(deleteComment({ cmtId, postId }));
  };

  return (
    <>
      {isUpdating && (
        <div className="border-l-slate-400 pl-3">
          <CommentForm
            id={id}
            postId={postId}
            initialText={text}
            isUpdateComment={isUpdating}
            setIsUpdating={setIsUpdating}
          />
        </div>
      )}
      <div className="flex  gap-2 mb-4">
        {/* update an existing comment */}
        <img src={user?.picture} alt="" className="w-10 h-10 rounded-full object-cover border " />
        <div>
          <div className="flex gap-2 items-center">
            <div className="bg-[#f0f2f5] py-2 px-3 rounded-xl ">
              <h3 className="font-medium">{user?.firstName + ' ' + user?.lastName}</h3>
              <p className="text-sm">{text}</p>
            </div>
            {currentUser?.id === user.id && (
              <Tippy
                content={
                  <span className="cursor-pointer" onClick={() => handleDeleteComment(id)}>
                    Delete
                  </span>
                }
                placement="right"
                trigger="click"
                interactive
              >
                <span className="p-3 cursor-pointer hover:opacity-70">
                  <MdMoreHoriz />
                </span>
              </Tippy>
            )}
          </div>

          <div className="relative action flex items-center gap-x-3 ml-4 text-[13px] font-bold text-[#65676b]">
            <Tippy content={dateFormater.format(new Date(createdAt))}>
              <span className=" font-normal">{timeAgo(createdAt)}</span>
            </Tippy>
            <div className=" overflow-visible">
              {visibleReactions && (
                <Reaction
                  setVisible={setVisibleReactions}
                  // visible={visibleReacions}
                  currentReaction={currentReaction}
                  setCurrentReaction={setCurrentReaction}
                  isReactOnComment
                  data={comment}
                />
              )}
              <button
                className="block w-full overflow-visible"
                onMouseOver={() => {
                  setTimeout(() => {
                    setVisibleReactions(true);
                  }, 500);
                }}
                onMouseLeave={() => {
                  setTimeout(() => {
                    setVisibleReactions(false);
                  }, 500);
                }}
              >
                Like
              </button>
            </div>

            <button onClick={() => setIsReplying((prev) => !prev)}>{isReplying ? 'Cancel reply' : 'Reply'}</button>
            <button onClick={() => setIsUpdating((prev) => !prev)}>{isUpdating ? 'Cancel edit' : 'Edit'}</button>
          </div>
          {/*  show comment reply form */}
          {isReplying && (
            <div className="border-l-slate-400 pl-3">
              <CommentForm postId={postId} parentId={id} setIsReplying={setIsReplying} isReplying={isReplying}/>
            </div>
          )}

          {/* replies cmts section */}
          {replied && (
            <>
              <span
                onClick={() => {
                  dispatch(fetchReplies(id));
                  setShowReplies(!showReplies);
                }}
                className={`  gap-x-2 items-center text-sm ml-4 text-[#65676b] font-medium cursor-pointer ${showReplies ? 'hidden' : 'flex'}`}
              >
                <LuReply size={16} />
                View {repliesCount} replies
              </span>
            </>
          )}
          <CommentList data={replies} />
        </div>
      </div>
    </>
  );
}

function timeAgo(date) {
  const now = new Date();
  const diffInSeconds = Math.floor((now - new Date(date)) / 1000);

  if (diffInSeconds < 60) {
    return 'Just now';
  } else if (diffInSeconds < 3600) {
    return `${Math.floor(diffInSeconds / 60)}m ago`;
  } else if (diffInSeconds < 86400) {
    return `${Math.floor(diffInSeconds / 3600)}h ago`;
  } else {
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  }
}

export default Comment;
