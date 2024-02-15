import './FooterContacts.css';

function FooterContacts() {
    return (
        <address className='footer-contacts'>
            г. Москва, Цветной б-р, 40<br />
            <a className='footer-contacts-tel' href='tel:+74957712111'>+7 495 771 21 11</a><br />
            <a className='footer-contacts-email' href='mailto:info@skan.ru'>info@skan.ru</a><br /><br />
            Copyright. 2022
        </address>
    );
}

export default FooterContacts;