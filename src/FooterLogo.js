import './FooterLogo.css';
import { Link } from 'react-router-dom';
import logoWhite from './assets/logo-white.svg';

function FooterLogo() {
    return (
        <div className='footer-logo'>
            <Link to='/'>
                <img className='footer-logo-image' src={logoWhite} alt='Логотип СКАН' />
            </Link>
        </div>
    );
}

export default FooterLogo;