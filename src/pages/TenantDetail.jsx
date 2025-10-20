import React from 'react'
import { useParams } from 'react-router-dom'
import { useData } from '../context/DataContext.jsx'
import Avatar from '../components/Avatar.jsx'
import Stat from '../components/Stat.jsx'
import InlineRentEditor from '../components/InlineRentEditor.jsx'
import PaymentList from '../components/PaymentList.jsx'
import LedgerList from '../components/LedgerList.jsx'
import FamilyList from '../components/FamilyList.jsx'
import { computeLedger } from '../utils/Ledger.js'
import { fmtMoney, monthLabel, ym } from '../utils/format.js'


export default function TenantDetail(){
const { id } = useParams()
const { state, addPayment, deletePayment, updateTenant } = useData()
const t = state.tenants.find(x => x.id===id)
if(!t) return <div className="p-6">Not found</div>
const led = computeLedger(t)

function onPay(e){
addPayment(t.id, { amount, date })
e.currentTarget.reset()
}


return (
<section className="grid gap-5">
<div className="flex items-center gap-4">
<Avatar src={t.nidPhoto} alt={t.name} size={14}/>
<div>
<h2 className="text-2xl font-semibold">{t.name}</h2>
<div className="text-white/70 text-sm">{t.apartment} • Rent {fmtMoney(t.rentAmount)} • Start {monthLabel(ym(t.startDate))}</div>
<div className="text-xs text-white/50">NID: {t.nidNumber || '—'} • Phone: {t.phone || '—'}</div>
</div>
</div>


<div className="grid md:grid-cols-4 gap-4">
<Stat label="Expected till now" value={fmtMoney(led.totals.expected)}/>
<Stat label="Paid" value={fmtMoney(led.totals.paid)}/>
<Stat label={led.totals.balance>0? 'Due':'Advance'} value={fmtMoney(Math.abs(led.totals.balance))}/>
<div className="rounded-2xl p-5 bg-white/5 border border-white/10">
<div className="text-sm text-white/60 mb-2">Change Monthly Rent</div>
<InlineRentEditor rent={t.rentAmount} onSave={(r)=>updateTenant(t.id, { rentAmount:r })}/>
</div>
</div>


<div className="grid lg:grid-cols-2 gap-5">
<div className="rounded-2xl p-5 bg-white/5 border border-white/10">
<div className="flex items-center justify-between mb-3">
<div className="font-semibold">Payments</div>
</div>
<form onSubmit={onPay} className="grid md:grid-cols-3 gap-2 mb-3">
<input name="amount" type="number" step="1" placeholder="Amount (BDT)" className="px-3 py-2 rounded-xl bg-white/10 border border-white/15 outline-none"/>
<input name="date" type="date" className="px-3 py-2 rounded-xl bg-white/10 border border-white/15 outline-none"/>
<button className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700">Add Payment</button>
</form>
<PaymentList payments={t.payments} onDelete={(payId)=>deletePayment(t.id, payId)}/>
</div>


<div className="rounded-2xl p-5 bg-white/5 border border-white/10">
<div className="font-semibold mb-3">Monthly Ledger (auto plus/minus)</div>
<LedgerList months={led.months}/>
</div>
</div>


<div className="rounded-2xl p-5 bg-white/5 border border-white/10">
<div className="font-semibold mb-2">Family Members</div>
<FamilyList members={t.members}/>
</div>
</section>
)
}