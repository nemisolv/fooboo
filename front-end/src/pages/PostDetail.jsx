import PostApi from '@/apis/postApi';
import PostItem from '@/components/Post/PostItem';
import PostItemSkeleton from '@/components/shared/CustomSkeleton/PostItemSkeleton';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function PostDetail() {
  const { id } = useParams();
  console.log("🚀 ~ PostDetail ~ id:", id)
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // setLoading(true);
        const post = await PostApi.fetchPostById(id);
        setPost(post);
      } catch (error) {
        console.log('🚀 ~ fetchPost ~ error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  return  <>
    {loading ? <PostItemSkeleton/> : <PostItem post={post} />}
  </>;
}
