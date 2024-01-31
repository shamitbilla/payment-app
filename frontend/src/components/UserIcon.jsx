export function UserIcon({char})
{
    return <span className="bg-gray-200 rounded-full h-10 w-10 flex items-center justify-center font-semibold">
        {char.toUpperCase()}
    </span>
}