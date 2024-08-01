import PostList from '@/components/Post/PostList';
import PreCreatePost from '@/components/Post/PreCreatePost';
import StoryList from '@/components/Stories/StoryList';


function Home() {

  
  return (
    <div className='flex flex-col gap-y-3'>
      <StoryList />
      <PreCreatePost />
      <PostList/>
    </div>
  );
}

export default Home;
