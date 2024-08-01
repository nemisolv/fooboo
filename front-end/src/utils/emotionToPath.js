import { reactions } from "@/data/post";
function reactionStrToObject(reactionStr) {
  return reactions.find((reaction) => reaction.desc === reactionStr);
}

export default reactionStrToObject;