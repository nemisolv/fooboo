import { useSelector } from "react-redux";

export default function CoverPicture() {
    const { userProfile } = useSelector(state => state.user);

    return (
        <div className="relative w-full h-[462px] rounded-lg shadow-md overflow-hidden">
            <img 
                src={userProfile?.coverPicture || "/images/default-cover.jpg"} 
                alt="Cover Picture" 
                className="object-cover w-full h-full"
            />
        </div>
    );
}
