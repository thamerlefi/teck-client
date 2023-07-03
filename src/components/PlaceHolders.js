import React from "react";

export default function PlaceHolders() {
  return (
    <div className="ps-3 mt-3">
      <h5 className="card-title placeholder-glow">
        <span className="placeholder col-6"></span>
      </h5>
      <p className="card-text placeholder-glow row gap-1 mt-3 ">
        <span className="placeholder col-6 mt-3"></span>
        <span className="placeholder col-4 mt-3"></span>
        <span className="placeholder col-4 mt-3"></span>
        <span className="placeholder col-6 mt-3"></span>
        <span className="placeholder col-7 mt-3"></span>
        <span className="placeholder col-3 mt-3"></span>
        <span className="placeholder col-5 mt-3"></span>
        <span className="placeholder col-5 mt-3"></span>
        <span className="placeholder col-4 mt-3"></span>
        <span className="placeholder col-8 mt-3" style={{height:80}}></span>
      </p>
    </div>
  );
}
