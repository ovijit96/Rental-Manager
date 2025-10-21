import { ym, monthLabel, addMonths } from './format.js'

/**
 * Uses tenant.rentHistory if present.
 * rentHistory = [{ amount: number, effectiveFrom: 'YYYY-MM' }, ...]
 * Fallback: single current rent from startDate.
 */
export function computeLedger(tenant){
  if(!tenant) return { months: [], totals:{ expected:0, paid:0, balance:0 }, currentMonthly: 0 }

  const start = new Date(tenant.startDate || new Date())
  const now = new Date()
  const startYm = new Date(start.getFullYear(), start.getMonth(), 1)
  const endYm = new Date(now.getFullYear(), now.getMonth(), 1)

  // 🔎 build a sorted rent schedule
  let schedule = tenant.rentHistory && tenant.rentHistory.length
    ? tenant.rentHistory.map(h => ({ ym: h.effectiveFrom.length===7 ? h.effectiveFrom : ym(h.effectiveFrom), amount: Number(h.amount||0) }))
    : [{ ym: ym(start), amount: Number(tenant.rentAmount || 0) }]

  // sort by month asc; if duplicate months exist keep last occurrence
  const map = new Map()
  schedule.sort((a,b)=> (a.ym > b.ym ? 1 : -1)).forEach(s => map.set(s.ym, s))
  schedule = Array.from(map.values())

  const months = []
  let cursor = new Date(startYm)
  let balance = 0 // +due / -advance
  let totalExpected = 0
  let totalPaid = 0
  const payments = [...(tenant.payments||[])].sort((a,b)=> new Date(a.date)-new Date(b.date))

  // helper: rent for a given ym key
  function rentFor(key){
    // find the last schedule whose ym <= key
    let amount = schedule[0]?.amount || 0
    for(const s of schedule){
      if(s.ym <= key) amount = s.amount
      else break
    }
    return Number(amount||0)
  }

  while(cursor <= endYm){
    const key = ym(cursor)
    const monthly = rentFor(key)
    balance += monthly
    totalExpected += monthly

    const monthPays = payments.filter(p => ym(p.date)===key)
    const paidThisMonth = monthPays.reduce((s,p)=> s + Number(p.amount||0), 0)
    balance -= paidThisMonth
    totalPaid += paidThisMonth

    months.push({
      ym:key,
      label:monthLabel(key),
      expected:monthly,
      paid:paidThisMonth,
      endBalance:balance,
      status: balance>0? `Due` : balance<0? `Advance` : `Complete`
    })
    cursor = addMonths(cursor, 1)
  }

  const currentMonthly = rentFor(ym(now))
  return { months, totals:{ expected: totalExpected, paid: totalPaid, balance }, currentMonthly }
}
