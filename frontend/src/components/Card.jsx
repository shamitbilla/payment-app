export function Card({children,h,w})
{
    return <div className="max-w-sm rounded-xl overflow-hidden shadow-2xl bg-white p-4" style={{height:h || 'auto' ,width: w || 'auto'}}>
        <div className="px-3 py-3">
        {children}
        </div>
        
    </div>
}