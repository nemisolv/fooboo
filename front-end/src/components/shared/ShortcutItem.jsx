import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
function ShortcutItem({ imgLink, title, desc, onClick, to }) {
  return (
    <Link to={to}
      className="shortcut-item flex items-center gap-x-4 py-2 mx-2 px-2 rounded-lg hover:bg-[#e3e2e2] cursor-pointer select-none"
      onClick={onClick}
    >
      <img src={imgLink} alt={title} className="w-[36px] h-[36px] rounded-full " />
      <div>
        <h4 className="text-[#050505] font-medium ">{title}</h4>
        {desc && <span className="text-[#656767] text-xs">{desc}</span>}
      </div>
    </Link>
  );
}

ShortcutItem.propTypes = {
  imgLink: PropTypes.string,
  title: PropTypes.string,
  desc: PropTypes.string,
  onClick: PropTypes.func,
};

export default ShortcutItem;
