import { Link, useLocation } from "react-router-dom";

export default function OtherSidebar({  sidebarLinks }) {
  const location = useLocation();

    return (
      <aside className="max-w-[336px] w-full h-full border-l bg-white border-gray-300 shadow-sm p-2  absolute left-0  ">
    <h3 className="font-medium">{sidebarLinks[0].title}</h3>
      {sidebarLinks.slice(1).map((link) => {
        const isActive = link.href === location.pathname

        return <Link to={link.href}
          key={link.title}
          className={`flex items-center space-x-3  hover:bg-gray-100 px-3 py-2 rounded-md cursor-pointer ${isActive ? 'bg-gray-100' : ''}`}
        >
          <div
            className={`size-10 rounded-full flex-center ${isActive ? ' bg-primary text-white ' : 'bg-gray-200 text-black'}`}
          >
            <link.Icon className="w-5 h-5 " />
          </div>
          <h4 className="font-medium text-md">{link.title}</h4>
        </Link>
      })}
    </aside>
  );
}
