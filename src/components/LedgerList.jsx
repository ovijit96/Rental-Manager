import React from 'react'
import { fmtMoney } from '../utils/format.js'


export default function LedgerList({ months }){
return (
<div className="grid gap-2 max-h-72 overflow-auto pr-1">
{months.map(m => (
<div key={m.ym} className="flex items-center justify-between rounded-xl px-3 py-2 bg-white/5 border border-white/10">
<div className="text-sm w-28">{m.label}</div>
<div className="text-xs text-white/60 w-28">Expected: {fmtMoney(m.expected)}</div>
<div className="text-xs text-white/60 w-28">Paid: {fmtMoney(m.paid)}</div>
<div className={`text-sm font-medium ${m.endBalance>0? 'text-amber-300':'text-emerald-300'}`}>{m.status}{m.endBalance!==0? ` ${fmtMoney(Math.abs(m.endBalance))}`:''}</div>
</div>
))}
</div>
)
}
