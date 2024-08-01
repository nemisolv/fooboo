function Divider({ color, className }) {
  return <div className={`h-[1px] w-full  ${color || 'bg-gray-200'} ${className} `}></div>;
}
export default Divider;
