export function fmtMoney(n){ return new Intl.NumberFormat(undefined, { style:'currency', currency:'BDT', maximumFractionDigits:0 }).format(Number(n||0)) }
export function fmtDate(d){ return new Date(d).toLocaleDateString() }
export function ym(date){ const x = new Date(date); return `${x.getFullYear()}-${String(x.getMonth()+1).padStart(2,'0')}` }
export function monthLabel(ymStr){ const [y,m] = ymStr.split('-').map(Number); return new Date(y, m-1, 1).toLocaleString(undefined,{ month:'short', year:'numeric' }) }
export function addMonths(d, n){ const x = new Date(d); return new Date(x.getFullYear(), x.getMonth()+n, 1) }

