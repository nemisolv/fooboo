import { getUserProfilePosts } from '@/stores/slices/userSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../shared/LoadingPage';
import PostItem from '../Post/PostItem';
import PreCreatePost from '../Post/PreCreatePost';
import { Button } from '../ui/button';
import EditProfile from './EditProfile';

export default function PostsTab() {
  const dispatch = useDispatch();
  const { userProfile, userProfilePostsLoading, userProfilePosts } = useSelector((state) => state.user);
  const { currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userProfile?.id) {
      dispatch(getUserProfilePosts(userProfile.id));
    }
  }, [userProfile?.id]);

  return (
    <div className="flex flex-col gap-3">
      <PreCreatePost />

      {userProfilePostsLoading ? (
        <Loader />
      ) : (
        <div className="flex  gap-10">
          <div className="flex flex-col gap-3">
            <div className="rounded-md shadow p-4 bg-white min-w-[400px] w-full text-center">
              <p>
                DOB:{' '}
                {userProfile?.details?.birthDay +
                  ' ' +
                  userProfile?.details?.birthMonth +
                  ' ' +
                  userProfile?.details?.birthYear}
              </p>

              {userProfile?.details?.work && <p>Work: {userProfile?.details?.work}</p>}
              {userProfile?.details?.location && <p>Location: {userProfile?.details?.location}</p>}
              {userProfile?.details?.education && <p>Education: {userProfile?.details?.education}</p>}
              {userProfile?.details?.bio && <p>Bio: {userProfile?.details?.bio}</p>}
            </div>
          </div>

          <div>
            {userProfilePosts && userProfilePosts?.metadata?.length > 0 ? (
              userProfilePosts?.metadata?.map((post) => <PostItem post={post} key={post.id} />)
            ) : (
              <div className="text-center flex-center w-full ">
                <h1>No Posts yet</h1>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
