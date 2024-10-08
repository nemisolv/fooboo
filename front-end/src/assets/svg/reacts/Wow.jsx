function WowEmotion() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 16 16">
      <defs>
        <linearGradient id="a" x1="50%" x2="50%" y1="10.25%" y2="100%">
          <stop offset="0%" stopColor="#FEEA70" />
          <stop offset="100%" stopColor="#F69B30" />
        </linearGradient>
        <linearGradient id="d" x1="50%" x2="50%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#472315" />
          <stop offset="100%" stopColor="#8B3A0E" />
        </linearGradient>
        <linearGradient id="e" x1="50%" x2="50%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#191A33" />
          <stop offset="87.162%" stopColor="#3B426A" />
        </linearGradient>
        <linearGradient id="j" x1="50%" x2="50%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#E78E0D" />
          <stop offset="100%" stopColor="#CB6000" />
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
            values="0 0 0 0 0.921365489 0 0 0 0 0.460682745 0 0 0 0 0 0 0 0 0.35 0"
          />
        </filter>
        <filter id="g" width="111.1%" height="133.3%" x="-5.6%" y="-16.7%" filterUnits="objectBoundingBox">
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
            values="0 0 0 0 0.0980392157 0 0 0 0 0.101960784 0 0 0 0 0.2 0 0 0 0.819684222 0"
          />
        </filter>
        <filter id="h" width="204%" height="927.2%" x="-52.1%" y="-333.3%" filterUnits="objectBoundingBox">
          <feOffset dy={1} in="SourceAlpha" result="shadowOffsetOuter1" />
          <feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1" stdDeviation="1.5" />
          <feColorMatrix
            in="shadowBlurOuter1"
            values="0 0 0 0 0.803921569 0 0 0 0 0.388235294 0 0 0 0 0.00392156863 0 0 0 0.14567854 0"
          />
        </filter>
        <path id="b" d="M16 8A8 8 0 110 8a8 8 0 0116 0" />
        <path
          id="f"
          d="M3.5 5.5c0-.828.559-1.5 1.25-1.5S6 4.672 6 5.5C6 6.329 5.441 7 4.75 7S3.5 6.329 3.5 5.5zm6.5 0c0-.828.56-1.5 1.25-1.5.691 0 1.25.672 1.25 1.5 0 .829-.559 1.5-1.25 1.5C10.56 7 10 6.329 10 5.5z"
        />
        <path
          id="i"
          d="M11.068 1.696c.052-.005.104-.007.157-.007.487 0 .99.204 1.372.562a.368.368 0 01.022.51.344.344 0 01-.496.024c-.275-.259-.656-.4-.992-.369a.8.8 0 00-.59.331.346.346 0 01-.491.068.368.368 0 01-.067-.507 1.49 1.49 0 011.085-.612zm-7.665.555a2.042 2.042 0 011.372-.562 1.491 1.491 0 011.242.619.369.369 0 01-.066.507.347.347 0 01-.492-.068.801.801 0 00-.59-.331c-.335-.031-.717.11-.992.369a.344.344 0 01-.496-.024.368.368 0 01.022-.51z"
        />
      </defs>
      <g fill="none">
        <use fill="url(#a)" xlinkHref="#b" />
        <use fill="black" filter="url(#c)" xlinkHref="#b" />
        <path
          fill="url(#d)"
          d="M5.643 10.888C5.485 12.733 6.369 14 8 14c1.63 0 2.515-1.267 2.357-3.112C10.2 9.042 9.242 8 8 8c-1.242 0-2.2 1.042-2.357 2.888"
        />
        <use fill="url(#e)" xlinkHref="#f" />
        <use fill="black" filter="url(#g)" xlinkHref="#f" />
        <path
          fill="#4E506A"
          d="M4.481 4.567c.186.042.29.252.232.469-.057.218-.254.36-.44.318-.186-.042-.29-.252-.232-.47.057-.216.254-.36.44-.317zm6.658.063c.206.047.322.28.258.52-.064.243-.282.4-.489.354-.206-.046-.322-.28-.258-.521.063-.242.282-.4.49-.353z"
        />
        <use fill="black" filter="url(#h)" xlinkHref="#i" />
        <use fill="url(#j)" xlinkHref="#i" />
      </g>
    </svg>
  );
}

export default WowEmotion;
