import React from 'react'
export default function Stat({ label, value }){
return (
<div className="rounded-2xl p-5 bg-white/5 border border-white/10">
<div className="text-2xl font-extrabold">{value}</div>
<div className="text-sm text-white/60">{label}</div>
</div>
)
}