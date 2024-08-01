import CommentList from '@/components/comment/CommentList.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments } from '@/stores/slices/commentSlice.js';
import { useEffect, useState } from 'react';
import { RoundedSpinner } from '@/assets/svg';

function CommentWrapper({ postId }) {
  const dispatch = useDispatch();
  const [pageNo, setPageNo] = useState(1);
  const {
    comments: { metadata },
    loadingFetchComments,
  } = useSelector((state) => state.comment);

  useEffect(() => {
    const scrollHandler = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
      setPageNo((prev) => prev + 1);
    };
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  });
  useEffect(() => {
    let options = {page_no: pageNo, limit: 10,sort_dir: 'desc'}
    dispatch(fetchComments({postId,options} ));
  }, [pageNo, dispatch, postId]);

  if(loadingFetchComments) return <div className='flex-center w-full animate-spin'><RoundedSpinner /></div>

  return (
    <div className="px-5">
      <CommentList data={metadata} />
    </div>
  );
}

export default CommentWrapper;
