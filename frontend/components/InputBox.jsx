export const InputBox=({label,placeHolder,onchange})=>{
    return <div>
        <div className="text-sm font-medium text-left text-gray-700 py-2">
            {label}
        </div>
        <input onchange={onchange} placeholder={placeHolder} className="w-full px-2 py-1 border rounded border-slate-200"/>
        
    </div>
}