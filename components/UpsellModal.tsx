"use client";
export function UpsellModal({ open, onClose }: { open: boolean; onClose: () => void }){
  if (!open) return null;
  return (
    <div className="modal" role="dialog" aria-modal="true">
      <div className="modal-card">
        <h3>Out of free plays</h3>
        <p className="note">Get 20 credits per month for $12.99. Downloads included.</p>
        <div className="player-actions">
          <a className="btn btn-primary" data-checkout="subscription" href="#">Start now</a>
          <button className="btn" onClick={onClose}>Not now</button>
        </div>
      </div>
    </div>
  );
}

