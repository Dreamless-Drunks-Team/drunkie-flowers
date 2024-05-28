import './ContactInfoItem.scss'

function ContactInfoItem({ iconSrc, title, description }) {
    return (
        <div className="contact-info-item">
            <img loading="lazy" src={iconSrc} className="contact-icon" alt="" />
            <div className="contact-info">
                <div className="contact-title">{title}</div>
                <div className="contact-description">{description}</div>
            </div>
        </div>
    );
}

export default ContactInfoItem