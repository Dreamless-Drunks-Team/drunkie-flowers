import * as React from "react";
import ContactInfoItem from '../../components/ContactInfoItem/ContactInfoItem'
import callLogo from '../../assert/img/call.png'
import clockLogo from '../../assert/img/clock.png'
import locationLogo from '../../assert/img/location.png'
import mailLogo from '../../assert/img/mail.png'
import logo from '../../assert/img/flower-logo.png';
import './Footer.scss';

function SocialMediaSection() {
  const images = require.context('../../assert/socialMedia/', true);
  const socialMediaImages = images.keys().map(image => images(image));

  return (
    <div className="social-media-section">
      {socialMediaImages.map((src, index) => (
        <img loading="lazy" key={index} src={src} className="social-media-icon"/>))}
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-up">
        <div className="firstTitle">
          {["Company", "Our Team", "Prices", "Terms"].map((title) => <p>{title}</p>)}
        </div>
        <SocialMediaSection />
      </div>
      <main className="main-content">
        <section className="contact-details">
          <h2 className="section-title">Contact Us</h2>
          <div className="contact-items">
            <ContactInfoItem
              iconSrc={callLogo}
              title="Phone Number"
              description="+123 456 7890"
            />
            <ContactInfoItem
              iconSrc={clockLogo}
              title="Email Address"
              description="Flower-Logo@email.com"
            />
            <ContactInfoItem
              iconSrc={locationLogo}
              title="Main Office"
              description="Main Street #2442"
            />
            <ContactInfoItem
              iconSrc={mailLogo}
              title="Office Hours"
              description="8:00 am - 16:00 pm"
            />
          </div>
        </section>
        <aside className="company-info">
          <figure>
            <img src={logo} className="logo" alt="Flower Logo" />
            <figcaption className="logo-text">
              <span>FLOWER</span>
              <span>LOGO</span>
            </figcaption>
          </figure>
          <p className="company-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate
          </p>
          <p className="company-statement">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
            ab illo inventore veritatis et quasi architecto beatae vitae dicta
            sunt explicabo.
          </p>
        </aside>
      </main>
      <div className="footer-lower">
          <div className="footer-divider"></div>
          <p className="footer-text">
            All rights reserved. Copyright © 2023 by Flower Logo
          </p>
        </div>
    </footer>
  );
}

export default Footer;
