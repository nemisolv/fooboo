import PostItem from './PostItem';
import { FaCaretDown } from 'react-icons/fa';
import CommentForm from '@/components/comment/CommentForm.jsx';
import CommentWrapper from '@/components/comment/CommentWrapper.jsx';
import { LiaTimesSolid } from 'react-icons/lia';

function ModalPost({ post, setShowComment }) {
  return (
    <div className="modal">
      <div className="modal-content overflow-auto  w-[630px] h-full !px-0">
        <div className=" relative ">
          <div className="relative">
            <span onClick={() => setShowComment(false)} className="absolute top-0 right-0 p-2 cursor-pointer">
              {' '}
              <LiaTimesSolid size={20} />
            </span>

            <PostItem post={post} />
          </div>
          {/* comment section */}
          {/*<div>*/}
          <div className="cmt-options float-right  ">
            <div className="flex items-center gap-x-2">
              <h2>Most relevant</h2> <FaCaretDown />
            </div>
          </div>
          <div className="clear-both mb-1"></div>

          {/* display comments */}
          <CommentWrapper postId={post.id} />
          {/*</div>*/}
        </div>
        <footer className="sticky bottom-3 left-0 right-0 px-5">
          <CommentForm postId={post.id} />
        </footer>
      </div>
    </div>
  );
}

export default ModalPost;
