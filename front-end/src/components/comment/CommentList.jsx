import Comment from '@/components/comment/Comment.jsx';

import { useSelector } from 'react-redux';

function CommentList({data}) {
  const {  commentsCount } = useSelector((state) => state.post);
  if(commentsCount ===0 ) return <p className='my-3 text-center'>No comments yet</p>
  return (
    <div>
      {data?.map((comment) => (
        <Comment comment={comment} key={comment.id} />
      ))}
    </div>
  );
}

export default CommentList;