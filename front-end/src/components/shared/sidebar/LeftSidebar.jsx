import ShortcutItem from '@/components/shared/ShortcutItem';
import PropTypes from 'prop-types';
import Divider from '@/styles/Divider';

function LeftSidebar({ sidebarLinks, currentUser, showLess, setShowLess, toggleShow }) {

  return (
    <aside className=" fixed  overflow-scroll h-screen hide-scrollbar ">
      <div className="w-[360px]  ">
        {currentUser && (
          <ShortcutItem imgLink={currentUser.picture} title={currentUser.firstName + ' ' + currentUser.lastName} to={`/profile/${currentUser.id}`} />
        )}
        {(showLess ? sidebarLinks.slice(0,7) : sidebarLinks  ).map((item, index) => (
          <div key={index}>
            {<ShortcutItem key={index} imgLink={item.imgLink} title={item.title} desc={item.desc} to={item.link} />}
          </div>
        ))}
        <Divider className="my-2" />
      </div>
      {toggleShow && (
        <ShortcutItem
          imgLink="/left/arrow-down.png"
          title={showLess ? 'See More' : 'See Less'}
          onClick={() => setShowLess(!showLess)}
        />
      )}
    </aside>
  );
}

LeftSidebar.propTypes = {
  sidebarLinks: PropTypes.array.isRequired,
  currentUser: PropTypes.object,
};

export default LeftSidebar;
