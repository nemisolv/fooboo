import StoryItem from './Story';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import './styles.css';

// import required modules
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import {  useRef } from 'react';

const stories = [
  {
    id: 1,
    title: 'IELTS Nguyễn Huyền',
    backdrop: 'https://i.pinimg.com/474x/c6/9c/e3/c69ce381171109b3f696914cc4e4ec0a.jpg',
    author: {
      name: 'IELTS Nguyễn Huyền',
      picture: 'https://i.pinimg.com/474x/e4/6a/c7/e46ac77b22ac005abb1f79b2a37e5675.jpg',
    },
  },
  {
    id: 2,
    title: 'IELTS Nguyễn Huyền',
    backdrop: 'https://i.pinimg.com/474x/bd/cc/c8/bdccc83a2f998f540ae049242e5abe25.jpg',
    author: {
      name: 'IELTS Nguyễn Huyền',
      picture: 'https://i.pinimg.com/474x/9e/df/74/9edf743ef1fba233b98836a59322dcac.jpg',
    },
  },
  {
    id: 3,
    title: 'IELTS Nguyễn Huyền',
    backdrop: 'https://i.pinimg.com/474x/9e/df/74/9edf743ef1fba233b98836a59322dcac.jpg',
    author: {
      name: 'IELTS Nguyễn Huyền',
      picture: 'https://i.pinimg.com/474x/87/86/dd/8786dd43d8cc04bc8021deb1afb12d85.jpg',
    },
  },
  {
    id: 4,
    title: 'IELTS Nguyễn Huyền',
    backdrop: 'https://i.pinimg.com/564x/6a/a2/78/6aa27801a21586880c216a35aa50698e.jpg',
    author: {
      name: 'IELTS Nguyễn Huyền',
      picture: 'https://i.pinimg.com/564x/6a/a2/78/6aa27801a21586880c216a35aa50698e.jpg',
    },
  },
  {
    id: 5,
    title: 'IELTS Nguyễn Huyền',
    backdrop: 'https://i.pinimg.com/564x/6a/a2/78/6aa27801a21586880c216a35aa50698e.jpg',
    author: {
      name: 'IELTS Nguyễn Huyền',
      picture: 'https://i.pinimg.com/564x/6a/a2/78/6aa27801a21586880c216a35aa50698e.jpg',
    },
  },
];

function StoryList() {
  const swiperRef = useRef();
  const handleSlideChange = (swiper) => {
    const prevButton = document.querySelector('.swiper-button-prev');
    const nextButton = document.querySelector('.swiper-button-next');

    if (swiper.isBeginning) {
      // Hide previous button
      prevButton.style.display = 'none';
    } else {
      // Show previous button

      prevButton.style.display = '';
    }

    if (swiper.isEnd) {
      // Hide next button
      nextButton.style.display = 'none';
    } else {
      // Show next button
      nextButton.style.display = '';
    }
  };

  return (
    <div className="h-[250px] story-list  ">
      <Swiper
        onSlideChange={handleSlideChange}
        onSwiper={handleSlideChange}
        slidesPerView={4}
        spaceBetween={0}
        grabCursor
        ref={swiperRef}
        scrollbar={{ draggable: true }}
        navigation
        modules={[Pagination, Navigation, A11y, Scrollbar]}
        className="mySwiper"
      >
        {stories.map((story) => (
          <SwiperSlide key={story.id}>
            <StoryItem story={story} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default StoryList;
