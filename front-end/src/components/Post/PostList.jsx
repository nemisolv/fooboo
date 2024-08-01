import { useDispatch, useSelector } from 'react-redux';
import PostItem from './PostItem';
import { fetchPosts } from '@/stores/slices/postSlice';
import { useEffect } from 'react';
import PostItemSkeleton from '../shared/CustomSkeleton/PostItemSkeleton';


function PostList() {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(fetchPosts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);


  const { posts, loading } = useSelector((state) => state.post);


  return (
    <div>
      {!loading ? posts && posts?.map((post) => (
        <PostItem post={post} key={post.id} />
      )):   <div className='flex flex-col gap-10'>{[1,2,3,4,5,6,7,8,9].map((item) => ( <PostItemSkeleton key={item} />))}</div>}
    </div>
  );
}

export default PostList;
