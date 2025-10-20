import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useData } from '../context/DataContext.jsx'
import FamilyEditor from '../components/FamilyEditor.jsx'

export default function AddTenant() {
  const { addTenant } = useData()
  const nav = useNavigate()
  const [form, setForm] = useState({
    name: '', phone: '', address: '', apartment: '', rentAmount: '',
    startDate: new Date().toISOString().slice(0, 10),
    nidNumber: '', nidPhoto: '',
    members: [{ name: '', relation: '', age: '', nidNumber: '', photo: '' }]
  })

  function setField(k, v) { setForm(f => ({ ...f, [k]: v })) }

  async function onNID(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const data = await fileToDataURL(file)
    setField('nidPhoto', data)
  }

  function submit(e) {
    e.preventDefault()
    addTenant({
      ...form,
      apartment: (form.apartment || '').trim().toUpperCase(), // e.g. 1E, 2B
      rentAmount: Number(form.rentAmount || 0),
      members: (form.members || []).filter(
        m => m.name || m.relation || m.photo || m.nidNumber
      )
    })
    nav('/tenants')
  }

  const flatSuggestions = [
    '1A', '1B', '1C', '1D', '1E', '1F',
    '2A', '2B', '2C', '2D', '2E', '2F',
    '3A', '3B', '3C', '3D', '3E', '3F',
    '4A', '4B', '4C', '4D', '4E', '4F'
  ]

  return (
    <div className="form-card card">
      <h2 className="section-title">নতুন ভাড়াটিয়া</h2>
      <form className="form" onSubmit={submit}>
        <div className="form-grid">
          <div className="field">
            <label>নাম</label>
            <input required value={form.name}
              onChange={e => setField('name', e.target.value)} />
          </div>

          <div className="field">
            <label>ফোন</label>
            <input value={form.phone}
              onChange={e => setField('phone', e.target.value)} />
          </div>

          <div className="field">
            <label>ঠিকানা</label>
            <input value={form.address}
              onChange={e => setField('address', e.target.value)} />
          </div>

          {/* ✅ Apartment field — free text with suggestion list */}
          <div className="field">
            <label>এপার্টমেন্ট / ফ্ল্যাট কোড</label>
            <input
              required
              list="flatCodes"
              placeholder="e.g. 1E, 1D, 3C"
              value={form.apartment}
              onChange={e => setField('apartment', e.target.value.toUpperCase())}
            />
            <datalist id="flatCodes">
              {flatSuggestions.map(code => <option key={code} value={code} />)}
            </datalist>
            <small className="muted">
              ইচ্ছামত ফ্ল্যাট কোড লিখুন (উদাহরণ: 1E, 2A, 3C)।
            </small>
          </div>

          <div className="field">
            <label>মাসিক ভাড়া (BDT)</label>
            <input type="number" required value={form.rentAmount}
              onChange={e => setField('rentAmount', e.target.value)} />
          </div>

          <div className="field">
            <label>চুক্তির মাস</label>
            <input type="month" required
              value={form.startDate.slice(0, 7)}
              onChange={e => setField('startDate', e.target.value + '-01')} />
          </div>

          <div className="field">
            <label>NID নম্বর</label>
            <input value={form.nidNumber}
              onChange={e => setField('nidNumber', e.target.value)} />
          </div>
        </div>

        <div className="field">
          <label>NID / Photo</label>
          <div className="row" style={{ justifyContent: 'flex-start', gap: 12 }}>
            {form.nidPhoto && (
              <img src={form.nidPhoto} alt="NID" className="avatar" />
            )}
            <input type="file" accept="image/*" onChange={onNID} />
          </div>
          <small className="muted">Stored locally (data URL).</small>
        </div>

        <div className="card">
          <h3 className="section-title" style={{ fontSize: 16 }}>
            পরিবারের সদস্য
          </h3>
          <FamilyEditor
            members={form.members}
            onChange={m => setForm(f => ({ ...f, members: m }))}
          />
        </div>

        <div className="form-actions">
          <button className="btn" type="submit">Save</button>
        </div>
      </form>
    </div>
  )
}

function fileToDataURL(file) {
  return new Promise((res, rej) => {
    const fr = new FileReader()
    fr.onload = () => res(fr.result)
    fr.onerror = rej
    fr.readAsDataURL(file)
  })
}
