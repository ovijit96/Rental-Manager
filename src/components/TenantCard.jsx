import React from 'react'
import { NavLink } from 'react-router-dom'
import Avatar from './Avatar.jsx'
import { computeLedger } from '../utils/Ledger.js'
import { fmtMoney } from '../utils/format.js'


export default function TenantCard({ t }){
const led = computeLedger(t)
const summary = led.totals.balance>0? `Due ${fmtMoney(led.totals.balance)}` : led.totals.balance<0? `Advance ${fmtMoney(-led.totals.balance)}` : 'Up to date'
return (
<NavLink to={`/tenants/${t.id}`} className="block">
<div className="rounded-2xl p-5 bg-white/5 border border-white/10 hover:bg-white/10 transition">
<div className="flex items-center gap-3">
<Avatar src={t.nidPhoto} alt={t.name}/>
<div>
<div className="font-semibold">{t.name}</div>
<div className="text-xs text-white/60">{t.apartment} • Rent {fmtMoney(t.rentAmount)}</div>
</div>
</div>
<div className="mt-3 text-sm text-white/70">{summary}</div>
</div>
</NavLink>
)
}