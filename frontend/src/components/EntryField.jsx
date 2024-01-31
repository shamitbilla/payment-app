export function EntryField({text,prompt,onChange})
{
    return <div className="py-1">
        <div className="text-md py-3 font-bold">
            {text}
        </div>
        <div>
        <input
            type="text"
            placeholder={prompt}
            onChange={onChange}
            className="w-full py-2 px-4 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
        />
        </div>
    </div>
}