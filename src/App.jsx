import React from 'react'
import { BrowserRouter, Routes, Route, NavLink, Outlet } from 'react-router-dom'
import { DataProvider } from './context/DataContext.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Tenants from './pages/Tenants.jsx'
import AddTenant from './pages/AddTenant.jsx'
import TenantDetail from './pages/TenantDetail.jsx'
import About from './pages/About.jsx'
import NotFound from './pages/NotFound.jsx'
import TopNav from './components/TopNav.jsx'


function AppShell(){
return (
<div className="min-h-screen bg-slate-900 text-slate-100">
<header className="sticky top-0 z-10 bg-slate-900/80 border-b border-white/10 backdrop-blur">
<div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
<div className="flex items-center gap-3">
<span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-emerald-500/20">🏠</span>
<h1 className="text-lg font-semibold">Rental Manager</h1>
</div>
<nav className="flex items-center gap-2 text-sm">
<TopNav to="/">Dashboard</TopNav>
<TopNav to="/tenants">Tenants</TopNav>
<TopNav to="/tenants/new">Add Tenant</TopNav>
<TopNav to="/about">About</TopNav>
</nav>
</div>
</header>
<main className="max-w-6xl mx-auto px-4 py-8">
<Outlet/>
</main>
<footer className="max-w-6xl mx-auto px-4 py-10 text-xs text-white/50">
4-floor house rental management • Local demo (saves to browser)
</footer>
</div>
)
}


export default function App(){
return (
<DataProvider>
<BrowserRouter>
<Routes>
<Route element={<AppShell/>}>
<Route index element={<Dashboard/>} />
<Route path="tenants" element={<Tenants/>} />
<Route path="tenants/new" element={<AddTenant/>} />
<Route path="tenants/:id" element={<TenantDetail/>} />
<Route path="about" element={<About/>} />
<Route path="*" element={<NotFound/>} />
</Route>
</Routes>
</BrowserRouter>
</DataProvider>
)
}