import React from "react";

export default function Spinner({size}) {
  return (
    <div className={`spinner-border spinner-border-${size}`} role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );
}
