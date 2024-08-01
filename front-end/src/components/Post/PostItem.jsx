/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';

import { PublicScope } from '@/assets/svg/post_scope';
import Divider from '@/styles/Divider';
import { BiMessageRounded, BiShare } from 'react-icons/bi';
import { formatDistanceToNow } from 'date-fns';
import { Fragment, useRef, useState } from 'react';
import ModalPost from './ModalPost';
import Like from './Like';
import RenderHoverCard from '../shared/Card/RenderHoverCard';
import { useDispatch, useSelector } from 'react-redux';
import {  fetchPreviewComments } from '@/stores/slices/commentSlice';

function PostItem({ post }) {
  const { id, author, text, createdAt, images, background, commentsCount, sharesCount, reactionsCount, reactions } =
    post;
  const [showComment, setShowComment] = useState(false);
  const dispatch = useDispatch();
  const postRef = useRef(null);
  const [shortText, setShortText] = useState(text.length > 200 ? text.substring(0, 200) : text);
  const {previewComments} = useSelector(state => state.comment)
  const handleSeeMoreLessClick = () => {
    setShortText(!shortText);
    postRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleHoverFetchComments = (e) => {
    // if(!comments.metadata) {
    e.stopPropagation();
      dispatch(fetchPreviewComments(id))
    // }
  };

  return (
    <div ref={postRef} className="post-item bg-white rounded-lg  w-full  mb-3">
      <header className="flex justify-between items-center p-4">
        <div className="left flex items-center gap-x-2 ">
          <img
            src={author.picture}
            className="w-10 h-10 rounded-full cursor-pointer object-cover "
            alt={author.firstName}
          />
          <div>
            <Link to={`/profile/${author.id}`} className="font-meidum hover:underline font-medium ">
              {author.firstName} {author.lastName}
            </Link>
            <div className="flex items-center text-slate-500 text-sm">
              <p>{formatDistanceToNow(createdAt, { addSuffix: true })}</p>
              <PublicScope />
            </div>
          </div>
        </div>
      </header>
      <div
        className={background !== 'false' ? ` post-bg-display h-[300px] text-white  ` : ''}
        style={
          background !== 'false'
            ? {
                backgroundImage: `url(${background})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }
            : {}
        }
      >
        <div className="px-4 ">
          <p className=" post-content text-sm leading-relaxed ">{shortText ? text.substring(0, 200) : text}</p>
          {text.length > 200 && ( // Adjust 100 to match the number used in shortText
            <button className="hover:underline text-sm font-medium" onClick={handleSeeMoreLessClick}>
              {shortText ? 'See More' : 'See Less'}
            </button>
          )}
        </div>
      </div>

      {/* images section */}
      <div className="mt-2">
        {images && images.length > 0 && (
          <div
            className={`${
              images.length === 1 || images.length === 2
                ? 'preview-create-post12'
                : images.length === 3
                  ? 'preview-create-post3'
                  : images.length === 4
                    ? 'preview-create-post4'
                    : 'preview-create-post5'
            }
                      relative min-h-[200px] max-h-[430px] h-full bg-gray-200 rounded-none
                `}
          >
            {images.map((image, index) => (
              // <Fragment key={index}>
              //   <img key={index} src={image} alt="post" className="h-full w-full object-cover max-h-[700px]" />
              // </Fragment>
              <Fragment key={index}>
                <img src={image} className="object-cover w-full min-h-[200px] " alt="" />
              </Fragment>
            ))}
          </div>
        )}
      </div>

      <div className="px-4 select-none">
        <div>
          <div className="emotions flex justify-between items-center ">
            <div className="left flex gap-1">
              <div className="flex gap-x-1">
                {reactionsCount > 0 ? (
                  <RenderHoverCard list={reactions} count={reactionsCount} type='reaction'   />
                ) : (
                  <p className="text-sm  text-slate-500">No reactions yet</p>
                )}
              </div>
            </div>

            <div className="right  text-slate-500 flex items-center gap-4 text-sm">
              <p
                className="hover:underline cursor-pointer "
                onClick={() => setShowComment(true)}
                onMouseOver={e => handleHoverFetchComments(e)}
              >
                <RenderHoverCard list={previewComments} count={commentsCount} type='comment'/>
              </p>
              <p className="hover:underline cursor-pointer">{sharesCount} shares</p>
            </div>
          </div>
          <Divider />
          {/* actions */}
          <div className="flex justify-around text-[#65676b] font-medium text-sm my-1 w-full relative">
            <Like post={post} />
            <div
              onClick={() => setShowComment(true)}
              className="text-center flex items-center justify-center gap-x-2 hover:bg-gray-100 cursor-pointer w-full py-2 px-2  rounded-lg "
            >
              <BiMessageRounded />
              <span className="">Comment</span>
            </div>
            <div className="text-center flex items-center justify-center gap-x-2 hover:bg-gray-100 cursor-pointer w-full py-2 px-2  rounded-lg ">
              <BiShare />
              <span className="">Share</span>
            </div>
          </div>
          <Divider />
        </div>
      </div>

      {/* modal comment */}
      {showComment && <ModalPost post={post} setShowComment={setShowComment} />}
    </div>
  );
}

export default PostItem;
