import FriendAction from '../shared/FriendAction';

export default function FriendItem({ data, type = 'friendRequests' }) {
  const { id, firstName, lastName, picture } = data;
  console.log('🚀 ~ FriendItem ~ id:', id);
  return (
    <div className="rounded-lg  w-full  bg-white shadow overflow-hidden">
      <div>
        <img src={picture} alt={`${firstName}'s picture`} className="size-[220px] object-cover" />
        <div className="my-3  p-2">
          <h4 className="font-medium text-lg">
            {firstName} {lastName}
          </h4>
        </div>
        <div className="flex flex-col gap-2 p-2">
          <FriendAction id={id} data={data} />
        </div>
      </div>
    </div>
  );
}
