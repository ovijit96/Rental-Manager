import React, { useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import { useData } from "../context/DataContext.jsx";
import { computeLedger } from "../utils/Ledger.js";

export default function Sidebar(){
  const { state } = useData();
  const [q, setQ] = useState("");
  const filtered = useMemo(()=>{
    return state.tenants
      .map(t => ({ t, led: computeLedger(t) }))
      .filter(x => x.t.name.toLowerCase().includes(q.toLowerCase()));
  }, [state.tenants, q]);

  return (
    <aside className="sidebar">
      <h3>ভাড়া ম্যানেজার</h3>
      <NavLink to="/tenants/new" className="add-btn">+ নতুন ভাড়াটিয়া</NavLink>
      <input className="search" placeholder="ভাড়াটিয়া খুঁজুন" value={q} onChange={e=>setQ(e.target.value)} />
      <div className="tenant-list">
        {filtered.map(({t, led})=>{
          const due = led.totals.balance>0;
          const pill = due ? "pill due" : "pill active";
          return (
            <NavLink key={t.id} to={`/tenants/${t.id}`} className="t-item">
              <div>
                <div className="name">{t.name}</div>
                <div style={{fontSize:12,opacity:.8}}>{t.apartment}</div>
              </div>
              <span className={pill}>{due ? "Due" : "Active"}</span>
            </NavLink>
          );
        })}
      </div>
    </aside>
  );
}
