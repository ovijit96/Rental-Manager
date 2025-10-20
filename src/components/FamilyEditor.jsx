import React from "react";

export default function FamilyEditor({ members = [], onChange, editable = true }){
  function setMember(i, k, v){
    const next = members.map((m,idx)=> idx===i ? {...m, [k]: v} : m);
    onChange?.(next);
  }
  async function onPhoto(i, file){
    if(!file) return;
    const dataUrl = await fileToDataURL(file);
    setMember(i, "photo", dataUrl);
  }
  function add(){ onChange?.([...(members||[]), { name:"", relation:"", age:"", nidNumber:"", photo:"" }]); }
  function remove(i){ onChange?.(members.filter((_,idx)=> idx!==i)); }

  return (
    <div className="member-grid">
      {(members||[]).map((m,i)=>(
        <div key={i} className="member-card">
          <div className="member-head">
            <div className="member-photo-wrap">
              {m.photo ? <img src={m.photo} alt={m.name||"Member"} className="member-photo"/> :
                <div className="member-photo placeholder">Photo</div>}
            </div>
            {editable &&
              <label className="btn mini">
                Upload
                <input hidden type="file" accept="image/*" onChange={e=>onPhoto(i, e.target.files?.[0])}/>
              </label>}
          </div>
          <div className="field"><label>নাম</label><input value={m.name} onChange={e=>setMember(i,"name",e.target.value)} disabled={!editable}/></div>
          <div className="field"><label>সম্পর্ক</label><input value={m.relation} onChange={e=>setMember(i,"relation",e.target.value)} disabled={!editable}/></div>
          <div className="field"><label>বয়স</label><input value={m.age||""} onChange={e=>setMember(i,"age",e.target.value)} disabled={!editable}/></div>
          <div className="field"><label>NID (optional)</label><input value={m.nidNumber||""} onChange={e=>setMember(i,"nidNumber",e.target.value)} disabled={!editable}/></div>
          {editable && <button type="button" className="btn danger mini" onClick={()=>remove(i)}>Remove</button>}
        </div>
      ))}
      {editable && <button type="button" className="member-card add" onClick={add}>+ সদস্য যোগ</button>}
    </div>
  );
}

function fileToDataURL(file){
  return new Promise((res, rej)=>{
    const fr = new FileReader();
    fr.onload = ()=>res(fr.result); fr.onerror = rej; fr.readAsDataURL(file);
  });
}
