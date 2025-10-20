import { ym, monthLabel, addMonths } from './format.js'


export function computeLedger(tenant){
if(!tenant) return { months: [], totals:{ expected:0, paid:0, balance:0 } }
const start = new Date(tenant.startDate || new Date())
const now = new Date()
const startYm = new Date(start.getFullYear(), start.getMonth(), 1)
const endYm = new Date(now.getFullYear(), now.getMonth(), 1)


const months = []
let cursor = new Date(startYm)
let balance = 0 // +due / -advance
let totalExpected = 0
let totalPaid = 0
const payments = [...(tenant.payments||[])].sort((a,b)=> new Date(a.date)-new Date(b.date))


while(cursor <= endYm){
const key = ym(cursor)
const monthly = Number(tenant.rentAmount || 0)
balance += monthly
totalExpected += monthly


const monthPays = payments.filter(p => ym(p.date)===key)
const paidThisMonth = monthPays.reduce((s,p)=> s + Number(p.amount||0), 0)
balance -= paidThisMonth
totalPaid += paidThisMonth


months.push({ ym:key, label:monthLabel(key), expected:monthly, paid:paidThisMonth, endBalance:balance, status: balance>0? `Due` : balance<0? `Advance` : `Complete` })
cursor = addMonths(cursor, 1)
}


return { months, totals:{ expected: totalExpected, paid: totalPaid, balance } }
}