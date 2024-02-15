import './Footer.css';
import FooterLogo from './FooterLogo';
import FooterContacts from './FooterContacts';

function Footer() {
    return (
        <footer className='footer'>
            <div className='footer-container'>
                <FooterLogo />
                <FooterContacts />
            </div>
        </footer>
    );
}

export default Footer;