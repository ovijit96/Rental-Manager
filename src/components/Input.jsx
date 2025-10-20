import React from 'react'
export default function Input({ label, value, onChange, type='text', required }){
return (
<label className="grid gap-1 text-sm">
<span className="text-white/80">{label}</span>
<input required={required} type={type} value={value} onChange={e=>onChange?.(e.target.value)} className="px-3 py-2 rounded-xl bg-white/10 border border-white/15 outline-none"/>
</label>
)
}