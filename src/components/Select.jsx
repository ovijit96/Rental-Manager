import React from 'react'
export default function Select({ label, value, onChange, options=[], required }){
return (
<label className="grid gap-1 text-sm">
<span className="text-white/80">{label}</span>
<select required={required} value={value} onChange={e=>onChange?.(e.target.value)} className="px-3 py-2 rounded-xl bg-white/10 border border-white/15 outline-none">
<option value="">Select...</option>
{options.map(o => <option key={o} value={o}>{o}</option>)}
</select>
</label>
)
}