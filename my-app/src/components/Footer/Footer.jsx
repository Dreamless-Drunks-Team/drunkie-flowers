import * as React from "react";

import './Footer.scss';

const listOfSocialMedia = [
  '../../assert/img/twitter.png',
  '../../assert/img/facebook.png',
  '../../assert/img/instagram.png',
  '../../assert/img/whatsapp.png',
  '../../assert/img/linkedin.png',
]

function Footer() {
  return (
    <footer className="footer">
      <div className="firstTitle">
        {["Company", "Our Team", "Prices", "Terms"].map((title) => <p>{title}</p>)}
      </div>
      <div className="socialMedia">
        <img src="../../assert/img/linkedin.png" alt="HJRERRe"/>
        {listOfSocialMedia.map((socialMedia) => <img src={socialMedia} alt="SVG FOR SOCIAL MEDIA"/>)}
      </div>
    </footer>
  );
}


export default Footer;