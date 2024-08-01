import {  FaTimes } from 'react-icons/fa';
import { FaUserFriends } from 'react-icons/fa';
import { FaCaretDown } from 'react-icons/fa6';
// import { Theme } from 'emoji-picker-react';

import Wrapper from '@/components/Popper/Wrapper';
import { FaChevronLeft } from 'react-icons/fa6';

import Divider from '@/styles/Divider';
import Button from '@/components/Button';
import { useRef, useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import Tippy from '@tippyjs/react/headless'; // different import path!
import UploadImage from '@/components/UploadImage.jsx';
import { postBackgrounds } from '@/data/post';
import { useDispatch, useSelector } from 'react-redux';
import PostScope from './PostScope';
import PostApi from '@/apis/postApi';
import UploadApi from '@/apis/uploadApi';
import dataUriToBlob from '@/helpers/dataUriToBlob';
import { toast } from 'react-toastify';
import { createPostSuccess } from '@/stores/slices/postSlice';

function CreatePost({ setOpenCreatePost, openType }) {
  const { currentUser } = useSelector((state) => state.auth);
  const [text, setText] = useState('');
  const postTextRef = useRef(null);
  const postRef = useRef(null);
  const bgRef = useRef(null);
  const [scope, setScope] = useState('friends');
  const [showScope, setShowScope] = useState(false);
  const [uploadImages, setUploadImages] = useState(openType=== 'photo' ? []: null);
  const [background, setBackground] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  const [loading,setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleClickEmoji = (event) => {
    const ref = postTextRef.current;

    const cursorPosition = ref.selectionStart;

    setText((prev) => prev.slice(0, cursorPosition) + event.emoji + prev.slice(cursorPosition));
  };

  const handleBackground = (index) => {
    bgRef.current.style.backgroundImage = `url(${postBackgrounds[index]})`;

    setBackground(postBackgrounds[index]);
  };

  const handleSetNoneBackground = () => {
    setBackground(null);
    bgRef.current.style.backgroundImage = 'none';
    setShowBackground(false)
  }

  const onSubmit = async (e) => {
    setLoading (true)
    let images = null;
    e.preventDefault();
    if (uploadImages && uploadImages.length > 0) {
      const formData = new FormData();
      images = uploadImages.map((img) => {
        return dataUriToBlob(img);
      });


       
      images.forEach((image) => {
        formData.append('files', image);
      });

      formData.append('uploadDir', `/posts/${currentUser.accountName}`);
      try {
        const res = await UploadApi.uploadImages(formData);
        if (Array.isArray(res)) {
          images = res;
        }
      }catch(error) {
        toast.error('Failed to upload images');
      }
    }

    const data = {
      text,
      background,
      images,
      scope,
      type: 'normal',
      status: 'active',
    };

    try {
      const res = await PostApi.createPost(data);
      if (res) {
        console.log("🚀 ~ onSubmit ~ res:", res)
        toast.success('Post created successfully');
        setOpenCreatePost(false);
        // add post newly created to the store 
        dispatch(createPostSuccess(res))
        
      }
    } catch (error) {
      console.log('🚀 ~ onSubmit ~ error:', error);
    }
    setLoading(false)
  };

  return (
    <div className="modal">
      <div className="w-[500px] overflow-x-hidden transition-transform duration-1000 ">
        <div className={` w-[1000px]  flex ${showScope ? '-ml-[500px]' : 'ml-0'} transition-all `}>
          <div ref={postRef} className={`modal-content  w-[500px]     `}>
            <div className="  ">
              <header className="relative py-3">
                <h2 className="text-center font-semibold text-xl">Create Post</h2>
                <span className="absolute  right-0 top-0 bg-gray-100 p-3 rounded-full cursor-pointer hover:bg-gray-200">
                  <FaTimes onClick={() => setOpenCreatePost(false)} />
                </span>
              </header>
              <Divider />

              <form onSubmit={onSubmit}>
                <div className="">
                  <div className="flex gap-x-3 items-center">
                    <img src={currentUser?.picture} alt="" className="w-10 h-10 rounded-full cursor-pointer object-cover" />
                    <div>
                      <h3 className="font-medium">{currentUser.firstName + ' ' + currentUser.lastName}</h3>
                      <div
                        onClick={() => setShowScope(true)}
                        className="scope flex items-center gap-x-2 text-sm font-medium bg-gray-200 rounded-md px-2 cursor-pointer "
                      >
                        <FaUserFriends size={12} />
                        <span className="first-letter:uppercase">{scope}</span>
                        <FaCaretDown size={12} />
                      </div>
                    </div>
                  </div>
                  <div ref={bgRef} className={`bg-post text-center ${showBackground ? 'h-[300px]' : 'border border-gray-200'}`}>
                    <textarea
                      name=""
                      id=""
                      cols="30"
                      rows={`${showBackground ? 10 : text.length > 200 ? 5 : text.length > 400 ? 7 : 3}`}
                      maxLength={2000}
                      spellCheck={false}
                      autoFocus
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      ref={postTextRef}
                      placeholder={`What's on your mind, ${currentUser.firstName}?`}
                      className={`  ${text.length > 200 ? 'text-sm' : text.length > 400 ? 'text-[12px]' : 'text-lg'} outline-none w-full mt-2 bg-transparent ${background ? 'text-white !text-lg' : ''}`}
                      style={{ resize: 'none', textAlign: 'center', paddingTop: '50px' }}
                    ></textarea>
                  </div>
                  <div className="flex-between relative overflow-visible ">
                    <div className="flex-between gap-4">
                      {!showBackground ? (
                        <img
                          src="/Post/create/theme.svg"
                          alt=""
                          className={`${uploadImages ? 'hidden' : ''}`}
                          onClick={() => {
                            if (uploadImages) return;
                            setShowBackground(true);
                          }}
                        />
                      ) : (
                        <span className="bg-slate-100 p-2 cursor-pointer ">
                          <FaChevronLeft onClick={() => setShowBackground(false)} size={16} title="close background" />
                        </span>
                      )}
                      {showBackground && (
                        <div className="flex-between gap-x-2 ">
                          <span
                            className="no-bg w-8 h-8 rounded-md cursor-pointer bg-gray-100"
                            title="no background"
                            onClick={handleSetNoneBackground}
                          ></span>
                          {showBackground &&
                            postBackgrounds.map((background, index) => (
                              <img
                                key={index}
                                src={background}
                                alt=""
                                className="w-8 h-8 rounded-md  cursor-pointer"
                                onClick={() => handleBackground(index)}
                              />
                            ))}
                        </div>
                      )}
                    </div>

                    <Tippy
                      // visible={searchResult.length > 0}
                      trigger="click"
                      interactive
                      offset={[900, -200]}
                      render={(attrs) => (
                        <div className=" " tabIndex="-1" {...attrs}>
                          <Wrapper>
                            <EmojiPicker emojiStyle="facebook" height={300} onEmojiClick={handleClickEmoji} />
                          </Wrapper>
                        </div>
                      )}
                    >
                      <img
                        // onClick={() => setChosenEmoji(!chosenEmoji)}
                        className="cursor-pointer"
                        src="/Post/create/smile.svg"
                        alt=""
                      />
                    </Tippy>
                  </div>

                  {/* upload image */}
                  {Array.isArray(uploadImages) && (
                    <UploadImage  images={uploadImages} setImages={setUploadImages} />
                  )}

                  <div className="flex justify-between items-center border border-slate-300 shadow-sm p-4 my-3 rounded-lg">
                    <button className="font-medium">Add to your post</button>
                    <ul className="flex-between gap-x-1 ">
                      <li
                        onClick={() => {
                          if (showBackground) return;

                          if (uploadImages === null) {
                            setUploadImages([]);
                          }
                          if (background) {
                            setBackground(null);
                            bgRef.current.style.backgroundImage = 'none';
                          }
                        }}
                        title={`${showBackground ? "This can't be combined with you've aready selected a background" : 'Upload Image'}`}
                        className={`hover:bg-gray-100 cursor-pointer w-full p-2 rounded-full ${showBackground ? 'opacity-40 cursor-not-allowed' : ''} `}
                      >
                        <img src="/Post/create/gallery.svg" alt="" />
                      </li>
                      <li className="hover:bg-gray-100 cursor-pointer w-full p-2 rounded-full">
                        <img src="/Post/create/tag.svg" alt="" />
                      </li>
                      <li className="hover:bg-gray-100 cursor-pointer w-full p-2 rounded-full">
                        <img src="/Post/create/emoji.svg" alt="" />
                      </li>
                      <li className="hover:bg-gray-100 cursor-pointer w-full p-2 rounded-full">
                        <img src="/Post/create/mic.svg" alt="" />
                      </li>
                      <li className="hover:bg-gray-100 cursor-pointer w-full p-2 rounded-full">
                        <img src="/Post/create/more.svg" alt="" />
                      </li>
                    </ul>
                  </div>

                  <Button primary fullWidth disabled={text.length === 0 || loading} loading={loading} >
                    Post
                  </Button>
                </div>
              </form>
            </div>
          </div>

          {/* post scope */}
          {showScope && <PostScope setScope={setScope} setShowScope={setShowScope} />}
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
