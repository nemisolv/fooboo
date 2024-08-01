import GlobalApi from '@/apis/globalApi';
import { RoundedSpinner } from '@/assets/svg';
import PostItem from '@/components/Post/PostItem';
import AccountPreviewSearchItem from '@/components/shared/AccountPreviewSearchItem';
import { fetchFriendRequests, fetchMyFriends, fetchSentRequests } from '@/stores/slices/friendSlice';
import { fetchPostsSuccess } from '@/stores/slices/postSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

export default function SearchResult() {
  const [searchResult, setSearchResult] = useState([]);
  const {currentUser} = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const {posts} = useSelector(state => state.post);

  const [searchParams] = useSearchParams();
  const q = searchParams.get('q');
  const type = searchParams.get('type') || 'all';
  const pageNo = searchParams.get('pageNo');
  const pageSize = searchParams.get('pageSize');
  const sortOrder = searchParams.get('sortOrder');
  const sortBy = searchParams.get('sortBy');

  useEffect(() => {
    if(currentUser) {
      dispatch(fetchMyFriends());
      dispatch(fetchSentRequests());
      dispatch(fetchFriendRequests());
    }
  },[])


  useEffect(() => {
    const globalSearch = async () => {
        if(!q || !q.trim()) return;
      try {
        setLoading(true);
        const response = await GlobalApi.globalSearch({
          q,
          type,
          pageNo,
          pageSize,
          sortOrder,
          sortBy,
        });
        console.log("🚀 ~ globalSearch ~ response:", response)


        setSearchResult(response);
        let postList = []

        response.metadata?.forEach(item => {
            if(item.type === 'post') {
                postList.push(item.data)

            }
        })
        dispatch(fetchPostsSuccess(postList))

        setLoading(false);
      } catch (error) {
        console.log('🚀 ~ globalSearch ~ error:', error);
        setLoading(false);
      }
    };
    globalSearch();
  }, [q, type, pageNo, pageSize, sortOrder, sortBy]);

  return (
    <div className=' w-full max-w-4xl mx-auto'>
      {loading && (
        <div className="flex-center animate-spin">
          <RoundedSpinner />
        </div>
      )}
      {
        !loading && (
            searchResult.metadata?.length === 0 || searchResult?.length===0 ? (<div className="flex-center h-screen ">No result found</div>) :
             <div className='flex flex-col gap-4 '>
                {
                    searchResult.metadata?.map((item) =>{
                        const {type,data} = item;
                        if(type === 'user' && data.id !== currentUser.id) {
                        console.log("🚀 ~ searchResult.metadata?.map ~ data:", data)
                            return <AccountPreviewSearchItem key={data.id + data.accountName} data={data} />
                        }
                   
                       
                    })
                } 
                {/* note that: render from store to allow  redux keep track state of each post */}
                {
                    posts.map((post) => {
                        return <PostItem key={post.id} post={post} />
                    })
                }
            </div>
        )
      }
    </div>
  );
}
