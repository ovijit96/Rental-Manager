import React from 'react'
import { NavLink } from 'react-router-dom'
import { useData } from '../context/DataContext.jsx'
import TenantCard from '../components/TenantCard.jsx'


export default function Tenants(){
const { state } = useData()
return (
<section className="grid gap-4">
<div className="flex items-center justify-between">
<h2 className="text-2xl font-semibold">Tenants</h2>
<NavLink to="/tenants/new" className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700">+ Add Tenant</NavLink>
</div>
<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
{state.tenants.map(t => <TenantCard key={t.id} t={t}/>) }
{state.tenants.length===0 && (
<div className="rounded-2xl p-6 bg-white/5 border border-white/10">
<p className="text-white/70">No tenants yet. Click <b>Add Tenant</b> to create one.</p>
</div>
)}
</div>
</section>
)
}