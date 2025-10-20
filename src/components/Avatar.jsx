import React from 'react'
export default function Avatar({ src, alt, size=12 }){
const cls = `h-${size} w-${size} rounded-xl object-cover border border-white/10 bg-white/5`
return src ? <img src={src} alt={alt} className={cls}/> : <div className={`flex items-center justify-center ${cls}`}>{alt?.[0]||'?'}</div>
}