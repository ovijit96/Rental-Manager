import React from "react";

/**
 * Simple read-only family list
 * Shows small photo, name, relation, and optional NID number.
 * Used inside TenantDetail.jsx
 */

export default function FamilyList({ members = [] }) {
  if (!members || members.length === 0)
    return <div className="muted">No family members recorded.</div>;

  return (
    <div className="member-grid">
      {members.map((m, i) => (
        <div key={i} className="member-card">
          <div className="member-head">
            <div className="member-photo-wrap">
              {m.photo ? (
                <img
                  src={m.photo}
                  alt={m.name || "Member"}
                  className="member-photo"
                />
              ) : (
                <div className="member-photo placeholder">Photo</div>
              )}
            </div>
          </div>

          <div className="field">
            <label>Name</label>
            <div className="text">{m.name || "—"}</div>
          </div>

          <div className="field">
            <label>Relation</label>
            <div className="text">{m.relation || "—"}</div>
          </div>

          {m.age && (
            <div className="field">
              <label>Age</label>
              <div className="text">{m.age}</div>
            </div>
          )}

          {m.nidNumber && (
            <div className="field">
              <label>NID</label>
              <div className="text">{m.nidNumber}</div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
