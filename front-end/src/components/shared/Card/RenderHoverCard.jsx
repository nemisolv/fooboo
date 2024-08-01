import { SadEmemotion, WowEmotion } from '@/assets/svg/reacts';
import { Button } from '../../ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../../ui/hover-card';
import PropTypes from 'prop-types';

export default function RenderHoverCard({ list, count, type }) {
  // let's make unique elements in list by user id, using set
  const identifiers = new Set();
  const uniqueList = list?.filter(item => { 
    if(identifiers.has(item.user.id)) {
      return false;
    }
    identifiers.add(item.user.id);
    return true;
  });

  const uniqueReactionList = new Set();
  const uniqueReactions = list?.filter(item => {
    if(uniqueReactionList.has(item.type)) {
      return false;
    }
    uniqueReactionList.add(item.type);
    return true;
  });
  return (
    <HoverCard >
      <HoverCardTrigger className="">
        <Button variant="link flex items-center ">
          {type ==='reaction' && uniqueReactions.map((reaction, index) => (
            <span key={index} className="w-[18px] cursor-pointer flex items-center gap-1">
              {reaction.type === 'like' && (
                <img src="/Post/reacts/like.png" alt="like" className="w-5 h-5 object-contain" />
              )}
              {reaction.type === 'love' && (
                <img src="/Post/reacts/love.png" alt="love" className="w-5 h-5 object-contain" />
              )}
              {reaction.type === 'haha' && (
                <img src="/Post/reacts/haha.png" alt="haha" className="w-5 h-5 object-contain" />
              )}
              {reaction.type === 'wow' && <WowEmotion />}
              {reaction.type === 'sad' && <SadEmemotion />}
              {reaction.type === 'angry' && (
                <img src="/Post/reacts/angry.png" alt="angry" className="w-5 h-5 object-contain" />
              )}
            </span>
          ))}

          <span className="text-sm hover:underline text-slate-500 cursor-pointer">
            {count} {`${type}${count >1 ?'s':''}`}
          </span>
        </Button>
      </HoverCardTrigger>
      {count >0 && <HoverCardContent  className="w-40 rounded-xl text-white bg-slate-800/80"
      // prevent call api preview when hover on HoverCardContent
      onMouseOver={e => e.stopPropagation()}
      >
        {uniqueList?.slice(0, 20).map((item) => (
          <p key={item.id}>{item.user.firstName + ' ' + item.user.lastName}</p>
        ))}
        {identifiers?.length > 20 && <span>and {identifiers.length - 20} more...</span>}
      </HoverCardContent>}
    </HoverCard>
  );
}

RenderHoverCard.propTypes = {
  list: PropTypes.array,
  count: PropTypes.number,
  type: PropTypes.oneOf(['reaction', 'comment', 'share']).isRequired
}
