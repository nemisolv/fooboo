import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { BiMessageRounded } from "react-icons/bi"
import PostItem from "./PostItem"
import { FaCaretDown } from "react-icons/fa"
import CommentWrapper from "../comment/CommentWrapper"
import CommentForm from "../comment/CommentForm"
export default function PostCommentModal({post,isOpen, setIsOpen}) {

    return   <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
    <DialogTrigger className="text-center flex items-center justify-center gap-x-2 hover:bg-gray-100 cursor-pointer w-full py-2 px-2  rounded-lg ">
              <BiMessageRounded />Comment</DialogTrigger>
    <DialogContent className='max-w-[640px]'>
      <DialogHeader>
        <DialogTitle className='text-center text-xl '>{`${post.author.firstName} ${post.author.lastName}'s post`}</DialogTitle>
      <div className="">
          

            <PostItem post={post} />
          {/* comment section */}
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
        <footer className="">
          <CommentForm postId={post.id} />
        </footer>
      {/* </div> */}
      </DialogHeader>
    </DialogContent>
  </Dialog>

}