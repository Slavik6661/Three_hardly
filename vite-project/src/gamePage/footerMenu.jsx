// src/components/FooterMenu.jsx
import React from "react";

const FooterMenu = ({ show }) => {
  return (
    <div className="footer-menu" data-show={show}>
      <div>
        <div className="home-button">
          <svg viewBox="0 0 20 20">
            <g>
              <circle
                cx="10"
                cy="10"
                r="9"
                stroke="currentColor"
                fill="none"
                strokeWidth="1"
              />
              <circle cx="10" cy="10" r="3" fill="currentColor" />
            </g>
          </svg>
        </div>
      </div>
      <div>
        <div className="close-button">
          <svg viewBox="0 0 20 20">
            <g>
              <path
                stroke="currentColor"
                fill="none"
                strokeWidth="1"
                d="M0 0 l20 20 M0 20 l20 -20"
              />
            </g>
          </svg>
        </div>
        <div className="new-button">
          <svg viewBox="0 0 20 20">
            <g>
              <path
                stroke="currentColor"
                fill="none"
                strokeWidth="1"
                d="M0 10 l20 0 M10 0 l0 20"
              />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default FooterMenu;
