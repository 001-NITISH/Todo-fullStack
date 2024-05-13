export function InputBoxD({Label, placeholder, onChange}:any){
    return <div>
        <div className="text-2xl font-medium pl-5 text-left py-2">{Label}
        </div>
        
        <div className="pr-60 pl-5 opacity-70 ">
            <input onChange={onChange} placeholder={placeholder} className=" w-full px-2 py-1 border rounded border-slate-200"></input>
        </div>
    </div>
}