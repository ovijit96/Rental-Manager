import React, { createContext, useContext, useMemo, useEffect, useState } from 'react'


const DataContext = createContext(null)
export function useData(){ return useContext(DataContext) }
const LS_KEY = 'rental_manager_v1'


export function DataProvider({ children }){
const [state, setState] = useState(()=>{
const saved = localStorage.getItem(LS_KEY)
return saved ? JSON.parse(saved) : { tenants: [] }
})
useEffect(()=>{ localStorage.setItem(LS_KEY, JSON.stringify(state)) }, [state])


function addTenant(t){
setState(s => ({ ...s, tenants: [...s.tenants, { ...t, id: crypto.randomUUID(), payments: [] }] }))
}
function updateTenant(id, partial){
setState(s => ({ ...s, tenants: s.tenants.map(x => x.id===id? { ...x, ...partial } : x) }))
}
function addPayment(id, p){
setState(s => ({ ...s, tenants: s.tenants.map(x => x.id===id? { ...x, payments:[...x.payments, { ...p, id: crypto.randomUUID() }] } : x) }))
}
function deletePayment(id, payId){
setState(s => ({ ...s, tenants: s.tenants.map(x => x.id===id? { ...x, payments:x.payments.filter(p=>p.id!==payId) } : x) }))
}


const value = useMemo(()=>({ state, addTenant, updateTenant, addPayment, deletePayment }), [state])
return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}