/* eslint-disable no-unused-vars */
import { LiaTimesSolid } from 'react-icons/lia';
import { BsPatchCheckFill } from 'react-icons/bs';

import Proptypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
function AccountItem({data}) {
  const {id,firstName,lastName, picture, location, bio} = data;
  const navigate = useNavigate();
  return (
    <div className="mt-2 flex items-center  py-1 px-5 gap-x-4 hover:bg-gray-100 shadow border border-gray-100 cursor-pointer "
    onClick={() => navigate(`/profile/${id}`)}
    >
      <img
        src={picture}
        alt=""
        className="w-10 h-10 rounded-full border border-slate-300"
      />
      <p className="font-medium flex items-center gap-x-2">
       {firstName + ' ' + lastName} <BsPatchCheckFill color="#0866ff" size={12} />
      </p>
      {/* <LiaTimesSolid className="ml-auto hover:opacity-50" /> */}
    </div>
  );
}

AccountItem.propTypes = {
  data: Proptypes.object,
};

export default AccountItem;
