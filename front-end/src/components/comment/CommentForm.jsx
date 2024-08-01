// import Tippy from '@tippyjs/react';
import Tippy from '@tippyjs/react/headless'; // different import path!

import Wrapper from '../Popper/Wrapper.jsx';
import EmojiPicker from 'emoji-picker-react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import 'tippy.js/dist/tippy.css'; // optional

import { IoMdSend } from 'react-icons/io';
import { addComment, updateComment } from '@/stores/slices/commentSlice.js';

function CommentForm({ postId, id, parentId, initialText = '',isUpdateComment=false, setIsUpdating, setIsReplying, isReplying }) {
  const { currentUser } = useSelector((state) => state.auth);
  const {
    comments: { metadata },
  } = useSelector((state) => state.comment);
  const dispatch = useDispatch();
  const [text, setText] = useState(initialText);
  const textRef = useRef(null);
  // const postTextRef = useRef(null);

  // when metadata changes , clear the text and focus on the text area
  useEffect(() => {
    setText(initialText);
    textRef.current.focus();
  }, [metadata]);

  const handleClickEmoji = (event) => {
    const ref = textRef.current;

    const cursorPosition = ref.selectionStart;

    setText((prev) => prev.slice(0, cursorPosition) + event.emoji + prev.slice(cursorPosition));
  };

  function handleAddComment() {
    const data = {
      text,
       postId,
       parentId,
       
    };
    console.log("🚀 ~ handleAddComment ~ data:", data)
    // that mean this is a update comment
    if(isUpdateComment) {
      dispatch(updateComment({id,postId, text, setIsUpdating}));
    }else {
      if(isReplying) {
        data.setIsReplying = setIsReplying
      }
      dispatch(addComment(data));
    }
  }

  return (
    <div className="add-comment flex gap-4 my-2 ">
      <img src={currentUser?.picture} className="img-rounded" alt="" />

      <div className="bg-[#f0f2f5] rounded-xl w-full p-2">
        <textarea
          name=""
          id=""
          cols="30"
          ref={textRef}
          maxLength={2000}
          spellCheck={false}
          autoFocus
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a comment..."
          className={`${text.length > 140 ? 'text-sm' : text.length > 300 ? 'text-[12px]' : 'text-lg'}  outline-none w-full resize-none mt-2 bg-transparent placeholder:text-base `}
        ></textarea>
        <div className="flex-between">
          <div className="left ">
            <Tippy
              // visible={searchResult.length > 0}
              placement={'top'}
              trigger="click"
              interactive
              // offset={[900, -200]}
              // onClickOutside={(instance) => { instance.hide(); }}
              render={(attrs) => (
                <div className="mb-20 " tabIndex="-1" {...attrs}>
                  <Wrapper>
                    <EmojiPicker emojiStyle="facebook" onEmojiClick={handleClickEmoji} />
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

          <div onClick={handleAddComment}>
            <Tippy content="Comment">
              <span className={text.length === 0 ? 'cursor-not-allowed ' : 'cursor-pointer'}>
                <IoMdSend color={text.length === 0 ? 'gray' : 'blue'} />
              </span>
            </Tippy>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentForm;
