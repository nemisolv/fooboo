const BASE_URL_API = import.meta.env.VITE_BASE_URL_API || 'http://localhost:3000';
const USER_PICTURE_DEFAULT = 'https://res.cloudinary.com/dasoc53qg/image/upload/v1711525462/facebook/users/frog-image-reddit.png';
const USER_COVER_PICTURE_DEFAULT = 'https://res.cloudinary.com/dasoc53qg/image/upload/v1710692615/facebook/users/cover-img.jpg';

const BASE_URL_BACKEND = import.meta.env.VITE_BASE_URL_BACKEND || 'http://localhost:8080';

export { BASE_URL_API, USER_PICTURE_DEFAULT, USER_COVER_PICTURE_DEFAULT,BASE_URL_BACKEND};
