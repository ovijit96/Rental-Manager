import React from 'react';
import { BrowserRouter, Routes, Route, NavLink, Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Tenants from './pages/Tenants.jsx';
import AddTenant from './pages/AddTenant.jsx';
import TenantDetail from './pages/TenantDetail.jsx';
import About from './pages/About.jsx';
import NotFound from './pages/NotFound.jsx';
import { DataProvider } from './context/DataContext.jsx';

function AppShell(){
  return (
    <div>
      <header className="app-header">
        <div className="wrap">
          <div className="brand"><span className="logo">🏠</span><h1>ভাড়া ম্যানেজার</h1></div>
          <nav className="nav">
            <NavLink to="/">ড্যাশবোর্ড</NavLink>
            <NavLink to="/tenants">সকল ভাড়াটিয়া</NavLink>
            <NavLink to="/about">About</NavLink>
          </nav>
        </div>
      </header>

      <div className="layout">
        <Sidebar/>
        <main className="content">
          <Outlet/>
        </main>
      </div>
    </div>
  );
}

/* 👇 this part was missing */
export default function App() {
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
  );
}
