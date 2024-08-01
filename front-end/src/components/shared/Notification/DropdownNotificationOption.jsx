import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
export default function DropdownNotificaitonOption({ icon, text, onClick }) {
    return (
      <DropdownMenuItem onClick={onClick}>
        <div className="flex items-center gap-2  hover:bg-neutral-300 px-3 py-2 rounded-md cursor-pointer w-full">
          {icon}
          <span className=' font-medium'>{text}</span>
        </div>
      </DropdownMenuItem>
    );
  }