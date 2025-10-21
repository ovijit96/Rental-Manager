import React, { useState } from 'react'

/**
 * Edit monthly rent with an "effective from (month)" field.
 * onSave gets { amount, effectiveFrom }
 */
export default function InlineRentEditor({ rent, onSave }) {
  const [amount, setAmount] = useState(rent || '')
  const [effectiveFrom, setEffectiveFrom] = useState('')

  function submit(e) {
    e.preventDefault()
    const a = Number(amount || 0)
    if (!a || !effectiveFrom) {
      alert('Please enter amount and effective month.')
      return
    }
    onSave?.({ amount: a, effectiveFrom })  // e.g. "2025-02"
    setEffectiveFrom('')
    // keep amount filled (often more edits happen in same session)
    alert('✅ Rent change saved (with effective month).')
  }

  return (
    <form onSubmit={submit} className="inline-form" style={{ display:'flex', gap:8, alignItems:'center', flexWrap:'wrap' }}>
      <input
        type="number"
        placeholder="New rent (BDT)"
        value={amount}
        onChange={e=>setAmount(e.target.value)}
        style={{ width:130 }}
      />
      <input
        type="month"
        title="Effective from month"
        value={effectiveFrom}
        onChange={e=>setEffectiveFrom(e.target.value)}
      />
      <button className="btn" type="submit">Save</button>
    </form>
  )
}
