/* eslint-disable react/prop-types */
function StoryItem({ story }) {
  // story = {
  //   // title: "IELTS Nguyễn Huyền",
  //   backdrop:
  //     'https://scontent.fhan15-2.fna.fbcdn.net/v/t39.30808-1/365420320_273997075354116_7250964728840040949_n.jpg?stp=c0.71.480.480a_dst-jpg_p480x480&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=gGIX1kzKTrQAX8GcReQ&_nc_ht=scontent.fhan15-2.fna&oh=00_AfDanZNZCKgAcoyd_IBnrQa51XVMR5kbyxd5wf8wttvbew&oe=65FF568D',
  //   author: {
  //     name: 'IELTS Nguyễn Huyền',
  //     picture:
  //       'https://scontent.fhan15-2.fna.fbcdn.net/v/t39.30808-1/365420320_273997075354116_7250964728840040949_n.jpg?stp=c0.71.480.480a_dst-jpg_p480x480&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=gGIX1kzKTrQAX8GcReQ&_nc_ht=scontent.fhan15-2.fna&oh=00_AfDanZNZCKgAcoyd_IBnrQa51XVMR5kbyxd5wf8wttvbew&oe=65FF568D',
  //   },
  // };

  return (
    <div className="story-item rounded-xl p-2 relative overflow-hidden w-[160px] h-[250px] ">
      <img
        src={story.author.picture}
        alt=""
        className="story-backdrop w-full h-full  object-cover rounded-xl transition-transform duration-500 ease-in-out cursor-pointer "
      />
      <div className=" ">
        <img
          src={story.backdrop}
          alt="author's story"
          className="w-10 h-10 object-cover rounded-full border-[3px] border-primary absolute top-4 left-4"
        />
        <h4 className="absolute bottom-4 px-2   text-white text-sm">{story.author.name}</h4>
      </div>
    </div>
  );
}

export default StoryItem;
