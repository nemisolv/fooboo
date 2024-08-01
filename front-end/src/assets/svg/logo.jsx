import { useNavigate } from 'react-router-dom';

function Logo() {
  const navigate = useNavigate();
  return (
    <svg
      onClick={() => navigate('/')}
      width="40"
      height="40"
      fill="url(#jsc_s_b)"
      viewBox="0 0 36 36"
      className="cursor-pointer"
    >
      <defs>
        <linearGradient id="jsc_s_b" x1="50%" x2="50%" y1="97.078%" y2="0%">
          <stop offset="0%" stopColor="#0062E0"></stop>
          <stop offset="100%" stopColor="#19AFFF"></stop>
        </linearGradient>
      </defs>
      <path d="M15 35.8C6.5 34.3 0 26.9 0 18 0 8.1 8.1 0 18 0s18 8.1 18 18c0 8.9-6.5 16.3-15 17.8l-1-.8h-4l-1 .8z"></path>
      <path
        fill="#fff"
        d="M25 23l.8-5H21v-3.5c0-1.4.5-2.5 2.7-2.5H26V7.4c-1.3-.2-2.7-.4-4-.4-4.1 0-7 2.5-7 7v4h-4.5v5H15v12.7c1 .2 2 .3 3 .3s2-.1 3-.3V23h4z"
      ></path>
    </svg>
  );
}

export default Logo;
