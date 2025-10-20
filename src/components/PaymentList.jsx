import React from 'react'
import { fmtDate, fmtMoney } from '../utils/format.js'


export default function PaymentList({ payments, onDelete }){
const list = [...(payments||[])].sort((a,b)=> new Date(b.date)-new Date(a.date))
return (
<div className="grid gap-2 max-h-72 overflow-auto pr-1">
{list.map(p => (
<div key={p.id} className="flex items-center justify-between rounded-xl px-3 py-2 bg-white/5 border border-white/10">
<div className="text-sm">{fmtDate(p.date)}</div>
<div className="font-semibold">{fmtMoney(p.amount)}</div>
<button onClick={()=>onDelete?.(p.id)} className="text-xs text-red-300 hover:text-red-200">Delete</button>
</div>
))}
{(!list || list.length===0) && <div className="text-sm text-white/60">No payments yet.</div>}
</div>
)
}