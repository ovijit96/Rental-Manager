import React from 'react'
import { useData } from '../context/DataContext.jsx'
import { computeLedger } from '../utils/Ledger.js'
import Stat from '../components/Stat.jsx'
import { fmtMoney } from '../utils/format.js'


export default function Dashboard(){
const { state } = useData()
const totals = state.tenants.reduce((acc,t)=>{
const led = computeLedger(t).totals
acc.expected += led.expected; acc.paid += led.paid; acc.balance += led.balance; return acc
}, { expected:0, paid:0, balance:0 })
return (
<section className="grid gap-5">
<h2 className="text-2xl font-bold">Overview</h2>
<div className="grid md:grid-cols-3 gap-4">
<Stat label="Tenants" value={state.tenants.length}/>
<Stat label="Total Expected" value={fmtMoney(totals.expected)}/>
<Stat label={totals.balance>0? 'Total Due':'Total Advance'} value={fmtMoney(Math.abs(totals.balance))}/>
</div>
</section>
)
}