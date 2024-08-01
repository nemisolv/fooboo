import FriendItem from "./FriendItem";

export function FriendRenderList({list, title, type='friendRequests'}) {
return <div className="mt-10">
<h1 className="text-2xl font-semibold mb-3">{title}</h1>
<div className="grid grid-cols-8 gap-6 ">
  {list.map((friend) => (
    <FriendItem key={friend.id} data={friend} type={type}/>
  ))}
</div>
</div>
}