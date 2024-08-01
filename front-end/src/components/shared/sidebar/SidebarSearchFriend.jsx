import ShortcutItem from '@components/ShortcutItem';

function SidebarSearchFriend({ sidebarLinks }) {
  return (
    <aside className="   overflow-auto h-screen hide-scrollbar   border-t border-slate-400 border-r ">
      {sidebarLinks.map((item, index) => (
        <ShortcutItem key={index} imgLink={item.imgLink} title={item.title} desc={item.desc} />
      ))}
    </aside>
  );
}

export default SidebarSearchFriend;
