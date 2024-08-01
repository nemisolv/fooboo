import { FaArrowLeft, FaLock, FaUserFriends } from 'react-icons/fa';
import { FaEarthAsia } from 'react-icons/fa6';
import Divider from '@/styles/Divider';
import Button from '@/components/Button';
import PropTypes from 'prop-types';

function PostScope({ setScope, setShowScope }) {
  return (
    <div className={`modal-content  w-[500px]`}>
      <div className="  ">
        <header
          className="relative py-3
          "
        >
          <span className="absolute left-0 top-0 bg-gray-100 p-2 rounded-full hover:bg-gray-200 cursor-pointer">
            <FaArrowLeft
              onClick={() => {
                setShowScope(false);
                setScope('friends');
              }}
            />
          </span>
          <h2 className="text-center font-semibold text-xl">Post Audience</h2>
        </header>
        <Divider />
        <div>
          <div className="h-[300px] overflow-y-scroll ">
            <div>
              <h3 className="font-semibold"> Who can see your post?</h3>
              <span className="mt-2 mb-4 inline-block text-sm text-slate-400">
                Your post will show up in Feed, on your profile and in search results.
              </span>
              <p className="text-sm text-slate-400">
                {' '}
                Your default audience is set to <b className="text-slate-600">Friends</b>, but you can change the
                audience of this specific post.
              </p>
            </div>

            <ul className="mt-2  shadow-md">
              <ListItem
                id="link-radio"
                icon={<FaEarthAsia size={30} />}
                title="Public"
                description="Anyone on or off Facebook"
                defaultValue
                value="public"
                onChange={() => setScope('public')}
              />
              <ListItem
                id="friends-radio"
                icon={<FaUserFriends size={30} />}
                title="Friends"
                description="Only your friends on Facebook"
                value="friends"
                onChange={() => setScope('friends')}
              />

              <ListItem
                id="only-me-radio"
                icon={<FaLock size={30} />}
                title="Only me"
                description="Only you can see this post"
                value="only_me"
                onChange={() => setScope('only me')}
              />
            </ul>
          </div>

          <footer className="mt-10 float-right block">
            <Button
              onClick={() => {
                setShowScope(false);
                setScope('friends');
              }}
            >
              Cancel
            </Button>
            <Button primary onClick={() => setShowScope(false)}>
              Done
            </Button>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default PostScope;

function ListItem({ id, icon, title, description, defaultValue, onChange }) {
  return (
    <li className=" cursor-pointer hover:bg-gray-100 rounded-lg w-full p-2">
      <label htmlFor={id} className="flex-between  cursor-pointer text-sm font-medium text-gray-900 ">
        <div className="flex gap-x-3 items-center">
          <span className="bg-gray-200 w-16 h-16 rounded-full flex-center ">{icon}</span>
          <div>
            <h4>{title}</h4>
            <p>{description}</p>
          </div>
        </div>
        <input
          onChange={onChange}
          id={id}
          type="radio"
          defaultValue={defaultValue}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
          name="scope"
        />
      </label>
    </li>
  );
}

ListItem.propTypes = {
  id: PropTypes.string,
  icon: PropTypes.node,
  title: PropTypes.string,
  description: PropTypes.string,
  defaultValue: PropTypes.bool,
  onChange: PropTypes.func,
};
