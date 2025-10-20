import React from 'react'
export default function FamilyList({ members=[] }){
return (
<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
{members.length>0 ? members.map((m,i)=>(
<div key={i} className="rounded-xl px-3 py-2 bg-white/5 border border-white/10">
<div className="font-medium">{m.name || '—'}</div>
<div className="text-xs text-white/60">{m.relation || '—'}</div>
</div>
)) : <div className="text-sm text-white/60">No members added.</div>}
</div>
)
}