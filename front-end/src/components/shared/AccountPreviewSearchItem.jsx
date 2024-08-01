/* eslint-disable no-unused-vars */

import { BsPatchCheckFill } from 'react-icons/bs';

import Proptypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import FriendAction from './FriendAction';
function AccountPreviewSearchItem({ data }) {
  const { id, firstName, lastName, picture } = data;
 
  const navigate = useNavigate();

 

  return (
    <div
      className="mt-2 flex-between py-1 px-5 gap-x-4  bg-white min-h-[100px] rounded-lg shadow border border-gray-100 cursor-pointer  w-full"
      onClick={() => navigate(`/profile/${id}`)}
    >
      <div className="flex items-center gap-1">
        <img src={picture} alt="" className="w-10 h-10 rounded-full border border-slate-300" />
        <p className="font-medium flex items-center gap-x-2">
          {firstName + ' ' + lastName} <BsPatchCheckFill color="#0866ff" size={12} />
        </p>
      </div>
      <FriendAction data={data} id={id}/>
     
    </div>
  );
}

AccountPreviewSearchItem.propTypes = {
  data: Proptypes.object,
};

export default AccountPreviewSearchItem;
