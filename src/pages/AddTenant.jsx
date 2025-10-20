import React, { useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import { useData } from '../context/DataContext.jsx'
import Input from '../components/Input.jsx'
import Select from '../components/Select.jsx'
import Avatar from '../components/Avatar.jsx'

export default function AddTenant(){
const { addTenant } = useData()
const nav = useNavigate()
const [form, setForm] = useState({ name:'', phone:'', apartment:'', rentAmount:'', startDate: new Date().toISOString().slice(0,10), nidNumber:'', nidPhoto:'', members:[{name:'', relation:''}] })


function setField(k,v){ setForm(f=>({ ...f, [k]: v })) }
function setMember(i,k,v){ setForm(f=>({ ...f, members: f.members.map((m,idx)=> idx===i? { ...m, [k]:v } : m) })) }
function addMember(){ setForm(f=>({ ...f, members:[...f.members, {name:'', relation:''}] })) }
function remMember(i){ setForm(f=>({ ...f, members: f.members.filter((_,idx)=> idx!==i) })) }
async function onFile(e){ const file = e.target.files?.[0]; if(!file) return; const dataUrl = await fileToDataURL(file); setField('nidPhoto', dataUrl) }

function submit(e){
e.preventDefault()
addTenant({ ...form, rentAmount: Number(form.rentAmount||0), members: form.members.filter(m=>m.name||m.relation) })
nav('/tenants')
}


return (
<section className="max-w-2xl">
<h2 className="text-2xl font-semibold mb-4">Add Tenant</h2>
<form onSubmit={submit} className="grid gap-4">
<div className="grid md:grid-cols-2 gap-3">
<Input label="Full Name" value={form.name} onChange={v=>setField('name',v)} required/>
<Input label="Phone" value={form.phone} onChange={v=>setField('phone',v)} />
<Select label="Apartment (4-floor)" value={form.apartment} onChange={v=>setField('apartment',v)} required options={["1st Floor - A","1st Floor - B","2nd Floor - A","2nd Floor - B","3rd Floor - A","3rd Floor - B","4th Floor - A","4th Floor - B"]}/>
<Input label="Monthly Rent (BDT)" type="number" value={form.rentAmount} onChange={v=>setField('rentAmount',v)} required/>
<Input label="Start Month" type="month" value={form.startDate.slice(0,7)} onChange={v=>setField('startDate', v+"-01")} required/>
<Input label="NID Number" value={form.nidNumber} onChange={v=>setField('nidNumber',v)} />
</div>
<div className="grid gap-2">
<label className="text-sm text-white/80">NID / Photo</label>
<div className="flex items-center gap-3">
<input type="file" accept="image/*" onChange={onFile} className="text-sm"/>
{form.nidPhoto && <Avatar src={form.nidPhoto} alt="NID"/>}
</div>
<p className="text-xs text-white/60">Stores locally in your browser as a data URL.</p>
</div>
<div className="rounded-2xl p-4 bg-white/5 border border-white/10">
<div className="font-semibold mb-2">Family Members</div>
<div className="grid gap-2">
{form.members.map((m, i)=> (
<div key={i} className="grid md:grid-cols-2 gap-2 items-center">
<Input label={`Member ${i+1} Name`} value={m.name} onChange={v=>setMember(i,'name',v)}/>
<Input label={`Relation`} value={m.relation} onChange={v=>setMember(i,'relation',v)}/>
<div className="md:col-span-2">
<button type="button" onClick={()=>remMember(i)} className="text-xs text-red-300 hover:text-red-200">Remove</button>
</div>
</div>
))}
<button type="button" onClick={addMember} className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 w-max">+ Add Member</button>
</div>
</div>
<div className="flex gap-2">
<button className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700" type="submit">Save Tenant</button>
<NavLink to="/tenants" className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20">Cancel</NavLink>
</div>
</form>
</section>
)
}

async function fileToDataURL(file){
return new Promise((res, rej) => { const fr = new FileReader(); fr.onload = ()=>res(fr.result); fr.onerror = rej; fr.readAsDataURL(file) })
}