export default function NumberNotification({number}) {
    if(number === 0) return null;
    return (
        <div className="absolute top-0 right-0 bg-red-500 size-4 rounded-full flex-center">
            <span className="text-white text-xs">{number}</span>
        </div>
    )
}