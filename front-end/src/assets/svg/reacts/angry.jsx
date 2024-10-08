function AngryEmotion() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 16 16">
      <defs>
        <linearGradient id="a" x1="50%" x2="50%" y1="0%" y2="67.194%">
          <stop offset="0%" stopColor="#E04300" />
          <stop offset="100%" stopColor="#FFA320" />
        </linearGradient>
        <linearGradient id="f" x1="50%" x2="50%" y1="13.511%" y2="100%">
          <stop offset="0%" stopColor="#3D0D00" />
          <stop offset="100%" stopColor="#661C04" />
        </linearGradient>
        <linearGradient id="g" x1="50%" x2="50%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#191A33" />
          <stop offset="87.162%" stopColor="#3B426A" />
        </linearGradient>
        <linearGradient id="l" x1="82.871%" x2="82.871%" y1="109.337%" y2="0%">
          <stop offset="0%" stopColor="#9A2F00" />
          <stop offset="100%" stopColor="#D44800" />
        </linearGradient>
        <filter id="c" width="118.8%" height="118.8%" x="-9.4%" y="-9.4%" filterUnits="objectBoundingBox">
          <feGaussianBlur in="SourceAlpha" result="shadowBlurInner1" stdDeviation={1} />
          <feOffset dy={-1} in="shadowBlurInner1" result="shadowOffsetInner1" />
          <feComposite
            in="shadowOffsetInner1"
            in2="SourceAlpha"
            k2={-1}
            k3={1}
            operator="arithmetic"
            result="shadowInnerInner1"
          />
          <feColorMatrix
            in="shadowInnerInner1"
            values="0 0 0 0 0.731459466 0 0 0 0 0.0510349878 0 0 0 0 0.0184398032 0 0 0 0.353638549 0"
          />
        </filter>
        <filter id="d" width="169.5%" height="366.7%" x="-33.8%" y="-66.7%" filterUnits="objectBoundingBox">
          <feOffset dy={1} in="SourceAlpha" result="shadowOffsetOuter1" />
          <feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1" stdDeviation=".5" />
          <feColorMatrix in="shadowBlurOuter1" values="0 0 0 0 1 0 0 0 0 0.509680707 0 0 0 0 0 0 0 0 0.371206975 0" />
        </filter>
        <filter id="i" width="111.4%" height="138.5%" x="-5.7%" y="-19.2%" filterUnits="objectBoundingBox">
          <feGaussianBlur in="SourceAlpha" result="shadowBlurInner1" stdDeviation=".5" />
          <feOffset in="shadowBlurInner1" result="shadowOffsetInner1" />
          <feComposite
            in="shadowOffsetInner1"
            in2="SourceAlpha"
            k2={-1}
            k3={1}
            operator="arithmetic"
            result="shadowInnerInner1"
          />
          <feColorMatrix
            in="shadowInnerInner1"
            values="0 0 0 0 0.0387427847 0 0 0 0 0.0406182666 0 0 0 0 0.0875053146 0 0 0 1 0"
          />
        </filter>
        <filter id="j" width="106.4%" height="165.6%" x="-3.2%" y="-16.4%" filterUnits="objectBoundingBox">
          <feOffset dy=".6" in="SourceAlpha" result="shadowOffsetOuter1" />
          <feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1" stdDeviation=".05" />
          <feColorMatrix
            in="shadowBlurOuter1"
            values="0 0 0 0 0.565874787 0 0 0 0 0.151271555 0 0 0 0 0 0 0 0 0.150240385 0"
          />
        </filter>
        <path id="b" d="M16 8A8 8 0 110 8a8 8 0 0116 0" />
        <path
          id="e"
          d="M5.2 13.551c0 .528 1.253.444 2.8.444 1.546 0 2.8.084 2.8-.444 0-.636-1.254-1.051-2.8-1.051-1.547 0-2.8.415-2.8 1.051"
        />
        <path
          id="h"
          d="M3.6 9.831c0-.791.538-1.431 1.2-1.431.663 0 1.2.64 1.2 1.431 0 .329-.093.633-.252.874a.527.527 0 01-.318.22c-.15.036-.373.075-.63.075s-.481-.039-.63-.075a.524.524 0 01-.318-.22 1.588 1.588 0 01-.252-.874zm6.4 0c0-.791.537-1.431 1.2-1.431.662 0 1.2.64 1.2 1.431 0 .329-.094.633-.252.874a.524.524 0 01-.318.22 2.734 2.734 0 01-.63.075c-.257 0-.48-.039-.63-.075a.53.53 0 01-.319-.22A1.596 1.596 0 0110 9.831z"
        />
        <path
          id="k"
          d="M9 7.6c0-.446.163-.6.445-.6.28 0 .414.276.506 1.066 1.128 0 3.038-.534 3.222-.534.178 0 .277.085.317.267.035.158-.023.308-.221.4-.621.287-2.443.935-3.984.935-.168 0-.285-.086-.285-.301V7.6zm-2.951.466C6.141 7.276 6.275 7 6.555 7c.282 0 .445.154.445.6v1.233c0 .215-.117.301-.285.301-1.541 0-3.363-.648-3.984-.935-.198-.092-.256-.242-.221-.4.041-.182.14-.267.317-.267.184 0 2.094.534 3.222.534z"
        />
      </defs>
      <g fill="none">
        <use fill="url(#a)" xlinkHref="#b" />
        <use fill="black" filter="url(#c)" xlinkHref="#b" />
        <use fill="black" filter="url(#d)" xlinkHref="#e" />
        <use fill="url(#f)" xlinkHref="#e" />
        <use fill="url(#g)" xlinkHref="#h" />
        <use fill="black" filter="url(#i)" xlinkHref="#h" />
        <path
          fill="#4F4F67"
          d="M4.968 9.333a.329.329 0 01.007.071c0 .201-.176.366-.394.366-.217 0-.393-.165-.393-.366 0-.083.03-.16.08-.221.224.053.459.104.7.15zm5.926.437c-.211 0-.383-.153-.393-.348.259-.038.516-.085.766-.136a.333.333 0 01.02.119c0 .2-.175.365-.393.365z"
        />
        <use fill="black" filter="url(#j)" xlinkHref="#k" />
        <use fill="url(#l)" xlinkHref="#k" />
      </g>
    </svg>
  );
}

export default AngryEmotion;
