// src/components/Header.jsx
import React, { useEffect } from "react";

const Header = ({ score, onUndo, disabled }) => {
  return (
    <div className="header">
      <div className="score-board">Score: {score}</div>
      <div
        id="undo-button"
        className={`undo-button ${disabled ? "disabled" : ""}`}
        onClick={onUndo}
      >
        {/* SVG Undo */}
        <svg viewBox="0 0 20 20">
          <g>
            <circle
              cx="10"
              cy="10"
              r="7"
              stroke="currentColor"
              fill="none"
              strokeWidth="1"
              strokeDasharray="44"
              strokeDashoffset="11"
              transform="rotate(-90 10 10)"
            />
            <path
              stroke="currentColor"
              fill="none"
              strokeWidth="1"
              d="M12 0 l-3 3 l3 3"
            />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default Header;
