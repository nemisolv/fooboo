import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { BiShare } from 'react-icons/bi';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Copy } from 'lucide-react';
import { DialogClose } from '@radix-ui/react-dialog';
import { BASE_URL_CLIENT } from '@/constants';
import { useState } from 'react';

export default function SharePostModal({ post }) {
    const shareLink =` ${BASE_URL_CLIENT}/posts/${post.id}`;
    const [copied, setCopied] = useState(false);
    const handleCopyLink = () => {
        navigator.clipboard.writeText(shareLink);
        setCopied(true);
    }

  return (
    <Dialog>
      <DialogTrigger className="text-center flex items-center justify-center gap-x-2 hover:bg-gray-100 cursor-pointer w-full py-2 px-2  rounded-lg ">
        <BiShare />
        <span className="">Share</span>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            Share <span className="font-medium">{post.author.firstName}'s</span> post
          </DialogTitle>
        </DialogHeader>
     {/* share post with user */}




     {/* only share with copy link */}
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="link" className="sr-only">
                  Link
                </Label>
                <Input id="link" defaultValue={shareLink} readOnly />
              </div>
              <Button type="submit" size="sm" variant="ghost" className="px-3 flex items-center gap-2 min-w-[100px]" onClick={handleCopyLink}>
                <span className="sr-only">Copy</span>
                <Copy className="h-4 w-4" /> {copied ? 'Copied!' : 'Copy'}
              </Button>
            </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
