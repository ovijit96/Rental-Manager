import React, { useState } from 'react'
export default function InlineRentEditor({ rent, onSave }){
const [v, setV] = useState(rent)
return (
<form onSubmit={(e)=>{ e.preventDefault(); onSave?.(Number(v||0)) }} className="flex items-center gap-2">
<input type="number" value={v} onChange={e=>setV(e.target.value)} className="px-3 py-2 rounded-xl bg-white/10 border border-white/15 outline-none w-28"/>
<button className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20" type="submit">Save</button>
</form>
)
}