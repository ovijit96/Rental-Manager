import React from 'react'
export default function About(){
return (
<section className="prose prose-invert">
<h2>About Rental Manager</h2>
<p>Manage tenants in a 4-floor house: add tenants with NID/photo, track monthly rent, accept partial payments, auto-carryover due/advance, and view per-tenant ledgers.</p>
<ul>
<li>Browser LocalStorage for quick testing.</li>
<li>Can upgrade to real backend later (Supabase/Firebase/Express) and file storage.</li>
</ul>
</section>
)
}