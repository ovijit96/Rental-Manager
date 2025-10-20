import React from 'react'
import { NavLink } from 'react-router-dom'
export default function TopNav({ to, children }){
return (
<NavLink to={to} end className={({isActive})=>`px-3 py-1.5 rounded-xl transition ${isActive? 'bg-white/20':'hover:bg-white/10'}`}>{children}</NavLink>
)
}