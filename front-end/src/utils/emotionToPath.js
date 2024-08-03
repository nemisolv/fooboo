import { reactions } from "@/data/post";
function reactionStrToObject(reactionStr) {
  return reactions.find((reaction) => reaction.desc === reactionStr?.toLowerCase());
}

export default reactionStrToObject;