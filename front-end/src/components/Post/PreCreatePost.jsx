/* eslint-disable react/no-unescaped-entities */
import { useSelector } from 'react-redux';
import Divider from '@/styles/Divider';
import { useState } from 'react';
import CreatePost from './CreatePost';

function PreCreatePost() {
  const { currentUser } = useSelector((state) => state.auth);
  const [openCreatePost, setOpenCreatePost] = useState(false);
  const [openType, setOpenType] = useState('normal');
  return (
    <section className="bg-white rounded-lg shadow-lg p-4 flex flex-col gap-y-3">
      <div className="flex gap-x-3 items-center  ">
        <img
          src={currentUser?.picture}
          alt={currentUser?.firstName}
          className="w-10 h-10 rounded-full cursor-pointer object-cover"
        />
        <div
          onClick={() => setOpenCreatePost(true)}
          className="bg-gray-100 hover:bg-gray-200 relative flex-1 rounded-full cursor-pointer"
        >
          <p className="text-gray-500 py-2 px-3 ">What's on your mind, {currentUser?.firstName}?</p>
        </div>
      </div>
      <Divider />
      <div className="flex justify-around text-[#65676b] font-medium text-sm">
        <div className="text-center flex items-center justify-center gap-x-2 hover:bg-gray-100 cursor-pointer w-full py-2 px-2  rounded-lg ">
          <img src="/Post/live_video.png" className="w-6 h-6 object-cover" alt="" />
          <span className="">Live Video</span>
        </div>
        <div
          onClick={() =>  {
            setOpenCreatePost(true);
            setOpenType('photo');
          }}
          className="text-center flex items-center justify-center gap-x-2 hover:bg-gray-100 cursor-pointer w-full py-2 px-2  rounded-lg "
        >
          <img src="/Post/photo_default.png" className="w-6 h-6 object-cover" alt="" />
          <span className="">Photo/video</span>
        </div>
        <div className="text-center flex items-center justify-center gap-x-2 hover:bg-gray-100 cursor-pointer w-full py-2 px-2  rounded-lg ">
          <img src="/Post/feeling.png" className="w-6 h-6 object-cover" alt="" />
          <span className="">Feeling/activity</span>
        </div>
      </div>

      {/* create post section */}
      {openCreatePost && <CreatePost setOpenCreatePost={setOpenCreatePost} openType={openType} />}
    </section>
  );
}

export default PreCreatePost;
