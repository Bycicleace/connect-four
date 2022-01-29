import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
        <a href="https://github.com/Bycicleace/connect-four"><img src="https://img.icons8.com/color/48/000000/github--v1.png" alt="Github"/></a>
        <p>
            &copy; Dungeon Bohemia    
        </p>
    </footer>
  );
}

export default Footer;