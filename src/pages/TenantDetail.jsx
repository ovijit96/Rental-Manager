import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useData } from '../context/DataContext.jsx'
import Avatar from '../components/Avatar.jsx'
import Stat from '../components/Stat.jsx'
import InlineRentEditor from '../components/InlineRentEditor.jsx'
import PaymentList from '../components/PaymentList.jsx'
import LedgerList from '../components/LedgerList.jsx'
// 👉 use editor to add/remove/update members with photo + NID
import FamilyEditor from '../components/FamilyList.jsx'
// ⬇️ fix the path/case here
import { computeLedger } from '../utils/Ledger.js'
import { fmtMoney, monthLabel, ym } from '../utils/format.js'

export default function TenantDetail(){
  const { id } = useParams()
  const { state, addPayment, deletePayment, updateTenant } = useData()
  const t = state.tenants.find(x => x.id === id)
  if(!t) return <div className="card">Not found</div>

  const led = computeLedger(t)
  const [members, setMembers] = useState(t.members || [])

  function onPay(e){
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const amount = Number(form.get('amount'))
    const date = form.get('date')
    if(!amount || !date) return
    addPayment(t.id, { amount, date })
    e.currentTarget.reset()
  }

  function saveMembers(){
    updateTenant(t.id, { members })
  }

  return (
    <section className="grid gap-5">
      {/* Header */}
      <div className="card">
        <div className="flex items-center gap-4">
          <Avatar src={t.nidPhoto} alt={t.name} />
          <div>
            <h2 style={{margin:'0 0 6px'}}>{t.name}</h2>
            <div className="muted">{t.apartment} • Rent {fmtMoney(t.rentAmount)} • Start {monthLabel(ym(t.startDate))}</div>
            <div className="muted small">NID: {t.nidNumber || '—'} • Phone: {t.phone || '—'}</div>
          </div>
        </div>
      </div>

      {/* Stats + change rent */}
      <div className="stats-grid">
        <Stat label="Expected till now" value={fmtMoney(led.totals.expected)} />
        <Stat label="Paid" value={fmtMoney(led.totals.paid)} />
        <Stat label={led.totals.balance > 0 ? 'Due' : 'Advance'} value={fmtMoney(Math.abs(led.totals.balance))} />
        <div className="card">
          <div className="muted" style={{marginBottom:6}}>Change Monthly Rent</div>
          <InlineRentEditor rent={t.rentAmount} onSave={(r)=>updateTenant(t.id, { rentAmount: r })} />
        </div>
      </div>

      {/* Payments + Ledger */}
      <div className="two-col">
        <div className="card">
          <div className="toolbar small"><strong>Payments</strong></div>
          <form onSubmit={onPay} className="form-grid three">
            <input name="amount" type="number" step="1" placeholder="Amount (BDT)" />
            <input name="date" type="date" />
            <button className="btn" style={{alignSelf:'end'}}>Add Payment</button>
          </form>
          <PaymentList payments={t.payments} onDelete={(payId)=>deletePayment(t.id, payId)} />
        </div>

        <div className="card">
          <div className="toolbar small"><strong>Monthly Ledger (auto plus/minus)</strong></div>
          <LedgerList months={led.months} />
        </div>
      </div>

      {/* Family (editable mini-cards with photo) */}
      <div className="card">
        <div className="toolbar small">
          <strong>Family Members</strong>
          <button className="btn" onClick={saveMembers}>Save Changes</button>
        </div>
        <FamilyEditor members={members} onChange={setMembers} />
      </div>
    </section>
  )
}
