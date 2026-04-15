import React from "react";
import "./Footer.css";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer>
      <div className="back-to-top" onClick={scrollToTop}>
        Back to top
      </div>

      <div className="footer-content">
        <p>© 2026 Amazon Clone</p>
      </div>
    </footer>
  );
};

export default Footer;